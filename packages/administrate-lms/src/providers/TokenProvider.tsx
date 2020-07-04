import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  Context,
  useReducer,
} from "react";
import {
  getGuestToken,
  LoginPayload,
  GuestPayload,
  getLoggedInToken,
  getLocalTokenOrGuestToken,
} from "../auth/tokens";
import { useDomain } from "./DomainProvider";
import { AdministrateLMSError } from "../errors";
import { DEFAULT_AUTHENTICATION_ERROR_MESSAGE } from "../auth/errors";
import { contextConsumer } from "./utils";

export type Token = string;

type LoadedTokenState = {
  token: Token;
  error: undefined;
};

type ErrorTokenState = {
  token: undefined;
  error: string;
};

type TokenState = LoadedTokenState | ErrorTokenState;
type LoginDispatch = (payload: LoginPayload) => void;

const generateTokenState = async (
  _: any,
  tokenGenerator: () => Promise<Token>
): Promise<TokenState> => {
  try {
    const token = await tokenGenerator();

    // TODO: Persist to localStorage

    return {
      token,
      error: undefined,
    };
  } catch (error) {
    let message = DEFAULT_AUTHENTICATION_ERROR_MESSAGE;
    if (error instanceof AdministrateLMSError) {
      message = error.message;
    }
    throw error;

    return {
      token: undefined,
      error: message,
    };
  }
};

const DEFAULT_TOKEN_GENERATOR = (): Promise<Token> =>
  Promise.resolve("AnObviouslyFakeToken");
// (new Promise((resolve, reject) =>
//   reject("TokenProvider must be used within a DomainProvider.")
// ));

const newTokenStateGenerator = (tokenGenerator: () => Promise<Token>) =>
  generateTokenState(undefined, tokenGenerator);

const DEFAULT_TOKENSTATE = newTokenStateGenerator(DEFAULT_TOKEN_GENERATOR);

const TokenContext = createContext<Promise<TokenState>>(DEFAULT_TOKENSTATE);
const TokenDispatchContext = createContext<
  (tokenGenerator: () => Promise<Token>) => void
>(DEFAULT_TOKEN_GENERATOR);
const LoginDispatchContext = createContext<LoginDispatch>(() => {});

export const TokenProvider: FC = ({ children }) => {
  const domain = useDomain();
  const [tokenState, dispatchTokenState] = useReducer(
    generateTokenState,
    newTokenStateGenerator(() => getLocalTokenOrGuestToken({ domain }))
  );

  const loginDispatch: LoginDispatch = (payload) => {
    dispatchTokenState(() => getLoggedInToken(payload));
  };

  useEffect(() => {
    dispatchTokenState(() => getLocalTokenOrGuestToken({ domain }));
  }, [domain]);

  return (
    <TokenContext.Provider value={tokenState}>
      <TokenDispatchContext.Provider
        value={(tokenGenerator: () => Promise<Token>) =>
          dispatchTokenState(tokenGenerator)
        }
      >
        <LoginDispatchContext.Provider value={loginDispatch}>
          {children}
        </LoginDispatchContext.Provider>
      </TokenDispatchContext.Provider>
    </TokenContext.Provider>
  );
};

export const useToken = contextConsumer(
  TokenContext,
  "useToken",
  "TokenProvider"
);

export const useTokenDispatch = contextConsumer(
  TokenDispatchContext,
  "useTokenDispatch",
  "TokenProvider"
);

export const useLoginDispatch = contextConsumer(
  LoginDispatchContext,
  "useLoginDispatch",
  "TokenProvider"
);
