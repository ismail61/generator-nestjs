import { model, Schema } from 'mongoose';
import { <%= kebabToPascal(name) %> } from '../../entity/<%= kebabToCamel(name) %>/<%= kebabToCamel(name) %>'

const <%= kebabToPascal(name) %>Schema = new Schema<<%= kebabToPascal(name) %>>(
	{	<% schemaFields.forEach(function (field) {
			const key = field.split(':')[0].trim();
			const value = field.split(':')[1].trim();
			const dataType = `{ type: ${capitalize(value)} }`;
			let pair = key + ': ' + dataType;
			pair += ',';
		%>
		<%- pair %><% }) %>
	}, 
	{
		timestamps: true,
		versionKey: false,
	},
);

const <%= kebabToPascal(name) %>Model = model<<%= kebabToPascal(name) %>>('<%= (name) %>', <%= kebabToPascal(name) %>Schema);
export { <%= kebabToPascal(name) %>Model };
