// mongoose를 이용하여 스키마 설계

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Document, SchemaOptions } from "mongoose";

// 스키마 옵션
const options: SchemaOptions = {
    timestamps: true,
}

// @Schema() 데코레이터를 사용해서 스키마 정의
@Schema(options)
export class Song extends Document {
    // @Prop() 데코레이터를 통해 required나 unique, default value등의 옵션 지정이 가능
    @Prop({
        required: true,
    })
    @IsNotEmpty()
    songNumber: number;

    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    songName: string;

    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    artist: string;
    
    @Prop({
        required: true,
    })
    @IsNumber()
    @IsNotEmpty()
    bpm: number;

    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    difficulty: string;
    
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    level: string;

    @Prop()
    @IsNumber()
    @IsNotEmpty()
    constant: number;
    
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    genre: string;
    
    @Prop()
    @IsString()
    @IsNotEmpty()
    patterner: string;
    
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    version: string;
}

// Song 클래스를 스키마로 만듦
export const songSchema = SchemaFactory.createForClass(Song);