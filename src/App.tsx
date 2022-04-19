import * as React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import ThePrefectureSelector, {
  createPrefectureCheckedState,
  PrefectureCheckedState,
} from "./components/ThePrefectureSelector";
import { ThePopulationChartContainer } from "./components/ThePopulationChart";
import usePrefectures from "./hooks/usePrefectures";

function App() {
  const [prefectureCheckState, setPrefectureCheckState] =
    useState<PrefectureCheckedState>({});

  const { prefectures, error } = usePrefectures();

  useEffect(() => {
    if (!prefectures) return;
    setPrefectureCheckState(createPrefectureCheckedState(prefectures));
  }, [prefectures]);

  if (error) return <div>failed to load prefectures data.</div>;
  if (!prefectures) return <div>loading prefectures data...</div>;

  const checkedPrefectureCodes = Object.entries(prefectureCheckState)
    .filter(([_prefCode, checked]) => checked)
    .map(([prefCode]) => prefCode);
  const canDrawChart = checkedPrefectureCodes.length > 0;

  return (
    <div className="App">
      <header>Title</header>
      <ThePrefectureSelector
        prefectures={prefectures}
        checked={prefectureCheckState}
        onChange={setPrefectureCheckState}
      />

      {canDrawChart ? (
        <ThePopulationChartContainer prefectureCodes={checkedPrefectureCodes} />
      ) : null}
    </div>
  );
}

export default App;
