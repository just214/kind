import { noPublicSecrets } from "../src/rules/no-public-secrets";
import { RuleTester } from "eslint";
import { it } from "vitest";

const ruleTester = new RuleTester();

const validCases = [
  "process.env.SECRET",
  "process.env.SECRET_KEY",
  "process.env.API_SECRET",
  "process.env.API_SECRET_KEY",
];

const invalidCases = [
  // Gatsby
  "GATSBY_SECRET",
  "GATSBY_SECRET_KEY",
  "GATSBY_API_SECRET",
  "GATSBY_API_SECRET_KEY",
  "GATSBY_PASSWORD",
  "GATSBY_PASSWORD_KEY",
  "GATSBY_API_PASSWORD",
  "GATSBY_API_PASSWORD_KEY",
  "GATSBY_PW",
  "GATSBY_PW_KEY",
  "GATSBY_API_PW",
  "GATSBY_API_PW_KEY",
  // Vite
  "VITE_SECRET",
  // NextJS
  "NEXT_PUBLIC_SECRET",
  "NEXT_PUBLIC_SECRET_KEY",
  "NEXT_PUBLIC_API_SECRET",
  "NEXT_PUBLIC_API_SECRET_KEY",
  "NEXT_PUBLIC_API_PW",
  "NEXT_PUBLIC_API_PW_KEY",
  "NEXT_PUBLIC_PW",
  "NEXT_PUBLIC_PW_KEY",
  "NEXT_PUBLIC_API_PASSWORD",
  "NEXT_PUBLIC_API_PASSWORD_KEY",
  "NEXT_PUBLIC_PASSWORD",
  "NEXT_PUBLIC_PASSWORD_KEY",
  // Astro
  "PUBLIC_SECRET",
  "PUBLIC_SECRET_KEY",
  "PUBLIC_API_SECRET",
  "PUBLIC_API_SECRET_KEY",
  "PUBLIC_API_PASSWORD",
  "PUBLIC_API_PASSWORD_KEY",
  "PUBLIC_PASSWORD",
  "PUBLIC_PASSWORD_KEY",
  "PUBLIC_PW",
  "PUBLIC_PW_KEY",
  "PUBLIC_API_PW",
  "PUBLIC_API_PW_KEY",
];

const toCode = (testCase: any) => ({ code: testCase });

const valid = validCases.map(toCode);

const invalid = invalidCases
  .map(toCode)
  .map((code) => ({ ...code, errors: [{ messageId: "noPublicSecrets" }] }));

it("no-public-secrets", () => {
  ruleTester.run("no-public-secrets", noPublicSecrets, {
    valid,
    invalid,
  });
});
