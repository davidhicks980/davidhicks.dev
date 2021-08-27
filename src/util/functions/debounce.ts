export const debounce = function (ms: number, method: (...any) => any) {
  let timer;
  return function (this: any) {
    clearTimeout(timer);
    const args = Array.prototype.slice.call(arguments) as any[];
    args.unshift(this);
    timer = setTimeout(method.bind.apply(method, args), ms);
  };
};
