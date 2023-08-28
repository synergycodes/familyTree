import * as go from 'gojs';

export const iteratorToArray = <T>(iterator: go.Iterator<T>) => {
  const result: T[] = [];
  iterator.each((el: T) => result.push(el));
  return result;
};
