import { request } from "./utils";

global.fetch = jest.fn();

describe("request", () => {
  test("return the resolved value", async () => {
    const response = [{ id: 1 }];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(response),
    });

    const url = "/test";
    const data = await request(url);

    expect(global.fetch).toHaveBeenCalledWith(url);
    expect(data).toBe(response);
  });

  test("return the rejected value", async () => {
    const response = "error";

    global.fetch.mockResolvedValueOnce({
      json: () => response,
    });

    try {
      await request("/test");
    } catch (ex) {
      expect(ex).toBe(response);
    }
  });
});
