const functions = require('firebase-functions');
const firestore = require('@google-cloud/firestore');
const {Storage} = require('@google-cloud/storage');
const firestoreClient = new firestore.v1.FirestoreAdminClient();
const storageClient = new Storage();

exports.dbExport = async (context) => {
    const bucket = functions.config().firestoreexports.bucket;
    const exportFolder = functions.config().firestoreexports.folder;
    const exportDirectory = bucket + '/' + exportFolder;

    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = firestoreClient.databasePath(projectId, '(default)');

    const date = new Date();
    const newExportPath = exportDirectory + '/' + date.toISOString();

    const [files] = await storageClient.bucket(bucket).getFiles({prefix: 'exports'});
    const exports = files.filter(file => file.name.includes('.overall_export_metadata'));
    const exportsToDelete = exports.filter(file => {
        const exportDateString = file.name.substring(8, 18);
        const exportTimestamp = Date.parse(exportDateString);
        return exportTimestamp + 1000 * 60 * 60 * 24 * 20 < (new Date()).getTime();
    });


    exportsToDelete.forEach(file => {
        const exportDateString = file.name.substring(8, 18);
        console.log('deleting files beginning with: ', exportDateString);
        storageClient.bucket(bucket).deleteFiles({'prefix': `exports/${exportDateString}`});
    });


    return firestoreClient.exportDocuments({
        name: databaseName,
        outputUriPrefix: newExportPath,
        collectionIds: []
    })
        .then(responses => {
            const response = responses[0];
            console.log(`Operation Name: ${response['name']}`);
            return response['name'];
        })
        .catch(err => {
            console.error(err);
            throw new Error('Export operation failed');
        });
};
