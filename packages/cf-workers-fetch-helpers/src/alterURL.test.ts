import { alterURL } from "./alterURL";
import { getRequestFromCalledMockFetch } from "./index.test";

const mockFetch = jest.fn();

describe("alterURL", () => {
  it("prepends and appends URLs", () => {
    const prependOnly = alterURL(mockFetch, {
      prepend: "https://example.com",
    });
    prependOnly("/test");
    expect(getRequestFromCalledMockFetch(mockFetch).url).toEqual(
      "https://example.com/test"
    );

    const appendOnly = alterURL(mockFetch, {
      append: "?test",
    });
    appendOnly("https://example.com/test");
    expect(getRequestFromCalledMockFetch(mockFetch).url).toEqual(
      "https://example.com/test?test"
    );

    const prependAndAppend = alterURL(mockFetch, {
      prepend: "https://example.com",
      append: "?test",
    });
    prependAndAppend("/test");
    expect(getRequestFromCalledMockFetch(mockFetch).url).toEqual(
      "https://example.com/test?test"
    );
  });

  it("mutates with a function", () => {
    const mutate = alterURL(mockFetch, {
      mutate: (prevURL: string) => prevURL.replace("dog", "cat"),
    });
    mutate("https://dogworld.com/");
    expect(getRequestFromCalledMockFetch(mockFetch).url).toEqual(
      "https://catworld.com/"
    );
  });
});
