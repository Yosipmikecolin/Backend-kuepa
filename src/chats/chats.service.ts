import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chats.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
  ) {}

  async saveMessage(chat: string) {
    const parseChat: { user: string; text: string } = JSON.parse(chat);
    const newChat = this.chatRepository.create({
      name: parseChat.user,
      message: parseChat.text,
    });
    const response = await this.chatRepository.save(newChat);
    return response;
  }
}
