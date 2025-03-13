
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  className?: string;
  iconClassName?: string;
  example?: string;
  promptTips?: string[];
}

const FeatureCard = ({
  title,
  description,
  icon,
  className,
  iconClassName,
  example,
  promptTips,
}: FeatureCardProps) => {
  return (
    <div
      className={cn(
        "card p-6 hover:translate-y-[-5px] transition-all duration-300 rounded-xl border border-gray-100 shadow-sm bg-white",
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
      <p className="text-muted-foreground mb-4">{description}</p>
      
      {example && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">উদাহরণ:</h4>
          <p className="text-sm text-gray-600 whitespace-pre-line">{example}</p>
        </div>
      )}
      
      {promptTips && promptTips.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-semibold mb-2 text-gray-700">টিপস:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {promptTips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FeatureCard;
