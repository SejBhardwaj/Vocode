import React from "react";
import {
  GlowingStarsBackgroundCard,
  GlowingStarsDescription,
  GlowingStarsTitle,
} from "./glowing-background-stars-card";
import { DisplayCardsDemo } from "./display-cards-demo";
import { Palette } from "lucide-react";

export function GlowingStarsDemo() {
  return (
    <div className="flex gap-8 items-center justify-center">
      {/* Smart Design System Card */}
      <GlowingStarsBackgroundCard>
        <GlowingStarsTitle>Smart Design System</GlowingStarsTitle>
        <div className="flex justify-between items-end">
          <GlowingStarsDescription>
            Intelligent design generation with modern UI patterns and responsive layouts
          </GlowingStarsDescription>
          <div className="h-8 w-8 rounded-full bg-[hsla(0,0%,100%,.1)] flex items-center justify-center">
            <Palette className="h-4 w-4 text-white" />
          </div>
        </div>
      </GlowingStarsBackgroundCard>

      {/* Display Cards Demo */}
      <DisplayCardsDemo />
    </div>
  );
}
