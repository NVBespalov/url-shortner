import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import {RegisterDto} from "../auth/dto/register.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private users: Repository<User>,
    ) {}

    findByEmail(email: string) {
        return this.users.findOne({ where: { email } });
    }

    async create({password, email, name}: RegisterDto) {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = this.users.create({ email, passwordHash, name });
        return this.users.save(user);
    }

    async findOne(username: string) {
        return this.users.findOne({
            where: {
                name: username,
            }
        })
    }

    async getAll() {
        return this.users.find();
    }
}