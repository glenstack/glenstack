import { CustomEvent } from "./index";

const mockEvent = jest.fn();
(global as any).Event = mockEvent;

describe("CustomEvent", () => {
  beforeEach(() => {
    mockEvent.mockReset();
  });

  it("can be initialized", () => {
    const myCustomEvent = new CustomEvent("MyCustomEvent");
    expect(mockEvent).toBeCalledWith("MyCustomEvent");
  });

  it("cant be initialized with detail", () => {
    const myCustomEventWithDetail = new CustomEvent("MyCustomEventWithDetail", {
      detail: { some: "detail" },
    });
    expect(mockEvent).toBeCalledWith("MyCustomEventWithDetail");
    expect(myCustomEventWithDetail.detail.some).toEqual("detail");
  });
});
