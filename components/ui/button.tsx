import * as React from "react";
import { Slot } from "radix-ui";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// shadcn/ui Button, plus brand variants for the contact buttons.
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold outline-none transition-[background-color,border-color,box-shadow,transform] duration-200 focus-visible:ring-[3px] focus-visible:ring-ring/40 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-black",
        outline:
          "border border-input bg-card text-foreground shadow-xs hover:border-foreground [&_svg]:text-muted-foreground",
        ghost:
          "font-medium text-muted-foreground hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground",
        linkedin: "border border-black/10 bg-linkedin text-white shadow-xs hover:bg-linkedin-hover",
        whatsapp: "border border-black/10 bg-whatsapp text-white shadow-xs hover:bg-whatsapp-hover",
        ink: "border border-black/10 bg-ink-button text-white shadow-xs hover:bg-black data-[state=open]:bg-black",
      },
      size: {
        default: "h-11 px-4 text-[15px]",
        lg: "h-12 px-4 text-base",
        sm: "h-9 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        md: "h-10 gap-1.5 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
