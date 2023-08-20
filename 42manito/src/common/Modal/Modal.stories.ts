import React from "react";
import type { Meta, Story, StoryObj } from "@storybook/react";
import ManitoModal, { Props } from "./Modal";
import dummy from "../../../public/panda-sing.json";
import ManitoLottieAnimation from "../LottieAnimation/LottieAnimation";

export default {
  title: "Common/Modal",
  component: ManitoModal,
  argTypes: {
    children: { control: "object" },
  },
} as Meta<Props>;

type Stroy = StoryObj<typeof ManitoModal>;

export const Default: Stroy = {
  args: {
    children: "Modal",
  },
};
