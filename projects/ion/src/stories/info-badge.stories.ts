import { IonInfoBadgeComponent } from '../public-api';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonInfoBadgeComponent> = {
  title: 'Ion/Data Display/Info Badge',
  component: IonInfoBadgeComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['primary', 'success', 'info', 'warning', 'negative'],
      control: { type: 'radio' },
      description:
        'O parâmetro `variant` representa o esquema de cor predefinido.',
      defaultValue: { summary: 'primary' },
    },
    icon: {
      control: { type: 'text' },
      description:
        'O parâmetro `icon` representa o tipo de ícone que será exibido.',
    },
    text: {
      control: { type: 'text' },
      description: 'O parâmetro `text` representa o texto que será exibido.',
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
      description: 'O parâmetro `size` representa o tamanho do badge.',
      defaultValue: { summary: 'md' },
    },
  },
};

export default meta;
type Story = StoryObj<IonInfoBadgeComponent>;
export const Default: Story = {
  args: {
    variant: 'primary',
    icon: 'check',
    text: 'Lorem ipsum',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    icon: 'check-solid',
    variant: 'primary',
  },
};

export const Positive: Story = {
  args: {
    icon: 'check-solid',
    variant: 'success',
  },
};

export const Negative: Story = {
  args: {
    icon: 'close-solid',
    variant: 'negative',
  },
};

export const Warning: Story = {
  args: {
    icon: 'exclamation-solid',
    variant: 'warning',
  },
};

export const Info: Story = {
  args: {
    icon: 'info-solid',
    variant: 'info',
  },
};

export const WithText: Story = {
  args: {
    text: 'Lorem ipsum',
    variant: 'success',
  },
};
