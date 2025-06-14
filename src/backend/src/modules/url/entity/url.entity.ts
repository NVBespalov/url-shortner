import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    short: string;

    @Column()
    target: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column()
    userId: string;
}