import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ChatGateway } from './chats.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: 'qoY0H60LCkRyugz',
      signOptions: { expiresIn: '2h' },
    }),
  ],
  providers: [ChatGateway],
})
export class ChatsModule {}
