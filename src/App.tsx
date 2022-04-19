import * as React from "react";
import "./App.css";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { endpoints, fetcher } from "./api";
import { PrefectureResponse } from "./api/Prefecture";
import ThePrefectureSelector from "./components/ThePrefectureSelector";
import { ThePopulationChartContainer } from "./components/ThePopulationChart";

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
        <ThePopulationChartContainer prefectureCodes={checkedPrefectureCodes} />
      )}
      <section>
        <h2>debug</h2>
        {JSON.stringify(prefectureCheckState)}
      </section>
    </div>
  );
}

export default App;
