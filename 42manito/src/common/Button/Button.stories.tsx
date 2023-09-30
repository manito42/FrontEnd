import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";
import { ButtonType } from "@/Types/General/ButtonType";

const meta: Meta<typeof Button> = {
  title: "Button",
  component: Button,
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Button",
  },
  parameters: {
    layout: "centered",
  },
};

export const Accept: Story = {
  args: {
    children: "Button",
    buttonType: ButtonType.ACCEPT,
  },
  parameters: {
    layout: "centered",
  },
};
