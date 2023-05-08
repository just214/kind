# @just214/eslint-config

ESLint configuration for React and TypeScript projects

## Features

Linting rules for:

- TypeScript
- React and React Hooks
- A11y with React
- Testing with Jest
- Import statements
- Functional patterns
- Prettier/ESLint integration
- Environment variables

## Setup (required for installation)


## Installation

```sh
npm i -D @just214/eslint-config eslint prettier typescript
```

## Usage

Once the library and all required dependencies are installed, you can use the package by simply specifying this library in the [`extends`](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) property of your `.eslintrc` or `.eslintrc.js` file.

```json
{
  "extends": ["@just214"]
}
```

### Overwriting Rules

Any rule that is included with this library can be easily overwritten using the `rules` property in your `.eslintrc` or `.eslintrc.js` file:

```json
{
  "extends": ["@just214"],
  "rules": {
    "functional/no-mixed-type": "warn"
  }
}
```

Please refer to the documentation for each dependency to learn what options are available for each rule.

Here are some details about a few of our specific rules:

### `ban-ts-comment` rule

`@ts-ignore` allow errors to sneak into our code that could otherwise have been caught be TypeScript. It can be helpful during dev just to get things working, but it should never enter production code.

However, ignoring errors can be useful in rare cases. Some examples include:

- Third party libraries with incorrect types, but valid code
- Testing that incorrect arguments to a function are handled correctly or throw an Error

In these cases, we should use `@ts-expect-error`. The primary difference is that `@ts-ignore` will always ignore the error, but `@ts-expect-error` will notify developers if the underlying error has been resolved, e.g. if the external library updates its types. In this case, the code will still display a TS error, but this one indicating that the unused `@ts-expect-error` should be removed.

Additionally, the `@ts-expect-error` comment must include a description, so that future developers can understand what the underlying issue was and how it might have been resolved.

### `no-public-secrets` rule

#### Explanation

It's possible to expose secrets through the env with NextJS, Gatsby, Vite, and Astro by prepending the env with a term specific to the framework, `NEXT_PUBLIC_`, `GATSBY_`, `VITE_`, and `PUBLIC_`, respectively. If such an env is used in client-side code, the framework replaces the term, `process.env.PUBLIC_KEY` with the value at build time `MY_KEY_IN_PLAINTEXT`.

This rule checks any such variable names for red flags that hint that sensitive material is being sent to the browser, i.e. variable names containing the terms `SECRET`, `PASSWORD`, or `PW`. For example, `process.env.CLIENT_SECRET` would not be caught by the linter, since it cannot be used client-side, while `process.env.NEXT_PUBLIC_CLIENT_SECRET` or `process.env.NEXT_PUBLIC_DATABASE_PW` would.

#### Usage

```
{
  "plugins": ["local-rules"],
  "rules": {
    "local-rules/no-public-secrets": "error",
  }
}
```

#### Handling Errors

There are three options for handling an error from this rule:

1. Remove the prepend (recommended) - If the var does not need to be available server-side, remove the prepend
2. Rename the var - If the var does need to be available server-side, it probably shouldn't include terms like `SECRET`. Consider removing the problematic term AFTER confirming that the key should not be secret. Most likely, it should.
3. Disable the rule - Avoid this at all costs. Public secrets and/or passwords should never be allowed.

#### Caveats

**_Cannot Catch Every Secret Key Leak_**

This is not a perfect linting rule. For example, `NEXT_PUBLIC_TOTALLY_SAFE_KEY` could in fact contain a private key, but there's no way to know that. This rule attempts to supplement, not replace, developer judgement for when to send information to the browser.

<hr />

