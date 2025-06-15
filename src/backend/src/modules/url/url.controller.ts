import {Controller, Post, Body, Get, Param, UseGuards, Req, Delete, Redirect} from '@nestjs/common';
import { UrlService } from './url.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import {UrlResponseDto} from "./dto/url-response.dto";
import { Request } from 'express';


@ApiTags('URL')
@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Сократить ссылку' })
  @ApiBody({ type: CreateUrlDto })
  @ApiResponse({ status: 201, description: 'Сокращённая ссылка создана' })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async shorten(@Body() dto: CreateUrlDto, @Req() req: Request) {
    return this.urlService.create(dto.originalUrl, req.user.userId, dto.expiresAt);
  }

  @ApiOperation({ summary: 'Получить данные короткой ссылки' })
  @ApiParam({ name: 'shortCode', description: 'Короткий сегмент ссылки' })
  @ApiResponse({ status: 200, description: 'Целевой URL найден' })
  @Get(':shortCode')
  resolveShortUrl(@Param('shortCode') shortCode: string) {
    return this.urlService.findByShort(shortCode);
  }
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить все ссылки пользователя' })
  @ApiResponse({
    status: 200,
    description: 'Список всех ссылок пользователя',
    type: [UrlResponseDto]
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserUrls(@Req() req: Request) {
    return this.urlService.findAllByUserId(req.user.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({summary: 'Удалить ссылку'})
  @ApiParam({name: 'id', description: 'ID ссылки'})
  @ApiResponse({status: 200, description: 'Ссылка успешно удалена'})
  @ApiResponse({status: 404, description: 'Ссылка не найдена'})
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Req() req: Request) {
    return this.urlService.delete(id, req.user.userId);
  }

  // Добавляем новый метод для редиректа
  @Get('redirect/:shortId')
  @ApiOperation({ summary: 'Редирект на оригинальный URL по короткому идентификатору' })
  @ApiResponse({ status: 302, description: 'Успешный редирект' })
  @ApiResponse({ status: 404, description: 'Ссылка не найдена' })
  @Redirect()
  async redirectToOriginal(@Param('shortId') shortId: string) {
    const url = await this.urlService.incrementClicksAndGetOriginal(shortId);
    return { url: url.originalUrl };
  }

}