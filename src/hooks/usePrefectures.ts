import useSWR from "swr";
import { useMemo } from "react";
import { endpoints, fetcher, PrefectureResponse } from "../api";
import { Prefecture } from "../domain/Prefecture";

type PrefecturesResult<Error> = {
  prefectures?: Prefecture[];
  error?: Error;
};

export default function usePrefectures<
  Error = any
>(): PrefecturesResult<Error> {
  const { data, error } = useSWR<PrefectureResponse, Error>(
    endpoints.prefectures,
    fetcher
  );

  return {
    prefectures: useMemo(
      () =>
        (data?.result ?? []).map(({ prefCode, prefName }) => ({
          code: `${prefCode}`,
          name: prefName,
        })),
      [data]
    ),
    error,
  };
}
