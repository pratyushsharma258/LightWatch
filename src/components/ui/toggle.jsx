import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors hover:bg-lightblue-100 hover:text-lightblue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lightblue-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-lightblue-100 data-[state=on]:text-lightblue-900 dark:ring-offset-green-950 dark:hover:bg-green-800 dark:hover:text-green-400 dark:focus-visible:ring-green-300 dark:data-[state=on]:bg-green-800 dark:data-[state=on]:text-green-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-lightblue-200 bg-transparent hover:bg-lightblue-100 hover:text-lightblue-900 dark:border-green-800 dark:hover:bg-green-800 dark:hover:text-green-50",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
