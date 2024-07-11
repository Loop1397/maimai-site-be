import { Length, Matches } from "class-validator";

export class createUserDto {
    // 정규표현식(0부터 9사이의 숫자만)
    @Matches(RegExp('^[0-9]*$'))
    // 길이 13짜리 스트링으로 제한
    @Length(13)
    friendCode: string;
}