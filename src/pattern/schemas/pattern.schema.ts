import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import mongoose, { Document, Types  } from "mongoose";
import { PatternConstants } from "../../constants/pattern.constants";

const options: SchemaOptions = {
    collection: 'pattern',
    timestamps: true,
}

@Schema(options)
export class Pattern extends Document {
    @Prop({
        enum: PatternConstants.PATTERN_DIFFICULTIES,
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
        // constant의 값이 0이라면 현재 입력되지 않았다는 뜻
        default: 0
    })
    constant: number;

    @Prop({
        type: String,
        // patterner의 값이 `-`이라면 현재 입력되지 않았다는 뜻
        default: `-`
    })
    patterner: string;

    @Prop({
        enum: PatternConstants.PATTERN_TYPES,
        required: true,
    })
    type: string;
    
    @Prop({
        enum: PatternConstants.PATTERN_VERSIONS,
        required: true,
    })
    version: string;

    @Prop({
        required: true,
        type: Object
    })
    song: {
        title: string,
        artist: string,
        bpm: number,
        genre: string
    };
}

export const patternSchema = SchemaFactory.createForClass(Pattern);