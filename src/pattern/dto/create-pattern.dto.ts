import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
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
    songId: Types.ObjectId;
}