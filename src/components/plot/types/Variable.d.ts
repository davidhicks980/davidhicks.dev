export interface Variable {
  name?: string;
  units: string;
  glyph: string;
  min: number;
  max: number;
  value: number;
  range?: number[];
  step?: number;
}
