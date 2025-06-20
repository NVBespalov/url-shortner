import {Body, Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AuthService} from './auth.service';
import {JwtAuthGuard} from './jwt-auth.guard';
import {ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags} from '@nestjs/swagger';
import {RegisterDto} from "./dto/register.dto";

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('register')
    @ApiOperation({summary: 'Register new user'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                password: {type: 'string', example: 'password123'},
                email: {type: 'string', example: 'email@email.com'},
                name: {type: 'string', example: 'John Doe'}
            }
        }
    })
    @ApiResponse({status: 201, description: 'User successfully registered'})
    @ApiResponse({status: 400, description: 'Bad request'})
    async register(@Body() body: RegisterDto) {
        return this.authService.register(body);
    }

    @Post('login')
    @ApiOperation({summary: 'User login'})
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                email: {type: 'string', example: 'email@email.com'},
                password: {type: 'string', example: 'password123'}
            }
        }
    })
    @ApiResponse({status: 200, description: 'Login successful'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    async login(@Body() body: { email: string, password: string }) {
        const user = await this.authService.validateUser(body.email, body.password);
        return this.authService.login(user);
    }

    @Get('profile')
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({summary: 'Get user profile'})
    @ApiResponse({status: 200, description: 'Profile data returned successfully'})
    @ApiResponse({status: 401, description: 'Unauthorized'})
    profile(@Request() req) {
        return req.user;
    }
}