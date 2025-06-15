import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import {Url} from "../../url/entity/url.entity";

@Entity('url_clicks')
export class UrlClick {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Url, url => url.clicks)
    url: Url;

    @Column()
    ipAddress: string;

    @CreateDateColumn()
    clickedAt: Date;

    @Column({ nullable: true })
    userAgent?: string;
}
