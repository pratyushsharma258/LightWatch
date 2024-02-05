import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-lightblue-200 bg-lightblue-500 px-3 py-2 text-sm ring-offset-lightblue-450 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-lightblue-200 focus-visible:outline-none text-white focus-visible:ring-2 focus-visible:ring-lightblue-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:text-green-50 dark:border-green-800 dark:bg-green-950 dark:ring-offset-green-950 dark:placeholder:text-green-400 dark:focus-visible:ring-green-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
