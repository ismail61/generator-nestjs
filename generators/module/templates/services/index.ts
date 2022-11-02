import { Injectable } from '@nestjs/common';
import { <%= kebabToPascal(name) %> } from '../../../entity/<%= kebabToCamel(name) %>/<%= kebabToCamel(name) %>';
import { Create<%= kebabToPascal(name) %>Dto } from '../rest/dto/create-<%= kebabToCamel(name) %>.dto';
import { <%= kebabToPascal(name) %>Repository } from '../repositories';

@Injectable()
export class <%= kebabToPascal(name) %>Service {
  constructor(private <%= kebabToCamel(name) %>Repo: <%= kebabToPascal(name) %>Repository) {}

  async create<%= kebabToPascal(name) %>(data: Create<%= kebabToPascal(name) %>Dto): Promise<<%= kebabToPascal(name) %> | null> {
    return this.<%= kebabToCamel(name) %>Repo.create<%= kebabToPascal(name) %>((data));
  }

  async findAll(skip?: number, limit?: number): Promise<<%= kebabToPascal(name) %>[] | null> {
    return await this.<%= kebabToCamel(name) %>Repo.findAll({}, skip, limit);
  }

  async get<%= kebabToPascal(name) %>(id: string): Promise<<%= kebabToPascal(name) %> | null> {
    return await this.<%= kebabToCamel(name) %>Repo.get<%= kebabToPascal(name) %>({ id });
  }
}
