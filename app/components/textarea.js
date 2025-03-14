"use client";

import * as React from "react";
import { cn } from "../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder-gray text-black focus-visible:outline-orange-500 focus-visible:ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-100",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
