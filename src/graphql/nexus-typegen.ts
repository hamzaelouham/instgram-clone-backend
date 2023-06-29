/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  RegisterInput: { // input type
    email?: string | null; // String
    name?: string | null; // String
    password?: string | null; // String
  }
}

export interface NexusGenEnums {
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  AccessToken: { // root type
    accessToken?: string | null; // String
  }
  Me: { // root type
    email?: string | null; // String
    iamge?: string | null; // String
    name?: string | null; // String
    userId?: string | null; // String
  }
  Mutation: {};
  Query: {};
  User: { // root type
    createdAt: string; // String!
    email?: string | null; // String
    iamge?: string | null; // String
    id?: string | null; // String
    name?: string | null; // String
    password?: string | null; // String
    updatedAt: string; // String!
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars

export interface NexusGenFieldTypes {
  AccessToken: { // field return type
    accessToken: string | null; // String
  }
  Me: { // field return type
    email: string | null; // String
    iamge: string | null; // String
    name: string | null; // String
    userId: string | null; // String
  }
  Mutation: { // field return type
    login: NexusGenRootTypes['AccessToken']; // AccessToken!
    register: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    getUserById: NexusGenRootTypes['User']; // User!
    getUsers: Array<NexusGenRootTypes['User'] | null>; // [User]!
    me: NexusGenRootTypes['Me'] | null; // Me
  }
  User: { // field return type
    createdAt: string; // String!
    email: string | null; // String
    iamge: string | null; // String
    id: string | null; // String
    name: string | null; // String
    password: string | null; // String
    updatedAt: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  AccessToken: { // field return type name
    accessToken: 'String'
  }
  Me: { // field return type name
    email: 'String'
    iamge: 'String'
    name: 'String'
    userId: 'String'
  }
  Mutation: { // field return type name
    login: 'AccessToken'
    register: 'User'
  }
  Query: { // field return type name
    getUserById: 'User'
    getUsers: 'User'
    me: 'Me'
  }
  User: { // field return type name
    createdAt: 'String'
    email: 'String'
    iamge: 'String'
    id: 'String'
    name: 'String'
    password: 'String'
    updatedAt: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      data?: NexusGenInputs['RegisterInput'] | null; // RegisterInput
    }
  }
  Query: {
    getUserById: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}