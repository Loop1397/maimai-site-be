import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Song } from "src/song/schemas/song.schema";
import mongoose, { Document, Types  } from "mongoose";

const options: SchemaOptions = {
    collection: 'pattern',
    timestamps: true,
}

@Schema(options)
export class Pattern extends Document {
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

    @Prop()
    @IsString()
    patterner: string;

    @Prop({
        enum: ['deluxe', 'standard']
    })
    type: string;
    
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    version: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Song',
    })
    @IsNotEmpty()
    song: Types.ObjectId;
}

export const patternSchema = SchemaFactory.createForClass(Pattern);