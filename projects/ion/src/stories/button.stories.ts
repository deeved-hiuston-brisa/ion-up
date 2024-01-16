import type { Meta, StoryObj } from '@storybook/angular';

import { IonComponent } from '../lib/ion.component';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta: Meta<IonComponent> = {
  title: 'Example/Ion Componet',
  component: IonComponent,
  tags: ['autodocs'],
  render: (args: IonComponent) => ({
    props: {
      backgroundColor: null,
      ...args,
    },
  }),
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<IonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
};

