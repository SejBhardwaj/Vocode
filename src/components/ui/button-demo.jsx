import { Button } from "./button";
import { ArrowRight, Twitter, Zap, Star } from "lucide-react";

export default function ButtonDemo() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center mx-auto relative bg-black p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        {/* Enhanced Button with Icon and Title */}
        <Button 
          icon={<Twitter />}
          title="Twitter"
          subtitle="Join community"
          size="md"
        />
        
        {/* Enhanced Button with different styling */}
        <Button 
          icon={<Zap />}
          title="Get Started"
          subtitle="Start building today"
          size="lg"
          gradientLight={{ from: "from-blue-500/40", via: "via-blue-400/40", to: "to-blue-500/60" }}
          gradientDark={{ from: "from-blue-800/30", via: "via-black/50", to: "to-black/70" }}
        />
        
        {/* Simple Button with just children */}
        <Button size="md">
          <ArrowRight className="w-5 h-5" />
          Simple Button
        </Button>
        
        {/* Another enhanced button */}
        <Button 
          icon={<Star />}
          title="Premium"
          subtitle="Unlock all features"
          size="sm"
          gradientLight={{ from: "from-purple-500/40", via: "via-purple-400/40", to: "to-purple-500/60" }}
          gradientDark={{ from: "from-purple-800/30", via: "via-black/50", to: "to-black/70" }}
        />
      </div>
      
      {/* Background pattern */}
      <div 
        className="absolute w-full h-full -z-10"
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'4\\' height=\\'4\\' viewBox=\\'0 0 6 6\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Ccircle cx=\\'6\\' cy=\\'6\\' r=\\'1\\' fill=\\'%23aaa\\' fill-opacity=\\'0.25\\' /%3E%3C/svg%3E')",
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
}
