import { JWS } from "node-jose";
import { decodeJWSPayload } from "./decodeJWSPayload";
import { Handler } from "./index";

export const createIssVerifier = (iss?: string): Handler => {
  if (iss === undefined) return { complete: () => Promise.resolve() };

  return {
    complete: (jws: JWS.VerificationResult) =>
      new Promise((resolve, reject) => {
        const { iss: issClaim } = decodeJWSPayload(jws);

        if (issClaim === iss) {
          resolve();
          return;
        }

        reject();
      }),
  };
};
