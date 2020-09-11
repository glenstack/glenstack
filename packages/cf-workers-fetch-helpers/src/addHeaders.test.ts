import { addHeaders } from "./addHeaders";
import { getRequestFromCalledMockFetch } from "./index.test";

const mockFetch = jest.fn();

describe("addHeaders", () => {
  it("should add headers", () => {
    const addHeaderFetch = addHeaders(mockFetch, {
      headers: { Authorization: "LET ME IN!" },
    });
    addHeaderFetch("https://example.com/", {
      headers: { "User-Agent": "Something_Cool" },
    });
    const { headers } = getRequestFromCalledMockFetch(mockFetch);
    expect(headers.get("User-Agent")).toEqual("Something_Cool");
    expect(headers.get("Authorization")).toEqual("LET ME IN!");
  });
});
