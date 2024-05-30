import {
  Controller,
  Get,
  Post,
  Body,
  UseFilters,
  Param,
  UsePipes,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { CreateCatDto } from 'src/cat/dto/create-cat.dto';
import { CatsService } from './cat.service';
import { Cat } from 'src/cat/interfaces/cat.interface';
import { HttpExceptionFilter } from 'src/common/filters/http-exception-filter/http-exception-filter.filter';
import { ParseIntPipe } from 'src/common/pipes/pars-int/pars-int.pipe';
import { AuthGuard } from 'src/common/guards/auh/auth.guard';
import { LoggingInterceptor } from 'src/common/interceptors/logging/logging.interceptor';

@UseGuards(AuthGuard)
@Controller('cats') // @Controller() デコレータの適用と Route の指定
export class CatsController {
  constructor(private catsService: CatsService) {} // DI

  @Post() // HTTP メソッドの指定
  @UseFilters(HttpExceptionFilter) // Exception filter を登録
  @UsePipes(ValidationPipe) // Pipe を登録
  @UseInterceptors(LoggingInterceptor) // Interceptor を登録
  async create(@Body() createCatDto: CreateCatDto) {
    // リクエストの Body を取得
    this.catsService.create(createCatDto); // 受け取った値を Service に渡す
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll(); // Service から得た値をレスポンスとして返す
  }

  @Get(':id')
  // パラメータ id に対する Pipe を登録
  async findOne(@Param('id', ParseIntPipe) id) {
    return [];
  }
}
