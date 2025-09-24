const LOG_LEVELS = ["debug", "info", "warn", "error"] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

const levelRank: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const normalizeLevel = (value: string | undefined): LogLevel | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();

  return LOG_LEVELS.find((level) => level === normalized);
};

const envLevel = normalizeLevel(
  typeof import.meta.env.VITE_LOG_LEVEL === "string"
    ? import.meta.env.VITE_LOG_LEVEL
    : undefined,
);
const fallbackLevel: LogLevel = import.meta.env.DEV ? "debug" : "info";
const activeLevel = envLevel ?? fallbackLevel;

const shouldLog = (level: LogLevel) => levelRank[level] >= levelRank[activeLevel];

const getConsoleMethod = (level: LogLevel): "debug" | "info" | "warn" | "error" => {
  switch (level) {
    case "error":
      return "error";
    case "warn":
      return "warn";
    case "info":
      return "info";
    default:
      return "debug";
  }
};

type LoggerMetadata = Record<string, unknown>;

type LoggerContext = Record<string, unknown>;

export type AppLogger = {
  debug: (message: string, metadata?: LoggerMetadata) => void;
  info: (message: string, metadata?: LoggerMetadata) => void;
  warn: (message: string, metadata?: LoggerMetadata) => void;
  error: (message: string, metadata?: LoggerMetadata) => void;
  child: (context: LoggerContext) => AppLogger;
};

const createLoggerInstance = (context: LoggerContext = {}): AppLogger => {
  const log = (level: LogLevel, message: string, metadata?: LoggerMetadata) => {
    if (!shouldLog(level)) {
      return;
    }

    const consoleMethod = getConsoleMethod(level);

    const mergedMetadata = {
      ...context,
      ...(metadata ?? {}),
    };

    const timestamp = new Date();
    const timeString = timestamp.toLocaleTimeString([], { hour12: false });

    const args: unknown[] = [
      `${timeString} [${level.toUpperCase()}] ${message}`,
    ];

    if (Object.keys(mergedMetadata).length > 0) {
      args.push(mergedMetadata);
    }

    const target = typeof console[consoleMethod] === "function" ? console[consoleMethod] : console.log;

    target.apply(console, args);
  };

  return {
    debug: (message, metadata) => log("debug", message, metadata),
    info: (message, metadata) => log("info", message, metadata),
    warn: (message, metadata) => log("warn", message, metadata),
    error: (message, metadata) => log("error", message, metadata),
    child: (childContext) => createLoggerInstance({ ...context, ...childContext }),
  };
};

const logger = createLoggerInstance({
  service: "promptbazaar-ui",
  environment: import.meta.env.MODE,
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

export default logger;
