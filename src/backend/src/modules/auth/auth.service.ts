import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

import {RegisterDto} from "./dto/register.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.passwordHash)) {
            // Удаляем hash для безопасности
            const { passwordHash, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('Invalid credentials');
    }

    async login(user: any) {
        return {
            access_token: this.jwtService.sign({ sub: user.id, email: user.email }),
        };
    }

    async register(dto: RegisterDto) {
        const user = await this.userService.create(dto);
        const payload = { username: user.name, sub: user.id };
        return { access_token: this.jwtService.sign(payload) };
    }

}