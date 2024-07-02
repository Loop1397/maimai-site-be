const axios = require('axios');
const fs = require('fs');
const path = require('path');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const fetchImage = async (url, filePath) => {
    try{

        const response = await axios({
            url,
            method: 'GET',
            responseType: 'stream',
        });

        // Create a write stream to the specified file path
        const writer = fs.createWriteStream(filePath);

        // Pipe the response data to the file
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading the image:', error);
    }
};

const fileName = `0d661350576c1dbe.png`;
const url = `https://maimaidx.jp/maimai-mobile/img/Music/${fileName}`;
const filePath = path.join(__dirname, '..', `data/images/${fileName}`);

fetchImage(url, filePath).then(() => {
    console.log('Image downloaded and saved to', filePath);
});