export const debounce = function (ms, funct) {
  let timer;
  return function (this: any) {
    clearTimeout(timer);
    let args = Array.prototype.slice.call(arguments) as any[];
    args.unshift(this);
    timer = setTimeout(funct.bind.apply(funct, args), ms);
  };
};
