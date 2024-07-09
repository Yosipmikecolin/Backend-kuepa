import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/auth.entity';
import { ConfigModule } from '@nestjs/config';
import { MessagesController } from './messages/messages.controller';
import { MessagesService } from './messages/messages.service';
import { MessagesModule } from './messages/messages.module';

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
      entities: [User],
      synchronize: true, // * Opcional: sincroniza automáticamente las estructuras de la base de datos (no recomendado en producción)
    }),
    AuthModule,
    MessagesModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class AppModule {}
