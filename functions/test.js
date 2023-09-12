import { createCanvas, Canvas, Image} from "canvas";
import request from 'request';
import sharp from 'sharp';
import sizeOf from 'image-size';
import {fileTypeFromBuffer} from 'file-type';
// import {readChunk} from 'read-chunk';


console.log('lol');

const coordinates = {
    0: {x: 2, y: 2},
    1: {x: 164, y: 2},
    2: {x: 2, y: 164},
    3: {x: 164, y: 164},
}

const downloadPhoto = (uri) => {
    return new Promise((resolve, reject) => {
        let data;
        const stream = request(uri);
        stream.on("data", (chunk) => data = data ? Buffer.concat([data, chunk]) : chunk);
        stream.on("error", reject);
        stream.on("end", () => resolve(data));
    });
}

const test = async () => {
    const canvasWidth = 320;
    const canvasHeight = 320;
    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#eee";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    const photos = [
        'https://firebasestorage.googleapis.com/v0/b/cookmate-a0444.appspot.com/o/images%2Frecipes%2Fsquash-and-avocado-salad%2Fthumbnail?alt=media&token=31127749-e469-482b-babb-341a7fcf7dde',
        'https://firebasestorage.googleapis.com/v0/b/cookmate-a0444.appspot.com/o/images%2Frecipes%2Fmushroom-veloute%2Fthumbnail_20210420?alt=media&token=ce1d6d39-7bd4-4656-8bd1-72e4805eb198',
        'https://firebasestorage.googleapis.com/v0/b/cookmate-a0444.appspot.com/o/images%2Frecipes%2Fsavoy-cabbage-with-almonds%2Fthumbnail_20200811?alt=media&token=6736e3a5-0151-4b65-91ad-7bf80c606de5',
        'https://firebasestorage.googleapis.com/v0/b/cookmate-a0444.appspot.com/o/images%2Frecipes%2Fchickpea-curry%2Fthumbnail_20210115?alt=media&token=40c4204d-34bc-4a84-81fb-b1404979bb28',
    ];

    const photoBuffers = await Promise.all(photos.map(async (url) => await downloadPhoto(url)));
    console.log(photoBuffers.length);


    await Promise.all(photoBuffers.map(async (photoBuffer, index) => {
        const jpgBuffer = await sharp(photoBuffer).resize(160, 160, {fit: 'cover'})
            .jpeg({ mozjpeg: true, quality: 90 })
            .toBuffer();

        const img = new Image();
        img.onload = () => ctx.drawImage(img, coordinates[index].x, coordinates[index].y, 160, 160);
        img.onerror = () => console.log('fuck');
        img.src = jpgBuffer;
    }));
    // img.onerror = () => console.log('error fucker');
    // ctx.drawImage(img, 0, 0, 150, 800);

    // const buffer = await readChunk('Unicorn.png', {length: 4100});
    // console.log(await fileTypeFromBuffer(photoBuffer));
    //=> {ext: 'png', mime: 'image/png'}

    return canvas.toDataURL();
}

// test().then(dataUrl => console.log(dataUrl)).catch(e => console.log(e));


const list = {
    recipes: {
        CXS1PBzAcH7m9s3rWXVq: {addedAt: '13 January 2022 at 14:50:48 UTC', 'thumbnail': 'a'},
        hQsat9D5glCFgQFIm6fm: {addedAt: '1 May 2022 at 17:10:30 UTC+1', 'thumbnail': 'd'},
        lhMGMxauoQMcUEzi80AN: {addedAt: '1 May 2022 at 17:09:50 UTC+1', 'thumbnail': 'b'},
        md6PDHeRz2Tx5FjiysGv: {addedAt: '1 May 2022 at 17:10:26 UTC+1', 'thumbnail': 'c'},
        niz9VbV0rcKuTIWNUZYi: {addedAt: '22 January 2023 at 17:44:16 UTC', 'thumbnail': 'f'},
        rgNIQQfNau5auEdKxtfD: {addedAt: '22 June 2022 at 09:40:18 UTC+1', 'thumbnail': 'e'},
    }
};

const thumbnailUrls = Object.keys(list.recipes).sort((a, b) => {
    const createdAtA = list.recipes[a]['addedAt'];
    const createdAtB = list.recipes[b]['addedAt'];
    return createdAtA < createdAtB ? 1 : createdAtA > createdAtB ? -1 : 0
}).map(recipeId => list.recipes[recipeId].thumbnail).slice(0, 4);

console.log(thumbnailUrls);

