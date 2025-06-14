import {ApiProperty} from '@nestjs/swagger';

export class RegisterDto {

    @ApiProperty({
        description: 'User email address',
        example: 'user@example.com'
    })
    email: string;
    @ApiProperty({
        description: 'User password',
        example: 'strongPassword123',
        minLength: 8
    })
    password: string;
    @ApiProperty({
        description: 'User name',
        example: 'John Doe'
    })
    name: string;
}