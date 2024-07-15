import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { SongConstants } from "../../constants/song.constants";

export class UpdateSongDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    artist?: string;
    
    @IsOptional()
    @IsInt()
    @Min(0)
    bpm?: number;

    @IsOptional()
    @IsIn(SongConstants.SONG_GENRE)
    genre?: string;
}