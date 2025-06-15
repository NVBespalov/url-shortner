import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {UrlClick} from "./entity/url-click.entity";
import {LinkAnalyticsDto} from "./dto/analytics.dto";
import {UrlService} from "../url/url.service";

@Injectable()
export class StatisticsService {
    constructor(
        @InjectRepository(UrlClick)
        private urlClickRepository: Repository<UrlClick>,
        private readonly urlService: UrlService,
    ) {}
    private normalizeIpAddress(ip: string): string {
        switch (ip) {
            case '::1':
                return '127.0.0.1';
            case '::ffff:127.0.0.1':
                return '127.0.0.1';
            case '0.0.0.0':
            case '':
            case null:
            case undefined:
                return 'unknown';
            default:
                return ip;
        }
    }

    async saveClick(urlId: string, ipAddress: string, userAgent?: string): Promise<UrlClick> {
        const normalizedIp = this.normalizeIpAddress(ipAddress);

        const click = this.urlClickRepository.create({
            url: { id: urlId },
            ipAddress: normalizedIp,
            userAgent,
        });

        return this.urlClickRepository.save(click);
    }

    async getClicksForUrl(urlId: string): Promise<UrlClick[]> {
        return this.urlClickRepository.find({
            where: { url: { id: urlId } },
            order: { clickedAt: 'DESC' },
        });
    }

    async getAnalytics(shortUrl: string): Promise<LinkAnalyticsDto> {
        const existing = await this.urlService.findByShort(shortUrl);
        if (!existing) {
            throw new NotFoundException('URL не найден');
        }

        const [totalClicks, lastUniqueVisitors] = await Promise.all([
            this.urlClickRepository.count({
                where: {
                    url: { id: existing.id }
                }
            }),
            this.urlClickRepository
                .createQueryBuilder('click')
                .distinctOn(['click.ipAddress'])
                .select(['click.ipAddress', 'click.clickedAt'])
                .leftJoin('click.url', 'url')
                .where('url.id = :urlId', { urlId: existing.id })
                .orderBy('click.ipAddress')
                .addOrderBy('click.clickedAt', 'DESC')
                .limit(5)
                .getRawMany()
        ]);

        return {
            clicks: totalClicks,
            lastVisitors: lastUniqueVisitors.map(visitor => visitor['click_ipAddress'])
        };
    }

}