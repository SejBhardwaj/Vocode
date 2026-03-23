import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

function DisplayCard({
  className,
  icon = <Sparkles className="size-4 text-blue-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "text-blue-500",
  titleClassName = "text-blue-500",
}) {
  return (
    <div
      className={cn(
        "relative flex h-36 w-[30rem] select-none flex-col justify-between rounded-xl border-2 bg-gray-900/95 px-4 py-3 transition-all duration-700 hover:border-white/20 hover:bg-gray-800/95 [&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      <div>
        <span className="relative inline-block rounded-full bg-blue-800 p-1">
          {icon}
        </span>
        <p className={cn("text-lg font-medium", titleClassName)}>{title}</p>
      </div>
      <p className="whitespace-nowrap text-lg">{description}</p>
      <p className="text-muted-foreground">{date}</p>
    </div>
  );
}

export default function DisplayCards({ cards }) {
  const defaultCards = [
    {
      className:
        "[grid-area:stack] float-card-1 transition-all duration-700",
    },
    {
      className:
        "[grid-area:stack] float-card-2 transition-all duration-700",
    },
    {
      className:
        "[grid-area:stack] float-card-3 transition-all duration-700",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
