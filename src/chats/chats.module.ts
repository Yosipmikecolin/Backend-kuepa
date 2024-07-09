import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chats.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from './entities/chats.entity';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'qoY0H60LCkRyugz',
      signOptions: { expiresIn: '2h' },
    }),
    TypeOrmModule.forFeature([Chat]),
  ],
  providers: [ChatGateway, ChatsService],
  controllers: [ChatsController],
})
export class ChatsModule {}
