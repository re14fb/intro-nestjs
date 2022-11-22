import { Injectable } from '@nestjs/common';
import { Message } from './Message';
import { MessageDto } from './MessageDTO';

@Injectable()
export class MessagesService {
  private messages: Message[] = [
    {
      id: 1,
      text: 'Primeira mensagem',
    },
    {
      id: 2,
      text: 'Segunda mensagem',
    },
  ];
  
  findAll() {
    return this.messages;
  }
  
  async findById(id: number) {
    const message = this.messages.find((msg) => msg.id === id);

    if(!message) {
      throw Error('Houve um erro em buscar a mensagem');     
    }

    return message;
  }
  
  create(messageDto: MessageDto) {
    const id = this.messages.length + 1;

    const message: Message = {
      id,
      ...messageDto,
    }

    this.messages.push(message);
  }
  
  update(id: number, message: Message) {
    const index = this.messages.findIndex((message: Message) => message.id === id);
    
    this.messages[index] = message;
    
    return message;
  }

  delete(id: number) {
    const index = this.messages.findIndex((message: Message) => message.id === id);

    delete this.messages[index];

    return "Deleted message";
  }
}
