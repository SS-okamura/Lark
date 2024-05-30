import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cat/interfaces/cat.interface';

@Injectable() // @Injectable() デコレータの適用
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    // サービスが提供するビジネスロジックを定義
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
