import type { Meta, StoryObj } from '@storybook/angular';

import { AvatarType, IonAvatarComponent } from '../lib/avatar';

const meta: Meta<IonAvatarComponent> = {
  title: 'Ion/Data Display/Avatar',
  component: IonAvatarComponent,
  tags: ['autodocs'],
  render: (args: IonAvatarComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['initials', 'photo', 'icon'],
      default: '',
      description: 'Tipo do avatar. Obrigatório.',
    },
    size: {
      control: 'text',
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: { summary: 'md' },
      description: 'Tamanho do botão. Pode ser `sm`, `md`, `lg` ou `xl`.',
    },
    value: {
      control: 'text',
      description:
        'Caso seja do tipo `initials`, o valor exibido será as iniciais do nome.',
    },
    image: {
      control: 'text',
      description: 'Caso seja do tipo `photo`, a imagem a ser exibida.',
    },
    onErrorImage: {
      control: 'text',
      description: 'Caso a imagem não seja carregada, a imagem a ser exibida.',
    },
  },
};

export default meta;
type Story = StoryObj<IonAvatarComponent>;

export const Initials: Story = {
  args: {
    type: AvatarType.initials,
    size: 'md',
    value: 'Anakin Skywalker',
  },
};

export const Photo: Story = {
  args: {
    type: AvatarType.photo,
    size: 'md',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/is-anakin-skywalker-in-ahsoka-hayden-christensen-star-wars-news-64e37d3227aec.png?crop=0.468xw:0.827xh;0.532xw,0.0510xh&resize=1200:*',
  },
};

export const Icon: Story = {
  args: {
    type: AvatarType.icon,
    size: 'md',
    icon: 'person',
  },
};

export const ErrorImage: Story = {
  args: {
    type: AvatarType.photo,
    size: 'md',
    image:
      'https://hips.hearstapps.com/hmg-prod/images/is-anakin-skywalker-in-ahsoka-hayden-christensen-star-wars-news-64e37d3227aec.png?crop=0.468xw:0.827xh;0.532xw,0.0510xh&resize=1200:*',
  },
};
