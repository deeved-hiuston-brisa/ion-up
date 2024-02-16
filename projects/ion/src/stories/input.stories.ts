import { inputMockComponent } from '../lib/input/mocks/mock-input';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<inputMockComponent> = {
  title: 'Ion/Data Entry/Input',
  component: inputMockComponent,
  render: (args: inputMockComponent) => ({
    props: { ...args },
  }),
  tags: ['autodocs'],
  argTypes: {
    invalid: {
      control: {
        type: 'boolean',
      },
      description: 'input invalido',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'input desabilitado',
    },
  },
};

export default meta;
type Story = StoryObj<inputMockComponent>;
export const Default: Story = {
  parameters: {
    document: ['input'],
    docs: {
      source: {
        code: `<input ionInput />`,
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    document: ['input'],
    docs: {
      source: {
        code: `<input ionInput disabled />`,
      },
    },
  },
};

export const Invalid: Story = {
  args: {
    invalid: true,
  },
  parameters: {
    document: ['input'],
    docs: {
      source: {
        code: `<input ionInput [invalid]="true" />`,
      },
    },
  },
};
