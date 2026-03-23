import * as React from "react";
import { cva } from "class-variance-authority";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

// Defines variants for the status banner
const bannerVariants = cva(
  "flex items-center space-x-2 rounded-md p-3 text-sm",
  {
    variants: {
      status: {
        loading: "bg-white/10 text-white/70",
        success: "bg-green-500/20 text-green-300",
      },
    },
  }
);

const DownloadCard = React.forwardRef(({
  className,
  title = "Download",
  description = "Choose a download format",
  formats,
  status = "idle",
  loadingMessage = "Rendering Video, please wait...",
  successMessage = "Successfully Rendered",
  ...props
}, ref) => {
  const isInteractive = status === "idle";

  // Animation variants for the status banner
  const animationVariants = {
    initial: { opacity: 0, y: -20, height: 0 },
    animate: { opacity: 1, y: 0, height: "auto" },
    exit: { opacity: 0, y: 20, height: 0 },
  };

  return (
    <Card
      ref={ref}
      className={cn("w-full max-w-sm overflow-hidden", className)}
      {...props}
    >
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
        <CardDescription className="text-white/70">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative h-12">
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                className={cn(bannerVariants({ status: "loading" }))}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>{loadingMessage}</span>
              </motion.div>
            )}
            {status === "success" && (
              <motion.div
                key="success"
                className={cn(bannerVariants({ status: "success" }))}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {formats.map((format, index) => (
            <button
              key={index}
              onClick={format.onSelect}
              disabled={!isInteractive}
              aria-disabled={!isInteractive}
              className={cn(
                "flex flex-col items-center justify-center space-y-2 rounded-lg border bg-white/5 p-4 text-center transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                !isInteractive && "cursor-not-allowed opacity-50",
                status === 'idle' && 'border-blue-500/20 hover:border-blue-500/40'
              )}
            >
              <div className="text-white/60">{format.icon}</div>
              <span className="text-xs font-medium text-white">{format.name}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});

DownloadCard.displayName = "DownloadCard";

export { DownloadCard };
