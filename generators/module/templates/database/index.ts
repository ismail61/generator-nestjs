import { Injectable } from '@nestjs/common';
import { <%= kebabToPascal(name) %> } from '../../entity/<%= kebabToCamel(name) %>/<%= kebabToCamel(name) %>';
import { Create<%= kebabToPascal(name) %>Dto } from '../../modules/<%= kebabToCamel(name) %>/rest/dto/create-<%= kebabToCamel(name) %>.dto';
import { <%= kebabToPascal(name) %>Model } from '../<%= kebabToCamel(name) %>/<%= kebabToCamel(name) %>.model';

@Injectable()
export class <%= kebabToPascal(name) %>Database {
  async create<%= kebabToPascal(name) %>(create<%= kebabToPascal(name) %>Dto: Create<%= kebabToPascal(name) %>Dto): Promise<<%= kebabToPascal(name) %> | null> {
   try {
        const created<%= kebabToPascal(name) %> = new <%= kebabToPascal(name) %>Model(create<%= kebabToPascal(name) %>Dto);
        return await created<%= kebabToPascal(name) %>.save();
   } catch (error: any) {
        console.log(error.message);
        return null;
   }
  }

  async findAll(query: Record<string, any>, skip?: number, limit?: number): Promise<<%= kebabToPascal(name) %>[] | null> {
    try {
        return await <%= kebabToPascal(name) %>Model.find(query)
        .skip(skip)
        .limit(limit)
        .lean();
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
  }

  async get<%= kebabToPascal(name) %>(query: Record<string, string>): Promise<<%= kebabToPascal(name) %> | null> {
    try {
        return await <%= kebabToPascal(name) %>Model.findOne(query).lean();
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
  }
}
