import { Controller, Get } from '@nestjs/common';
import { ChatsService } from './chats.service';

@Controller('chats')
export class ChatsController {
  constructor(private readonly services: ChatsService) {}

  @Get('get-chats')
  getChats() {
    return this.services.getChats();
  }
}
