import colors from "tailwindcss/colors";

type Value = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

const omittedColors = ["inherit", "current", "transparent", "black", "white"];
const greys = ["slate", "gray", "zinc", "neutral", "stone"];

const colorsOptions = Object.keys(colors).filter(
  (v) => !omittedColors.includes(v)
) as any[];
// ) as Omit<Array<keyof typeof colors>, (typeof omittedColors)[number]>;

export type RandomColor<T> = (typeof colorsOptions)[number] & T;

type Args = {
  shades?: Value[];
  colors?: RandomColor<Value>[];
};

export function randomTailwindColor(args: Args): RandomColor<Args["colors"]> {
  const len = colorsOptions.length;
  const randomColorIndex = Math.floor(Math.random() * len);
  const randomShadeIndex = Math.floor(Math.random() * len);
  const randomColor = colorsOptions[randomColorIndex] as "blue";
  return colors[randomColor][randomShadeIndex as 300];
}
