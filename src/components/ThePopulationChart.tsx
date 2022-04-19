import * as React from "react";
import useSWR from "swr";
import { LineChart, Tooltip, CartesianGrid, Line, XAxis } from "recharts";
import { PopulationCompositionResponse } from "../api/PopulationComposition";
import { endpoints, fetcher } from "../api";

export type Prefecture = {
  code: string;
  name: string;
};
type DataLine = {
  year: number;
} & Record<Prefecture["code"], number>;
type Data = DataLine[];

type Props = {
  data: Data;
};
export function ThePopulationChart({ data }: Props) {
  return (
    <section>
      <h2>人口数</h2>
      <LineChart
        width={400}
        height={400}
        data={data}
        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Line type="monotone" dataKey="value" stroke="#387908" yAxisId={0} />
      </LineChart>
    </section>
  );
}

type ContainerProps = {
  prefectureCodes: string[];
};

export function ThePopulationChartContainer({
  prefectureCodes,
}: ContainerProps) {
  // TODO: multiple prefectures
  const { data, error } = useSWR<PopulationCompositionResponse>(
    `${endpoints.populationComposition}?prefCode=${prefectureCodes[0]}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return <ThePopulationChart data={data.result.data[0].data} />;
}
