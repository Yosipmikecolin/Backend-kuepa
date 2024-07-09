import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async loginUser(userDto: LoginUserDto) {
    const { user, password } = userDto;

    const findUser = await this.userRepository.findOne({ where: { user } });

    if (!findUser) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }

    if (findUser.user === user && findUser.password === password) {
      return 'Autenticado correctamente';
    } else {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
  }
}
