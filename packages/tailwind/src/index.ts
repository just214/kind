import { nextApp } from "./content";
import preset from "./preset";
import { colors, animations } from "./plugins";

export default {
  content: { nextApp },
  preset,
  plugins: [colors, animations],
};
