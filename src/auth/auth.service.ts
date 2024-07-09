import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: CreateUserDto) {
    const { user: username } = user;
    const findUser = await this.userRepository.findOne({
      where: { user: username },
    });

    if (findUser) {
      throw new ConflictException('El usuario ya existe');
    } else {
      const newUser = this.userRepository.create({
        ...user,
        password: bcrypt.hashSync(user.password, 10),
      });
      const { name, type } = await this.userRepository.save(newUser);
      return { name, type };
    }
  }

  async loginUser(userDto: LoginUserDto) {
    const { user, password } = userDto;

    const findUser = await this.userRepository.findOne({ where: { user } });

    if (!findUser) {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
    const match = bcrypt.compareSync(password, findUser.password);
    if (findUser.user === user && match) {
      return {
        message: 'Autenticado correctamente',
        name: findUser.name,
        access_token: this.jwtService.sign({ username: findUser.user }),
      };
    } else {
      throw new UnauthorizedException('Usuario o contraseña incorrectos');
    }
  }

  /*   async deleteUser() {
    await this.userRepository.delete({});
  } */
}
