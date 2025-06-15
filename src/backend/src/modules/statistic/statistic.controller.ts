import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Controller, Get, Param} from "@nestjs/common";
import {LinkAnalyticsDto} from "./dto/analytics.dto";
import {StatisticsService} from "./statistic.service";

@ApiTags('Statistic')
@Controller('analytics')
export class StatisticController {
    constructor(private readonly statisticsService: StatisticsService) {
    }
    @Get(':shortCode')
    @ApiOperation({ summary: 'Получить аналитику по короткой ссылке' })
    @ApiResponse({
        status: 200,
        description: 'Возвращает статистику переходов и последние IP-адреса',
        type: LinkAnalyticsDto
    })
    async getAnalytics(@Param('shortCode') shortUrl: string): Promise<LinkAnalyticsDto> {
        return this.statisticsService.getAnalytics(shortUrl);
    }

}
