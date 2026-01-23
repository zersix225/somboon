export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract readonly nameError: string;
  abstract readonly errors: Record<string, string[]>;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
