// @ts-ignore
import FormData from "formdata-node";
import { createVerifier } from "./index";

const SECRET = "0x0000000000000000000000000000000000000000";

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);
const mockFailedFetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        success: false,
        "error-codes": ["invalid-or-already-seen-response"],
      }),
  })
);

global.fetch = mockFetch as any;

const formData = new FormData();
formData.append("h-captcha-response", "aToken");

const REQUEST = new Request("", {
  method: "POST",
  headers: {
    "CF-Connecting-IP": "192.0.2.1",
    "Content-Type": "multipart/form-data",
  },
  // @ts-ignore
  body: formData,
});
// @ts-ignore
REQUEST.formData = () => Promise.resolve(formData);

describe("createVerifier", () => {
  it("creates a verifying function which calls hCaptcha correctly and returns the payload upon success", async () => {
    const verify = createVerifier(SECRET);

    expect((await verify(REQUEST)).success).toBeTruthy();
    const call = mockFetch.mock.calls[0] as any;
    expect(call[1].body.toString()).toMatchInlineSnapshot(
      `"secret=0x0000000000000000000000000000000000000000&response=aToken&remoteip=192.0.2.1"`
    );
  });

  it("throws errors when the token is invalid", async () => {
    global.fetch = mockFailedFetch as any;
    const verify = createVerifier(SECRET);

    expect(verify(REQUEST)).rejects.toThrowErrorMatchingInlineSnapshot(
      `"The response parameter has already been checked, or has another issue."`
    );
  });
});
