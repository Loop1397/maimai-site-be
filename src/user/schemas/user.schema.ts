import { Prop, Schema, SchemaFactory, SchemaOptions } from "@nestjs/mongoose";
import { Document } from "mongoose";

const options: SchemaOptions = {
    collection: 'user',
    timestamps: true,
}

@Schema(options)
export class User extends Document {
    @Prop({
        required: true,
        unique: true,
        type: String,
    })
    friendCode: string;
    
    @Prop({
        required: true,
        type: Boolean
    })
    isJp: boolean;

    @Prop({
        required: true,
        type:String,
    })
    name: string;

    @Prop({
        required: true,
        type: Number,
    })
    rating: number;
}

export const userSchema = SchemaFactory.createForClass(User);