import type { Meta, StoryObj } from '@storybook/angular';

import { inputMockComponent } from '../lib/input/mock-input';

const meta: Meta<inputMockComponent> = {
  title: 'Ion/Data Entry/Input',
  component: inputMockComponent,
  tags: ['autodocs'],
  render: (args: inputMockComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<inputMockComponent>;
export const Default: Story = {
  args: {} as inputMockComponent,
};
