import { IonLinkComponent } from '../lib/link';

import type { Meta, StoryObj } from '@storybook/angular';

const meta: Meta<IonLinkComponent> = {
  title: 'Ion/Navigation/Link',
  component: IonLinkComponent,
  tags: ['autodocs'],
  render: (args: IonLinkComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      control: {
        type: 'text',
      },
      description: 'Link label.',
    },
    icon: {
      control: {
        type: 'select',
      },
      options: ['arrow-right', 'arrow-left'],
      description: 'Link icon.',
    },
    iconSide: {
      control: {
        type: 'select',
      },
      options: ['left', 'right'],
      defaultValue: { summary: 'right' },
      description: 'Link icon side. Can be `left` or `right`.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md'],
      defaultValue: { summary: 'sm' },
      description: 'Link size. Can be `sm` or `md`.',
    },
    bold: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Link bold font.',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: { summary: false },
      description: 'Link disabled.',
    },
  },
};

export default meta;
type Story = StoryObj<IonLinkComponent>;
export const Default: Story = {
  args: {
    label: 'Link',
    size: 'sm',
  } as IonLinkComponent,
};

export const Medium: Story = {
  args: {
    label: 'Link',
    size: 'md',
  } as IonLinkComponent,
};

export const WithIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    size: 'sm',
  } as IonLinkComponent,
};

export const LeftIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    iconSide: 'left',
    size: 'sm',
  } as IonLinkComponent,
};

export const Bold: Story = {
  args: {
    label: 'Link',
    bold: true,
    size: 'sm',
  } as IonLinkComponent,
};

export const Disabled: Story = {
  args: {
    label: 'Link',
    disabled: true,
    size: 'sm',
  } as IonLinkComponent,
};

export const DisabledWithIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    disabled: true,
    size: 'sm',
  } as IonLinkComponent,
};

export const DisabledOnlyIcon: Story = {
  args: {
    icon: 'box',
    disabled: true,
    size: 'sm',
  } as IonLinkComponent,
};
