import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Song } from "src/song/schemas/song.schema";
import mongoose, { Document, Types  } from "mongoose";
import { Constants } from "../pattern-constants";

const options: SchemaOptions = {
    collection: 'pattern',
    timestamps: true,
}

@Schema(options)
export class Pattern extends Document {
    @Prop({
        enum: Constants.PATTERN_DIFFICULTIES,
        required: true,
    })
    @IsNotEmpty()
    difficulty: string;
    
    @Prop({
        type: String,
        required: true,
    })
    @IsNotEmpty()
    level: string;

    @Prop({
        type: Number,
    })
    @IsNumber()
    @IsNotEmpty()
    constant: number;

    @Prop({
        type: String,
    })
    patterner: string;

    @Prop({
        enum: Constants.PATTERN_TYPES
    })
    type: string;
    
    @Prop({
        type: String,
        required: true,
    })
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