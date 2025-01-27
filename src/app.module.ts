import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { ChatsModule } from './chats/chats.module';
import { Chat } from './chats/entities/chats.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 53047,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User,Chat],
      synchronize: true, // * Opcional: sincroniza automáticamente las estructuras de la base de datos (no recomendado en producción)
    }),

    ChatsModule,
    AuthModule,
  ],
})
export class AppModule {}
