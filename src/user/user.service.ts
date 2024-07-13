import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { UserDto } from './dtos/user.dto';
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
    
        // puppeteer로 실행된 브라우저 종료
        await browser.close();

        if(response === null) {
            throw new NotFoundException(`해당 유저를 찾을 수 없습니다!`);
        }

        // response는 null로 인해 위에서 걸리는게 아니라면 { name, rating }
        return response;
    }

    async createUser(userDto: UserDto) {
        const { friendCode, isJp } = userDto;

        const isUserExist = await this.userModel.findOne({friendCode: friendCode});

        if(isUserExist) {
            throw new UnauthorizedException('이미 DB에 존재하는 유저입니다!');
        }
        
        const { name, rating } = await this.searchUser(friendCode, isJp);

        const user = this.userModel.create({
            friendCode,
            isJp,
            name,
            rating
        });

        return user;
    }

    async getUserByFriendCode(userDto: UserDto) {
        const foundedUser = await this.userModel.findOne({friendCode: userDto.friendCode});

        if(!foundedUser) {
            throw new NotFoundException('해당 유저를 찾을 수 없습니다!');
        }

        return foundedUser;
    }

    // 유저 갱신 메소드
    async updateUser(userDto: UserDto) {
        const { friendCode, isJp } = userDto;
        
        const foundedUser = await this.userModel.findOne({friendCode: friendCode});
        if(!foundedUser) {
            throw new NotFoundException(`해당 유저를 찾을 수 없습니다!`);
        }
        
        const { name, rating } = await this.searchUser(friendCode, isJp);

        const updateFields = {
            friendCode,
            isJp,
            name,
            rating
        };

        // 만약 유저의 현재 레이팅이 탑 레이팅보다 낮다면 updateFields에서 rating을 삭제함 -> 레이팅을 업데이트하지 않음
        if(foundedUser.rating > updateFields.rating) {
            delete updateFields.rating;
        }

        const updatedUser = await this.userModel.findOneAndUpdate(
            {friendCode: friendCode},
            { $set: updateFields},
            // new: true 옵션을 사용하면 업데이트된 문서를 반환받음
            // 만약 new: false라면 업데이트 되기 전의 문서를 반환받음
            { new:true, useFindAndModify: false}
        );

        return updatedUser;
    }

    async deleteUser(userDto: UserDto) {
        return this.userModel.findOneAndDelete({
            friendCode: userDto.friendCode, 
            isJp: userDto.isJp
        });
    }
}
