import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { Create<%= kebabToPascal(name) %>Dto } from './dto/create-<%= kebabToCamel(name) %>.dto';
import { <%= kebabToPascal(name) %>Service } from '../services';
import { <%= kebabToPascal(name) %> } from '../../../entity/<%= kebabToCamel(name) %>/<%= kebabToCamel(name) %>';

@Controller('<%= kebabToCamel(name) %>s')
export class <%= kebabToPascal(name) %>Controller {
  constructor(private readonly <%= kebabToCamel(name) %>Service: <%= kebabToPascal(name) %>Service) {}

  @Post()
  async create(@Body() data: Create<%= kebabToPascal(name) %>Dto): Promise<<%= kebabToPascal(name) %> | null> {
    return this.<%= kebabToCamel(name) %>Service.create<%= kebabToPascal(name) %>(data);
  }

  @Get()
  async findAll(
    @Query('skip') skip: number,
    @Query('limit') limit: number,
  ): Promise<<%= kebabToPascal(name) %>[] | null> {
    return this.<%= kebabToCamel(name) %>Service.findAll(skip, limit);
  }

  @Get('/:id')
  async get<%= kebabToPascal(name) %>(@Param('id') id: string): Promise<<%= kebabToPascal(name) %> | null> {
    return this.<%= kebabToCamel(name) %>Service.get<%= kebabToPascal(name) %>(id);
  }
}