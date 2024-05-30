import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

const API_KEY = 'secret';

// ヘッダーの Authorization の値を検証する単純な関数
function validateRequest(request: Request): boolean {
  return request.header('Authorization') === API_KEY;
}

@Injectable() // @Injectable() デコレータの適用
export class AuthGuard implements CanActivate {
  // CanActivate インターフェースの実装
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return validateRequest(request); // リクエストに対する何らかの検証 (true であれば次の処理へと進む)
  }
}
