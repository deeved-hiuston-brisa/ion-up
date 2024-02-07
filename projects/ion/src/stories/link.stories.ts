import { IonLinkComponent } from '../lib/link';

import type { Meta, StoryObj } from '@storybook/angular';
import { iconsPaths } from '../public-api';

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
      options: [...Object.keys(iconsPaths)],
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
    target: {
      control: {
        type: 'select',
      },
      defaultValue: { summary: '_self' },
      options: ['_blank', '_self', '_parent', '_top'],
      description:
        'Link target. Can be `_blank`, `_self`, `_parent` or `_top`.',
    },
    link: {
      control: {
        type: 'text',
      },
      description: 'Link URL.',
    },
  },
};

export default meta;
type Story = StoryObj<IonLinkComponent>;
export const Default: Story = {
  args: {
    label: 'Link',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Link',
    size: 'md',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    size: 'sm',
  },
};

export const LeftIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    iconSide: 'left',
    size: 'sm',
  },
};

export const Bold: Story = {
  args: {
    label: 'Link',
    bold: true,
    size: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Link',
    disabled: true,
    size: 'sm',
  },
};

export const DisabledWithIcon: Story = {
  args: {
    label: 'Link',
    icon: 'box',
    disabled: true,
    size: 'sm',
  },
};

export const DisabledOnlyIcon: Story = {
  args: {
    icon: 'box',
    disabled: true,
    size: 'sm',
  },
};

export const WithTarget: Story = {
  args: {
    label: 'Link',
    target: '_blank',
    size: 'sm',
  },
};

export const WithLink: Story = {
  args: {
    label: 'Link',
    link: 'https://github.com/Brisanet/ion-plus',
    size: 'sm',
  },
};
