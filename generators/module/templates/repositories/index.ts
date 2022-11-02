import { Injectable } from '@nestjs/common';
import { <%= kebabToPascal(name) %>Database } from '../../../database/<%= kebabToCamel(name) %>';
import { <%= kebabToPascal(name) %> } from '../../../entity/<%= kebabToCamel(name) %>/<%= kebabToCamel(name) %>'

@Injectable()
export class <%= kebabToPascal(name) %>Repository {
  constructor(private readonly db: <%= kebabToPascal(name) %>Database) {}

  async findAll(query: Record<string, any>, skip?: number, limit?: number): Promise<<%= kebabToPascal(name) %>[] | null> {
    return await this.db.findAll(query, skip, limit);
  }

  async get<%= kebabToPascal(name) %>(query: Record<string, any>): Promise<<%= kebabToPascal(name) %> | null> {
    return await this.db.get<%= kebabToPascal(name) %>(query);
  }

  async create<%= kebabToPascal(name) %>(data: <%= kebabToPascal(name) %>): Promise<<%= kebabToPascal(name) %> | null> {
    return await this.db.create<%= kebabToPascal(name) %>(data);
  }
}
