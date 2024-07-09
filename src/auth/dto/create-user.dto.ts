import { IsString, MinLength, MaxLength, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  user: string;

  @IsString()
  @IsIn(['Estudiante', 'Moderador'])
  type: string;

  @IsString()
  @MinLength(5)
  password: string;
}
