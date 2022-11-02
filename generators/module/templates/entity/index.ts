import { Document } from 'mongoose';

export class <%= kebabToPascal(name) %> extends Document { <% schemaFields.forEach(function (field) {
    const key = field.split(':')[0].trim();
    const value = field.split(':')[1].trim();
    let dataType = `${capitalize(value)}`;
    switch (dataType) {
      case 'String':
        dataType = 'string';
			  break;
      case 'Number':
        dataType = 'number';
			  break;
      case 'Buffer':
        break;
      case 'Boolean':
        dataType = 'boolean';
			  break;
      case 'Date':
			  break;
    }
    let pair = key + ': ' + dataType;
    pair += ';';
  %>
  <%- pair %><% }) %>
}