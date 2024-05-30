import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable() // @Injectable() デコレータの適用
export class ParseIntPipe implements PipeTransform<string, number> {
  // PipeTransform インターフェースの実装
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10); // データの変換
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed'); // Pipe を適用できないケースは例外を送出
    }
    return val;
  }
}
