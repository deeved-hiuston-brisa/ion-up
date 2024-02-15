import { inputMockComponent } from '../lib/input/mocks/mock-input';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<inputMockComponent> = {
  title: 'Ion/Data Entry/Input',
  component: inputMockComponent,
  tags: ['autodocs'],
  render: (args: inputMockComponent) => ({
    props: args,
  }),
  parameters: {
    document: ['input'],
    docs: {
      source: {
        code: `<input ionInput [type]="type" [(ngModel)]="value" />`,
      },
    },
  },
  argTypes: {
    value: {
      control: {
        type: 'text',
      },
      description: 'valor do input',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['text', 'password', 'number', 'email'],
      description: 'tipo do input',
    },
    invalid: {
      control: {
        type: 'boolean',
      },
      description: 'input invalido',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      description: 'placeholder do input',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      description: 'input desabilitado',
    },
    readonly: {
      control: {
        type: 'boolean',
      },
      description: 'input somente leitura',
    },
    maxlength: {
      control: {
        type: 'number',
      },
      description: 'tamanho maximo do input',
    },
    minlength: {
      control: {
        type: 'number',
      },
      description: 'tamanho minimo do input',
    },
  },
};

export default meta;
type Story = StoryObj<inputMockComponent>;
export const Default: Story = {
  args: {
    value: '',
    type: 'text',
    invalid: false,
    placeholder: 'placeholder',
    disabled: false,
    readonly: false,
    maxlength: 100,
    minlength: 0,
  },
};

export const Invalid: Story = {
  args: {
    value: '',
    type: 'text',
    invalid: true,
    placeholder: 'Aqui tem um placeholder',
    disabled: false,
    readonly: false,
    maxlength: 100,
    minlength: 0,
  },
};
