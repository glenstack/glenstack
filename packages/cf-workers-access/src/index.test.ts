import { createAuthenticator, JWTPayload } from "./index";
import { set } from "mockdate";

const EXPIRED_JWT = `eyJhbGciOiJSUzI1NiIsImtpZCI6ImJmOWZiZWE0ZDlhY2Q3YjgxMjZjMmI4ZmQ5ODZkY2Q3ODllODkxZTM2YTA1YzIzYzA0MDdmOGMxYzgxMWE3ZTcifQ.eyJhdWQiOlsiZjg2MTI1MzBjMDg0ODQ3ODZlODNlMDBmZjdiNTQ5YmMzNzYzNzQ3YmVhZTU1ZWM5MDljYzI4YTZhNTZiODFkMSJdLCJlbWFpbCI6ImdyZWdAZ2xlbnN0YWNrLmNvbSIsImV4cCI6MTU5NDE5Nzc5OCwiaWF0IjoxNTk0MTk3Nzg4LCJuYmYiOjE1OTQxOTc3ODgsImlzcyI6Imh0dHBzOi8vZ2xlbnN0YWNrLmNsb3VkZmxhcmVhY2Nlc3MuY29tIiwidHlwZSI6ImFwcCIsImlkZW50aXR5X25vbmNlIjoia3lDejVoQkpYS01TckpSSSIsInN1YiI6IkNFMjlCQjlENjY0NERBRTM1MkNCQzRERjY0REI2ODYyQUM3Nzg0N0E4RUU2Mzg0RDIwQTZCN0EyRDM2NEE2NDQifQ.lZFmA57WqkaT1C33c6dvqsfdyDGJlxUpbhA8frTvBRQtjU8NRm60crq103SKrFRSjKauCb8ngsLp0ksvjhafi_k9Ii9zLZpsLn1jaJIc0YfTY3uG3Q70yJx_IzMESsMdUC15SmvacqircsvEzuOld8jD4a5Kp589g84efQcpFKBVNzSbMUtLNstXKnJvpMRx6Ra3zqfJnWO8m40wXW-U6cUvkV0sV7TFpyu6CTbdgUFVc1lrPEykbM-ZC3LocSHEqAQvUv56TB8qGxsI-ueKoDSRTEdT2PTsCm_45AMTE-j5hoQqlyldB5xKRb79ajoPJc4FbBZMZJon90iUBCu8xA`;
const VALID_AUDIENCE = `f8612530c08484786e83e00ff7b549bc3763747beae55ec909cc28a6a56b81d1`;
const VALID_ISSUER = "https://glenstack.cloudflareaccess.com";
const CERTS = {
  keys: [
    {
      kid: "bf9fbea4d9acd7b8126c2b8fd986dcd789e891e36a05c23c0407f8c1c811a7e7",
      kty: "RSA",
      alg: "RS256",
      use: "sig",
      e: "AQAB",
      n:
        "yaW9zouYDG-Y62J3AqDJadIu68y_8XwKMsEBLtxf-GrHs-DBthaJRwks1MwWfSo_XnzKbpEe5RRYFfQLtjz8sKXTZnwCs79ZSQ95mw6k1mrC1uFykqHZk2XjBYAm6aDmkPw2ZFtXCkqZP8k1hHMhamBSoobiCA6SPYZE8KBtDZB18HeEnAkJMPpBa7hozKUKyEnXstKbYA7C2vM1nN8ufWg23gJMtG8GbuZXupuxbFiQYv0He3w31Ybep9MXdV6DGdK4t-1MT6xY2yKI-2h2Oxs2PVqfQpmg6zFHtdvyZETDEyGx-cq-iE1nt65tPAWKop_kllcZ1l--toXJQjc3xQ",
    },
    {
      kid: "a084280bb84b30c4759da3c9231c254458e0895420e30035dce17431eb252e82",
      kty: "RSA",
      alg: "RS256",
      use: "sig",
      e: "AQAB",
      n:
        "q1QdhpTwtT7S8FOc6ZP4tN5mggdCDgYKp5PzbiXCJmLzTO8d2hwJKuEN0NooYKBMjVb3ZWfkjaaz-BvGZf2AxiXgqniMRtJbvRKWEqIqp4fApUtB9DxFIFwaneRryUSXjy4vWpweeIOnJBfYLwXYHbwXBlbdmP0wOCAgNzzhdLblTgw7dzgPEJ_J3dilBnocSYfzTNac2N1qSuay685OijqGRlw7-Y7E9zL5xccDjpwePIxTmdWKE4uHU2d1Xbk8CJ49Hvn1Fg_wkjcDoampb1jS0XHQnIuUP3wp6d_hUuPCmV_uHXZfunRqRLC6RdRH85cLTeVcqWqqu_588_ef1w",
    },
  ],
  public_cert: {
    kid: "bf9fbea4d9acd7b8126c2b8fd986dcd789e891e36a05c23c0407f8c1c811a7e7",
    cert:
      "-----BEGIN CERTIFICATE-----\nMIIDUDCCAjigAwIBAgIQCzq6hWdgLhhg2KZdjZvJfTANBgkqhkiG9w0BAQsFADBi\nMQswCQYDVQQGEwJVUzEOMAwGA1UECBMFVGV4YXMxDzANBgNVBAcTBkF1c3RpbjET\nMBEGA1UEChMKQ2xvdWRmbGFyZTEdMBsGA1UEAxMUY2xvdWRmbGFyZWFjY2Vzcy5j\nb20wHhcNMjAwNTI0MTYxMTE1WhcNMjAwNzIzMTYxMTE1WjBiMQswCQYDVQQGEwJV\nUzEOMAwGA1UECBMFVGV4YXMxDzANBgNVBAcTBkF1c3RpbjETMBEGA1UEChMKQ2xv\ndWRmbGFyZTEdMBsGA1UEAxMUY2xvdWRmbGFyZWFjY2Vzcy5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJpb3Oi5gMb5jrYncCoMlp0i7rzL/xfAoy\nwQEu3F/4asez4MG2FolHCSzUzBZ9Kj9efMpukR7lFFgV9Au2PPywpdNmfAKzv1lJ\nD3mbDqTWasLW4XKSodmTZeMFgCbpoOaQ/DZkW1cKSpk/yTWEcyFqYFKihuIIDpI9\nhkTwoG0NkHXwd4ScCQkw+kFruGjMpQrISdey0ptgDsLa8zWc3y59aDbeAky0bwZu\n5le6m7FsWJBi/Qd7fDfVht6n0xd1XoMZ0ri37UxPrFjbIoj7aHY7GzY9Wp9CmaDr\nMUe12/JkRMMTIbH5yr6ITWe3rm08BYqin+SWVxnWX762hclCNzfFAgMBAAGjAjAA\nMA0GCSqGSIb3DQEBCwUAA4IBAQAeklvnQKmAeTqvJpxJT8KnZjoJF1Aurw4KiIrY\n2fwysJouDQIrLpo2ylXP7Gzu7lUDj0mqRjfNzHH+bKRGvUyufp0QATnYvzpDGU9s\nGQy9dm1ItswtzvcRv5oJehhRppQCk7WD4gH6Yp1Zo9XZ2GCn2PAEOc1Vl5Vr9YFu\n7C00KC7oGWEwgKiBLVyoGe4lZyKzcMZO2/jKKp+s+om+bjunPrULmQh/5q12PSse\np0W3kLH/eEzeIdWV4fK3R0GUT+GYYPgFkYl1NkWjFZ64jklBG1h/XwWY6IFNpnyY\nbp3Gm7jSe+rGDUnLv4q2UzX2WvMI1BXcFXRFlML+fY04OXEj\n-----END CERTIFICATE-----\n",
  },
  public_certs: [
    {
      kid: "bf9fbea4d9acd7b8126c2b8fd986dcd789e891e36a05c23c0407f8c1c811a7e7",
      cert:
        "-----BEGIN CERTIFICATE-----\nMIIDUDCCAjigAwIBAgIQCzq6hWdgLhhg2KZdjZvJfTANBgkqhkiG9w0BAQsFADBi\nMQswCQYDVQQGEwJVUzEOMAwGA1UECBMFVGV4YXMxDzANBgNVBAcTBkF1c3RpbjET\nMBEGA1UEChMKQ2xvdWRmbGFyZTEdMBsGA1UEAxMUY2xvdWRmbGFyZWFjY2Vzcy5j\nb20wHhcNMjAwNTI0MTYxMTE1WhcNMjAwNzIzMTYxMTE1WjBiMQswCQYDVQQGEwJV\nUzEOMAwGA1UECBMFVGV4YXMxDzANBgNVBAcTBkF1c3RpbjETMBEGA1UEChMKQ2xv\ndWRmbGFyZTEdMBsGA1UEAxMUY2xvdWRmbGFyZWFjY2Vzcy5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDJpb3Oi5gMb5jrYncCoMlp0i7rzL/xfAoy\nwQEu3F/4asez4MG2FolHCSzUzBZ9Kj9efMpukR7lFFgV9Au2PPywpdNmfAKzv1lJ\nD3mbDqTWasLW4XKSodmTZeMFgCbpoOaQ/DZkW1cKSpk/yTWEcyFqYFKihuIIDpI9\nhkTwoG0NkHXwd4ScCQkw+kFruGjMpQrISdey0ptgDsLa8zWc3y59aDbeAky0bwZu\n5le6m7FsWJBi/Qd7fDfVht6n0xd1XoMZ0ri37UxPrFjbIoj7aHY7GzY9Wp9CmaDr\nMUe12/JkRMMTIbH5yr6ITWe3rm08BYqin+SWVxnWX762hclCNzfFAgMBAAGjAjAA\nMA0GCSqGSIb3DQEBCwUAA4IBAQAeklvnQKmAeTqvJpxJT8KnZjoJF1Aurw4KiIrY\n2fwysJouDQIrLpo2ylXP7Gzu7lUDj0mqRjfNzHH+bKRGvUyufp0QATnYvzpDGU9s\nGQy9dm1ItswtzvcRv5oJehhRppQCk7WD4gH6Yp1Zo9XZ2GCn2PAEOc1Vl5Vr9YFu\n7C00KC7oGWEwgKiBLVyoGe4lZyKzcMZO2/jKKp+s+om+bjunPrULmQh/5q12PSse\np0W3kLH/eEzeIdWV4fK3R0GUT+GYYPgFkYl1NkWjFZ64jklBG1h/XwWY6IFNpnyY\nbp3Gm7jSe+rGDUnLv4q2UzX2WvMI1BXcFXRFlML+fY04OXEj\n-----END CERTIFICATE-----\n",
    },
    {
      kid: "a084280bb84b30c4759da3c9231c254458e0895420e30035dce17431eb252e82",
      cert:
        "-----BEGIN CERTIFICATE-----\nMIIDUDCCAjigAwIBAgIQPcVb11q4kj3tlZ1CY4LLkzANBgkqhkiG9w0BAQsFADBi\nMQswCQYDVQQGEwJVUzEOMAwGA1UECBMFVGV4YXMxDzANBgNVBAcTBkF1c3RpbjET\nMBEGA1UEChMKQ2xvdWRmbGFyZTEdMBsGA1UEAxMUY2xvdWRmbGFyZWFjY2Vzcy5j\nb20wHhcNMjAwNTI0MTYxMTE1WhcNMjAwNzIzMTYxMTE1WjBiMQswCQYDVQQGEwJV\nUzEOMAwGA1UECBMFVGV4YXMxDzANBgNVBAcTBkF1c3RpbjETMBEGA1UEChMKQ2xv\ndWRmbGFyZTEdMBsGA1UEAxMUY2xvdWRmbGFyZWFjY2Vzcy5jb20wggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCrVB2GlPC1PtLwU5zpk/i03maCB0IOBgqn\nk/NuJcImYvNM7x3aHAkq4Q3Q2ihgoEyNVvdlZ+SNprP4G8Zl/YDGJeCqeIxG0lu9\nEpYSoiqnh8ClS0H0PEUgXBqd5GvJRJePLi9anB54g6ckF9gvBdgdvBcGVt2Y/TA4\nICA3POF0tuVODDt3OA8Qn8nd2KUGehxJh/NM1pzY3WpK5rLrzk6KOoZGXDv5jsT3\nMvnFxwOOnB48jFOZ1YoTi4dTZ3VduTwInj0e+fUWD/CSNwOhqalvWNLRcdCci5Q/\nfCnp3+FS48KZX+4ddl+6dGpEsLpF1EfzlwtN5Vypaqq7/nzz95/XAgMBAAGjAjAA\nMA0GCSqGSIb3DQEBCwUAA4IBAQBsRDjw1znn7BFsNwZJRNX6y6ZpqkSVj5WaxvdZ\nC1mmZRzein1JH96lF3g8+Ntlb++96XFAMjtrQgW/14zkk0lZZAibJ3cIs0Ue2eo7\nqBMiobPBMcDG0UDlyIaLAg1voclpQzCm2rYqjGTthgN99ixZbN0OhFN6zg4351BO\nPMPp0RUbkM7ozGFlg8qi9zXGacKeWoFg+pjcZyfKfvyUr8488isovYRp3SE9fDun\nYTzvjsrKvZt/mdrcVbx0bYkCRlwj24amC9Fw7Mm8Ye8DgNqVDAVmk0KviyZlGW2j\nA0lITQlDDLrI6OQSCaz8b54cnFIY3N+RkS7vmelmmQI/WPTq\n-----END CERTIFICATE-----\n",
    },
  ],
};
const VALID_DATE = 1594197793;
const TOO_EARLY_DATE = 1594197784;
const EXPIRED_DATE = 1594197802;

