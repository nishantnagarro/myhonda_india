/**
 * Unified Domain Error Model
 * All network and infrastructure errors are mapped to this type before reaching usecases.
 */

export type ErrorCode =
  | "NETWORK_UNAVAILABLE"
  | "AUTH_UNAUTHORIZED"
  | "AUTH_FORBIDDEN"
  | "RATE_LIMITED_429"
  | "NOT_FOUND"
  | "VALIDATION_FAILED"
  | "SERVER_ERROR"
  | "UNKNOWN";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly statusCode?: number;
  readonly correlationId?: string;

  constructor(
    message: string,
    code: ErrorCode,
    statusCode?: number,
    correlationId?: string,
  ) {
    super(message);
    this.name = "AppError";
    this.code = code;
    this.statusCode = statusCode;
    this.correlationId = correlationId;
  }
}
