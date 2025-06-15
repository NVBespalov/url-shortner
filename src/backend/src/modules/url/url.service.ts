import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Url } from './entity/url.entity';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(Url)
        private urls: Repository<Url>,
    ) {}

    async create(originalUrl: string, userId: string, expiresAt?: Date | undefined) {
        const shortCode = Math.random().toString(36).slice(2, 8);
        const urlEntity = this.urls.create({ originalUrl, user: {id: userId}, shortCode, expiresAt });
        return await this.urls.save(urlEntity);
    }

    async findByShort(shortCode: string) {
        return this.urls.findOne({ where: { shortCode } });
    }
    async findAllByUserId(userId: string) {
        return this.urls.find({
            where: { user : {id: userId} },
            order: { createdAt: 'DESC' }
        });
    }

    async delete(id: string, userId: string) {
        return await this.urls.delete({
            id,
            user: {id: userId}
        });
    }

    async incrementClicksAndGetOriginal(shortCode: string) {
        const url = await this.urls.findOne({
            where: { shortCode },
        });

        if (!url) {
            throw new NotFoundException('Ссылка не найдена');
        }


        url.clicks = url.clicks + 1;
        await this.urls.save(url);

        return url;

    }
}