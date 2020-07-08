import { JWS } from "node-jose";
import { decodeJWSPayload } from "./decodeJWSPayload";
import { Handler } from "./index";

export const createExpVerifier = (tolerance: number = 0): Handler => {
  const expOkay = (exp: number) =>
    exp - new Date().getTime() / 1000 <= tolerance;

  return {
    complete: (jws: JWS.VerificationResult) =>
      new Promise((resolve, reject) => {
        const { exp: expClaim } = decodeJWSPayload(jws);

        if (expOkay(expClaim)) {
          resolve();
          return;
        }

        reject();
      }),
  };
};
