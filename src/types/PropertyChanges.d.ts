export interface PropertyChanges {
  query: string;
  action?: (...args) => unknown;
}
