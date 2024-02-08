import { IonSwitchComponent } from '../lib/switch';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonSwitchComponent> = {
  title: 'Ion/Data Entry/Switch',
  component: IonSwitchComponent,
  tags: ['autodocs'],
  render: (args: IonSwitchComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    key: {
      control: {
        type: 'text',
      },
      description: 'Chave do switch.',
    },
    value: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Valor do switch.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg'],
      defaultValue: { summary: 'sm' },
      description: 'Tamanho do switch. Pode ser `sm`, `md` ou `lg`.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Desabilita o switch.',
    },
  },
};

export default meta;
type Story = StoryObj<IonSwitchComponent>;
export const Default: Story = {
  args: {
    key: 'Default',
    value: false,
    size: 'sm',
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    key: 'Medium',
    value: false,
    size: 'md',
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    key: 'Large',
    value: false,
    size: 'lg',
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    key: 'Checked',
    value: true,
    size: 'sm',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    key: 'Disabled',
    value: false,
    size: 'sm',
    disabled: true,
  },
};

export const CheckedDisabled: Story = {
  args: {
    key: 'CheckedDisabled',
    value: true,
    size: 'sm',
    disabled: true,
  },
};
