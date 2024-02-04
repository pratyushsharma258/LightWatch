import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-green-200 bg-green px-3 py-2 text-sm ring-offset-green file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-green-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-green-800 dark:bg-green-950 dark:ring-offset-green-950 dark:placeholder:text-green-400 dark:focus-visible:ring-green-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
