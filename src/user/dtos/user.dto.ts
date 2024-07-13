import { IsBoolean, Length, Matches } from "class-validator";

// 유저와 관련된 모든 요청은 해당 dto에 따르도록 함
export class UserDto {
    // 정규표현식(0부터 9사이의 숫자만)
    @Matches(RegExp('^[0-9]*$'))
    // 길이 13짜리 스트링으로 제한
    @Length(13)
    friendCode: string;

    @IsBoolean()
    isJp: boolean;
}