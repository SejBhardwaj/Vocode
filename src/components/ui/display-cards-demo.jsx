import DisplayCards from "./display-cards";
import { Mic, Zap, Globe } from "lucide-react";

const voiceBuilderCards = [
  {
    icon: <Mic className="size-4 text-blue-300" />,
    title: "Voice Commands",
    description: "Natural language processing",
    date: "Real-time",
    iconClassName: "text-blue-500",
    titleClassName: "text-blue-500",
    className:
      "[grid-area:stack] float-card-1 transition-all duration-700",
  },
  {
    icon: <Zap className="size-4 text-yellow-300" />,
    title: "Instant Build",
    description: "Lightning fast generation",
    date: "< 30 seconds",
    iconClassName: "text-yellow-500",
    titleClassName: "text-yellow-500",
    className:
      "[grid-area:stack] float-card-2 transition-all duration-700",
  },
  {
    icon: <Globe className="size-4 text-green-300" />,
    title: "Global Deploy",
    description: "Worldwide CDN network",
    date: "12 regions",
    iconClassName: "text-green-500",
    titleClassName: "text-green-500",
    className:
      "[grid-area:stack] float-card-3 transition-all duration-700",
  },
];

function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center">
      <div className="w-full max-w-3xl">
        <DisplayCards cards={voiceBuilderCards} />
      </div>
    </div>
  );
}

export { DisplayCardsDemo };
