const fs = require('fs');
const axios = require('axios');

const jsonFile = fs.readFileSync('../data/maimai_songs.json', 'utf-8');
const jsonData = JSON.parse(jsonFile);
const versionList = [];

const versionCode = {
    100: 'maimai',
    110: 'maimai+',
    120: 'GreeN',
    130: 'GreeN+',
    140: 'ORANGE',
    150: 'ORANGE+',
    160: 'PiNK',
    170: 'PiNK+',
    180: 'MURASAKi',
    185: 'MURASAKi+',
    190: 'MiLK',
    195: 'MiLK+',
    199: 'FiNALE',
    200: 'DX',
    205: 'DX+',
    210: 'Splash',
    215: 'Splash+',
    220: 'UNiVERSE',
    225: 'UNiVERSE+',
    230: 'FESTiVAL',
    235: 'FESTiVAL+',
    240: 'BUDDiES',
    245: 'BUDDiES+',
}

jsonData.forEach(data => {
    console.log(versionCode[parseInt(data.version/100)])
})

// versionList.sort((a,b) => {
//     if( a < b ) return -1;
//     if( a > b ) return 1;
//     return 0;
// });

// console.log(`##############versionList : ${versionList}`);

// let number = '10010';
// console.log(parseInt(number/100));
// console.log(versionCode[parseInt(number/100 +1)]);
