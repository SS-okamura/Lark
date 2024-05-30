import { Body, Controller, Get, Post } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateDepartmentDto } from './create-department.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly service: ContactService) {}

  @Get()
  getAll(departmentId: any): any {
    return this.service.findAllDepartment(departmentId);
  }

  @Post('create')
  create(@Body() department: CreateDepartmentDto) {
    console.log('name', department);
    this.service.create(department.name);
    return {
      status: 'OK',
    };
  }
}
