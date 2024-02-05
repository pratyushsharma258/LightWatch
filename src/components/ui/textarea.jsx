import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex w-full rounded-md border border-lightblue-200 bg-lightblue-500 px-3 py-2 text-sm ring-offset-lightblue placeholder:text-lightblue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-green-800 dark:bg-green-950 dark:ring-offset-green-950 dark:placeholder:text-green-400 dark:focus-visible:ring-green-300",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
