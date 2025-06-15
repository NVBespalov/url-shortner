import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn} from 'typeorm';
import {User} from '../../user/entity/user.entity';

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

    @Column({nullable: true, default: 0})
    clicks: number;
}