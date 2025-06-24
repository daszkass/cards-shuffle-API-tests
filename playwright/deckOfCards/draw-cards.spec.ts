import { test, expect } from "@playwright/test";

test.describe("GET /deck/new/draw", async () => {
  const basicDeckSize = 52;
  const numberOfCardsToDraw = [0, 1, 52];

  for (const numberOfCards of numberOfCardsToDraw) {
    test(
      `should successfully draw ${numberOfCards} cards`,
      { tag: "@api" },
      async ({ request }) => {
        const response = await request.get(
          `/api/deck/new/draw/?count=${numberOfCards}`
        );
        expect(response.status()).toEqual(200);
        const responseBody = await response.json();

        expect(responseBody.deck_id).toBeTruthy();
        expect(responseBody.cards).toHaveLength(numberOfCards);
        expect(responseBody.remaining).toEqual(basicDeckSize - numberOfCards);
        expect(responseBody.error).toBeUndefined();
      }
    );
  }

  test(
    "should not draw cards over maximum",
    { tag: "@api" },
    async ({ request }) => {
      const cardsOverMaximum = basicDeckSize + 1;

      const response = await request.get(
        `/api/deck/new/draw/?count=${cardsOverMaximum}`
      );
      expect(response.status()).toEqual(200);
      const responseBody = await response.json();

      expect(responseBody.deck_id).toBeTruthy();
      expect(responseBody.cards).toHaveLength(basicDeckSize);
      expect(responseBody.remaining).toEqual(0);
      expect(responseBody.error).toEqual(
        `Not enough cards remaining to draw ${cardsOverMaximum} additional`
      );
    }
  );
});
