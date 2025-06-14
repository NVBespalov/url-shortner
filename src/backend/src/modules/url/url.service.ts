import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entity/url.entity';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private urls: Repository<Url>,
    ) {}

    async create(target: string, userId: string) {
        const short = Math.random().toString(36).slice(2, 8);
        const url = this.urls.create({ short, target, userId });
        return await this.urls.save(url);
    }

    async findByShort(short: string) {
        return this.urls.findOne({ where: { short } });
    }
}