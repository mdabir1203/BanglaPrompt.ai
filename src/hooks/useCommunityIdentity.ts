import { useEffect, useState } from "react";
import { createScopedLogger } from "@/lib/logger";

const logger = createScopedLogger("community-identity");

const STORAGE_KEY = "promptbazaar.community.identity";
const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const generateIdentity = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  logger.warn("crypto.randomUUID unavailable, falling back to Math.random uuid");
  const random = Math.random().toString(16).slice(2);
  const timestamp = Date.now().toString(16);
  return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12).padEnd(4, "0")}-${
    random.slice(0, 4) || "abcd"
  }-${random.slice(4, 8) || "ef00"}-${random.slice(8, 20).padEnd(12, "0")}`;
};

const readStoredIdentity = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && UUID_REGEX.test(stored)) {
      return stored;
    }
  } catch (error) {
    logger.error("Failed to read community identity from storage", { error });
  }

  return null;
};

const persistIdentity = (identity: string) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, identity);
  } catch (error) {
    logger.error("Failed to persist community identity", { error });
  }
};

export const ensureCommunityIdentity = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = readStoredIdentity();
  if (stored) {
    return stored;
  }

  const identity = generateIdentity();
  persistIdentity(identity);
  return identity;
};

export const useCommunityIdentity = () => {
  const [identity, setIdentity] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const value = ensureCommunityIdentity();
      setIdentity(value);
    } finally {
      setIsReady(true);
    }
  }, []);

  return { identity, isReady } as const;
};

