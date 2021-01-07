import Nav from "components/Nav";
import React from "react";
import { Helmet } from "react-helmet-async";

const Layout = ({ children, title }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>PERN Store | {title || "Home"}</title>
        <meta
          name="description"
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta
          name="robots"
          content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link rel="canonical" href="https://yourapp.com" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PERN Store" />
        <meta
          property="og:description"
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta property="og:url" content="https://yourapp.com" />
        <meta property="og:site_name" content="PERN Store" />
        <meta property="og:image" content="yourimage.jpg" />
        <meta property="og:image:secure_url" content="yourimage.jpg" />
        <meta property="og:image:width" content="1280" />
        <meta property="og:image:height" content="720" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta name="twitter:title" content="PERN Store" />
        <meta name="twitter:image" content="yourimage.png" />
        <style type="text/css">{`
        html,body {
            height: 100%;
        }
    `}</style>
      </Helmet>
      <Nav />
      <div className="text-gray-700 mx-auto px-2 lg:px-56">
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
