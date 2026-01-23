import { AppError } from "./appError";

export class ValidationError extends AppError {
  readonly nameError = "ValidationError";
  readonly statusCode = 400;
  readonly errors: Record<string, string[]>;

  constructor(
    message: string = "Validation failed",
    errors: Record<string, string[]> = {},
  ) {
    super(message);
    this.errors = errors;
  }
}

export class InternalServerError extends AppError {
  readonly nameError = "InternalServerError";
  readonly statusCode = 500;
  readonly errors: Record<string, string[]>;

  constructor(
    message: string = "Internal server error",
    errors: Record<string, string[]> = {},
  ) {
    super(message);
    this.errors = errors;
  }

  toJSON() {
    return {
      nameError: this.nameError,
      codeError: this.statusCode,
      errors: this.errors,
    };
  }
}
