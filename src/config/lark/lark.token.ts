import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as dotenv from 'dotenv';

@Injectable()
export class LarkToken {
  private token: any;
  public constructor(private readonly config: ConfigService) {
    console.log('App_ID', this.config.get('APP_ID'));
    console.log('APP_SECRET', this.config.get('APP_SECRET'));
    const reqConf = {
      conf: { headers: { 'Content-Type': 'application/json' } },
      data: {
        app_id: this.config.get('APP_ID'),
        app_secret: this.config.get('APP_SECRET'),
      },
    };
    console.log('test', process.env.APP_ID);
    axios
      .post(
        'https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal/',
        reqConf.data,
        reqConf.conf,
      )
      .then((response) => {
        console.log('res', response.data.tenant_access_token);
        this.token = response;
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }

  public getToken() {
    return this.token;
  }
}
