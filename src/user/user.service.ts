import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { createUserDto } from './dtos/create-User.dto';
import { INTL_LOGIN_PAGE, INTL_FRIEND_URL, JP_LOGIN_PAGE, JP_FRIEND_URL } from './constants/url';

const puppeteer = require('puppeteer');
require("dotenv").config({path: "../.env"});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
        
    }
    // 친구코드로 검색에 성공했을 때 해당 페이지에서 필요한 정보를 가져오는 메소드
    // 친구 검색에 성공하면 닉네임이랑 레이팅을 리턴, 아니면 null을 리턴 
    scrapUserData = () => {
        if(document.querySelector(`.basic_block`) === null) 
            return null;

        const nameBlock = document.querySelector('.basic_block .name_block') as HTMLElement;
        const name = nameBlock.innerText;
        const ratingBlock = document.querySelector('.basic_block .rating_block') as HTMLElement;
        const rating = ratingBlock.innerText;
        return { name, rating };
    }

    async searchUser (friendCode, isJP) {

        // puppeteer를 사용해 headless 브라우저 실행
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        const loginPage = isJP ? JP_LOGIN_PAGE : INTL_LOGIN_PAGE;
        const friendUrl = isJP ? JP_FRIEND_URL : INTL_FRIEND_URL;
    
        
        await page.goto(loginPage)
    
        // 로그인 
        if(isJP) {
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
        const response = await page.evaluate(this.scrapUserData);
        console.log(response);
    
        // puppeteer로 실행된 브라우저 종료
        await browser.close();
    }

    async createUser(createUserDto: createUserDto) {
        const { friendCode, isJp} = createUserDto;
        
        await this.searchUser(friendCode, isJp);
    } 
}
