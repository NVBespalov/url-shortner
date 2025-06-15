import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {Url} from "../../url/entity/url.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({unique: true})
    email: string;

    @Column({unique: true})
    name: string;

    @Column()
    passwordHash: string;

    @OneToMany(() => Url, (url) => url.user)
    urls: Url[];
}