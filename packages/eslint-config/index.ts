const path = require("path");

const rulesDirPlugin = require("eslint-plugin-rulesdir");

rulesDirPlugin.RULES_DIR = path.join(__dirname, "rules");

module.exports = {
  extends: [
    "eslint:recommended",
    "react-app", // See below
    "react-app/jest",
    "prettier",
    "plugin:jsx-a11y/recommended",
    "plugin:functional/recommended",
    "plugin:prettier/recommended", // Should always be last. Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["functional", "jsx-a11y", "prettier", "rulesdir"],
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off", // This rule prevents you from letting React component return types be inferred.
    "functional/no-expression-statement": "off", // This rule causes an error with ReactDOM.render()
    "functional/prefer-readonly-type": "off", // Off for now. Do we want to have to annotate everything with readonly? To be discussed.
    "functional/functional-parameters": "off", // This rule breaks things like the useEffect, which takes a callback with no parameters.
    "functional/no-mixed-type": "off", // This rules doesn't allow you to create a type alias for a component that mixes methods and values.
    "functional/prefer-type-literal": "off", // Interfaces are fine. Some people prefer to extend.
    "functional/no-conditional-statement": "off", // if statements are useful and quite nice for conditional component rendering logic.
    "functional/no-return-void": "off", // In React, you are often returning void. i.e. useState setters
    "functional/no-try-statement": "off", // What's wrong with a try/catch? They are very useful with async/await.
    "functional/no-expression-statements": "off",
    "functional/no-throw-statement": "off",
    "no-case-declarations": "off",
    "functional/no-conditional-statements": "off",
    "functional/prefer-immutable-types": "off",
    "functional/no-mixed-types": "off",
    "functional/immutable-data": [
      "warn",
      { ignorePattern: ["^module\\.exports"] },
    ],
    "no-console": ["error", { allow: ["error", "warn", "info"] }],
    "prettier/prettier": "error",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
    "rulesdir/no-public-secrets": "error",
    // only allow descriptive ts-expect-errors. Full Explanation https://github.com/APSPhysics/eslint-config/issues/5
    "@typescript-eslint/ban-ts-comment": [
      "error",
      { "ts-expect-error": "allow-with-description" },
    ],
    "sort-imports": ["error", { ignoreDeclarationSort: true }],
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
          "type",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        "newlines-between": "always",
        alphabetize: {
          order:
            "asc" /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
  },
  ignorePatterns: [
    "dist",
    "out",
    "node_modules",
    "examples",
    "scripts",
    "tailwind-config",
    "*.css",
    "*.svg",
  ],
};

/**
 * eslint-config-react-app
 * Docs:
 * https://www.npmjs.com/package/eslint-config-react-app
 *
 * Source:
 * https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js
 * This is a default eslint configuration created and maintained the Facebook team,
 * primarily for use with create-react-app.
 * This default configuration is well thought-out and actively maintained. It includes sensible rules for
 * React-specific apps, including hooks usage. It also includes accessibility rules via react-a11y as
 * well as rules for import statements and a few other niceties.
 */
