export function fastHash(string) {
  let h = 0,
    i = string.length;
  console.log(string);
  while (i > 0) {
    h = ((h << 5) - h + string.charCodeAt(--i)) | 0;
  }
  return h;
}
