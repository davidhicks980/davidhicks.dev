export const prefixProperties = <Type>(prefix: string, o: Type): Type => {
  let newO = {} as Type;
  for (let p of Object.getOwnPropertyNames(o)) {
    newO[p] = prefix + '$' + o[p];
  }
  return Object.freeze(newO);
};
export const propertyArray = (entries: { [key: string]: string }) => {
  return Array.from(Object.values(entries));
};
