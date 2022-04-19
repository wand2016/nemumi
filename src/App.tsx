import * as React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import ThePrefectureSelector from "./components/ThePrefectureSelector";
import { ThePopulationChartContainer } from "./components/ThePopulationChart";
import usePrefectures from "./hooks/usePrefectures";

function App() {
  type PrefectureCheckState = Record<string, boolean>;
  const [prefectureCheckState, setPrefectureCheckState] =
    useState<PrefectureCheckState>({});

  const { prefectures, error } = usePrefectures();

  useEffect(() => {
    if (!prefectures) return;

    const initState: PrefectureCheckState = prefectures.reduce(
      (prev, { code }) => ({
        ...prev,
        [code]: false,
      }),
      {}
    );

    setPrefectureCheckState(initState);
  }, [prefectures]);

  if (error) return <div>failed to load</div>;
  if (!prefectures) return <div>loading...</div>;

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
    </div>
  );
}

export default App;
