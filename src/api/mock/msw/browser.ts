import { setupWorker } from "msw"; // eslint-disable-line import/no-extraneous-dependencies
import handlers from "./handlers";

export const worker = setupWorker(...handlers);
export default worker;
