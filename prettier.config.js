/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: "lf",
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/types/(.*)$",
    "^@/config/(.*)$",
    "^@/lib/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/ui/(.*)$",
    "^@/components/(.*)$",
    "^@/styles/(.*)$",
    "^@/app/(.*)$",
    "",
    "^[./]"
  ],
  importOrderBuiltinModulesToTop: true,
  importOrderCombineTypeAndValueImports: true,
  importOrderMergeDuplicateImports: true,
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5"
};
