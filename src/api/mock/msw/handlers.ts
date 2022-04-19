import { rest } from "msw"; // eslint-disable-line import/no-extraneous-dependencies
import populationComposition from "../populationComposition.json";
import prefectures from "../prefectures.json";
import { baseUrl, endpoints } from "../../index";

/**
 * emulate roundtrip time
 */
const sleep = (millisec: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, millisec);
  });

const handlers = [
  rest.get(`${baseUrl}/${endpoints.prefectures}`, async (req, res, ctx) => {
    await sleep(1000);
    return res(ctx.status(200), ctx.json(prefectures));
  }),
  rest.get(
    `${baseUrl}/${endpoints.populationComposition}`,
    async (req, res, ctx) => {
      await sleep(1000);
      return res(ctx.status(200), ctx.json(populationComposition));
    }
  ),
];
export default handlers;
