import { JWS } from "node-jose";

export const decodeJWSPayload = (jws: JWS.VerificationResult) =>
  JSON.parse(String.fromCharCode(...jws.payload));
