const axios = require('axios');
const fs = require('fs');
const path = require('path');

const downloadJsonFile = async (url, filePath) => {
    try {
        const response = await axios.get(url, { responseType: 'json' });

        // version 코드에 따라 정렬
        response.data.sort((a, b) => {
            if( a.version < b.version ) return -1;
            if( a.version > b.version ) return 1;
            return 0;
        });

        // catcode(장르)가 宴会場인 데이터 필터링
        const jsonData = response.data.filter(data => data.catcode !== `宴会場`);

        // 일본어 자판 ＆(아마 전각문자)를 영어 자판의 &로 바꿈
        jsonData.forEach(element => {
            element.catcode = element.catcode.replace(`＆`, `&`);

            // std, dx두 가지 패턴을 모두 가진 곡 찾기
            if (Object.keys(element).length >= 16) console.log(element.title);
        });

        fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
        console.log(`download success!!!!!!`);
        /** 
         * TODO
         * [x] : version 코드 분석 후 분류하기
         * [x] : std, dx두가지 패턴이 전부 있는 케이스 구분
         * [ ] : 다운로드한 json 데이터 가공해서 db에 넣는 코드 작성
         * [ ] : 각 곡의 이미지파일 다운로드 이후 cloudfront등에 업로드
         */
    } catch (error) {
        console.error('#########################ERROR#########################', error);
    }
}

const url = 'https://maimai.sega.jp/data/maimai_songs.json';
const filePath = path.join(__dirname, '..', 'db/maimai_songs.json');

downloadJsonFile(url, filePath);