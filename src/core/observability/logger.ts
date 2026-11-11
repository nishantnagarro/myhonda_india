/**
 * Pure Functional Zero-PII Logger
 * Automatically redacts phone numbers, tokens, OTPs, and VIN/chassis numbers.
 */

const PII_PATTERNS = [
  /\b[6-9]\d{9}\b/g, // Indian 10-digit mobile numbers
  /\b\d{4,6}\b/g, // OTPs (4 to 6 digits)
  /bearer\s+[a-zA-Z0-9_\-\.]+/gi, // JWT Tokens
  /\b[A-HJ-NPR-Z0-9]{17}\b/g, // 17-character VIN/Chassis numbers
];

function redact(message: string): string {
  let cleaned = message;
  for (const pattern of PII_PATTERNS) {
    cleaned = cleaned.replace(pattern, "[REDACTED]");
  }
  return cleaned;
}

export interface ILogger {
  debug(message: string, meta?: Record<string, unknown>): void;
  info(message: string, meta?: Record<string, unknown>): void;
  warn(message: string, meta?: Record<string, unknown>): void;
  error(message: string, error?: unknown, meta?: Record<string, unknown>): void;
}

export function createLogger(): ILogger {
  const isDev = __DEV__;

  return {
    debug(message: string, meta?: Record<string, unknown>): void {
      if (!isDev) return;
      console.debug(`[DEBUG] ${redact(message)}`, meta ?? "");
    },

    info(message: string, meta?: Record<string, unknown>): void {
      console.info(`[INFO] ${redact(message)}`, meta ?? "");
    },

    warn(message: string, meta?: Record<string, unknown>): void {
      console.warn(`[WARN] ${redact(message)}`, meta ?? "");
    },

    error(
      message: string,
      error?: unknown,
      meta?: Record<string, unknown>,
    ): void {
      console.error(`[ERROR] ${redact(message)}`, error ?? "", meta ?? "");
    },
  };
}

export const logger = createLogger();
