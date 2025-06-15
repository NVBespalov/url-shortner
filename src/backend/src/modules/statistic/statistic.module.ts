import {Global, Module} from "@nestjs/common";
import {StatisticsService} from "./statistic.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UrlClick} from "./entity/url-click.entity";
import {StatisticController} from "./statistic.controller";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([UrlClick])],
    controllers: [StatisticController],
    providers: [StatisticsService],
    exports: [StatisticsService],
})
export class StatisticModule {}