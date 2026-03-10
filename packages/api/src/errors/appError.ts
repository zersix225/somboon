export abstract class AppError extends Error {
  abstract readonly statusCode: number;
  abstract override readonly name: string;
  abstract readonly isOperational: boolean;

  protected constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }

  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    stack?: string;
  } {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
    };
  }
}
