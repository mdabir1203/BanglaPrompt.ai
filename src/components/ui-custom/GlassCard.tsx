
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

const GlassCard = ({ children, className, hoverEffect = true }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative p-6 rounded-2xl backdrop-blur-md bg-white/10 border border-white/20 shadow-sm",
        hoverEffect && "transition-all duration-300 hover:shadow-lg hover:bg-white/20 hover:border-white/30",
        className
      )}
    >
      {children}
    </div>
  );
};

export default GlassCard;
