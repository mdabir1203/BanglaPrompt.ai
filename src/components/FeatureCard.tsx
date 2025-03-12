
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  className,
  iconClassName,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "card p-6 hover:translate-y-[-5px] transition-all duration-300",
        className
      )}
    >
      <div
        className={cn(
          "w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4",
          iconClassName
        )}
      >
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
