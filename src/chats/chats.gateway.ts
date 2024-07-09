import { Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as WebSocket from 'ws';
import { ChatsService } from './chats.service';

@Injectable()
export class ChatGateway implements OnModuleInit {
  private wss: WebSocket.Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly services: ChatsService,
  ) {}

  onModuleInit() {
    this.wss = new WebSocket.Server({ port: 8080 });

    this.wss.on('connection', (ws: WebSocket) => {
      console.log('Client connected');
      ws.on('message', (message: string) => {
        const { token, text } = JSON.parse(message);
        try {
          const decoded = this.jwtService.verify(token);
          const response = { user: decoded.username, text };
          this.broadcast(JSON.stringify(response));
        } catch (error) {
          ws.send(JSON.stringify({ error: 'Unauthorized' }));
        }
      });

      ws.on('close', () => {
        console.log('Client disconnected');
      });
    });
  }

  private broadcast(message: string) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        this.services.saveMessage(message);
        client.send(message);
      }
    });
  }
}
