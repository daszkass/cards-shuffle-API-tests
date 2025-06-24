import { test, expect } from "@playwright/test";

test.describe("Main page", async () => {
  test(
    "should click button and go to form",
    { tag: "@ui" },
    async ({ page }) => {
      const button = page.getByRole("link", {
        name: "Get in Touch with Barista",
      });

      await test.step("1", async () => {
        await page.goto("/");
        await expect(button).toBeVisible();
      });

      await test.step("2", async () => {
        await button.click();
        await page.waitForURL("/barista-contact");
      });

      await test.step("3", async () => {
        await expect(page.getByTestId("step1")).toBeVisible();
      });
    }
  );

  test(
    "should send order form",
    { tag: "@api" },
    async ({ request, baseURL }) => {
      const attributes = {
        FIELD__W9XJJV8Q5: "John",
        FIELD__WOFU63QXT: "Test 1/2",
        FIELD__AOFVLPOV8: "00-001",
        PAGE_AND_SECTION: `${baseURL}/#form1`,
      };
      const softrPageId = process.env.SOFTR_PAGE_ID;

      if (!softrPageId) {
        throw new Error("SOFTR_PAGE_ID not found");
      }

      const response = await request.post(
        "/api/v1/applications/forms/form-to-email/izabela.amplexor@gmail.com",
        {
          headers: {
            "softr-page-id": softrPageId,
          },
          data: { attributes },
        }
      );
      expect(response.status()).toEqual(200);
    }
  );
});
