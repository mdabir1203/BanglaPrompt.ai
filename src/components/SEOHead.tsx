
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "প্রম্পট শিক্ষা - বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শিখুন",
  description = "বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শিখুন। বিশেষজ্ঞ-ডিজাইন করা কোর্সগুলি আপনাকে AI মডেলগুলির সাথে কার্যকরভাবে যোগাযোগ করতে সাহায্য করবে।",
  keywords = "প্রম্পট ইঞ্জিনিয়ারিং, বাংলা AI কোর্স, ChatGPT বাংলা, AI শিক্ষা",
  image = "/og-image.png",
  url = "https://promptshiksha.com/"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;
