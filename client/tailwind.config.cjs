const windmill = require("@windmill/react-ui/config");

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/@windmill/react-ui/lib/defaultTheme.js",
    "node_modules/@windmill/react-ui/dist/index.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

const windmillConfig = windmill(config);
delete windmillConfig.purge;

module.exports = {
  ...windmillConfig,
  ...config,
};
