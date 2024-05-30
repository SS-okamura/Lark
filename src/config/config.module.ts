import { Module } from '@nestjs/common';
import { LarkToken } from './lark/lark.token';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigService],
  controllers: [],
  providers: [
    {
      provide: LarkToken,
      useClass: LarkToken, // Assuming LarkToken is a class decorated with @Injectable()
    },
  ], // Service の登録
})
export class CatsModule {}
