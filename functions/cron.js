const firestore = require('@google-cloud/firestore');
const client = new firestore.v1.FirestoreAdminClient();
const admin = require('firebase-admin');

// Replace BUCKET_NAME
const bucket = 'gs://cookmate-a0444.appspot.com';

exports.dbExport = (context) => {

    const projectId = process.env.GCP_PROJECT || process.env.GCLOUD_PROJECT;
    const databaseName = client.databasePath(projectId, '(default)');

    return client.exportDocuments({
        name: databaseName,
        outputUriPrefix: bucket,
        collectionIds: []
    })
        .then(responses => {
            const response = responses[0];
            console.log(`Operation Name: ${response['name']}`);
            return response;
        })
        .catch(err => {
            console.error(err);
            throw new Error('Export operation failed');
        });
};
