import { AppError } from "./appError";
import config from "@/config/env";

export class ValidationError extends AppError {
  readonly name = "ValidationError";
  readonly statusCode = 400;
  readonly isOperational = true;

  constructor(message: string = "Validation failed") {
    super(message);
  }
}

export class NotFoundError extends AppError {
  readonly name = "NotFoundError";
  readonly statusCode = 404;
  readonly isOperational = true;

  constructor(message: string = "Resource not found") {
    super(message);
  }
}

export class InternalServerError extends AppError {
  readonly name = "InternalServerError";
  readonly statusCode = 500;
  readonly isOperational = false;

  constructor(message: string = "Internal server error") {
    super(message);
  }

  override toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      ...(config.nodeEnv === "development" && { stack: this.stack }),
    };
  }
}
