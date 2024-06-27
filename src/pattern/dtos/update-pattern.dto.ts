import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";
import { Types } from "mongoose";
import { PatternConstants } from "../pattern-constants";

export class UpdatePatternDto {
    // IsOptional : 주어진 값이 empty(=== null, === undefined)하다면 validator에서 해당 속성을 무시함
    // +) IsOptional은 속성값이 ''로 주어졌을 때를 대처하지 못함
    @IsOptional()
    // 해당 값이 괄호 안의 배열에 들어있는지 판별
    @IsIn(PatternConstants.PATTERN_DIFFICULTIES)
    difficulty?: string;

    @IsOptional()
    @IsNotEmpty()
    level?: string;

    // Max는 혹시 몰라서 지정해두지 않음. BUDDiES+기준 최대 15.0
    @IsOptional()
    @IsNumber()
    @Min(1.0)
    @IsNotEmpty()
    constant?: number;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    patterner?: string;
    
    @IsOptional()
    @IsIn(PatternConstants.PATTERN_TYPES)
    type?: string;
    
    @IsOptional()
    @IsIn(PatternConstants.PATTERN_VERSIONS)
    version?: string;

    @IsOptional()
    @IsMongoId()
    song?: Types.ObjectId;
}