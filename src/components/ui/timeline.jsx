"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Check,
  Clock,
  AlertCircle,
  X,
  Calendar,
  User,
  MapPin,
  MessageSquare,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
} from "lucide-react";

const timelineVariants = cva("relative flex flex-col", {
  variants: {
    variant: {
      default: "gap-4",
      compact: "gap-2",
      spacious: "gap-8",
    },
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "vertical",
  },
});

const timelineItemVariants = cva("relative flex gap-3 pb-2", {
  variants: {
    orientation: {
      vertical: "flex-row",
      horizontal: "flex-col min-w-64 shrink-0",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

const timelineConnectorVariants = cva("transition-all duration-700 ease-out", {
  variants: {
    orientation: {
      vertical: "absolute left-4 top-12 w-px h-full",
      horizontal: "absolute top-4 left-10 h-px w-full",
    },
    status: {
      default: "bg-gray-700",
      completed: "bg-blue-500",
      active: "bg-blue-500",
      pending: "bg-gray-700",
      error: "bg-red-500",
      scrollCompleted: "bg-blue-500",
    },
  },
  defaultVariants: {
    orientation: "vertical",
    status: "default",
  },
});

const timelineIconVariants = cva(
  "flex shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium transition-all duration-500 ease-out",
  {
    variants: {
      status: {
        default: "h-8 w-8 border-gray-600 bg-gray-800 text-gray-400",
        completed: "h-8 w-8 border-blue-500 bg-blue-500 text-white",
        active: "h-8 w-8 border-blue-400 bg-gray-800 text-blue-400 animate-pulse",
        pending: "h-8 w-8 border-gray-600 bg-gray-800 text-gray-400",
        error: "h-8 w-8 border-red-500 bg-red-500 text-white",
        scrollCompleted: "h-8 w-8 border-blue-500 bg-blue-500 text-white scale-110 shadow-lg shadow-blue-500/50",
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

function getStatusIcon(status) {
  switch (status) {
    case "completed":
      return <Check className="h-3 w-3" />;
    case "active":
      return <Clock className="h-3 w-3" />;
    case "pending":
      return <Clock className="h-3 w-3" />;
    case "error":
      return <X className="h-3 w-3" />;
    default:
      return <div className="h-2 w-2 rounded-full bg-current" />;
  }
}

function formatTimestamp(timestamp) {
  if (!timestamp) return "";
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Timeline({
  items,
  className,
  variant,
  orientation = "vertical",
  showConnectors = true,
  showTimestamps = true,
  timestampPosition = "top",
  ...props
}) {
  const [completedItems, setCompletedItems] = useState(new Set());
  const timelineRef = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;

      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const triggerPoint = scrollTop + windowHeight * 0.6; // Trigger when item is 60% up the screen

      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const itemTop = ref.offsetTop + timelineRef.current.offsetTop;
          if (triggerPoint >= itemTop) {
            setCompletedItems(prev => new Set([...prev, index]));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getItemStatus = (index, originalStatus) => {
    if (completedItems.has(index)) {
      return 'scrollCompleted';
    }
    return 'default'; // Start all as default (gray circles with original icons)
  };

  const getItemIcon = (index, item) => {
    if (completedItems.has(index)) {
      return <Check className="h-3 w-3" />;
    }
    return item.icon; // Show original icon until scrolled
  };

  const getConnectorStatus = (index) => {
    if (completedItems.has(index)) {
      return 'scrollCompleted';
    }
    return 'default';
  };

  const getConnectorHeight = (index) => {
    if (completedItems.has(index)) {
      return 'h-full';
    }
    return 'h-0';
  };

  const timelineContent = (
    <div
      ref={timelineRef}
      className={cn(
        timelineVariants({ variant, orientation }),
        orientation === "horizontal" ? "pb-4" : ""
      )}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          ref={el => itemRefs.current[index] = el}
          className={cn(timelineItemVariants({ orientation }))}
        >
          {/* Connector Line */}
          {showConnectors && index < items.length - 1 && (
            <div
              className={cn(
                timelineConnectorVariants({
                  orientation,
                  status: getConnectorStatus(index),
                }),
                getConnectorHeight(index)
              )}
            />
          )}

          {/* Icon */}
          <div className="relative z-10 flex shrink-0 min-w-[2rem]">
            <div className={cn(timelineIconVariants({ status: getItemStatus(index, item.status) }))}>
              {getItemIcon(index, item)}
            </div>
          </div>

          {/* Content */}
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            {/* Timestamp - Top */}
            {showTimestamps &&
              timestampPosition === "top" &&
              item.timestamp && (
                <time className="text-xs text-gray-400 mb-1">
                  {formatTimestamp(item.timestamp)}
                </time>
              )}

            {/* Title and Inline Timestamp */}
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-medium leading-tight text-white">{item.title}</h3>
              {showTimestamps &&
                timestampPosition === "inline" &&
                item.timestamp && (
                  <time className="shrink-0 text-xs text-gray-400">
                    {formatTimestamp(item.timestamp)}
                  </time>
                )}
            </div>

            {/* Description */}
            {item.description && (
              <p className="text-sm text-gray-400 leading-relaxed">
                {item.description}
              </p>
            )}

            {/* Custom Content */}
            {item.content && <div className="mt-3">{item.content}</div>}

            {/* Timestamp - Bottom */}
            {showTimestamps &&
              timestampPosition === "bottom" &&
              item.timestamp && (
                <time className="text-xs text-gray-400">
                  {formatTimestamp(item.timestamp)}
                </time>
              )}
          </div>
        </div>
      ))}
    </div>
  );

  if (orientation === "horizontal") {
    return (
      <ScrollArea
        orientation="horizontal"
        className={cn("w-full", className)}
        {...props}
      >
        {timelineContent}
      </ScrollArea>
    );
  }

  return (
    <div className={className} {...props}>
      {timelineContent}
    </div>
  );
}

export {
  timelineVariants,
  timelineItemVariants,
  timelineConnectorVariants,
  timelineIconVariants,
};
