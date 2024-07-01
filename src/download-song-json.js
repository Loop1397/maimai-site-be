const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadJsonFile = async (url, filePath) => {
    try {
        const response = await axios.get(url, { responseType: 'json' });
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2));
        console.log(`download success!!!!!!`);
        /** 
         * TODO
         * [ ] : version 코드 분석 후 분류하기
         * [ ] : std, dx두가지 패던이 전부 있는 케이스 구분
         * [ ] : 다운로드한 json 데이터 가공해서 db에 넣는 코드 작성
         * [ ] : 각 곡의 이미지파일 다운로드 이후 cloudfront등에 업로드
         */
    } catch (error) {
        console.error('#########################ERROR#########################', error);
    }
}

const url = 'https://maimai.sega.jp/data/maimai_songs.json';
const filePath = path.join(__dirname, '..', 'data/maimai_songs.json');

downloadJsonFile(url, filePath);