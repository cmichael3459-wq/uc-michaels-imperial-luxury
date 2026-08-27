import * as React from "react";
import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full border border-line bg-ink-2 px-3.5 py-3 text-sm text-ivory placeholder:text-stone",
        "transition-[border-color,box-shadow] duration-150 ease-out",
        "focus-visible:border-champagne/50 focus-visible:outline-none focus-visible:shadow-[0_0_0_1px_var(--color-champagne)]",
        "disabled:opacity-40",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
