import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Types } from "mongoose";
import { Constants } from "../pattern-constants";

export class CreatePatternDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(Constants.PATTERN_DIFFICULTIES)
    difficulty: string;
    
    @IsString()
    @IsNotEmpty()
    level: string;

    @IsOptional()
    @IsNumber()
    @IsNotEmpty()
    constant?: number;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    patterner?: string;
    
    @IsString()
    @IsNotEmpty()
    @IsIn(Constants.PATTERN_TYPES)
    type: string;
    
    @IsString()
    @IsNotEmpty()
    version: string;

    @IsNotEmpty()
    // mongoDB에서 사용하는 ObjectId인지 판별하는 데코레이터
    @IsMongoId()
    song: Types.ObjectId;
}