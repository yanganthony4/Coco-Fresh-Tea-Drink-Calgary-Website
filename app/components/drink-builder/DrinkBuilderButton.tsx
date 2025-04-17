// src/components/DrinkBuilderButton.tsx
"use client";

import React from "react";
import Link from "next/link";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
  "aria-label"?: string;
};

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
    external?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
    external?: boolean;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

function isLinkProps(props: ButtonProps): props is ButtonAsLink {
  return typeof (props as ButtonAsLink).href === "string";
}

export function Button(props: ButtonProps) {
  const {
    children,
    className = "",
    variant = "default",
    "aria-label": ariaLabel,
  } = props;
  const baseStyles = "px-4 py-2 rounded-md font-medium transition-colors";
  const variants: Record<"default" | "outline", string> = {
    default: "bg-amber-500 text-white hover:bg-amber-600",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };
  const combinedClassName = `${baseStyles} ${variants[variant]} ${className}`.trim();

  // ---- Link variant ----
  if (isLinkProps(props)) {
    const { href, external, onClick } = props;

    // External anchor
    if (external) {
      return (
        <a
          href={href}
          className={combinedClassName}
          aria-label={ariaLabel}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    // Internal Next.js Link
    return (
      <Link href={href} legacyBehavior>
        <a
          className={combinedClassName}
          aria-label={ariaLabel}
          onClick={onClick}
        >
          {children}
        </a>
      </Link>
    );
  }

  // ---- Button variant ----
  const { onClick, type = "button", disabled, ...buttonRest } = props;
  return (
    <button
      type={type}
      className={combinedClassName}
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      {...buttonRest}
    >
      {children}
    </button>
  );
}
