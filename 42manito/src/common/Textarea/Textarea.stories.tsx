import type { Meta, StoryObj } from '@storybook/react';
import Textarea from './Textarea';

const meta = {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
    autoSize: {
      control: 'boolean',
    },
    showCount: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '내용을 입력해주세요',
  },
};
