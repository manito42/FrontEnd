import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import ManitoLottieAnimation, {
  Props as ManitoLottieAnimationProps,
} from "./LottieAnimation";
import dummy from "../../../public/panda-sing.json";

export default {
  title: "Components/ManitoLottieAnimation",
  component: ManitoLottieAnimation,
} as Meta;

const Template: StoryFn<ManitoLottieAnimationProps> = (args) => (
  <ManitoLottieAnimation {...args} />
);

export const Small = Template.bind({});
Small.args = {
  size: "small",
  animationData: dummy,
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
  animationData: dummy,
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
  animationData: dummy,
};
