import React from "react";

type ArgOptions =
  | string
  | [boolean, string, string?]
  | ["!", string]
  | undefined;

type MappedValues<T> = [T, string][];

export function cond<T>(mappedValues: MappedValues<T>) {
  return function (matchedValue: T) {
    const match = mappedValues.find((v) => v[0] === matchedValue)?.[0];
    return match || "";
  };
}

// HOW IT WOULD BE USED

import { cond, join } from "my-tw-package";

type Variant = "primary" | "secondary" | "tertiary" | undefined;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  variant: Variant;
  loading?: boolean;
  // etc...
}

const variantClassNames = cond<Variant>([
  ["primary", "bg-blue-500"],
  ["secondary", "bg-red-500"],
  ["tertiary", "bg-green-300"],
  [undefined, "bg-gray-500"],
]);

const Button = (props: ButtonProps) => {
  const { variant, className, ...buttonProps } = props;

  const buttonClassNames = join(
    variantClassNames(variant),
    "text-lg rounded-lg etc...",
    className
  );
  return <button className={buttonClassNames} {...buttonProps} />;
};

// EXAMPLE
// type Variant = "primary" | "secondary" | "tertiary" | undefined;

// This should pass since all values in the variant type are accounted for
// and there are no unknown values as the first element of each nested array.
const pass = cond<Variant>([
  ["primary", "bg-blue-500"],
  ["secondary", "bg-red-500"],
  ["tertiary", "bg-green-300"],
  [undefined, "bg-gray-500"],
]);

// This should fail because primary is misspelled.
const fail1 = cond<Variant>([
  ["primmmary", "bg-blue-500"],
  ["secondary", "bg-red-500"],
  ["tertiary", "bg-green-300"],
  [undefined, "bg-gray-500"],
]);

// This should fail since "primary" is not accounted for.
const fail2 = cond<Variant>([
  ["secondary", "bg-red-500"],
  ["tertiary", "bg-green-300"],
  [undefined, "bg-gray-500"],
]);

// This should double fail because primary is misspelled and undefined is not accounted for.
const fail3 = cond<Variant>([
  ["primmmary", "bg-blue-500"],
  ["secondary", "bg-red-500"],
  ["tertiary", "bg-green-300"],
]);

export function join(...args: ArgOptions[]) {
  const overrides: string[] = [];
  return args.reduce((acc = "", value) => {
    if (typeof value === "string") {
      const trimmedString = value.replace(/\s+/g, " ");
      return `${acc} ${trimmedString}`;
    } else if (Array.isArray(value)) {
      const [condition, className] = value;
      if (condition === true) {
        return `${acc} ${className}`;
      } else if (condition === "!") {
        // eslint-disable-next-line functional/immutable-data
        overrides.push(className);
      }
    }
    return `${acc} ${overrides.join(" ")}`.replace(/\s+/g, " ");
  }, "") as string;
}

export function bool(...args: [boolean, string, string?]) {
  if (args[0]) {
    return args[1];
  } else if (args[2]) {
    return args[2];
  }
  return "";
}
