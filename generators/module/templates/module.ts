import { Module } from '@nestjs/common';
import { <%= kebabToPascal(name) %>Controller } from './rest';
import { <%= kebabToPascal(name) %>Service } from './services';
import { <%= kebabToPascal(name) %>Repository } from './repositories';
import { <%= kebabToPascal(name) %>Database } from '../../database/<%= kebabToCamel(name) %>';

@Module({
  controllers: [<%= kebabToPascal(name) %>Controller],
  providers: [<%= kebabToPascal(name) %>Service, <%= kebabToPascal(name) %>Repository, <%= kebabToPascal(name) %>Database],
})
export class <%= kebabToPascal(name) %>Module {}
