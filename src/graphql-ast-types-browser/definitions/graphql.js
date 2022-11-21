'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});

var _index = require('./index');

exports.default = function () {
  return [
    [
      'Name',
      {
        builder: ['value'],
        fields: {
          value: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'Document',
      {
        builder: ['definitions'],
        fields: {
          definitions: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Definition')
            ),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'OperationDefinition',
      {
        builder: [
          'operation',
          'selectionSet',
          'name',
          'variableDefinitions',
          'directives',
        ],
        fields: {
          operation: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
          selectionSet: {
            optional: false,
            validate: (0, _index.assertNodeType)('SelectionSet'),
          },
          name: {
            optional: true,
            validate: (0, _index.assertNodeType)('Name'),
          },
          variableDefinitions: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('VariableDefinition')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'Definition'],
      },
    ],
    [
      'VariableDefinition',
      {
        builder: ['variable', 'type', 'defaultValue'],
        fields: {
          variable: {
            optional: false,
            validate: (0, _index.assertNodeType)('Variable'),
          },
          type: {
            optional: false,
            validate: (0, _index.assertNodeType)('Type'),
          },
          defaultValue: {
            optional: true,
            validate: (0, _index.assertNodeType)('Value'),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'Variable',
      {
        builder: ['name'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'SelectionSet',
      {
        builder: ['selections'],
        fields: {
          selections: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Selection')
            ),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'Field',
      {
        builder: ['name', 'alias', 'arguments', 'directives', 'selectionSet'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          alias: {
            optional: true,
            validate: (0, _index.assertNodeType)('Name'),
          },
          arguments: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Argument')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
          selectionSet: {
            optional: true,
            validate: (0, _index.assertNodeType)('SelectionSet'),
          },
        },
        aliases: ['AST', 'Selection'],
      },
    ],
    [
      'Argument',
      {
        builder: ['name', 'value'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          value: {
            optional: false,
            validate: (0, _index.assertNodeType)('Value'),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'FragmentSpread',
      {
        builder: ['name', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'Selection'],
      },
    ],
    [
      'InlineFragment',
      {
        builder: ['selectionSet', 'typeCondition', 'directives'],
        fields: {
          selectionSet: {
            optional: false,
            validate: (0, _index.assertNodeType)('SelectionSet'),
          },
          typeCondition: {
            optional: true,
            validate: (0, _index.assertNodeType)('NamedType'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'Selection'],
      },
    ],
    [
      'FragmentDefinition',
      {
        builder: ['name', 'typeCondition', 'selectionSet', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          typeCondition: {
            optional: false,
            validate: (0, _index.assertNodeType)('NamedType'),
          },
          selectionSet: {
            optional: false,
            validate: (0, _index.assertNodeType)('SelectionSet'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'Definition'],
      },
    ],
    [
      'IntValue',
      {
        builder: ['value'],
        fields: {
          value: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'FloatValue',
      {
        builder: ['value'],
        fields: {
          value: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'StringValue',
      {
        builder: ['value'],
        fields: {
          value: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'BooleanValue',
      {
        builder: ['value'],
        fields: {
          value: {
            optional: false,
            validate: (0, _index.assertValueType)('boolean'),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'NullValue',
      {
        builder: [],
        fields: {},
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'EnumValue',
      {
        builder: ['value'],
        fields: {
          value: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'ListValue',
      {
        builder: ['values'],
        fields: {
          values: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Value')
            ),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'ObjectValue',
      {
        builder: ['fields'],
        fields: {
          fields: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('ObjectField')
            ),
          },
        },
        aliases: ['AST', 'Value'],
      },
    ],
    [
      'ObjectField',
      {
        builder: ['name', 'value'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          value: {
            optional: false,
            validate: (0, _index.assertNodeType)('Value'),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'Directive',
      {
        builder: ['name', 'arguments'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          arguments: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Argument')
            ),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'NamedType',
      {
        builder: ['name'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
        },
        aliases: ['AST', 'Type'],
      },
    ],
    [
      'ListType',
      {
        builder: ['type'],
        fields: {
          type: {
            optional: false,
            validate: (0, _index.assertNodeType)('Type'),
          },
        },
        aliases: ['AST', 'Type'],
      },
    ],
    [
      'NonNullType',
      {
        builder: ['type'],
        fields: {
          type: {
            optional: false,
            validate: (0, _index.assertOneOf)('NamedType', 'ListType'),
          },
        },
        aliases: ['AST', 'Type'],
      },
    ],
    [
      'SchemaDefinition',
      {
        builder: ['directives', 'operationTypes'],
        fields: {
          directives: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
          operationTypes: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('OperationTypeDefinition')
            ),
          },
        },
        aliases: ['AST', 'TypeSystemDefinition'],
      },
    ],
    [
      'OperationTypeDefinition',
      {
        builder: ['operation', 'type'],
        fields: {
          operation: {
            optional: false,
            validate: (0, _index.assertValueType)('string'),
          },
          type: {
            optional: false,
            validate: (0, _index.assertNodeType)('NamedType'),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'ScalarTypeDefinition',
      {
        builder: ['name', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'TypeDefinition'],
      },
    ],
    [
      'ObjectTypeDefinition',
      {
        builder: ['name', 'fields', 'interfaces', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          fields: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('FieldDefinition')
            ),
          },
          interfaces: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('NamedType')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'TypeDefinition'],
      },
    ],
    [
      'FieldDefinition',
      {
        builder: ['name', 'arguments', 'type', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          arguments: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('InputValueDefinition')
            ),
          },
          type: {
            optional: false,
            validate: (0, _index.assertNodeType)('Type'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'InputValueDefinition',
      {
        builder: ['name', 'type', 'defaultValue', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          type: {
            optional: false,
            validate: (0, _index.assertNodeType)('Type'),
          },
          defaultValue: {
            optional: true,
            validate: (0, _index.assertNodeType)('Value'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'InterfaceTypeDefinition',
      {
        builder: ['name', 'fields', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          fields: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('FieldDefinition')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'TypeDefinition'],
      },
    ],
    [
      'UnionTypeDefinition',
      {
        builder: ['name', 'types', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          types: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('NamedType')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'TypeDefinition'],
      },
    ],
    [
      'EnumTypeDefinition',
      {
        builder: ['name', 'values', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          values: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('EnumValueDefinition')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'TypeDefinition'],
      },
    ],
    [
      'EnumValueDefinition',
      {
        builder: ['name', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST'],
      },
    ],
    [
      'InputObjectTypeDefinition',
      {
        builder: ['name', 'fields', 'directives'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          fields: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('InputValueDefinition')
            ),
          },
          directives: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Directive')
            ),
          },
        },
        aliases: ['AST', 'TypeDefinition'],
      },
    ],
    [
      'TypeExtensionDefinition',
      {
        builder: ['definition'],
        fields: {
          definition: {
            optional: false,
            validate: (0, _index.assertNodeType)('ObjectTypeDefinition'),
          },
        },
        aliases: ['AST', 'TypeSystemDefinition'],
      },
    ],
    [
      'DirectiveDefinition',
      {
        builder: ['name', 'locations', 'arguments'],
        fields: {
          name: {
            optional: false,
            validate: (0, _index.assertNodeType)('Name'),
          },
          locations: {
            optional: false,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('Name')
            ),
          },
          arguments: {
            optional: true,
            validate: (0, _index.assertArrayOf)(
              (0, _index.assertNodeType)('InputValueDefinition')
            ),
          },
        },
        aliases: ['AST', 'TypeSystemDefinition'],
      },
    ],
  ];
}; /* These are auto-generated definitions: Please do not edit this file directly */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZWZpbml0aW9ucy9ncmFwaHFsLmpzIl0sIm5hbWVzIjpbImJ1aWxkZXIiLCJmaWVsZHMiLCJ2YWx1ZSIsIm9wdGlvbmFsIiwidmFsaWRhdGUiLCJhbGlhc2VzIiwiZGVmaW5pdGlvbnMiLCJvcGVyYXRpb24iLCJzZWxlY3Rpb25TZXQiLCJuYW1lIiwidmFyaWFibGVEZWZpbml0aW9ucyIsImRpcmVjdGl2ZXMiLCJ2YXJpYWJsZSIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJzZWxlY3Rpb25zIiwiYWxpYXMiLCJhcmd1bWVudHMiLCJ0eXBlQ29uZGl0aW9uIiwidmFsdWVzIiwib3BlcmF0aW9uVHlwZXMiLCJpbnRlcmZhY2VzIiwidHlwZXMiLCJkZWZpbml0aW9uIiwibG9jYXRpb25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFFQTs7a0JBUWU7QUFBQSxTQUFNLENBQUMsQ0FBQyxNQUFELEVBQVM7QUFDN0JBLGFBQVMsQ0FBQyxPQUFELENBRG9CO0FBRTdCQyxZQUFRO0FBQ05DLGFBQU87QUFDTEMsa0JBQVUsS0FETDtBQUVMQyxrQkFBVSw0QkFBZ0IsUUFBaEI7QUFGTDtBQURELEtBRnFCO0FBUTdCQyxhQUFTLENBQUMsS0FBRDtBQVJvQixHQUFULENBQUQsRUFTakIsQ0FBQyxVQUFELEVBQWE7QUFDZkwsYUFBUyxDQUFDLGFBQUQsQ0FETTtBQUVmQyxZQUFRO0FBQ05LLG1CQUFhO0FBQ1hILGtCQUFVLEtBREM7QUFFWEMsa0JBQVUsMEJBQWMsMkJBQWUsWUFBZixDQUFkO0FBRkM7QUFEUCxLQUZPO0FBUWZDLGFBQVMsQ0FBQyxLQUFEO0FBUk0sR0FBYixDQVRpQixFQWtCakIsQ0FBQyxxQkFBRCxFQUF3QjtBQUMxQkwsYUFBUyxDQUFDLFdBQUQsRUFBYyxjQUFkLEVBQThCLE1BQTlCLEVBQXNDLHFCQUF0QyxFQUE2RCxZQUE3RCxDQURpQjtBQUUxQkMsWUFBUTtBQUNOTSxpQkFBVztBQUNUSixrQkFBVSxLQUREO0FBRVRDLGtCQUFVLDRCQUFnQixRQUFoQjtBQUZELE9BREw7QUFLTkksb0JBQWM7QUFDWkwsa0JBQVUsS0FERTtBQUVaQyxrQkFBVSwyQkFBZSxjQUFmO0FBRkUsT0FMUjtBQVNOSyxZQUFNO0FBQ0pOLGtCQUFVLElBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BVEE7QUFhTk0sMkJBQXFCO0FBQ25CUCxrQkFBVSxJQURTO0FBRW5CQyxrQkFBVSwwQkFBYywyQkFBZSxvQkFBZixDQUFkO0FBRlMsT0FiZjtBQWlCTk8sa0JBQVk7QUFDVlIsa0JBQVUsSUFEQTtBQUVWQyxrQkFBVSwwQkFBYywyQkFBZSxXQUFmLENBQWQ7QUFGQTtBQWpCTixLQUZrQjtBQXdCMUJDLGFBQVMsQ0FBQyxLQUFELEVBQVEsWUFBUjtBQXhCaUIsR0FBeEIsQ0FsQmlCLEVBMkNqQixDQUFDLG9CQUFELEVBQXVCO0FBQ3pCTCxhQUFTLENBQUMsVUFBRCxFQUFhLE1BQWIsRUFBcUIsY0FBckIsQ0FEZ0I7QUFFekJDLFlBQVE7QUFDTlcsZ0JBQVU7QUFDUlQsa0JBQVUsS0FERjtBQUVSQyxrQkFBVSwyQkFBZSxVQUFmO0FBRkYsT0FESjtBQUtOUyxZQUFNO0FBQ0pWLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BTEE7QUFTTlUsb0JBQWM7QUFDWlgsa0JBQVUsSUFERTtBQUVaQyxrQkFBVSwyQkFBZSxPQUFmO0FBRkU7QUFUUixLQUZpQjtBQWdCekJDLGFBQVMsQ0FBQyxLQUFEO0FBaEJnQixHQUF2QixDQTNDaUIsRUE0RGpCLENBQUMsVUFBRCxFQUFhO0FBQ2ZMLGFBQVMsQ0FBQyxNQUFELENBRE07QUFFZkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOO0FBREEsS0FGTztBQVFmQyxhQUFTLENBQUMsS0FBRCxFQUFRLE9BQVI7QUFSTSxHQUFiLENBNURpQixFQXFFakIsQ0FBQyxjQUFELEVBQWlCO0FBQ25CTCxhQUFTLENBQUMsWUFBRCxDQURVO0FBRW5CQyxZQUFRO0FBQ05jLGtCQUFZO0FBQ1ZaLGtCQUFVLEtBREE7QUFFVkMsa0JBQVUsMEJBQWMsMkJBQWUsV0FBZixDQUFkO0FBRkE7QUFETixLQUZXO0FBUW5CQyxhQUFTLENBQUMsS0FBRDtBQVJVLEdBQWpCLENBckVpQixFQThFakIsQ0FBQyxPQUFELEVBQVU7QUFDWkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxPQUFULEVBQWtCLFdBQWxCLEVBQStCLFlBQS9CLEVBQTZDLGNBQTdDLENBREc7QUFFWkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTlksYUFBTztBQUNMYixrQkFBVSxJQURMO0FBRUxDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTCxPQUxEO0FBU05hLGlCQUFXO0FBQ1RkLGtCQUFVLElBREQ7QUFFVEMsa0JBQVUsMEJBQWMsMkJBQWUsVUFBZixDQUFkO0FBRkQsT0FUTDtBQWFOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBLE9BYk47QUFpQk5JLG9CQUFjO0FBQ1pMLGtCQUFVLElBREU7QUFFWkMsa0JBQVUsMkJBQWUsY0FBZjtBQUZFO0FBakJSLEtBRkk7QUF3QlpDLGFBQVMsQ0FBQyxLQUFELEVBQVEsV0FBUjtBQXhCRyxHQUFWLENBOUVpQixFQXVHakIsQ0FBQyxVQUFELEVBQWE7QUFDZkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxPQUFULENBRE07QUFFZkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTkYsYUFBTztBQUNMQyxrQkFBVSxLQURMO0FBRUxDLGtCQUFVLDJCQUFlLE9BQWY7QUFGTDtBQUxELEtBRk87QUFZZkMsYUFBUyxDQUFDLEtBQUQ7QUFaTSxHQUFiLENBdkdpQixFQW9IakIsQ0FBQyxnQkFBRCxFQUFtQjtBQUNyQkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxZQUFULENBRFk7QUFFckJDLFlBQVE7QUFDTlEsWUFBTTtBQUNKTixrQkFBVSxLQUROO0FBRUpDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTixPQURBO0FBS05PLGtCQUFZO0FBQ1ZSLGtCQUFVLElBREE7QUFFVkMsa0JBQVUsMEJBQWMsMkJBQWUsV0FBZixDQUFkO0FBRkE7QUFMTixLQUZhO0FBWXJCQyxhQUFTLENBQUMsS0FBRCxFQUFRLFdBQVI7QUFaWSxHQUFuQixDQXBIaUIsRUFpSWpCLENBQUMsZ0JBQUQsRUFBbUI7QUFDckJMLGFBQVMsQ0FBQyxjQUFELEVBQWlCLGVBQWpCLEVBQWtDLFlBQWxDLENBRFk7QUFFckJDLFlBQVE7QUFDTk8sb0JBQWM7QUFDWkwsa0JBQVUsS0FERTtBQUVaQyxrQkFBVSwyQkFBZSxjQUFmO0FBRkUsT0FEUjtBQUtOYyxxQkFBZTtBQUNiZixrQkFBVSxJQURHO0FBRWJDLGtCQUFVLDJCQUFlLFdBQWY7QUFGRyxPQUxUO0FBU05PLGtCQUFZO0FBQ1ZSLGtCQUFVLElBREE7QUFFVkMsa0JBQVUsMEJBQWMsMkJBQWUsV0FBZixDQUFkO0FBRkE7QUFUTixLQUZhO0FBZ0JyQkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxXQUFSO0FBaEJZLEdBQW5CLENBaklpQixFQWtKakIsQ0FBQyxvQkFBRCxFQUF1QjtBQUN6QkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxlQUFULEVBQTBCLGNBQTFCLEVBQTBDLFlBQTFDLENBRGdCO0FBRXpCQyxZQUFRO0FBQ05RLFlBQU07QUFDSk4sa0JBQVUsS0FETjtBQUVKQyxrQkFBVSwyQkFBZSxNQUFmO0FBRk4sT0FEQTtBQUtOYyxxQkFBZTtBQUNiZixrQkFBVSxLQURHO0FBRWJDLGtCQUFVLDJCQUFlLFdBQWY7QUFGRyxPQUxUO0FBU05JLG9CQUFjO0FBQ1pMLGtCQUFVLEtBREU7QUFFWkMsa0JBQVUsMkJBQWUsY0FBZjtBQUZFLE9BVFI7QUFhTk8sa0JBQVk7QUFDVlIsa0JBQVUsSUFEQTtBQUVWQyxrQkFBVSwwQkFBYywyQkFBZSxXQUFmLENBQWQ7QUFGQTtBQWJOLEtBRmlCO0FBb0J6QkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxZQUFSO0FBcEJnQixHQUF2QixDQWxKaUIsRUF1S2pCLENBQUMsVUFBRCxFQUFhO0FBQ2ZMLGFBQVMsQ0FBQyxPQUFELENBRE07QUFFZkMsWUFBUTtBQUNOQyxhQUFPO0FBQ0xDLGtCQUFVLEtBREw7QUFFTEMsa0JBQVUsNEJBQWdCLFFBQWhCO0FBRkw7QUFERCxLQUZPO0FBUWZDLGFBQVMsQ0FBQyxLQUFELEVBQVEsT0FBUjtBQVJNLEdBQWIsQ0F2S2lCLEVBZ0xqQixDQUFDLFlBQUQsRUFBZTtBQUNqQkwsYUFBUyxDQUFDLE9BQUQsQ0FEUTtBQUVqQkMsWUFBUTtBQUNOQyxhQUFPO0FBQ0xDLGtCQUFVLEtBREw7QUFFTEMsa0JBQVUsNEJBQWdCLFFBQWhCO0FBRkw7QUFERCxLQUZTO0FBUWpCQyxhQUFTLENBQUMsS0FBRCxFQUFRLE9BQVI7QUFSUSxHQUFmLENBaExpQixFQXlMakIsQ0FBQyxhQUFELEVBQWdCO0FBQ2xCTCxhQUFTLENBQUMsT0FBRCxDQURTO0FBRWxCQyxZQUFRO0FBQ05DLGFBQU87QUFDTEMsa0JBQVUsS0FETDtBQUVMQyxrQkFBVSw0QkFBZ0IsUUFBaEI7QUFGTDtBQURELEtBRlU7QUFRbEJDLGFBQVMsQ0FBQyxLQUFELEVBQVEsT0FBUjtBQVJTLEdBQWhCLENBekxpQixFQWtNakIsQ0FBQyxjQUFELEVBQWlCO0FBQ25CTCxhQUFTLENBQUMsT0FBRCxDQURVO0FBRW5CQyxZQUFRO0FBQ05DLGFBQU87QUFDTEMsa0JBQVUsS0FETDtBQUVMQyxrQkFBVSw0QkFBZ0IsU0FBaEI7QUFGTDtBQURELEtBRlc7QUFRbkJDLGFBQVMsQ0FBQyxLQUFELEVBQVEsT0FBUjtBQVJVLEdBQWpCLENBbE1pQixFQTJNakIsQ0FBQyxXQUFELEVBQWM7QUFDaEJMLGFBQVMsRUFETztBQUVoQkMsWUFBUSxFQUZRO0FBR2hCSSxhQUFTLENBQUMsS0FBRCxFQUFRLE9BQVI7QUFITyxHQUFkLENBM01pQixFQStNakIsQ0FBQyxXQUFELEVBQWM7QUFDaEJMLGFBQVMsQ0FBQyxPQUFELENBRE87QUFFaEJDLFlBQVE7QUFDTkMsYUFBTztBQUNMQyxrQkFBVSxLQURMO0FBRUxDLGtCQUFVLDRCQUFnQixRQUFoQjtBQUZMO0FBREQsS0FGUTtBQVFoQkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxPQUFSO0FBUk8sR0FBZCxDQS9NaUIsRUF3TmpCLENBQUMsV0FBRCxFQUFjO0FBQ2hCTCxhQUFTLENBQUMsUUFBRCxDQURPO0FBRWhCQyxZQUFRO0FBQ05rQixjQUFRO0FBQ05oQixrQkFBVSxLQURKO0FBRU5DLGtCQUFVLDBCQUFjLDJCQUFlLE9BQWYsQ0FBZDtBQUZKO0FBREYsS0FGUTtBQVFoQkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxPQUFSO0FBUk8sR0FBZCxDQXhOaUIsRUFpT2pCLENBQUMsYUFBRCxFQUFnQjtBQUNsQkwsYUFBUyxDQUFDLFFBQUQsQ0FEUztBQUVsQkMsWUFBUTtBQUNOQSxjQUFRO0FBQ05FLGtCQUFVLEtBREo7QUFFTkMsa0JBQVUsMEJBQWMsMkJBQWUsYUFBZixDQUFkO0FBRko7QUFERixLQUZVO0FBUWxCQyxhQUFTLENBQUMsS0FBRCxFQUFRLE9BQVI7QUFSUyxHQUFoQixDQWpPaUIsRUEwT2pCLENBQUMsYUFBRCxFQUFnQjtBQUNsQkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxPQUFULENBRFM7QUFFbEJDLFlBQVE7QUFDTlEsWUFBTTtBQUNKTixrQkFBVSxLQUROO0FBRUpDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTixPQURBO0FBS05GLGFBQU87QUFDTEMsa0JBQVUsS0FETDtBQUVMQyxrQkFBVSwyQkFBZSxPQUFmO0FBRkw7QUFMRCxLQUZVO0FBWWxCQyxhQUFTLENBQUMsS0FBRDtBQVpTLEdBQWhCLENBMU9pQixFQXVQakIsQ0FBQyxXQUFELEVBQWM7QUFDaEJMLGFBQVMsQ0FBQyxNQUFELEVBQVMsV0FBVCxDQURPO0FBRWhCQyxZQUFRO0FBQ05RLFlBQU07QUFDSk4sa0JBQVUsS0FETjtBQUVKQyxrQkFBVSwyQkFBZSxNQUFmO0FBRk4sT0FEQTtBQUtOYSxpQkFBVztBQUNUZCxrQkFBVSxJQUREO0FBRVRDLGtCQUFVLDBCQUFjLDJCQUFlLFVBQWYsQ0FBZDtBQUZEO0FBTEwsS0FGUTtBQVloQkMsYUFBUyxDQUFDLEtBQUQ7QUFaTyxHQUFkLENBdlBpQixFQW9RakIsQ0FBQyxXQUFELEVBQWM7QUFDaEJMLGFBQVMsQ0FBQyxNQUFELENBRE87QUFFaEJDLFlBQVE7QUFDTlEsWUFBTTtBQUNKTixrQkFBVSxLQUROO0FBRUpDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTjtBQURBLEtBRlE7QUFRaEJDLGFBQVMsQ0FBQyxLQUFELEVBQVEsTUFBUjtBQVJPLEdBQWQsQ0FwUWlCLEVBNlFqQixDQUFDLFVBQUQsRUFBYTtBQUNmTCxhQUFTLENBQUMsTUFBRCxDQURNO0FBRWZDLFlBQVE7QUFDTlksWUFBTTtBQUNKVixrQkFBVSxLQUROO0FBRUpDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTjtBQURBLEtBRk87QUFRZkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxNQUFSO0FBUk0sR0FBYixDQTdRaUIsRUFzUmpCLENBQUMsYUFBRCxFQUFnQjtBQUNsQkwsYUFBUyxDQUFDLE1BQUQsQ0FEUztBQUVsQkMsWUFBUTtBQUNOWSxZQUFNO0FBQ0pWLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsd0JBQVksV0FBWixFQUF5QixVQUF6QjtBQUZOO0FBREEsS0FGVTtBQVFsQkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxNQUFSO0FBUlMsR0FBaEIsQ0F0UmlCLEVBK1JqQixDQUFDLGtCQUFELEVBQXFCO0FBQ3ZCTCxhQUFTLENBQUMsWUFBRCxFQUFlLGdCQUFmLENBRGM7QUFFdkJDLFlBQVE7QUFDTlUsa0JBQVk7QUFDVlIsa0JBQVUsS0FEQTtBQUVWQyxrQkFBVSwwQkFBYywyQkFBZSxXQUFmLENBQWQ7QUFGQSxPQUROO0FBS05nQixzQkFBZ0I7QUFDZGpCLGtCQUFVLEtBREk7QUFFZEMsa0JBQVUsMEJBQWMsMkJBQWUseUJBQWYsQ0FBZDtBQUZJO0FBTFYsS0FGZTtBQVl2QkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxzQkFBUjtBQVpjLEdBQXJCLENBL1JpQixFQTRTakIsQ0FBQyx5QkFBRCxFQUE0QjtBQUM5QkwsYUFBUyxDQUFDLFdBQUQsRUFBYyxNQUFkLENBRHFCO0FBRTlCQyxZQUFRO0FBQ05NLGlCQUFXO0FBQ1RKLGtCQUFVLEtBREQ7QUFFVEMsa0JBQVUsNEJBQWdCLFFBQWhCO0FBRkQsT0FETDtBQUtOUyxZQUFNO0FBQ0pWLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsV0FBZjtBQUZOO0FBTEEsS0FGc0I7QUFZOUJDLGFBQVMsQ0FBQyxLQUFEO0FBWnFCLEdBQTVCLENBNVNpQixFQXlUakIsQ0FBQyxzQkFBRCxFQUF5QjtBQUMzQkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxZQUFULENBRGtCO0FBRTNCQyxZQUFRO0FBQ05RLFlBQU07QUFDSk4sa0JBQVUsS0FETjtBQUVKQyxrQkFBVSwyQkFBZSxNQUFmO0FBRk4sT0FEQTtBQUtOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBTE4sS0FGbUI7QUFZM0JDLGFBQVMsQ0FBQyxLQUFELEVBQVEsZ0JBQVI7QUFaa0IsR0FBekIsQ0F6VGlCLEVBc1VqQixDQUFDLHNCQUFELEVBQXlCO0FBQzNCTCxhQUFTLENBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsWUFBbkIsRUFBaUMsWUFBakMsQ0FEa0I7QUFFM0JDLFlBQVE7QUFDTlEsWUFBTTtBQUNKTixrQkFBVSxLQUROO0FBRUpDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTixPQURBO0FBS05ILGNBQVE7QUFDTkUsa0JBQVUsS0FESjtBQUVOQyxrQkFBVSwwQkFBYywyQkFBZSxpQkFBZixDQUFkO0FBRkosT0FMRjtBQVNOaUIsa0JBQVk7QUFDVmxCLGtCQUFVLElBREE7QUFFVkMsa0JBQVUsMEJBQWMsMkJBQWUsV0FBZixDQUFkO0FBRkEsT0FUTjtBQWFOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBYk4sS0FGbUI7QUFvQjNCQyxhQUFTLENBQUMsS0FBRCxFQUFRLGdCQUFSO0FBcEJrQixHQUF6QixDQXRVaUIsRUEyVmpCLENBQUMsaUJBQUQsRUFBb0I7QUFDdEJMLGFBQVMsQ0FBQyxNQUFELEVBQVMsV0FBVCxFQUFzQixNQUF0QixFQUE4QixZQUE5QixDQURhO0FBRXRCQyxZQUFRO0FBQ05RLFlBQU07QUFDSk4sa0JBQVUsS0FETjtBQUVKQyxrQkFBVSwyQkFBZSxNQUFmO0FBRk4sT0FEQTtBQUtOYSxpQkFBVztBQUNUZCxrQkFBVSxLQUREO0FBRVRDLGtCQUFVLDBCQUFjLDJCQUFlLHNCQUFmLENBQWQ7QUFGRCxPQUxMO0FBU05TLFlBQU07QUFDSlYsa0JBQVUsS0FETjtBQUVKQyxrQkFBVSwyQkFBZSxNQUFmO0FBRk4sT0FUQTtBQWFOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBYk4sS0FGYztBQW9CdEJDLGFBQVMsQ0FBQyxLQUFEO0FBcEJhLEdBQXBCLENBM1ZpQixFQWdYakIsQ0FBQyxzQkFBRCxFQUF5QjtBQUMzQkwsYUFBUyxDQUFDLE1BQUQsRUFBUyxNQUFULEVBQWlCLGNBQWpCLEVBQWlDLFlBQWpDLENBRGtCO0FBRTNCQyxZQUFRO0FBQ05RLFlBQU07QUFDSk4sa0JBQVUsS0FETjtBQUVKQyxrQkFBVSwyQkFBZSxNQUFmO0FBRk4sT0FEQTtBQUtOUyxZQUFNO0FBQ0pWLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BTEE7QUFTTlUsb0JBQWM7QUFDWlgsa0JBQVUsSUFERTtBQUVaQyxrQkFBVSwyQkFBZSxPQUFmO0FBRkUsT0FUUjtBQWFOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBYk4sS0FGbUI7QUFvQjNCQyxhQUFTLENBQUMsS0FBRDtBQXBCa0IsR0FBekIsQ0FoWGlCLEVBcVlqQixDQUFDLHlCQUFELEVBQTRCO0FBQzlCTCxhQUFTLENBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsWUFBbkIsQ0FEcUI7QUFFOUJDLFlBQVE7QUFDTlEsWUFBTTtBQUNKTixrQkFBVSxLQUROO0FBRUpDLGtCQUFVLDJCQUFlLE1BQWY7QUFGTixPQURBO0FBS05ILGNBQVE7QUFDTkUsa0JBQVUsS0FESjtBQUVOQyxrQkFBVSwwQkFBYywyQkFBZSxpQkFBZixDQUFkO0FBRkosT0FMRjtBQVNOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBVE4sS0FGc0I7QUFnQjlCQyxhQUFTLENBQUMsS0FBRCxFQUFRLGdCQUFSO0FBaEJxQixHQUE1QixDQXJZaUIsRUFzWmpCLENBQUMscUJBQUQsRUFBd0I7QUFDMUJMLGFBQVMsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFrQixZQUFsQixDQURpQjtBQUUxQkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTmtCLGFBQU87QUFDTG5CLGtCQUFVLEtBREw7QUFFTEMsa0JBQVUsMEJBQWMsMkJBQWUsV0FBZixDQUFkO0FBRkwsT0FMRDtBQVNOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBVE4sS0FGa0I7QUFnQjFCQyxhQUFTLENBQUMsS0FBRCxFQUFRLGdCQUFSO0FBaEJpQixHQUF4QixDQXRaaUIsRUF1YWpCLENBQUMsb0JBQUQsRUFBdUI7QUFDekJMLGFBQVMsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixZQUFuQixDQURnQjtBQUV6QkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTmUsY0FBUTtBQUNOaEIsa0JBQVUsS0FESjtBQUVOQyxrQkFBVSwwQkFBYywyQkFBZSxxQkFBZixDQUFkO0FBRkosT0FMRjtBQVNOTyxrQkFBWTtBQUNWUixrQkFBVSxJQURBO0FBRVZDLGtCQUFVLDBCQUFjLDJCQUFlLFdBQWYsQ0FBZDtBQUZBO0FBVE4sS0FGaUI7QUFnQnpCQyxhQUFTLENBQUMsS0FBRCxFQUFRLGdCQUFSO0FBaEJnQixHQUF2QixDQXZhaUIsRUF3YmpCLENBQUMscUJBQUQsRUFBd0I7QUFDMUJMLGFBQVMsQ0FBQyxNQUFELEVBQVMsWUFBVCxDQURpQjtBQUUxQkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTk8sa0JBQVk7QUFDVlIsa0JBQVUsSUFEQTtBQUVWQyxrQkFBVSwwQkFBYywyQkFBZSxXQUFmLENBQWQ7QUFGQTtBQUxOLEtBRmtCO0FBWTFCQyxhQUFTLENBQUMsS0FBRDtBQVppQixHQUF4QixDQXhiaUIsRUFxY2pCLENBQUMsMkJBQUQsRUFBOEI7QUFDaENMLGFBQVMsQ0FBQyxNQUFELEVBQVMsUUFBVCxFQUFtQixZQUFuQixDQUR1QjtBQUVoQ0MsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTkgsY0FBUTtBQUNORSxrQkFBVSxLQURKO0FBRU5DLGtCQUFVLDBCQUFjLDJCQUFlLHNCQUFmLENBQWQ7QUFGSixPQUxGO0FBU05PLGtCQUFZO0FBQ1ZSLGtCQUFVLElBREE7QUFFVkMsa0JBQVUsMEJBQWMsMkJBQWUsV0FBZixDQUFkO0FBRkE7QUFUTixLQUZ3QjtBQWdCaENDLGFBQVMsQ0FBQyxLQUFELEVBQVEsZ0JBQVI7QUFoQnVCLEdBQTlCLENBcmNpQixFQXNkakIsQ0FBQyx5QkFBRCxFQUE0QjtBQUM5QkwsYUFBUyxDQUFDLFlBQUQsQ0FEcUI7QUFFOUJDLFlBQVE7QUFDTnNCLGtCQUFZO0FBQ1ZwQixrQkFBVSxLQURBO0FBRVZDLGtCQUFVLDJCQUFlLHNCQUFmO0FBRkE7QUFETixLQUZzQjtBQVE5QkMsYUFBUyxDQUFDLEtBQUQsRUFBUSxzQkFBUjtBQVJxQixHQUE1QixDQXRkaUIsRUErZGpCLENBQUMscUJBQUQsRUFBd0I7QUFDMUJMLGFBQVMsQ0FBQyxNQUFELEVBQVMsV0FBVCxFQUFzQixXQUF0QixDQURpQjtBQUUxQkMsWUFBUTtBQUNOUSxZQUFNO0FBQ0pOLGtCQUFVLEtBRE47QUFFSkMsa0JBQVUsMkJBQWUsTUFBZjtBQUZOLE9BREE7QUFLTm9CLGlCQUFXO0FBQ1RyQixrQkFBVSxLQUREO0FBRVRDLGtCQUFVLDBCQUFjLDJCQUFlLE1BQWYsQ0FBZDtBQUZELE9BTEw7QUFTTmEsaUJBQVc7QUFDVGQsa0JBQVUsSUFERDtBQUVUQyxrQkFBVSwwQkFBYywyQkFBZSxzQkFBZixDQUFkO0FBRkQ7QUFUTCxLQUZrQjtBQWdCMUJDLGFBQVMsQ0FBQyxLQUFELEVBQVEsc0JBQVI7QUFoQmlCLEdBQXhCLENBL2RpQixDQUFOO0FBQUEsQyxFQVZmIiwiZmlsZSI6ImdyYXBocWwuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBUaGVzZSBhcmUgYXV0by1nZW5lcmF0ZWQgZGVmaW5pdGlvbnM6IFBsZWFzZSBkbyBub3QgZWRpdCB0aGlzIGZpbGUgZGlyZWN0bHkgKi9cblxuaW1wb3J0IHtcbiAgYXNzZXJ0Tm9kZVR5cGUsXG4gIGFzc2VydFZhbHVlVHlwZSxcbiAgYXNzZXJ0RWFjaCxcbiAgYXNzZXJ0T25lT2YsXG4gIGFzc2VydEFycmF5T2Zcbn0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IFtbXCJOYW1lXCIsIHtcbiAgYnVpbGRlcjogW1widmFsdWVcIl0sXG4gIGZpZWxkczoge1xuICAgIHZhbHVlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0VmFsdWVUeXBlKFwic3RyaW5nXCIpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIl1cbn1dLCBbXCJEb2N1bWVudFwiLCB7XG4gIGJ1aWxkZXI6IFtcImRlZmluaXRpb25zXCJdLFxuICBmaWVsZHM6IHtcbiAgICBkZWZpbml0aW9uczoge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEZWZpbml0aW9uXCIpKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCJdXG59XSwgW1wiT3BlcmF0aW9uRGVmaW5pdGlvblwiLCB7XG4gIGJ1aWxkZXI6IFtcIm9wZXJhdGlvblwiLCBcInNlbGVjdGlvblNldFwiLCBcIm5hbWVcIiwgXCJ2YXJpYWJsZURlZmluaXRpb25zXCIsIFwiZGlyZWN0aXZlc1wiXSxcbiAgZmllbGRzOiB7XG4gICAgb3BlcmF0aW9uOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0VmFsdWVUeXBlKFwic3RyaW5nXCIpXG4gICAgfSxcbiAgICBzZWxlY3Rpb25TZXQ6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIlNlbGVjdGlvblNldFwiKVxuICAgIH0sXG4gICAgbmFtZToge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfSxcbiAgICB2YXJpYWJsZURlZmluaXRpb25zOiB7XG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiVmFyaWFibGVEZWZpbml0aW9uXCIpKVxuICAgIH0sXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkRpcmVjdGl2ZVwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIkRlZmluaXRpb25cIl1cbn1dLCBbXCJWYXJpYWJsZURlZmluaXRpb25cIiwge1xuICBidWlsZGVyOiBbXCJ2YXJpYWJsZVwiLCBcInR5cGVcIiwgXCJkZWZhdWx0VmFsdWVcIl0sXG4gIGZpZWxkczoge1xuICAgIHZhcmlhYmxlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJWYXJpYWJsZVwiKVxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiVHlwZVwiKVxuICAgIH0sXG4gICAgZGVmYXVsdFZhbHVlOiB7XG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIlZhbHVlXCIpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIl1cbn1dLCBbXCJWYXJpYWJsZVwiLCB7XG4gIGJ1aWxkZXI6IFtcIm5hbWVcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlZhbHVlXCJdXG59XSwgW1wiU2VsZWN0aW9uU2V0XCIsIHtcbiAgYnVpbGRlcjogW1wic2VsZWN0aW9uc1wiXSxcbiAgZmllbGRzOiB7XG4gICAgc2VsZWN0aW9uczoge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJTZWxlY3Rpb25cIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIl1cbn1dLCBbXCJGaWVsZFwiLCB7XG4gIGJ1aWxkZXI6IFtcIm5hbWVcIiwgXCJhbGlhc1wiLCBcImFyZ3VtZW50c1wiLCBcImRpcmVjdGl2ZXNcIiwgXCJzZWxlY3Rpb25TZXRcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIGFsaWFzOiB7XG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIGFyZ3VtZW50czoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkFyZ3VtZW50XCIpKVxuICAgIH0sXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkRpcmVjdGl2ZVwiKSlcbiAgICB9LFxuICAgIHNlbGVjdGlvblNldDoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJTZWxlY3Rpb25TZXRcIilcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlNlbGVjdGlvblwiXVxufV0sIFtcIkFyZ3VtZW50XCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcInZhbHVlXCJdLFxuICBmaWVsZHM6IHtcbiAgICBuYW1lOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfSxcbiAgICB2YWx1ZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiVmFsdWVcIilcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiXVxufV0sIFtcIkZyYWdtZW50U3ByZWFkXCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcImRpcmVjdGl2ZXNcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJTZWxlY3Rpb25cIl1cbn1dLCBbXCJJbmxpbmVGcmFnbWVudFwiLCB7XG4gIGJ1aWxkZXI6IFtcInNlbGVjdGlvblNldFwiLCBcInR5cGVDb25kaXRpb25cIiwgXCJkaXJlY3RpdmVzXCJdLFxuICBmaWVsZHM6IHtcbiAgICBzZWxlY3Rpb25TZXQ6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIlNlbGVjdGlvblNldFwiKVxuICAgIH0sXG4gICAgdHlwZUNvbmRpdGlvbjoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lZFR5cGVcIilcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJTZWxlY3Rpb25cIl1cbn1dLCBbXCJGcmFnbWVudERlZmluaXRpb25cIiwge1xuICBidWlsZGVyOiBbXCJuYW1lXCIsIFwidHlwZUNvbmRpdGlvblwiLCBcInNlbGVjdGlvblNldFwiLCBcImRpcmVjdGl2ZXNcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIHR5cGVDb25kaXRpb246IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVkVHlwZVwiKVxuICAgIH0sXG4gICAgc2VsZWN0aW9uU2V0OiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJTZWxlY3Rpb25TZXRcIilcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJEZWZpbml0aW9uXCJdXG59XSwgW1wiSW50VmFsdWVcIiwge1xuICBidWlsZGVyOiBbXCJ2YWx1ZVwiXSxcbiAgZmllbGRzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRWYWx1ZVR5cGUoXCJzdHJpbmdcIilcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlZhbHVlXCJdXG59XSwgW1wiRmxvYXRWYWx1ZVwiLCB7XG4gIGJ1aWxkZXI6IFtcInZhbHVlXCJdLFxuICBmaWVsZHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydFZhbHVlVHlwZShcInN0cmluZ1wiKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCIsIFwiVmFsdWVcIl1cbn1dLCBbXCJTdHJpbmdWYWx1ZVwiLCB7XG4gIGJ1aWxkZXI6IFtcInZhbHVlXCJdLFxuICBmaWVsZHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydFZhbHVlVHlwZShcInN0cmluZ1wiKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCIsIFwiVmFsdWVcIl1cbn1dLCBbXCJCb29sZWFuVmFsdWVcIiwge1xuICBidWlsZGVyOiBbXCJ2YWx1ZVwiXSxcbiAgZmllbGRzOiB7XG4gICAgdmFsdWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRWYWx1ZVR5cGUoXCJib29sZWFuXCIpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJWYWx1ZVwiXVxufV0sIFtcIk51bGxWYWx1ZVwiLCB7XG4gIGJ1aWxkZXI6IFtdLFxuICBmaWVsZHM6IHt9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJWYWx1ZVwiXVxufV0sIFtcIkVudW1WYWx1ZVwiLCB7XG4gIGJ1aWxkZXI6IFtcInZhbHVlXCJdLFxuICBmaWVsZHM6IHtcbiAgICB2YWx1ZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydFZhbHVlVHlwZShcInN0cmluZ1wiKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCIsIFwiVmFsdWVcIl1cbn1dLCBbXCJMaXN0VmFsdWVcIiwge1xuICBidWlsZGVyOiBbXCJ2YWx1ZXNcIl0sXG4gIGZpZWxkczoge1xuICAgIHZhbHVlczoge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJWYWx1ZVwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlZhbHVlXCJdXG59XSwgW1wiT2JqZWN0VmFsdWVcIiwge1xuICBidWlsZGVyOiBbXCJmaWVsZHNcIl0sXG4gIGZpZWxkczoge1xuICAgIGZpZWxkczoge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJPYmplY3RGaWVsZFwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlZhbHVlXCJdXG59XSwgW1wiT2JqZWN0RmllbGRcIiwge1xuICBidWlsZGVyOiBbXCJuYW1lXCIsIFwidmFsdWVcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIHZhbHVlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJWYWx1ZVwiKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCJdXG59XSwgW1wiRGlyZWN0aXZlXCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcImFyZ3VtZW50c1wiXSxcbiAgZmllbGRzOiB7XG4gICAgbmFtZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiTmFtZVwiKVxuICAgIH0sXG4gICAgYXJndW1lbnRzOiB7XG4gICAgICBvcHRpb25hbDogdHJ1ZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiQXJndW1lbnRcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIl1cbn1dLCBbXCJOYW1lZFR5cGVcIiwge1xuICBidWlsZGVyOiBbXCJuYW1lXCJdLFxuICBmaWVsZHM6IHtcbiAgICBuYW1lOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlXCJdXG59XSwgW1wiTGlzdFR5cGVcIiwge1xuICBidWlsZGVyOiBbXCJ0eXBlXCJdLFxuICBmaWVsZHM6IHtcbiAgICB0eXBlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJUeXBlXCIpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlXCJdXG59XSwgW1wiTm9uTnVsbFR5cGVcIiwge1xuICBidWlsZGVyOiBbXCJ0eXBlXCJdLFxuICBmaWVsZHM6IHtcbiAgICB0eXBlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0T25lT2YoXCJOYW1lZFR5cGVcIiwgXCJMaXN0VHlwZVwiKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCIsIFwiVHlwZVwiXVxufV0sIFtcIlNjaGVtYURlZmluaXRpb25cIiwge1xuICBidWlsZGVyOiBbXCJkaXJlY3RpdmVzXCIsIFwib3BlcmF0aW9uVHlwZXNcIl0sXG4gIGZpZWxkczoge1xuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiRGlyZWN0aXZlXCIpKVxuICAgIH0sXG4gICAgb3BlcmF0aW9uVHlwZXM6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiT3BlcmF0aW9uVHlwZURlZmluaXRpb25cIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlU3lzdGVtRGVmaW5pdGlvblwiXVxufV0sIFtcIk9wZXJhdGlvblR5cGVEZWZpbml0aW9uXCIsIHtcbiAgYnVpbGRlcjogW1wib3BlcmF0aW9uXCIsIFwidHlwZVwiXSxcbiAgZmllbGRzOiB7XG4gICAgb3BlcmF0aW9uOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0VmFsdWVUeXBlKFwic3RyaW5nXCIpXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lZFR5cGVcIilcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiXVxufV0sIFtcIlNjYWxhclR5cGVEZWZpbml0aW9uXCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcImRpcmVjdGl2ZXNcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlRGVmaW5pdGlvblwiXVxufV0sIFtcIk9iamVjdFR5cGVEZWZpbml0aW9uXCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcImZpZWxkc1wiLCBcImludGVyZmFjZXNcIiwgXCJkaXJlY3RpdmVzXCJdLFxuICBmaWVsZHM6IHtcbiAgICBuYW1lOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfSxcbiAgICBmaWVsZHM6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiRmllbGREZWZpbml0aW9uXCIpKVxuICAgIH0sXG4gICAgaW50ZXJmYWNlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIk5hbWVkVHlwZVwiKSlcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlRGVmaW5pdGlvblwiXVxufV0sIFtcIkZpZWxkRGVmaW5pdGlvblwiLCB7XG4gIGJ1aWxkZXI6IFtcIm5hbWVcIiwgXCJhcmd1bWVudHNcIiwgXCJ0eXBlXCIsIFwiZGlyZWN0aXZlc1wiXSxcbiAgZmllbGRzOiB7XG4gICAgbmFtZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiTmFtZVwiKVxuICAgIH0sXG4gICAgYXJndW1lbnRzOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIklucHV0VmFsdWVEZWZpbml0aW9uXCIpKVxuICAgIH0sXG4gICAgdHlwZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiVHlwZVwiKVxuICAgIH0sXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkRpcmVjdGl2ZVwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiXVxufV0sIFtcIklucHV0VmFsdWVEZWZpbml0aW9uXCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcInR5cGVcIiwgXCJkZWZhdWx0VmFsdWVcIiwgXCJkaXJlY3RpdmVzXCJdLFxuICBmaWVsZHM6IHtcbiAgICBuYW1lOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfSxcbiAgICB0eXBlOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJUeXBlXCIpXG4gICAgfSxcbiAgICBkZWZhdWx0VmFsdWU6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiVmFsdWVcIilcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIl1cbn1dLCBbXCJJbnRlcmZhY2VUeXBlRGVmaW5pdGlvblwiLCB7XG4gIGJ1aWxkZXI6IFtcIm5hbWVcIiwgXCJmaWVsZHNcIiwgXCJkaXJlY3RpdmVzXCJdLFxuICBmaWVsZHM6IHtcbiAgICBuYW1lOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfSxcbiAgICBmaWVsZHM6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiRmllbGREZWZpbml0aW9uXCIpKVxuICAgIH0sXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkRpcmVjdGl2ZVwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlR5cGVEZWZpbml0aW9uXCJdXG59XSwgW1wiVW5pb25UeXBlRGVmaW5pdGlvblwiLCB7XG4gIGJ1aWxkZXI6IFtcIm5hbWVcIiwgXCJ0eXBlc1wiLCBcImRpcmVjdGl2ZXNcIl0sXG4gIGZpZWxkczoge1xuICAgIG5hbWU6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnROb2RlVHlwZShcIk5hbWVcIilcbiAgICB9LFxuICAgIHR5cGVzOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIk5hbWVkVHlwZVwiKSlcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlRGVmaW5pdGlvblwiXVxufV0sIFtcIkVudW1UeXBlRGVmaW5pdGlvblwiLCB7XG4gIGJ1aWxkZXI6IFtcIm5hbWVcIiwgXCJ2YWx1ZXNcIiwgXCJkaXJlY3RpdmVzXCJdLFxuICBmaWVsZHM6IHtcbiAgICBuYW1lOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJOYW1lXCIpXG4gICAgfSxcbiAgICB2YWx1ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiBmYWxzZSxcbiAgICAgIHZhbGlkYXRlOiBhc3NlcnRBcnJheU9mKGFzc2VydE5vZGVUeXBlKFwiRW51bVZhbHVlRGVmaW5pdGlvblwiKSlcbiAgICB9LFxuICAgIGRpcmVjdGl2ZXM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJEaXJlY3RpdmVcIikpXG4gICAgfVxuICB9LFxuICBhbGlhc2VzOiBbXCJBU1RcIiwgXCJUeXBlRGVmaW5pdGlvblwiXVxufV0sIFtcIkVudW1WYWx1ZURlZmluaXRpb25cIiwge1xuICBidWlsZGVyOiBbXCJuYW1lXCIsIFwiZGlyZWN0aXZlc1wiXSxcbiAgZmllbGRzOiB7XG4gICAgbmFtZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiTmFtZVwiKVxuICAgIH0sXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkRpcmVjdGl2ZVwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiXVxufV0sIFtcIklucHV0T2JqZWN0VHlwZURlZmluaXRpb25cIiwge1xuICBidWlsZGVyOiBbXCJuYW1lXCIsIFwiZmllbGRzXCIsIFwiZGlyZWN0aXZlc1wiXSxcbiAgZmllbGRzOiB7XG4gICAgbmFtZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiTmFtZVwiKVxuICAgIH0sXG4gICAgZmllbGRzOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIklucHV0VmFsdWVEZWZpbml0aW9uXCIpKVxuICAgIH0sXG4gICAgZGlyZWN0aXZlczoge1xuICAgICAgb3B0aW9uYWw6IHRydWUsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIkRpcmVjdGl2ZVwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlR5cGVEZWZpbml0aW9uXCJdXG59XSwgW1wiVHlwZUV4dGVuc2lvbkRlZmluaXRpb25cIiwge1xuICBidWlsZGVyOiBbXCJkZWZpbml0aW9uXCJdLFxuICBmaWVsZHM6IHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0Tm9kZVR5cGUoXCJPYmplY3RUeXBlRGVmaW5pdGlvblwiKVxuICAgIH1cbiAgfSxcbiAgYWxpYXNlczogW1wiQVNUXCIsIFwiVHlwZVN5c3RlbURlZmluaXRpb25cIl1cbn1dLCBbXCJEaXJlY3RpdmVEZWZpbml0aW9uXCIsIHtcbiAgYnVpbGRlcjogW1wibmFtZVwiLCBcImxvY2F0aW9uc1wiLCBcImFyZ3VtZW50c1wiXSxcbiAgZmllbGRzOiB7XG4gICAgbmFtZToge1xuICAgICAgb3B0aW9uYWw6IGZhbHNlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydE5vZGVUeXBlKFwiTmFtZVwiKVxuICAgIH0sXG4gICAgbG9jYXRpb25zOiB7XG4gICAgICBvcHRpb25hbDogZmFsc2UsXG4gICAgICB2YWxpZGF0ZTogYXNzZXJ0QXJyYXlPZihhc3NlcnROb2RlVHlwZShcIk5hbWVcIikpXG4gICAgfSxcbiAgICBhcmd1bWVudHM6IHtcbiAgICAgIG9wdGlvbmFsOiB0cnVlLFxuICAgICAgdmFsaWRhdGU6IGFzc2VydEFycmF5T2YoYXNzZXJ0Tm9kZVR5cGUoXCJJbnB1dFZhbHVlRGVmaW5pdGlvblwiKSlcbiAgICB9XG4gIH0sXG4gIGFsaWFzZXM6IFtcIkFTVFwiLCBcIlR5cGVTeXN0ZW1EZWZpbml0aW9uXCJdXG59XV07Il19
