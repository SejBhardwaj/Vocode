import { BentoGrid } from "./bento-grid";
import { GlowingStarsDemo } from "./glowing-stars-demo";
import {
  Mic,
  Zap,
  Globe,
  Code,
} from "lucide-react";

const voiceBuilderItems = [
  {
    title: "Voice Recognition",
    meta: "99.9% accuracy",
    description: "Advanced AI-powered speech recognition that understands natural language commands",
    icon: <Mic className="w-4 h-4 text-blue-500" />,
    status: "Live",
    tags: ["AI", "Speech", "NLP"],
    colSpan: 2,
    hasPersistentHover: true,
  },
  {
    title: "Instant Generation",
    meta: "< 30 seconds",
    description: "Lightning-fast website creation from voice commands to production-ready code",
    icon: <Zap className="w-4 h-4 text-yellow-500" />,
    status: "Active",
    tags: ["Speed", "Generation"],
  },
  {
    title: "Global Deployment",
    meta: "12 regions",
    description: "Worldwide CDN deployment with edge computing for optimal performance",
    icon: <Globe className="w-4 h-4 text-green-500" />,
    tags: ["CDN", "Performance"],
    colSpan: 2,
  },
  {
    title: "Clean Code Output",
    meta: "Production ready",
    description: "Generate semantic, accessible, and optimized code following best practices",
    icon: <Code className="w-4 h-4 text-purple-500" />,
    status: "Updated",
    tags: ["Quality", "Standards"],
  },
];

function BentoGridDemo() {
  return (
    <div className="space-y-8">
      <BentoGrid items={voiceBuilderItems} />
      <GlowingStarsDemo />
    </div>
  );
}

export { BentoGridDemo };
