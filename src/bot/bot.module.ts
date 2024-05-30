import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { LarkToken } from 'src/config/lark/lark.token';

@Module({
  controllers: [BotController],
  providers: [BotService, LarkToken],
})
export class BotModule {}
