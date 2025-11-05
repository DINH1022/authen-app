import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Get, Req, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { LoginDto, RefreshTokenDto } from './dto/auth.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      const result = await this.userService.register(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const result = await this.authService.refreshTokens(refreshTokenDto.refreshToken);
      return {
        statusCode: HttpStatus.OK,
        message: 'Tokens refreshed successfully',
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() refreshTokenDto: RefreshTokenDto) {
    try {
      const result = await this.authService.logout(refreshTokenDto.refreshToken);
      return {
        statusCode: HttpStatus.OK,
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const user = (req as any).user;
    if (!user || !user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }
    
    try {
      const profile = await this.authService.getProfile(user.sub);
      return {
        statusCode: HttpStatus.OK,
        user: profile,
      };
    } catch (error) {
      throw error;
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('logout-all')
  @HttpCode(HttpStatus.OK)
  async logoutAll(@Req() req: Request) {
    const user = (req as any).user;
    if (!user || !user.sub) {
      throw new UnauthorizedException('User not authenticated');
    }

    try {
      const result = await this.authService.logoutAll(user.sub);
      return {
        statusCode: HttpStatus.OK,
        ...result,
      };
    } catch (error) {
      throw error;
    }
  }
}