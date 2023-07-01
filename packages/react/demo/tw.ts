type ArgOptions = string | string[] | undefined;

// Exports are cond, bool, last, and join

type MappedValues<T> = [T, string][];

export function cond<T>(mappedValues: MappedValues<T>) {
  return function (matchedValue: T) {
    const match = mappedValues.find((v) => v[0] === matchedValue)?.[0];
    return match || "";
  };
}

export function join(...args: ArgOptions[]) {
  const lastValues = [];
  return args.reduce((acc = "", value) => {
    if (typeof value === "string") {
      const trimmedString = value.replace(/\s+/g, " ");
      return `${acc} ${trimmedString}`;
    } else if (Array.isArray(value)) {
      if (value[0] === "!!!") {
        // eslint-disable-next-line functional/immutable-data
        lastValues.push(value[1]);
        return acc;
      } else {
        return `${acc} ${value.join(" ")}`;
      }
    }
    return (acc as string).concat(lastValues.join(" ")).replace(/\s+/g, " ");
  }, "");
}

export function last(...args: ArgOptions[]) {
  return ["!!!", join(...args)];
}

export function bool(...args: [boolean, string, string?]) {
  if (args[0]) {
    return args[1];
  } else if (args[2]) {
    return args[2];
  }
  return "";
}

// HOW IT WOULD BE USED

// import { cond, join } from "my-tw-package";

// type Variant = "primary" | "secondary" | "tertiary" | undefined;

// interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
//   variant: Variant;
//   loading?: boolean;
//   // etc...
// }

// const variantClassNames = cond<Variant>([
//   ["primary", "bg-blue-500"],
//   ["secondary", "bg-red-500"],
//   ["tertiary", "bg-green-300"],
//   [undefined, "bg-gray-500"],
// ]);

// const Button = (props: ButtonProps) => {
//   const { variant, className, ...buttonProps } = props;

//   const buttonClassNames = join(
//     variantClassNames(variant),
//     "text-lg rounded-lg etc...",
//     className
//   );
//   return <button className={buttonClassNames} {...buttonProps} />;
// };

// EXAMPLE
// type Variant = "primary" | "secondary" | "tertiary" | undefined;

// This should pass since all values in the variant type are accounted for
// and there are no unknown values as the first element of each nested array.
// const pass = cond<Variant>([
//   ["primary", "bg-blue-500"],
//   ["secondary", "bg-red-500"],
//   ["tertiary", "bg-green-300"],
//   [undefined, "bg-gray-500"],
// ]);

// // This should fail because primary is misspelled.
// const fail1 = cond<Variant>([
//   ["primmmary", "bg-blue-500"],
//   ["secondary", "bg-red-500"],
//   ["tertiary", "bg-green-300"],
//   [undefined, "bg-gray-500"],
// ]);

// // This should fail since "primary" is not accounted for.
// const fail2 = cond<Variant>([
//   ["secondary", "bg-red-500"],
//   ["tertiary", "bg-green-300"],
//   [undefined, "bg-gray-500"],
// ]);

// // This should double fail because primary is misspelled and undefined is not accounted for.
// const fail3 = cond<Variant>([
//   ["primmmary", "bg-blue-500"],
//   ["secondary", "bg-red-500"],
//   ["tertiary", "bg-green-300"],
// ]);
