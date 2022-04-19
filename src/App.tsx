import * as React from "react";
import "./App.css";
import useSWR from "swr";
import axios from "axios";
import { baseUrl, endpoints } from "./api";
import { PrefectureResponse } from "./api/Prefecture";
import { useEffect, useState } from "react";

const fetcher = async (url: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    // TODO: X-API-KEY
  });

  const response = await axiosInstance.get(url);
  return response.data;
};

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

  const checked = (prefCode: number) => prefectureCheckState[`${prefCode}`];
  const toggle = (prefCode: number) => {
    setPrefectureCheckState((prevState) => ({
      ...prevState,
      [prefCode]: !prevState[prefCode],
    }));
  };

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
                checked={checked(prefCode)}
                onClick={() => toggle(prefCode)}
              />
              {prefName}
            </label>
          </span>
        ))}
      </section>
      <section>
        <h2>debug</h2>
        {JSON.stringify(prefectureCheckState)}
      </section>
    </div>
  );
}

export default App;
