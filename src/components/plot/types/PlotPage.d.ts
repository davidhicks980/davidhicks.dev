import { GraphType } from './GraphType';
import { Variable } from './Variable';

export interface PlotParameters {
  variables: Variable[];
  equation: string;
  equationTemplate: string;
  graphType: GraphType;
  bottomBound: number;
  topBound: number;
  axis: string[];
  independentVariable: string;
  range: number;
  multipleDose: boolean;
  units: string;
  isGraph: boolean;
  id: string;
  index: number;
  header: string;
  title: string;
}

export type PlotPage = PlotParameters;
