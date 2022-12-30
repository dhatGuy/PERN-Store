module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 12,
  },
  parser: "babel-eslint",
  plugins: ["babel", "prettier"],
  rules: {
    "no-console": "warn",
    eqeqeq: "error",
    // "object-curly-spacing": ["error", "always"],
    // "arrow-spacing": ["error", { before: true, after: true }],
  },
};
