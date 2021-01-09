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
        <link rel="canonical" href="https://pern-store.netlify.app/" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PERN Store" />
        <meta
          property="og:description"
          content="Ecommerce store built with React, Node, Express and Postgres"
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
          content="Ecommerce store built with React, Node, Express and Postgres"
        />
        <meta name="twitter:title" content="PERN Store" />
        <meta name="twitter:image" content="android-chrome-512x512.png" />
        <style type="text/css">{`
        html,body, #root {
            height: 100%;
        }
    `}</style>
      </Helmet>
      <Nav />
      <div className="text-gray-700 h-full mx-auto px-2 lg:px-56">
        <main className="h-full">{children}</main>
      </div>
    </>
  );
};

export default Layout;
