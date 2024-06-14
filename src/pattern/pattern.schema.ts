import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Song } from "src/song/song.schema";
import mongoose, { Document  } from "mongoose";

const options: SchemaOptions = {
    collection: 'pattern',
    timestamps: true,
}

@Schema(options)
export class Pattern extends Document {
    @Prop({
        required: true,
        unique: true,
    })
    @IsNotEmpty()
    patternNumber: number;

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
    @IsNotEmpty()
    patterner: string;
    
    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    version: string;

    @Prop({
        required: true,
        type: mongoose.Types.ObjectId,
        ref: "Song",
    })
    @IsNotEmpty()
    song: Song
}

export const patternSchema = SchemaFactory.createForClass(Pattern);