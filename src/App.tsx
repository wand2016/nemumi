import * as React from "react";
import { useState } from "react";
import logo from "./logo.svg";
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
  const [count, setCount] = useState(0);

  const { data, error } = useSWR<PrefectureResponse>(
    endpoints.prefectures,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="App">
      {JSON.stringify(data)}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button
            type="button"
            onClick={() => setCount((previousCount) => previousCount + 1)}
          >
            count is: {count}
          </button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

export default App;
