import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";

const difficulties = ['basic', 'advanced', 'expert', 'master', 're:master']
const types = ['standard', 'deluxe'];

export class UpdatePatternDto {
    // IsOptional : 주어진 값이 empty(=== null, === undefined)하다면 validator에서 해당 속성을 무시함
    @IsOptional()
    @IsString()
    // IsOptional은 속성값이 ''로 주어졌을 때를 대처하지 못하기 때문에 IsNotEmpty도 같이 사용해줌
    @IsNotEmpty()
    // 해당 값이 괄호 안의 배열에 들어있는지 판별
    @IsIn(difficulties)
    difficulty?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    level?: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    constant?: number;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    patterner?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @IsIn(types)
    type?: string;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    version?: string;

    @IsOptional()
    @IsNotEmpty()
    song?: Types.ObjectId;
}