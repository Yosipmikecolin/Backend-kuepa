import { IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsString()
  user: string;

  @IsString()
  @MinLength(5)
  password: string;
}
