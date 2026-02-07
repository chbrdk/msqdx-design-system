"use client";

import React from "react";
import { MsqdxInput } from "../../atoms/Input/MsqdxInput";
import type { MsqdxInputProps } from "../../atoms/Input/MsqdxInput";

export type MsqdxSearchFieldProps = Omit<MsqdxInputProps, "type" | "startIcon"> & {
  /** Placeholder when empty. @default "Search…" */
  placeholder?: string;
};

/**
 * MsqdxSearchField
 *
 * Search input with search icon and token-based styling/animations.
 * Wraps MsqdxInput with type="search" and startIcon="Search".
 */
export const MsqdxSearchField = ({
  placeholder = "Search…",
  startIcon,
  ...props
}: MsqdxSearchFieldProps) => {
  return (
    <MsqdxInput
      {...props}
      type="search"
      startIcon={startIcon ?? "Search"}
      placeholder={placeholder}
      aria-label={props["aria-label"] ?? "Search"}
    />
  );
};
