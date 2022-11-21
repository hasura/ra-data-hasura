// From the npm library 'graphql-ast-types-browser'
import type {
  NameNode,
  DocumentNode,
  OperationDefinitionNode,
  VariableDefinitionNode,
  VariableNode,
  SelectionSetNode,
  FieldNode,
  ArgumentNode,
  FragmentSpreadNode,
  InlineFragmentNode,
  FragmentDefinitionNode,
  IntValueNode,
  FloatValueNode,
  StringValueNode,
  BooleanValueNode,
  NullValueNode,
  EnumValueNode,
  ListValueNode,
  ObjectValueNode,
  ObjectFieldNode,
  DirectiveNode,
  NamedTypeNode,
  ListTypeNode,
  NonNullTypeNode,
  SchemaDefinitionNode,
  OperationTypeDefinitionNode,
  ScalarTypeDefinitionNode,
  ObjectTypeDefinitionNode,
  FieldDefinitionNode,
  InputValueDefinitionNode,
  InterfaceTypeDefinitionNode,
  UnionTypeDefinitionNode,
  EnumTypeDefinitionNode,
  EnumValueDefinitionNode,
  InputObjectTypeDefinitionNode,
  TypeExtensionDefinitionNode,
  DirectiveDefinitionNode,
  OperationTypeNode,
  ASTNode,
  DefinitionNode,
  ValueNode,
  SelectionNode,
  TypeNode,
  TypeSystemDefinitionNode,
  TypeDefinitionNode,
} from 'graphql/language/ast';
declare function name(value: string): NameNode;
declare function isName(node: any): boolean;
declare function assertName(node: any): boolean;
declare function document(definitions: Array<DefinitionNode>): DocumentNode;
declare function isDocument(node: any): boolean;
declare function assertDocument(node: any): boolean;
declare function operationDefinition(
  operation: OperationTypeNode,
  selectionSet: SelectionSetNode,
  name?: NameNode,
  variableDefinitions?: Array<VariableDefinitionNode>,
  directives?: Array<DirectiveNode>
): OperationDefinitionNode;
declare function isOperationDefinition(node: any): boolean;
declare function assertOperationDefinition(node: any): boolean;
declare function variableDefinition(
  variable: VariableNode,
  type: TypeNode,
  defaultValue?: ValueNode
): VariableDefinitionNode;
declare function isVariableDefinition(node: any): boolean;
declare function assertVariableDefinition(node: any): boolean;
declare function variable(name: NameNode): VariableNode;
declare function isVariable(node: any): boolean;
declare function assertVariable(node: any): boolean;
declare function selectionSet(
  selections: Array<SelectionNode>
): SelectionSetNode;
declare function isSelectionSet(node: any): boolean;
declare function assertSelectionSet(node: any): boolean;
declare function field(
  name: NameNode,
  alias?: NameNode | null,
  arguments?: Array<ArgumentNode> | null,
  directives?: Array<DirectiveNode> | null,
  selectionSet?: SelectionSetNode | null
): FieldNode;
declare function isField(node: any): boolean;
declare function assertField(node: any): boolean;
declare function argument(name: NameNode, value: ValueNode): ArgumentNode;
declare function isArgument(node: any): boolean;
declare function assertArgument(node: any): boolean;
declare function fragmentSpread(
  name: NameNode,
  directives?: Array<DirectiveNode>
): FragmentSpreadNode;
declare function isFragmentSpread(node: any): boolean;
declare function assertFragmentSpread(node: any): boolean;
declare function inlineFragment(
  selectionSet: SelectionSetNode,
  typeCondition?: NamedTypeNode,
  directives?: Array<DirectiveNode>
): InlineFragmentNode;
declare function isInlineFragment(node: any): boolean;
declare function assertInlineFragment(node: any): boolean;
declare function fragmentDefinition(
  name: NameNode,
  typeCondition: NamedTypeNode,
  selectionSet: SelectionSetNode,
  directives?: Array<DirectiveNode>
): FragmentDefinitionNode;
declare function isFragmentDefinition(node: any): boolean;
declare function assertFragmentDefinition(node: any): boolean;
declare function intValue(value: string): IntValueNode;
declare function isIntValue(node: any): boolean;
declare function assertIntValue(node: any): boolean;
declare function floatValue(value: string): FloatValueNode;
declare function isFloatValue(node: any): boolean;
declare function assertFloatValue(node: any): boolean;
declare function stringValue(value: string): StringValueNode;
declare function isStringValue(node: any): boolean;
declare function assertStringValue(node: any): boolean;
declare function booleanValue(value: boolean): BooleanValueNode;
declare function isBooleanValue(node: any): boolean;
declare function assertBooleanValue(node: any): boolean;
declare function nullValue(): NullValueNode;
declare function isNullValue(node: any): boolean;
declare function assertNullValue(node: any): boolean;
declare function enumValue(value: string): EnumValueNode;
declare function isEnumValue(node: any): boolean;
declare function assertEnumValue(node: any): boolean;
declare function listValue(values: Array<ValueNode>): ListValueNode;
declare function isListValue(node: any): boolean;
declare function assertListValue(node: any): boolean;
declare function objectValue(fields: Array<ObjectFieldNode>): ObjectValueNode;
declare function isObjectValue(node: any): boolean;
declare function assertObjectValue(node: any): boolean;
declare function objectField(name: NameNode, value: ValueNode): ObjectFieldNode;
declare function isObjectField(node: any): boolean;
declare function assertObjectField(node: any): boolean;
declare function directive(
  name: NameNode,
  arguments?: Array<ArgumentNode>
): DirectiveNode;
declare function isDirective(node: any): boolean;
declare function assertDirective(node: any): boolean;
declare function namedType(name: NameNode): NamedTypeNode;
declare function isNamedType(node: any): boolean;
declare function assertNamedType(node: any): boolean;
declare function listType(type: TypeNode): ListTypeNode;
declare function isListType(node: any): boolean;
declare function assertListType(node: any): boolean;
declare function nonNullType(
  type: NamedTypeNode | ListTypeNode
): NonNullTypeNode;
declare function isNonNullType(node: any): boolean;
declare function assertNonNullType(node: any): boolean;
declare function schemaDefinition(
  directives: Array<DirectiveNode>,
  operationTypes: Array<OperationTypeDefinitionNode>
): SchemaDefinitionNode;
declare function isSchemaDefinition(node: any): boolean;
declare function assertSchemaDefinition(node: any): boolean;
declare function operationTypeDefinition(
  operation: OperationTypeNode,
  type: NamedTypeNode
): OperationTypeDefinitionNode;
declare function isOperationTypeDefinition(node: any): boolean;
declare function assertOperationTypeDefinition(node: any): boolean;
declare function scalarTypeDefinition(
  name: NameNode,
  directives?: Array<DirectiveNode>
): ScalarTypeDefinitionNode;
declare function isScalarTypeDefinition(node: any): boolean;
declare function assertScalarTypeDefinition(node: any): boolean;
declare function objectTypeDefinition(
  name: NameNode,
  fields: Array<FieldDefinitionNode>,
  interfaces?: Array<NamedTypeNode>,
  directives?: Array<DirectiveNode>
): ObjectTypeDefinitionNode;
declare function isObjectTypeDefinition(node: any): boolean;
declare function assertObjectTypeDefinition(node: any): boolean;
declare function fieldDefinition(
  name: NameNode,
  arguments: Array<InputValueDefinitionNode>,
  type: TypeNode,
  directives?: Array<DirectiveNode>
): FieldDefinitionNode;
declare function isFieldDefinition(node: any): boolean;
declare function assertFieldDefinition(node: any): boolean;
declare function inputValueDefinition(
  name: NameNode,
  type: TypeNode,
  defaultValue?: ValueNode,
  directives?: Array<DirectiveNode>
): InputValueDefinitionNode;
declare function isInputValueDefinition(node: any): boolean;
declare function assertInputValueDefinition(node: any): boolean;
declare function interfaceTypeDefinition(
  name: NameNode,
  fields: Array<FieldDefinitionNode>,
  directives?: Array<DirectiveNode>
): InterfaceTypeDefinitionNode;
declare function isInterfaceTypeDefinition(node: any): boolean;
declare function assertInterfaceTypeDefinition(node: any): boolean;
declare function unionTypeDefinition(
  name: NameNode,
  types: Array<NamedTypeNode>,
  directives?: Array<DirectiveNode>
): UnionTypeDefinitionNode;
declare function isUnionTypeDefinition(node: any): boolean;
declare function assertUnionTypeDefinition(node: any): boolean;
declare function enumTypeDefinition(
  name: NameNode,
  values: Array<EnumValueDefinitionNode>,
  directives?: Array<DirectiveNode>
): EnumTypeDefinitionNode;
declare function isEnumTypeDefinition(node: any): boolean;
declare function assertEnumTypeDefinition(node: any): boolean;
declare function enumValueDefinition(
  name: NameNode,
  directives?: Array<DirectiveNode>
): EnumValueDefinitionNode;
declare function isEnumValueDefinition(node: any): boolean;
declare function assertEnumValueDefinition(node: any): boolean;
declare function inputObjectTypeDefinition(
  name: NameNode,
  fields: Array<InputValueDefinitionNode>,
  directives?: Array<DirectiveNode>
): InputObjectTypeDefinitionNode;
declare function isInputObjectTypeDefinition(node: any): boolean;
declare function assertInputObjectTypeDefinition(node: any): boolean;
declare function typeExtensionDefinition(
  definition: ObjectTypeDefinitionNode
): TypeExtensionDefinitionNode;
declare function isTypeExtensionDefinition(node: any): boolean;
declare function assertTypeExtensionDefinition(node: any): boolean;
declare function directiveDefinition(
  name: NameNode,
  locations: Array<NameNode>,
  arguments?: Array<InputValueDefinitionNode>
): DirectiveDefinitionNode;
declare function isDirectiveDefinition(node: any): boolean;
declare function assertDirectiveDefinition(node: any): boolean;

declare function is(nodeName: string, node: any): boolean;
