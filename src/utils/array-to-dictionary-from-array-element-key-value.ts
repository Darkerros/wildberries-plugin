export function arrayToDictionaryFromArrayElementKeyValue<T> (array: T[], key: keyof T) {
  return array.reduce((acc,element) => {

    acc[`${element[key]}`] = element;

    return acc;
  }, {} as Record<string, T>)
}
