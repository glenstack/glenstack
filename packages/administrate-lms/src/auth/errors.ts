import { Domain } from "../providers/DomainProvider";
import { AdministrateLMSError } from "../errors";

export const DEFAULT_AUTHENTICATION_ERROR_MESSAGE =
  "An unknown authentication error has occurred.";

export class AuthenticationError extends AdministrateLMSError {
  constructor(message: string | undefined) {
    message = message || DEFAULT_AUTHENTICATION_ERROR_MESSAGE;
    super(message);
    this.name = "AuthenticationError";
  }
}

export class DomainNotFoundError extends AuthenticationError {
  constructor({ domain }: { domain: Domain }) {
    super(`The domain '${domain}' was not found.`);
    this.name = "DomainNotFoundError";
  }
}

export class LoginRateLimitError extends AuthenticationError {
  constructor({
    domain,
    timeoutSeconds,
  }: {
    domain: Domain;
    timeoutSeconds: number;
  }) {
    super(
      `Too many login attempts for domain '${domain}'. Try again in ${timeoutSeconds} seconds.`
    );
    this.name = "DomainNotFoundError";

    const now = new Date().getTime();
    const timeoutExpires = new Date(now + timeoutSeconds * 1000);
    this.metadata = {
      timeoutExpires,
    };
  }
}

export class LoginError extends AuthenticationError {
  constructor({ domain }: { domain: Domain }) {
    super(`The username/password was incorrect for the domain '${domain}'.`);
    this.name = "LoginError";
  }
}
