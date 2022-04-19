import { ResasResponse } from "./ResasResponse";

export type PrefectureResponse = ResasResponse<Prefecture[]>;

type Prefecture = {
  /** for example: 1 */
  prefCode: number;
  /** for example: 北海道 */
  prefName: string;
};
