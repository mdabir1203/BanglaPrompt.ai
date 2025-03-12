
import FeatureCard from "./FeatureCard";

const Features = () => {
  return (
    <section id="features" className="section bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="highlight-text">আমাদের কোর্স</span> সমূহ
          </h2>
          <p className="text-muted-foreground text-lg">
            আপনার প্রম্পট ইঞ্জিনিয়ারিং দক্ষতা উন্নত করতে আমাদের বিস্তৃত কোর্স সামগ্রী
            অন্বেষণ করুন
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="প্রম্পট ইঞ্জিনিয়ারিং ফান্ডামেন্টালস"
            description="প্রম্পট লেখার মৌলিক বিষয়গুলি এবং এআই মডেলগুলির জন্য ভাল প্রম্পট তৈরির টেকনিক শিখুন।"
            icon={
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            }
            iconClassName="bg-blue-500/10"
          />

          <FeatureCard
            title="উন্নত প্রম্পট কৌশল"
            description="এআই মডেলগুলির সাথে আরও ভালভাবে যোগাযোগ করতে উন্নত প্রম্পট ইঞ্জিনিয়ারিং কৌশলগুলি আয়ত্ত করুন।"
            icon={
              <svg
                className="w-6 h-6 text-violet-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            }
            iconClassName="bg-violet-500/10"
          />

          <FeatureCard
            title="সৃজনশীল লেখার প্রম্পট"
            description="কার্যকর সৃজনশীল লেখার জন্য প্রম্পট ডিজাইন করার পদ্ধতি শিখুন।"
            icon={
              <svg
                className="w-6 h-6 text-pink-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            }
            iconClassName="bg-pink-500/10"
          />

          <FeatureCard
            title="কোডিং এবং ডেভেলপমেন্ট"
            description="এআই এর সাহায্যে কোডিং এবং প্রোগ্রামিং চ্যালেঞ্জগুলি সমাধান করার জন্য প্রম্পট তৈরি করুন।"
            icon={
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            }
            iconClassName="bg-green-500/10"
          />

          <FeatureCard
            title="ইমেজ জেনারেশন"
            description="এআই ইমেজ জেনারেশন মডেলগুলির জন্য কার্যকরী প্রম্পট লেখার টেকনিক শিখুন।"
            icon={
              <svg
                className="w-6 h-6 text-orange-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
            iconClassName="bg-orange-500/10"
          />

          <FeatureCard
            title="এআই প্রোডাক্টিভিটি"
            description="দৈনন্দিন কাজে এআই-এর সাহায্যে দক্ষতা বাড়ানোর জন্য প্রম্পট তৈরি করুন।"
            icon={
              <svg
                className="w-6 h-6 text-teal-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            }
            iconClassName="bg-teal-500/10"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
