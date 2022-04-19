/** 人口構成 */
export type PopulationComposition = {
  /** 実績値と推定値のさかいめ */
  boundaryYear: number;
  data: GenerationData[];
};

type GenerationData = {
  /** for example: "総人口" */
  label: string;
  data: YearPopulation[];
};

type YearPopulation = {
  year: number;
  value: number;
};
