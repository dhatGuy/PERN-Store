import { Helmet } from "react-helmet-async";

interface SEOHelmetProps {
  title?: string;
  description?: string;
}

export const SEOHelmet: React.FC<SEOHelmetProps> = ({
  title = "Home",
  description = "E-commerce store built with React, Node, Express and Postgres",
}) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title ?? "Home"} | PERN Store </title>
      <meta
        name="description"
        content={description ?? "E-commerce store built with React, Node, Express and Postgres"}
      />
      <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <link rel="canonical" href="https://pern-store.netlify.app/" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="PERN Store" />
      <meta
        property="og:description"
        content="E-commerce store built with React, Node, Express and Postgres"
      />
      <meta property="og:url" content="https://pern-store.netlify.app/" />
      <meta property="og:site_name" content="PERN Store" />
      <meta property="og:image" content="android-chrome-512x512.png" />
      <meta property="og:image:secure_url" content="android-chrome-512x512.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@_odunsi_" />
      <meta name="twitter:creator" content="@_odunsi_" />
      <meta
        name="twitter:description"
        content="E-commerce store built with React, Node, Express and Postgres"
      />
      <meta name="twitter:title" content="PERN Store" />
      <meta name="twitter:image" content="android-chrome-512x512.png" />
    </Helmet>
  );
};
