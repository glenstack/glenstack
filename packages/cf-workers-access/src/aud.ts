import { JWS } from "node-jose";
import { decodeJWSPayload } from "./decodeJWSPayload";
import { Handler } from "./index";

export const createAudVerifier = (
  aud: undefined | string | string[]
): Handler => {
  if (aud === undefined) return { complete: () => Promise.resolve() };

  const auds = Array.isArray(aud) ? aud : [aud];
  const audOkay = (aud: string | string) => auds.indexOf(aud) > -1;

  return {
    complete: (jws: JWS.VerificationResult) =>
      new Promise((resolve, reject) => {
        const { aud: audClaim } = decodeJWSPayload(jws);

        if (Array.isArray(audClaim)) {
          for (const audClaimI of audClaim) {
            if (audOkay(audClaimI)) {
              resolve();
              return;
            }
          }
        } else if (audOkay(audClaim)) {
          resolve();
          return;
        }

        reject();
      }),
  };
};
