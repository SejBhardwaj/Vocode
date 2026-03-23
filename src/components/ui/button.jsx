import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Enhanced Button Component
const EnhancedButton = React.forwardRef(({
  icon,
  title,
  subtitle,
  size = "md",
  gradientLight = { from: "from-indigo-500/40", via: "via-indigo-400/40", to: "to-indigo-500/60" },
  gradientDark = { from: "from-indigo-800/30", via: "via-black/50", to: "to-black/70" },
  className,
  children,
  ...props
}, ref) => {
  const sizes = {
    sm: "px-3 py-1.5 rounded-lg",
    md: "px-4 py-2 rounded-2xl",
    lg: "px-6 py-3 rounded-3xl",
  };

  // If no icon/title props are provided, render as a simple button with children
  if (!icon && !title && children) {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          "group relative overflow-hidden border-2 cursor-pointer transition-all duration-500 ease-out shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95",
          sizes[size],
          "border-indigo-500/40 bg-gradient-to-br",
          gradientLight.from, gradientLight.via, gradientLight.to,
          `dark:${gradientDark.from} dark:${gradientDark.via} dark:${gradientDark.to}`,
          className
        )}
      >
        {/* Moving gradient layer */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
        
        {/* Overlay glow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 via-indigo-300/10 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-center gap-2 text-white font-bold text-lg group-hover:text-white/90 transition-colors duration-300 drop-shadow-sm">
          {children}
        </div>
      </button>
    );
  }

  // Enhanced button with icon, title, and subtitle
  return (
    <button
      ref={ref}
      {...props}
      className={cn(
        "group relative overflow-hidden border-2 cursor-pointer transition-all duration-500 ease-out shadow-2xl hover:shadow-indigo-500/30 hover:scale-[1.02] hover:-translate-y-1 active:scale-95",
        sizes[size],
        "border-indigo-500/40 bg-gradient-to-br",
        gradientLight.from, gradientLight.via, gradientLight.to,
        `dark:${gradientDark.from} dark:${gradientDark.via} dark:${gradientDark.to}`,
        className
      )}
    >
      {/* Moving gradient layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-300/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
      
      {/* Overlay glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400/20 via-indigo-300/10 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        {/* Icon */}
        {icon && (
          <div className="p-1.5 rounded-md bg-gradient-to-br from-indigo-500/50 to-indigo-400/30 backdrop-blur-sm group-hover:from-indigo-400/60 group-hover:to-indigo-500/40 transition-all duration-300">
            {React.cloneElement(icon, {
              className: "w-4 h-4 text-white group-hover:text-white/90 transition-all duration-300 group-hover:scale-110 drop-shadow-lg",
            })}
          </div>
        )}
        
        {/* Texts */}
        {title && (
          <div className="flex-1 text-left">
            <p className="text-white font-bold text-sm group-hover:text-white/90 transition-colors duration-300 drop-shadow-sm">
              {title}
            </p>
            {subtitle && (
              <p className="text-white/70 text-xs group-hover:text-white/90 transition-colors duration-300">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Arrow */}
        <div className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className="w-3 h-3 text-white"
          >
            <path
              d="M9 5l7 7-7 7"
              strokeWidth={2}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
});

EnhancedButton.displayName = "EnhancedButton";

// Original button variants for backward compatibility
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const SimpleButton = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});
SimpleButton.displayName = "SimpleButton";

// Export the enhanced button as Button and default
export { EnhancedButton as Button, SimpleButton, buttonVariants };
export default EnhancedButton;
