import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import axios from 'axios';
import { LarkToken } from 'src/config/lark/lark.token';

@Injectable()
export class BotService {
  constructor(private readonly larkToken: LarkToken) {}
  async create(createBotDto: CreateBotDto) {
    const reqConf = {
      conf: {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + this.larkToken.getToken().data?.tenant_access_token,
        },
      },
      data: {
        chat_id: createBotDto.chat_id,
        msg_type: 'text',
        content: {
          text: createBotDto.message,
        },
      },
    };

    await axios
      .post(
        'https://open.larksuite.com/open-apis/message/v4/send/',
        reqConf.data,
        reqConf.conf,
      )
      .then(function (response) {
        return;
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  findAll() {
    return `This action returns all bot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bot`;
  }

  update(id: number, updateBotDto: UpdateBotDto) {
    return `This action updates a #${id} bot`;
  }

  remove(id: number) {
    return `This action removes a #${id} bot`;
  }
}
