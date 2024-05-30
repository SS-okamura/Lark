import { Injectable } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chat-group.dto';
import { UpdateChatGroupDto } from './dto/update-chat-group.dto';
import { LarkToken } from 'src/config/lark/lark.token';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { group } from 'console';
import { URLS } from 'src/const/urls';

@Injectable()
export class ChatGroupService {
  constructor(
    private larkToken: LarkToken,
    private readonly config: ConfigService,
  ) {}
  create(createChatGroupDto: CreateChatGroupDto) {
    return 'This action adds a new chatGroup';
  }

  async findAll() {
    const reqConf = {
      conf: {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + this.larkToken.getToken().data?.tenant_access_token,
        },
      },
    };
    console.log(this.larkToken.getToken().data?.tenant_access_token);
    return await axios
      .get(URLS.ALL_CHAT_GROUPS, {
        headers: {
          Authorization:
            'Bearer ' + this.larkToken.getToken().data?.tenant_access_token,
        },
      })
      .then(function (response) {
        return response.data?.data.groups.map((group) => {
          return { name: group.name, chat_id: group.chat_id };
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  async findOne(name: string) {
    const groups = await this.findAll();

    return groups.find((group) => {
      return group.name === name;
    });
  }

  update(id: number, updateChatGroupDto: UpdateChatGroupDto) {
    return `This action updates a #${id} chatGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatGroup`;
  }
}
