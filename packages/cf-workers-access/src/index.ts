import { parse } from "cookie";
import { JWK, JWS } from "node-jose";
import { createAudVerifier } from "./aud";
import { createExpVerifier } from "./exp";
import { createNbfVerifier } from "./nbf";
import { decodeJWSPayload } from "./decodeJWSPayload";
import { createIssVerifier } from "./iss";

export type JWTPayload = {
  aud: string | string[];
  email: string;
  sub: string;
  iss: string;
  iat: number;
  exp: number;
  nonce: string;
  identity_nonce?: string;
  custom?: any;
};

type VerifierOpts = {
  aud?: string | string[];
  iss?: string;
  tolerance?: number;
};

export type Handler =
  | ((jws: JWS.VerificationResult) => Promise<unknown>)
  | { complete(jws: JWS.VerificationResult): Promise<unknown> }
  | undefined;

type Handlers = {
  handlers: {
    aud?: Handler;
    iss?: Handler;
    exp: Handler;
    nbf: Handler;
  };
};

const extractJWTFromRequest = (request: Request): string | undefined => {
  if (request.headers.has("Cookie"))
    return parse(request.headers.get("Cookie")).CF_Authorization;
};

const authenticate = (verifier: JWS.Verifier) => async (
  request: Request
): Promise<false | JWTPayload> => {
  const jwt = extractJWTFromRequest(request);
  if (jwt) {
    try {
      const jws = await verifier.verify(jwt);
      return decodeJWSPayload(jws);
    } catch (e) {}
  }
  return false;
};

const createHandlers = (opts: VerifierOpts): Handlers => {
  const aud = createAudVerifier(opts.aud);
  const iss = createIssVerifier(opts.iss);
  const exp = createExpVerifier(opts.tolerance);
  const nbf = createNbfVerifier(opts.tolerance);

  return {
    handlers: {
      aud,
      iss,
      exp,
      nbf,
    },
  };
};

const generateCertsEndpoint = (authentication_domain: string) =>
  `https://${authentication_domain}/cdn-cgi/access/certs`;

const generateIss = (authentication_domain: string) =>
  `https://${authentication_domain}`;

export const createAuthenticator = async (
  authentication_domain: string,
  opts: VerifierOpts = {}
) => {
  const response = await fetch(generateCertsEndpoint(authentication_domain));
  const keys = await response.json();
  const keystore = await JWK.asKeyStore(keys);
  opts.iss = opts.iss || generateIss(authentication_domain);
  const handlers = createHandlers(opts);
  const verifier = JWS.createVerify(keystore, handlers);
  return authenticate(verifier);
};
