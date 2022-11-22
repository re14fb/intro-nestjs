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
    return this.messages.filter(Boolean);
  }
  
  async findById(id: number) {
    const message = this.messages.find((msg) => msg?.id === id);

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
  
  async update(id: number, messageDto: MessageDto) {
    const index = this.messages.findIndex((msg: Message) => msg?.id === id);

    console.log(index);

    if(index < 0) {
      throw Error('Houve um erro em buscar a mensagem');
    }

    const message: Message = {
      id,
      ...messageDto,
    }
    
    this.messages[index] = message;
    
    return message;
  }

  async delete(id: number) {
    const index = this.messages.findIndex((msg: Message) => msg?.id === id);

    console.log({ index });

    if(index < 0) {
      throw Error('Houve um erro em buscar a mensagem');
    }

    delete this.messages[index];

    return "Deleted message";
  }
}
