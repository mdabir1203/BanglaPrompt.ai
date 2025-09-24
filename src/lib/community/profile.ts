import { createScopedLogger } from "@/lib/logger";

const logger = createScopedLogger("community-profile");

const DISPLAY_NAME_STORAGE_KEY = "promptbazaar.community.display_name";

export const getStoredCommunityDisplayName = () => {
  if (typeof window === "undefined") {
    return "";
  }

  try {
    return window.localStorage.getItem(DISPLAY_NAME_STORAGE_KEY) ?? "";
  } catch (error) {
    logger.error("Unable to read stored community display name", { error });
    return "";
  }
};

export const persistCommunityDisplayName = (value: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(DISPLAY_NAME_STORAGE_KEY, value);
  } catch (error) {
    logger.error("Unable to persist community display name", { error });
  }
};
