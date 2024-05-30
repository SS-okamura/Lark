import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupController } from './chat-group.controller';
import { LarkToken } from 'src/config/lark/lark.token';

@Module({
  controllers: [ChatGroupController],
  providers: [ChatGroupService, LarkToken],
})
export class ChatGroupModule {}
