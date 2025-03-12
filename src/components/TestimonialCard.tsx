
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarUrl?: string;
  className?: string;
}

const TestimonialCard = ({
  quote,
  name,
  role,
  avatarUrl,
  className,
}: TestimonialCardProps) => {
  return (
    <div
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col",
        className
      )}
    >
      <div className="mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-yellow-400 text-lg">
            ★
          </span>
        ))}
      </div>
      <p className="text-gray-700 mb-6 flex-grow">{quote}</p>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mr-3">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            name.charAt(0)
          )}
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
