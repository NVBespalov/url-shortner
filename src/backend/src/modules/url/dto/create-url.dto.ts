import { ApiProperty } from '@nestjs/swagger';

export class CreateUrlDto {
    @ApiProperty({ example: 'https://example.com', description: 'Целевой (длинный) URL' })
    target: string;
}
