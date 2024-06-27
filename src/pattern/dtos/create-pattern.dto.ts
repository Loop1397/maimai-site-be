import { IsIn, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, Min} from "class-validator";
import { Types } from "mongoose";
import { Constants } from "../pattern-constants";

export class CreatePatternDto {
    @IsIn(Constants.PATTERN_DIFFICULTIES)
    difficulty: string;
    
    @IsString()
    @IsNotEmpty()
    level: string;

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
    
    @IsIn(Constants.PATTERN_TYPES)
    type: string;
    
    @IsIn(Constants.PATTERN_VERSIONS)
    version: string;

    // mongoDB에서 사용하는 ObjectId인지 판별하는 데코레이터
    @IsMongoId()
    song: Types.ObjectId;
}