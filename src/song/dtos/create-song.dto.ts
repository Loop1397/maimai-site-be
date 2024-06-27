import { IsIn, IsInt, IsNotEmpty, IsString, Min } from "class-validator";
import { SongConstants } from "../song-constants";

export class CreateSongDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    artist: string;
    
    @IsInt()
    @Min(1)
    bpm: number;

    @IsIn(SongConstants.SONG_GENRE)
    genre: string;
}