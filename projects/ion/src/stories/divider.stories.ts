import { IonDividerComponent } from '../lib/divider';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonDividerComponent> = {
  title: 'Ion/Design Tokens/Dividers',
  component: IonDividerComponent,
  tags: ['autodocs'],
  render: (args: IonDividerComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      description: 'Texto do divider.',
    },
    direction: {
      control: {
        type: 'select',
      },
      options: ['vertical', 'horizontal'],
      defaultValue: { summary: 'horizontal' },
      description: 'Direção do divider. Pode ser `vertical` ou `horizontal`.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['solid', 'dashed', 'text'],
      defaultValue: { summary: 'solid' },
      description: 'Tipo do divider. Pode ser `solid`, `dashed` ou `text`.',
    },
    margin: {
      description: 'Adiciona margem ao divider.',
    },
  },
};

export default meta;
type Story = StoryObj<IonDividerComponent>;
export const Default: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'solid',
    margin: false,
  } as IonDividerComponent,
};

export const Vertical: Story = {
  args: {
    label: 'Divider',
    direction: 'vertical',
    type: 'solid',
    margin: false,
  } as IonDividerComponent,
};

export const Dashed: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'dashed',
    margin: false,
  } as IonDividerComponent,
};

export const Text: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'text',
    margin: false,
  } as IonDividerComponent,
};

export const WithMargin: Story = {
  args: {
    label: 'Divider',
    direction: 'horizontal',
    type: 'solid',
    margin: true,
  } as IonDividerComponent,
};

export const VerticalWithMargin: Story = {
  args: {
    label: 'Divider',
    direction: 'vertical',
    type: 'solid',
    margin: true,
  } as IonDividerComponent,
};
