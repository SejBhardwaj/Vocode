import React from "react";
import { cn } from "@/lib/utils";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "./button";

export default function FUIPricingSectionWithBadge() {
  const plans = [
    {
      name: "Basic plan",
      desc: "Perfect for individuals and small projects getting started with AI-powered website building.",
      price: 12,
      isMostPop: false,
      features: [
        "5 AI-generated websites",
        "Basic voice commands",
        "Standard templates",
        "Email support",
        "Basic customization",
        "Mobile responsive",
        "SSL certificate",
      ],
    },
    {
      name: "Startup",
      desc: "Ideal for growing businesses and teams who need more advanced features and flexibility.",
      price: 35,
      isMostPop: true,
      features: [
        "Unlimited AI websites",
        "Advanced voice commands",
        "Premium templates",
        "Priority support",
        "Advanced customization",
        "Team collaboration",
        "Custom domains",
      ],
    },
    {
      name: "Enterprise",
      desc: "For large organizations requiring enterprise-grade features and dedicated support.",
      price: 60,
      isMostPop: false,
      features: [
        "Everything in Startup",
        "White-label solution",
        "API access",
        "Dedicated support",
        "Custom integrations",
        "Advanced analytics",
        "SLA guarantee",
      ],
    },
  ];

  return (
    <section className="py-14 pb-20 relative">
      <div className="relative max-w-7xl mx-auto px-4 text-gray-600 md:px-8 min-h-full">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200 font-geist tracking-tighter text-3xl font-semibold sm:text-5xl py-1 sm:py-2">
            Pricing for all sizes
          </h3>
          <div className="mt-3 max-w-xl text-black/40 dark:text-white/40 font-geist font-normal">
            <p>
              Choose the perfect plan for your needs. Start building AI-powered websites today with our flexible pricing options.
            </p>
          </div>
        </div>
        <div className="mt-16 flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 max-w-6xl mx-auto pb-16">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className="relative flex-1 flex items-stretch flex-col rounded-xl border-2 transform-gpu glass-card max-w-sm mx-auto lg:mx-0"
            >
              <div
                className={cn(
                  "p-8 pb-6 space-y-4 border-b border-white/10",
                  item.name === "Enterprise"
                    ? "glass-card-blue rounded-t-2xl"
                    : ""
                )}
              >
                <span className="text-blue-400 font-normal font-geist tracking-tight">
                  {item.name}
                </span>
                <div className="text-white text-3xl font-semibold">
                  ${item.price}{" "}
                  <span className="text-xl text-white/60 font-normal">/mo</span>
                </div>
                <p className="text-white/70">{item.desc}</p>
                <Button 
                  icon={<ArrowRight />}
                  title="Get Started"
                  size="sm"
                  className="w-full"
                  gradientLight={{ from: "from-blue-500/40", via: "via-blue-400/40", to: "to-blue-500/60" }}
                  gradientDark={{ from: "from-blue-800/30", via: "via-black/50", to: "to-black/70" }}
                />
              </div>
              <ul className="p-8 space-y-3">
                <li className="text-white pb-2 font-medium">
                  <p>Features</p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <Check className="h-5 w-5 text-blue-400" />
                    <span className="text-white/70">{featureItem}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
