import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  discardResponseBodies: true, // NOTE: Drop response body as it is not verified
  scenarios: {
    default: { executor: "per-vu-iterations", vus: 2, iterations: 3 },
  },
};

export default function () {
  const count = Math.floor(Math.random() * 53);
  const response = http.get(
    `https://deckofcardsapi.com/api/deck/new/draw/?count=${count}`
  );
  check(response, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}
