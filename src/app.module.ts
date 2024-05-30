import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountController } from './account/account.controller';
import { AccountService } from './account/account.service';
import { ContactController } from './contact/contact.controller';
import { ContactService } from './contact/contact.service';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cat/cat.module';
import { SampleMiddleware } from './common/middleware/sample/sample.middleware';
import { CatsController } from './cat/cats.controller';
import { LarkToken } from './config/lark/lark.token';
import { BotModule } from './bot/bot.module';
import { ChatGroupModule } from './chat-group/chat-group.module';
import { LarkClient } from './config/lark/lark.client';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development.local'],
    }),
    CatsModule,
    BotModule,
    ChatGroupModule, // 機能ごとにModuleにまとめてimportする
  ],
  controllers: [AppController, AccountController, ContactController],
  providers: [
    AppService,
    AccountService,
    ContactService,
    LarkToken,
    LarkClient,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SampleMiddleware) // Middlewareの定義
      .forRoutes(CatsController); // 適用対象のRouterの定義
  }
}
