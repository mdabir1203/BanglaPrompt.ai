/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import type { BodyScroll } from "react-remove-scroll-bar/dist/es2015/component";
import {
  fullWidthClassName,
  noScrollbarsClassName,
  removedBarSizeVariable,
  zeroRightClassName,
} from "react-remove-scroll-bar/dist/es2015/constants.js";
import { getGapWidth } from "react-remove-scroll-bar/dist/es2015/utils.js";

import { createScopedLogger } from "@/lib/logger";

export { fullWidthClassName, noScrollbarsClassName, removedBarSizeVariable, zeroRightClassName, getGapWidth };
export type { BodyScroll };

export const lockAttribute = "data-scroll-locked";

const logger = createScopedLogger("safe-remove-scroll-bar");

const hasDom = () => typeof document !== "undefined" && !!document.body;

const readLockCount = () => {
  if (!hasDom()) {
    return 0;
  }

  const current = document.body.getAttribute(lockAttribute);
  if (!current) {
    return 0;
  }

  const parsed = Number.parseInt(current, 10);
  return Number.isFinite(parsed) ? parsed : 0;
};

export const useLockAttribute = () => {
  React.useEffect(() => {
    if (!hasDom()) {
      logger.debug("Skipping scroll lock attribute update because DOM is unavailable.");
      return undefined;
    }

    const nextCount = readLockCount() + 1;
    document.body.setAttribute(lockAttribute, nextCount.toString());

    return () => {
      const remaining = readLockCount() - 1;
      if (remaining <= 0) {
        document.body.removeAttribute(lockAttribute);
      } else {
        document.body.setAttribute(lockAttribute, remaining.toString());
      }
    };
  }, []);
};

type RemoveScrollModule = typeof import("react-remove-scroll-bar/dist/es2015/component.js");

let removeScrollModulePromise: Promise<RemoveScrollModule> | null = null;

const loadRemoveScrollModule = async () => {
  if (!removeScrollModulePromise) {
    removeScrollModulePromise = import("react-remove-scroll-bar/dist/es2015/component.js");
  }

  try {
    return await removeScrollModulePromise;
  } catch (error) {
    logger.error("Failed to load react-remove-scroll-bar implementation.", { error });
    removeScrollModulePromise = null;
    throw error;
  }
};

export const RemoveScrollBar: React.FC<BodyScroll> = (props) => {
  useLockAttribute();

  const [implementation, setImplementation] = React.useState<RemoveScrollModule["RemoveScrollBar"] | null>(null);

  React.useEffect(() => {
    if (!hasDom()) {
      logger.debug("Not loading RemoveScrollBar implementation without a DOM.");
      return undefined;
    }

    let cancelled = false;

    loadRemoveScrollModule()
      .then((module) => {
        if (cancelled) {
          return;
        }

        if (typeof module.RemoveScrollBar === "function") {
          setImplementation(() => module.RemoveScrollBar);
        } else {
          logger.error("react-remove-scroll-bar module did not export RemoveScrollBar.", {
            exportedKeys: Object.keys(module ?? {}),
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          logger.error("Falling back to no-op RemoveScrollBar due to loader failure.", { error });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (implementation) {
    return React.createElement(implementation, props);
  }

  return null;
};
