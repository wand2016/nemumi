import * as React from "react";
import "./App.css";
import useSWR from "swr";
import axios from "axios";
import { baseUrl, endpoints } from "./api";
import { PrefectureResponse } from "./api/Prefecture";
import { useEffect, useState } from "react";
import { PopulationCompositionResponse } from "./api/PopulationComposition";
import { LineChart, Tooltip, CartesianGrid, Line, XAxis } from "recharts";

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

  const { data: prefectures, error } = useSWR<PrefectureResponse>(
    endpoints.prefectures,
    fetcher
  );

  useEffect(() => {
    if (!prefectures) return;

    const initState: PrefectureCheckState = prefectures.result.reduce(
      (prev, { prefCode }) => ({
        ...prev,
        [prefCode]: false,
      }),
      {}
    );

    setPrefectureCheckState(initState);
  }, [prefectures]);

  if (error) return <div>failed to load</div>;
  if (!prefectures) return <div>loading...</div>;

  const isChecked = (prefCode: number) =>
    prefectureCheckState[`${prefCode}`] ?? false;
  const toggle = (prefCode: number) => {
    setPrefectureCheckState((prevState) => ({
      ...prevState,
      [prefCode]: !prevState[prefCode],
    }));
  };
  const checkedPrefectureCodes = () =>
    Object.entries(prefectureCheckState)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_prefCode, checked]) => checked)
      .map(([prefCode]) => `${prefCode}`);

  console.log(isChecked(1));

  return (
    <div className="App">
      <header>Title</header>
      <section>
        <h2>都道府県</h2>
        {prefectures.result.map(({ prefCode, prefName }) => (
          <span key={prefCode}>
            <label>
              <input
                type="checkbox"
                value={isChecked(prefCode)}
                onClick={() => toggle(prefCode)}
              />
              {prefName}
            </label>
          </span>
        ))}
      </section>

      {checkedPrefectureCodes().length === 0 ? (
        <div>not selected</div>
      ) : (
        <Popu prefectureCodes={checkedPrefectureCodes()} />
      )}
      <section>
        <h2>debug</h2>
        {JSON.stringify(prefectureCheckState)}
      </section>
    </div>
  );
}

export default App;
