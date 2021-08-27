export const prefixProperties = <Type>(prefix: string, o: Type): Type => {
  const newO = {} as Type;
  for (const p of Object.getOwnPropertyNames(o)) {
    newO[p] = prefix + '$' + o[p];
  }
  return Object.freeze(newO);
};
export const propertyArray = (entries: { [key: string]: string }) => {
  return Array.from(Object.values(entries));
};
