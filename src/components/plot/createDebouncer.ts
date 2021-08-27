export const createDebouncer = (
  method: (...args: any) => void,
  delay: number
) => {
  let timeout = false;
  return (params: {}) => (e: unknown) => {
    if (!timeout) {
      timeout = true;
      setTimeout(() => {
        method(params, e);
        timeout = false;
      }, delay);
    }
  };
};
