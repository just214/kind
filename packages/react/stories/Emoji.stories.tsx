import { Emoji } from "../src/components/Emoji";

import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Emoji",
  component: Emoji,
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof Emoji>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Primary: Story = {
  args: {
    label: "Hello",
    symbol: "👋",
  },
};
