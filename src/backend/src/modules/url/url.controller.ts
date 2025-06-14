import { Controller, Post, Body, Get, Param, UseGuards, Req } from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';

@ApiTags('URL')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Сократить ссылку' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({ status: 201, description: 'Сокращённая ссылка создана' })
  @UseGuards(JwtAuthGuard)
  @Post('shorten')
  async shorten(@Body() dto: CreateUrlDto, @Req() req) {
    return this.urlService.create(dto.target, req.user.userId);
  }

  @ApiOperation({ summary: 'Переход по короткой ссылке' })
  @ApiParam({ name: 'short', description: 'Короткий сегмент ссылки' })
  @ApiResponse({ status: 200, description: 'Целевой URL найден' })
  @Get(':short')
  async redirect(@Param('short') short: string) {
    const entry = await this.urlService.findByShort(short);
    return entry ? { target: entry.target } : { error: 'Not found' };
  }
}