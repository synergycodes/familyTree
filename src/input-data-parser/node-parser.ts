import { NodeCategory, PersonInputData } from '../types';

export const parseNodes = (people: PersonInputData[]) =>
  people.map((person: PersonInputData) => ({
    key: person.name,
    category: NodeCategory.Person,
    ...person,
  }));
