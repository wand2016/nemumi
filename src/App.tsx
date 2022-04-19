import * as React from "react";
import "./App.css";
import useSWR from "swr";
import axios from "axios";
import { baseUrl, endpoints } from "./api";
import { PrefectureResponse } from "./api/Prefecture";
import { useEffect, useState } from "react";
import { PopulationCompositionResponse } from "./api/PopulationComposition";
import { LineChart, Tooltip, CartesianGrid, Line, XAxis } from "recharts";
import ThePrefectureSelector from "./components/ThePrefectureSelector";

const fetcher = async (url: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    // TODO: X-API-KEY
  });

  const response = await axiosInstance.get(url);
  return response.data;
};

type Props = {
  prefectureCodes: string[];
};
function Popu({ prefectureCodes }: Props) {
  // TODO: multiple prefectures
  const { data, error } = useSWR<PopulationCompositionResponse>(
    `${endpoints.populationComposition}?prefCode=${prefectureCodes[0]}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <header>Title</header>
      <section>
        <h2>人口数</h2>
        <LineChart
          width={400}
          height={400}
          data={data.result.data[0].data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="year" />
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line type="monotone" dataKey="value" stroke="#387908" yAxisId={0} />
        </LineChart>
      </section>
    </>
  );
}

function App() {
  type PrefectureCheckState = Record<string, boolean>;
  const [prefectureCheckState, setPrefectureCheckState] =
    useState<PrefectureCheckState>({});

  const { data, error } = useSWR<PrefectureResponse>(
    endpoints.prefectures,
    fetcher
  );

  useEffect(() => {
    if (!data) return;

    const initState: PrefectureCheckState = data.result.reduce(
      (prev, { prefCode }) => ({
        ...prev,
        [prefCode]: false,
      }),
      {}
    );

    setPrefectureCheckState(initState);
  }, [data]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const prefectures = data.result.map(({ prefCode, prefName }) => ({
    code: `${prefCode}`,
    name: prefName,
  }));

  const checkedPrefectureCodes = Object.entries(prefectureCheckState)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_prefCode, checked]) => checked)
    .map(([prefCode]) => prefCode);

  return (
    <div className="App">
      <header>Title</header>
      <ThePrefectureSelector
        prefectures={prefectures}
        checked={prefectureCheckState}
        onChange={setPrefectureCheckState}
      />

      {checkedPrefectureCodes.length === 0 ? (
        <div>not selected</div>
      ) : (
        <Popu prefectureCodes={checkedPrefectureCodes} />
      )}
      <section>
        <h2>debug</h2>
        {JSON.stringify(prefectureCheckState)}
      </section>
    </div>
  );
}

export default App;
