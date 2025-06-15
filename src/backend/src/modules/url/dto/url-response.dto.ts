import { ApiProperty } from '@nestjs/swagger';

export class UrlResponseDto {
  @ApiProperty({ description: 'Уникальный идентификатор ссылки' })
  id: number;

  @ApiProperty({ description: 'Короткая версия ссылки' })
  short: string;

  @ApiProperty({ description: 'Целевой URL' })
  target: string;

  @ApiProperty({ description: 'Дата создания' })
  createdAt: Date;
}