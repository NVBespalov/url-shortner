import { ApiProperty } from '@nestjs/swagger';
import {IsUrl, IsNotEmpty, IsOptional, IsDate} from 'class-validator';

export class CreateUrlDto {
    @ApiProperty({example: 'https://example.com', description: 'Целевой (длинный) URL'})
    @IsNotEmpty()
    @IsUrl()
    originalUrl: string;

    @ApiProperty({example: '2025-12-31', description: 'Дата истечения срока действия URL', required: false})
    @IsOptional()
    @IsDate()
    expiresAt?: Date;
}
