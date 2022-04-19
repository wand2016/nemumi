import { rest } from "msw"; // eslint-disable-line import/no-extraneous-dependencies
import populationComposition from "../populationComposition.json";
import prefectures from "../prefectures.json";
import { baseUrl, endpoints } from "../../hoge";

const handlers = [
  rest.get(`${baseUrl}/${endpoints.prefectures}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(prefectures));
  }),
  rest.get(`${baseUrl}/${endpoints.populationComposition}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(populationComposition));
  }),
];
export default handlers;
