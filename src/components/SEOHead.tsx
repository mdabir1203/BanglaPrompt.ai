
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "PromptBazar.AI – Bangladesh’s first global AI prompt marketplace with live bidding",
  description =
    "Launch bilingual prompt storefronts, sell culturally rich AI workflows, trade in a live bidding exchange, and reach verified global buyers with transparent revenue tools and enterprise compliance.",
  keywords = "PromptBazar.AI, promptbazaar.ai, Bengali AI prompts, sell prompts, live bidding, global prompt marketplace, creator economy Bangladesh, enterprise AI localisation",
  image = "/og-image.png",
  url = "https://promptbazaar.ai/"
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
