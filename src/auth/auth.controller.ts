import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly services: AuthService) {}

  @Post('register')
  createUser(@Body() createAuthDto: CreateUserDto) {
    return 'Registro de usuario';
  }
}
