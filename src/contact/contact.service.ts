import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { larkClient } from 'src/config/lark/config';
import { LarkToken } from 'src/config/lark/lark.token';

@Injectable()
export class ContactService {
  constructor(
    private readonly larkToken: LarkToken,
    private readonly config: ConfigService,
  ) {}
  findAllDepartment = async (departmentId) => {
    let allDepartmentInfo = [];
    for await (const {
      items,
    } of await larkClient.contact.department.childrenWithIterator({
      path: {
        department_id: departmentId,
      },
      params: {
        department_id_type: 'department_id',
        page_size: 10,
      },
    })) {
      if (items && items.length > 0) {
        items.forEach(async (item) => {
          const { name, department_id, parent_department_id, member_count } =
            item;
          allDepartmentInfo.push([
            name,
            department_id,
            parent_department_id,
            member_count,
          ]);
        });
        await Promise.all(
          items.map((item) => this.findAllDepartment(item.department_id)),
        );
      }
    }
    return allDepartmentInfo;
  };

  create = async (name: string) => {
    console.log('tokennn', this.larkToken.getToken().data?.tenant_access_token);
    const reqConf = {
      conf: {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' + this.larkToken.getToken().data?.tenant_access_token,
        },
      },
      data: {
        chat_id: this.config.get('CHAT_ID'),
        msg_type: 'text',
        content: {
          text: 'nestによる通信',
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
        console.log(response);
        return;
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}
