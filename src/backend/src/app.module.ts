import {Module} from '@nestjs/common';
import {LoggerModule} from "./modules/logger/logger.module";
import {DatabaseModule} from "./database/database.module";
import {UserModule} from "./modules/user/user.module";
import {AuthModule} from "./modules/auth/auth.module";
import {UrlModule} from "./modules/url/url.module";
import {ConfigModule} from "@nestjs/config";
import {StatisticModule} from "./modules/statistic/statistic.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    LoggerModule,
    UserModule,
    AuthModule,
    UrlModule,
    StatisticModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
