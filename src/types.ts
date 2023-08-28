// properties used in bindings,
// defined to not use simple strings in bindings across application
export const nameProperty = 'name';
export const genderProperty = 'gender';
export const statusProperty = 'status';
export const dottedProperty = 'dotted';
export const countProperty = 'count';

export interface PersonInputData {
  [nameProperty]: string;
  [genderProperty]: Gender;
  [statusProperty]: Status;
  born: string | null;
  death: string | null;
}

export interface CoupleInputInfo {
  spouses: string[];
  children: string[];
  [dottedProperty]: boolean;
}

export interface RelationshipData {
  from: string;
  to: string;
  dotted: boolean;
}

export interface LinkParserOutput {
  links: RelationshipData[];
  counters: CounterData[];
}

export interface PersonData extends PersonInputData {
  key: string;
  category: NodeCategory;
}

export interface CounterData {
  key: string;
  category: NodeCategory;
  [countProperty]: number;
}

export enum NodeCategory {
  Person = 'Person',
  Counter = 'Counter',
}

export type Gender = 'M' | 'F';
export type Status = 'king' | 'queen' | 'prince' | 'princess' | 'civilian';
