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
