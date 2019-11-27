module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: ["@typescript-eslint", "tsc"],
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "tsc/config": [
      1,
      {
        configFile: "tsconfig.json"
      }
    ],
    "comma-dangle": 0,
    "react/prop-types": 1,
    "prettier/prettier": 1,
    "@typescript-eslint/no-unused-vars": 1
  }
};
