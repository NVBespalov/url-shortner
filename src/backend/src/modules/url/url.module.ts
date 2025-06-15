import {Global, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Url } from './entity/url.entity';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([Url])],
    providers: [UrlService],
    controllers: [UrlController],
    exports: [UrlService]
})
export class UrlModule {}
