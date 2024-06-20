import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
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
    difficulty: string;
    
    @Prop({
        type: String,
        required: true,
    })
    level: string;

    @Prop({
        type: Number,
    })
    constant: number;

    @Prop({
        type: String,
    })
    patterner: string;

    @Prop({
        enum: Constants.PATTERN_TYPES,
        required: true,
    })
    type: string;
    
    @Prop({
        type: String,
        required: true,
    })
    version: string;

    @Prop({
        required: true,
        type: Types.ObjectId,
        ref: 'Song',
    })
    songId: Types.ObjectId;
}

export const patternSchema = SchemaFactory.createForClass(Pattern);