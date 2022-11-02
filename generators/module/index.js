'use strict';
const Generator = require('yeoman-generator');
const { kebabToPascal, kebabToCamel, capitalize } = require('./utils');
const schemaValueChoices = [
    {
        name: 'String',
        value: 'String',
        checked: true
    },
    {
        name: 'Number',
        value: 'Number',
        checked: true
    },
    {
        name: 'Boolean',
        value: 'Boolean',
        checked: true
    },
    {
        name: 'Buffer',
        value: 'Buffer',
        checked: true
    },
    {
        name: 'Date',
        value: 'Date',
        checked: true
    },
];
const dataTypes = ['String', 'Number', 'Boolean', 'Buffer', 'Date'];

module.exports = class extends Generator {
    cnt = 0;
    columns = [];
    constructor(args, opts) {
        super(args, opts);
        if (!args[0]) {
            throw new Error('Mongoose Schema is required! \nexample: "admin|name:String,email:String,password:String"');
        }
        this.model = this.getModel(args[0]);
    }

    async prompting() {
        // this.log(yosay(
        //     'Welcome to the remarkable ' + chalk.red('generator-react-starter-kit-relay-container') + ' generator!'
        // ));
        // const tableNamePrompt = [
        //     {
        //         type: 'input',
        //         name: 'name',
        //         message: 'The Module Name?'
        //     }
        // ];

        // const columnPrompts = [
        //     {
        //         type: 'input',
        //         name: 'attributeName',
        //         message: 'Define your Schema AttributeName?',
        //         default: 'id'
        //     },
        //     {
        //         type: 'list',
        //         name: 'attributeType',
        //         message: 'Define your Schema Attribute DataType?',
        //         choices: schemaValueChoices,
        //         default: 'String'
        //     },
        //     {
        //         type: 'confirm',
        //         name: 'yes',
        //         message: 'Do you want to add more schema fields?',
        //         default: 'Y'
        //     }
        // ]

        // const loop = (relevantPrompts) => {
        //     return this.prompt(relevantPrompts).then(props => {
        //         console.log(props)
        //         this.columns.push(props);
        //         return props.yes ? loop(columnPrompts) : this.prompt([]);
        //     })
        // }

        // return loop([...tableNamePrompt, ...columnPrompts]);
        return this.prompt([]).then(promptProps => {
            this.promptProps = promptProps;
        });
    }

    getModel(mongooseModel) {
        this.cnt++;
        if (this.cnt === 1) {
            const name = mongooseModel.split('|')[0].trim();
            const model = {
                name,
                schemaFields: mongooseModel?.split('|')[1].split(',')
            };

            model.schemaFields && model.schemaFields.forEach((field, idx) => {
                const pair = field.split(':');
                if (!pair || !pair[0] || !pair[1]) {
                    throw new Error('Schema invalid! \nexample: "admin|name:String,email:String,password:String"');
                } else {
                    this.checkSchemaType(pair[1], idx);
                }
            });

            return model;
        }
    }

    writing() {
        console.log(this.columns)
        this.model.name = this.model.name.endsWith('s') ?
            this.model.name?.substr(0, this.model.name.length - 1)?.toLowerCase() : this.model.name?.toLowerCase();
        let { name } = this.model;
        this.model.kebabToPascal = kebabToPascal;
        this.model.capitalize = capitalize;
        this.model.kebabToCamel = kebabToCamel;

        this.fs.copyTpl(
            this.templatePath('rest/dto/create.dto.ts'),
            this.destinationPath(`src/modules/${name}/rest/dto/create-${name}.dto.ts`),
            this.model
        )

        this.fs.copyTpl(
            this.templatePath('entity/index.ts'),
            this.destinationPath(`src/entity/${name}/${name}.ts`),
            this.model
        )

        this.fs.copyTpl(
            this.templatePath('rest/index.ts'),
            this.destinationPath(`src/modules/${name}/rest/index.ts`),
            this.model
        )

        this.fs.copyTpl(
            this.templatePath('module.ts'),
            this.destinationPath(`src/modules/${name}/${name}.module.ts`),
            this.model
        )

        this.fs.copyTpl(
            this.templatePath('services/index.ts'),
            this.destinationPath(`src/modules/${name}/services/index.ts`),
            this.model
        )

        this.fs.copyTpl(
            this.templatePath('repositories/index.ts'),
            this.destinationPath(`src/modules/${name}/repositories/index.ts`),
            this.model
        )

        this.fs.copyTpl(
            this.templatePath('database/model.ts'),
            this.destinationPath(`src/database/${name}/${name}.model.ts`),
            this.model
        );

        this.fs.copyTpl(
            this.templatePath('database/index.ts'),
            this.destinationPath(`src/database/${name}/index.ts`),
            this.model
        );
    }

    checkSchemaType(type, idx) {
        if (!dataTypes.includes(capitalize(type)) && idx) {
            throw new Error(`${capitalize(type)} data type is not allowed`);
        }
    }
};
