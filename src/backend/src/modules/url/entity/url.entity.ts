import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import {User} from '../../user/entity/user.entity';
import {UrlClick} from "../../statistic/entity/url-click.entity";

@Entity()
export class Url {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    originalUrl: string;

    @Column()
    shortCode: string;

    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    expiresAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: 'userId'})
    user: User;

    @OneToMany(() => UrlClick, click => click.url)
    clicks: UrlClick[];

}