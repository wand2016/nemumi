import * as React from "react";
import "./App.css";
import useSWR from "swr";
import axios from "axios";
import { baseUrl, endpoints } from "./api";
import { PrefectureResponse } from "./api/Prefecture";

const fetcher = async (url: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    // TODO: X-API-KEY
  });

  const response = await axiosInstance.get(url);
  return response.data;
};

function App() {
  const { data: prefectures, error } = useSWR<PrefectureResponse>(
    endpoints.prefectures,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!prefectures) return <div>loading...</div>;

  return (
    <div className="App">
      {prefectures.result.map(({ prefCode, prefName }) => (
        <span key={prefCode}>
          <label>
            <input type="checkbox" /> {prefName}
          </label>
        </span>
      ))}
    </div>
  );
}

export default App;
