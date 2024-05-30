import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

// クラス定義
@Injectable()
export class SampleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    next();
  }
}

// 関数定義(こっちが推奨)
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`);
  next();
}
