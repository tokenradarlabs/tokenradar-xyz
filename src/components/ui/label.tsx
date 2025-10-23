"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

interface LabelProps extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  htmlFor?: string;
  error?: boolean;
}

export const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, error, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        error && "text-destructive",
        className
      )}
      {...props}
    />
  )
);

Label.displayName = LabelPrimitive.Root.displayName;
