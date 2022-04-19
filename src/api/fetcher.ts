// TODO: config
import axios from "axios";

export const baseUrl = "https://opendata.resas-portal.go.jp";

export const endpoints = {
  prefectures: "api/v1/prefectures",
  populationComposition: "api/v1/population/composition/perYear",
};

export const fetcher = async (url: string) => {
  const axiosInstance = axios.create({
    baseURL: baseUrl,
    // TODO: X-API-KEY
  });

  const response = await axiosInstance.get(url);
  return response.data;
};
