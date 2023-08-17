import React, { ElementType } from "react";
import type { Meta, Story } from "@storybook/react";
import ManitoCard, { Props } from "./Card";

interface ExampleData {
  title: string;
  description: string;
}

// Props 타입에서 필요한 속성 정의에 따라 스토리용 인터페이스를 생성하세요.
interface StoryProps
  extends Omit<Props<ElementType, ExampleData>, "componentProps"> {}

const meta: Meta = {
  title: "ManitoCard",
  component: ManitoCard,
};

export default meta;

const Template: Story<StoryProps> = (args) => (
  <ManitoCard<ElementType, ExampleData> {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: (
    <div>
      <h2>제목</h2>
      <p>설명 내용</p>
    </div>
  ),
  data: {
    title: "샘플 제목",
    description: "샘플 설명",
  },
  onClick: (data) => {
    alert(`클릭됨! 제목: ${data.title}, 설명: ${data.description}`);
  },
  className: "p-4",
};

export const AdditionalStyle = Template.bind({});
AdditionalStyle.args = {
  ...Default.args,
  className: "p-4 bg-blue-500 text-white",
};
