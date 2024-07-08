const puppeteer = require('puppeteer');
const axios = require('axios');
require("dotenv").config({path: "../.env"});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// 국제판(internation) url
const intlLoginPage = `https://lng-tgk-aime-gw.am-all.net/common_auth/login?site_id=maimaidxex&redirect_url=https://maimaidx-eng.com/maimai-mobile/&back_url=https://maimai.sega.com/`
const intlFriendUrl = `https://maimaidx-eng.com/maimai-mobile/friend/search/searchUser/?friendCode=`;

// 일본판 url
const jpLoginPage = `https://maimaidx.jp/maimai-mobile/`;
const jpFriendUrl = `https://maimaidx.jp/maimai-mobile/friend/search/searchUser/?friendCode=`;


/**     
 * 
 * @param {string} friendCode maimai 친구코드 (13숫자) 파라미터
 * @param {boolean} jp 일본판인지 국제판인지를 판별. true : 일본판, false : 국제판
 */


/**
 * TODO
 * [x]: 국제판 친구코드 검색 기능도 만들기
 * [x]: getUserProfile에서 가져올 유저 정보 확정 및 완성
 */

// 친구코드로 검색에 성공했을 때 해당 페이지에서 필요한 정보를 가져오는 메소드
// 친구 검색에 성공하면 닉네임이랑 레이팅을 리턴, 아니면 null을 리턴 
const scrapUserData = () => {
    if(document.querySelector(`.basic_block`) === null) 
        return null;

    const name = document.querySelector('.basic_block .name_block').innerText;
    const rating = document.querySelector('.basic_block .rating_block').innerText;
    return { name, rating };
}

// 총 실행시간 약 5초 +- 3
const searchUser = async (friendCode, jp) => {

    // puppeteer를 사용해 headless 브라우저 실행
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    const loginPage = jp ? jpLoginPage : intlLoginPage;
    const friendUrl = jp ? jpFriendUrl : intlFriendUrl;

    
    await page.goto(loginPage)

    // 로그인 
    if(jp) {
        // 일본판 로그인
        try {
            // id, password 입력
            await page.type('input[name="segaId"]', process.env.SEGA_ID);
            await page.type('input[name="password"]', process.env.SEGA_PASSWORD);
    
            // 로그인 버튼 클릭 후 페이지 로딩 대기
            // Promise.all은 포함된 모든 처리를 비동기적으로 처리하는 메소드
            // 아래와 같이 Promise.all로 감싸야하는 이유는 이 포스트 참조 : https://www.meganii.com/blog/2020/01/30/puppeteer-wait-for-navigation/
            await Promise.all([
                page.click('button[type="submit"]'),
                page.waitForNavigation({ waitUntil: 'load'}),
            ]);

            // 에이메 버튼 클릭 후 페이지 로딩 대기
            await Promise.all([
                page.click('button[type="submit"]'),
                page.waitForNavigation({ waitUntil: 'load'}),
            ]);
        } catch(e) {
            console.error(`!!!!!!!!!!!!로그인 과정에서 에러 발생!!!!!!!!!!!!` + e);
        }        
    } else {
        // 국제판 로그인
        try {
            // id, password입력창 열기
            await page.click('span.c-button--openid--segaId');

            // id, password 입력
            await page.type('input[name="sid"]', process.env.SEGA_ID);
            await page.type('input[name="password"]', process.env.SEGA_PASSWORD);
    
            // 로그인 버튼 클릭 후 페이지 로딩 대기
            await Promise.all([
                page.click('#btnSubmit'),
                page.waitForNavigation({ waitUntil: 'load'}),
            ]);
        } catch(e) {
            console.error(`!!!!!!!!!!!!로그인 과정에서 에러 발생!!!!!!!!!!!!` + e);
        }        
    }

    await page.goto(friendUrl + friendCode);
    const response = await page.evaluate(scrapUserData);
    console.log(response);

    // puppeteer로 실행된 브라우저 종료
    await browser.close();
}

searchUser(`9014472824084`, false);