// prettier.config.js
module.exports = {
  arrowParens: "always",
  singleQuote: true,
  jsxSingleQuote: true,
  semi: true,
  bracketSpacing: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  plugins: [require("prettier-plugin-tailwindcss")],
};
