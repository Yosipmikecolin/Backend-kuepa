import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly services: AuthService) {}

  @Post('register')
  createUser(@Body() user: CreateUserDto) {
    return this.services.createUser(user);
  }

  @Post('login')
  loginUser(@Body() user: LoginUserDto) {
    return this.services.loginUser(user);
  }
}
