import { IonSpinnerComponent } from '../lib/spinner';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonSpinnerComponent> = {
  title: 'Ion/Feedback/Spinner',
  component: IonSpinnerComponent,
  tags: ['autodocs'],
  render: (args: IonSpinnerComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: [24, 48, 72],
      defaultValue: { summary: 24 },
      description: 'Tamanho do spinner. Pode ser `24`, `48` ou `72`.',
    },
    color: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'danger'],
      defaultValue: { summary: 'primary' },
      description:
        'Cor do spinner. Pode ser `primary`, `secondary` ou `danger`.',
    },
    customColor: {
      description: 'Cor customizada do spinner.',
    },
    text: {
      description: 'Texto do spinner.',
    },
    textSize: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: { summary: 'sm' },
      description:
        'Tamanho do texto do spinner. Pode ser `sm`, `md`, `lg` ou `xl`.',
    },
  },
};

export default meta;
type Story = StoryObj<IonSpinnerComponent>;
export const Default: Story = {
  args: {
    size: 24,
    color: 'primary',
    customColor: '',
    text: '',
    textSize: 'sm',
  } as IonSpinnerComponent,
};
