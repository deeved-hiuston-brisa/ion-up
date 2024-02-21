import { OpenPopoverComponent } from '../lib/popover/mocks/openPopover';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<OpenPopoverComponent> = {
  title: 'Ion/Data Display/Popover',
  component: OpenPopoverComponent,
  tags: ['autodocs'],
  render: (args: OpenPopoverComponent) => ({
    props: {
      ...args,
    },
  }),
};

export default meta;
type Story = StoryObj<OpenPopoverComponent>;
export const Default: Story = {};
