import winston from "winston";

const { combine, colorize, errors, printf, splat, timestamp, uncolorize } = winston.format;

const SPLAT = Symbol.for("splat");

const safeStringify = (value: Record<string, unknown>) => {
  const seen = new WeakSet<object>();

  try {
    return JSON.stringify(
      value,
      (_key, input) => {
        if (typeof input === "bigint") {
          return input.toString();
        }

        if (input instanceof Error) {
          return {
            message: input.message,
            name: input.name,
            stack: input.stack,
          };
        }

        if (typeof input === "object" && input !== null) {
          if (seen.has(input)) {
            return "[Circular]";
          }
          seen.add(input);
        }

        return input as unknown;
      },
      2,
    );
  } catch (error) {
    return JSON.stringify({
      message: "Failed to serialize log metadata",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

const consoleFormat = printf((info) => {
  const { level, message, timestamp: ts, stack, ...rest } = info as winston.Logform.TransformableInfo & {
    stack?: string;
    timestamp?: string;
  };

  const splatArgs = (info as Record<symbol, unknown>)[SPLAT] as unknown[] | undefined;

  const meta: Record<string, unknown> = { ...rest };

  delete (meta as { level?: unknown }).level;
  delete (meta as { message?: unknown }).message;
  delete (meta as { timestamp?: unknown }).timestamp;

  if (splatArgs?.length) {
    meta.arguments = splatArgs;
  }

  const hasMeta = Object.keys(meta).length > 0;
  const metaString = hasMeta ? ` ${safeStringify(meta)}` : "";

  const base = `${ts ?? ""} [${level}] ${message}`.trim();

  if (stack) {
    return `${base}${metaString ? ` ${metaString}` : ""}\n${stack}`;
  }

  return `${base}${metaString}`;
});

const allowedLevels = Object.keys(winston.config.npm.levels);

const envLevel = typeof import.meta.env.VITE_LOG_LEVEL === "string"
  ? import.meta.env.VITE_LOG_LEVEL.toLowerCase()
  : undefined;

const fallbackLevel = import.meta.env.DEV ? "debug" : "info";

const logLevel = (envLevel && allowedLevels.includes(envLevel)
  ? envLevel
  : fallbackLevel) as winston.LoggerOptions["level"];

const logger = winston.createLogger({
  level: logLevel,
  defaultMeta: {
    service: "banglaprompt-ui",
    environment: import.meta.env.MODE,
  },
  format: combine(errors({ stack: true }), splat()),
  transports: [
    new winston.transports.Console({
      format: combine(
        (import.meta.env.DEV ? colorize({ all: true }) : uncolorize()),
        timestamp({ format: "HH:mm:ss" }),
        consoleFormat,
      ),
    }),
  ],
});

let handlersRegistered = false;

export const registerGlobalLogHandlers = () => {
  if (handlersRegistered || typeof window === "undefined") {
    return;
  }

  handlersRegistered = true;

  window.addEventListener("error", (event) => {
    logger.error("Unhandled runtime error", {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error ?? event.message,
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    logger.error("Unhandled promise rejection", {
      reason: event.reason,
    });
  });
};

export const createScopedLogger = (scope: string) => logger.child({ scope });

export type AppLogger = winston.Logger;

export default logger;
