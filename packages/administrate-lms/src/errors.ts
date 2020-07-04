// A human-readable error. All thrown instances (including those of Error types inheriting from this) must be safe to show to users.
export class AdministrateLMSError extends Error {
  public metadata?: Record<string, any>;

  constructor(message: string | undefined) {
    super(message || "An unknown error occurred.");
    this.name = "AdministrateLMSError";
  }
}
