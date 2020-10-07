export const getRequestFromCalledMockFetch = (mockFetch: jest.Mock) => {
  const [requestInfo, requestInit] = mockFetch.mock.calls[0];
  mockFetch.mockReset();
  return new Request(requestInfo, requestInit);
};

describe("the universe", () => {
  it("can do math", () => {
    expect(2 + 2).toBe(4);
  });
});