const REQUEST_WITHOUT_COOKIE = new Request("/");
const REQUEST_WITH_INVALID_COOKIE = new Request("/", {
  headers: { Cookie: `CF_Authorization=invalid;` },
});
const REQUEST_WITH_EXPIRED_JWT = new Request("/", {
  headers: { Cookie: `CF_Authorization=${EXPIRED_JWT};` },
});

const mockFetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(CERTS),
  })
);

global.fetch = mockFetch as any;

describe("createAuthenticator", () => {
  const authenticationDomain = `glenstack.cloudflareaccess.com`;

  beforeEach(() => {
    mockFetch.mockClear();
  });

  it("rejects missing/invalid cookies", async () => {
    const simpleAuthenticator = await createAuthenticator(authenticationDomain);
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );

    const missingCookieJWT = await simpleAuthenticator(REQUEST_WITHOUT_COOKIE);
    const invalidCookieJWT = await simpleAuthenticator(
      REQUEST_WITH_INVALID_COOKIE
    );

    expect(missingCookieJWT).not.toBeTruthy();
    expect(invalidCookieJWT).not.toBeTruthy();
  });

  it("rejects exp/nbf invalid cookies", async () => {
    const simpleAuthenticator = await createAuthenticator(authenticationDomain);
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );

    set(EXPIRED_DATE * 1000);
    const expiredCookieJWT = await simpleAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    );

    set(TOO_EARLY_DATE * 1000);
    const tooEarlyCookieJWT = await simpleAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    );

    expect(expiredCookieJWT).not.toBeTruthy();
    expect(tooEarlyCookieJWT).not.toBeTruthy();
  });

  it("accepts valid cookies", async () => {
    const simpleAuthenticator = await createAuthenticator(authenticationDomain);
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );
    const tolerantAuthenticator = await createAuthenticator(
      authenticationDomain,
      { tolerance: 5 }
    );

    set(VALID_DATE * 1000);
    const validCookieJWT = (await simpleAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    )) as JWTPayload;

    set(EXPIRED_DATE * 1000);
    const expiredCookieJWT = (await tolerantAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    )) as JWTPayload;

    set(TOO_EARLY_DATE * 1000);
    const tooEarlyCookieJWT = (await tolerantAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    )) as JWTPayload;

    expect(validCookieJWT).toBeTruthy();
    expect(validCookieJWT.email).toEqual("greg@glenstack.com");
    expect(expiredCookieJWT).toBeTruthy();
    expect(expiredCookieJWT.email).toEqual("greg@glenstack.com");
    expect(tooEarlyCookieJWT).toBeTruthy();
    expect(tooEarlyCookieJWT.email).toEqual("greg@glenstack.com");
  });

  it("rejects invalid aud claims", async () => {
    const audAuthenticator = await createAuthenticator(authenticationDomain, {
      aud: `invalid`,
    });
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );

    set(VALID_DATE * 1000);
    const invalidAudJWT = await audAuthenticator(REQUEST_WITH_EXPIRED_JWT);

    expect(invalidAudJWT).not.toBeTruthy();
  });

  it("rejects invalid iss claims", async () => {
    const issAuthenticator = await createAuthenticator(authenticationDomain, {
      iss: `invalid`,
    });
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );

    set(VALID_DATE * 1000);
    const invalidIssJWT = await issAuthenticator(REQUEST_WITH_EXPIRED_JWT);

    expect(invalidIssJWT).not.toBeTruthy();
  });

  it("accepts valid aud claims", async () => {
    const audAuthenticator = await createAuthenticator(authenticationDomain, {
      aud: VALID_AUDIENCE,
    });
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );

    set(VALID_DATE * 1000);
    const validAudJWT = (await audAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    )) as JWTPayload;

    expect(validAudJWT).toBeTruthy();
    expect(validAudJWT.email).toBeTruthy();
  });

  it("accepts valid iss claims", async () => {
    const issAuthenticator = await createAuthenticator(authenticationDomain, {
      iss: VALID_ISSUER,
    });
    expect(mockFetch).toBeCalledWith(
      "https://glenstack.cloudflareaccess.com/cdn-cgi/access/certs"
    );

    set(VALID_DATE * 1000);
    const validAudJWT = (await issAuthenticator(
      REQUEST_WITH_EXPIRED_JWT
    )) as JWTPayload;

    expect(validAudJWT).toBeTruthy();
    expect(validAudJWT.email).toEqual("greg@glenstack.com");
  });
});
