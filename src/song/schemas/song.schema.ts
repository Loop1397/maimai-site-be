// mongoose를 이용하여 스키마 설계

import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import mongoose, { Document, Types  } from "mongoose";

// 스키마 옵션
const options: SchemaOptions = {
    // 스키마(DB에 생성될 폴더) 이름 지정
    collection: 'song',
    // createAt, updatedAt을 찍어줌
    timestamps: true,
}

// @Schema() 데코레이터를 사용해서 스키마 정의
@Schema(options)
export class Song extends Document {
    // @Prop() 데코레이터를 통해 required나 unique, default value등의 옵션 지정이 가능
    @Prop({
        required: true,
        unique: true,
        type: String,
    })
    title: string;

    @Prop({
        required: true,
        type: String,
    })
    artist: string;
    
    @Prop({
        required: true,
        type: Number,
    })
    bpm: number;

    @Prop({
        required: true,
        type: String,
    })
    genre: string;

    @Prop({
        type: [{
            type: Types.ObjectId,
            ref: 'Pattern',
        }],
    })
    patterns: Types.ObjectId[];
}

// Song 클래스를 스키마로 만듦
export const songSchema = SchemaFactory.createForClass(Song);