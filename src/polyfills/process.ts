type ProcessEnv = Record<string, string | undefined>;

type BrowserWritable = {
  write: (...args: unknown[]) => void;
};

type ProcessLike = {
  env?: ProcessEnv;
  browser?: boolean;
  cwd?: () => string;
  on?: (...args: unknown[]) => void;
  removeListener?: (...args: unknown[]) => void;
  emit?: (...args: unknown[]) => boolean;
  listeners?: (...args: unknown[]) => unknown[];
  exit?: (code?: number) => void;
  nextTick?: (callback: (...args: unknown[]) => void, ...args: unknown[]) => void;
  pid?: number;
  version?: string;
  versions?: Record<string, string>;
  execPath?: string;
  getuid?: () => number;
  getgid?: () => number;
  stdout?: BrowserWritable;
  stderr?: BrowserWritable;
};

type BrowserProcess = Required<
  Omit<ProcessLike, "stdout" | "stderr" | "getuid" | "getgid">
> & {
  stdout?: BrowserWritable;
  stderr?: BrowserWritable;
  getuid?: () => number;
  getgid?: () => number;
};

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  const globalTarget = globalThis as typeof globalThis & { process?: ProcessLike };

  const existingProcess = globalTarget.process ?? {};

  const ensureNextTick =
    existingProcess.nextTick ??
    ((callback: (...args: unknown[]) => void, ...args: unknown[]) => {
      queueMicrotask(() => {
        callback(...args);
      });
    });

  const polyfilledProcess: BrowserProcess = {
    env: {
      ...(existingProcess.env ?? {}),
      NODE_ENV: existingProcess.env?.NODE_ENV ?? import.meta.env.MODE,
    },
    browser: true,
    cwd: existingProcess.cwd ?? (() => "/"),
    on: existingProcess.on ?? (() => undefined),
    removeListener: existingProcess.removeListener ?? (() => undefined),
    emit: existingProcess.emit ?? (() => false),
    listeners: existingProcess.listeners ?? (() => []),
    exit: existingProcess.exit ?? (() => undefined),
    nextTick: ensureNextTick,
    pid: existingProcess.pid ?? 0,
    version: existingProcess.version ?? "",
    versions: existingProcess.versions ?? {},
    execPath: existingProcess.execPath ?? "",
    getuid: existingProcess.getuid,
    getgid: existingProcess.getgid,
    stdout: existingProcess.stdout,
    stderr: existingProcess.stderr,
  };

  globalTarget.process = polyfilledProcess;
}

export {};
