module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: ["warn", "double", { allowTemplateLiterals: true }],
    "comma-dangle": 0,
    "react/prop-types": 1,
    "prettier/prettier": 1,
    "@typescript-eslint/no-unused-vars": 1
  }
};
