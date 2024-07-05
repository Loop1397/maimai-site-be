const fs = require('fs');

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


const parsingPatternData = () => {
    const jsonFile = fs.readFileSync('../data/maimai_songs.json', 'utf-8');
    const jsonData = JSON.parse(jsonFile);
    const patternData = [];


    jsonData.forEach(element => {
        // 노래의 이름과 버전 파싱
        const title = element.title;
        const version = versionCode[parseInt(element.version / 100)];

        // 필요없는 데이터 전부 제거
        delete element.artist;
        delete element.catcode;
        delete element.date;
        delete element.image_url;
        delete element.key;
        delete element.release;
        delete element.sort;
        delete element.title;
        delete element.title_kana;
        delete element.version;

        Object.keys(element).forEach((key) => {
            const newPattern = {};
            
            newPattern.title = title;
            newPattern.version = version;

            // 패턴 타입 확인(스탠다드 or 디럭스)
            if (key.search(`dx`) !== -1) newPattern.type = `deluxe`;
            else newPattern.type = `standard`;
            
            // 패턴 난이도(difficulty) 확인
            if (key.search(`_b`) !== -1) newPattern.difficulty = `basic`;
            else if (key.search(`_a`) !== -1) newPattern.difficulty = `advanced`;
            else if (key.search(`_e`) !== -1) newPattern.difficulty = `expert`;
            else if (key.search(`_m`) !== -1) newPattern.difficulty = `master`;
            else newPattern.difficulty = `re:master`;

            // 패턴 레벨(level)
            newPattern.level = element[key];

            patternData.push(newPattern);
        });
    })
    

    return patternData;
};

console.log(parsingPatternData());