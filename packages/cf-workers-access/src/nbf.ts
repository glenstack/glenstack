import { JWS } from "node-jose";
import { decodeJWSPayload } from "./decodeJWSPayload";
import { Handler } from "./index";

export const createNbfVerifier = (tolerance: number = 0): Handler => {
  const nbfOkay = (nbf: number) =>
    new Date().getTime() / 1000 - nbf >= tolerance;

  return {
    complete: (jws: JWS.VerificationResult) =>
      new Promise((resolve, reject) => {
        const { nbf: nbfClaim } = decodeJWSPayload(jws);

        if (nbfOkay(nbfClaim)) {
          resolve();
          return;
        }

        reject();
      }),
  };
};
