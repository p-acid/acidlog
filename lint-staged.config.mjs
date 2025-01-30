/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{ts,tsx}": [
    () => "tsc --project tsconfig.json",
    "prettier --write",
    "eslint --cache --fix",
  ],
};
