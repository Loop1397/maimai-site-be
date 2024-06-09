import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Song extends BaseEntity {
    @PrimaryGeneratedColumn()
    song_number: number;

    @Column()
    song_name: string;

    @Column()
    artist: string;
    
    @Column()
    bpm: number;

    @Column()
    difficult: string;
    
    @Column()
    level: number;
    
    @Column()
    genre: string;
    
    @Column()
    pattener: string;
    
    @Column()
    version: string;

    @CreateDateColumn()
    created_at: Date;
} 