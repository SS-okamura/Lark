import * as lark from '@larksuiteoapi/node-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LarkClient {
  private readonly _client: lark.Client;
  constructor(private readonly config: ConfigService) {
    this._client = new lark.Client({
      appId: this.config.get('APP_ID'),
      appSecret: this.config.get('APP_SECRET'),
      appType: lark.AppType.SelfBuild,
      domain: lark.Domain.Lark,
    });
  }

  public get client(): lark.Client {
    return this._client;
  }
}
