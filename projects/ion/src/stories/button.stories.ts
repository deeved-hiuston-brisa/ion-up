import type { Meta, StoryObj } from '@storybook/angular';

import { IonButtonComponent } from '../lib/button';
import { EventEmitter } from '@angular/core';

const meta: Meta<IonButtonComponent> = {
  title: 'Ion/Navigation/Button',
  component: IonButtonComponent,
  tags: ['autodocs'],
  render: (args: IonButtonComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    label: {
      description: 'Rótulo do botão. Obrigatório.',
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['primary', 'secondary', 'ghost', 'dashed'],
      default: { summary: 'primary' },
      description:
        'Tipo do botão. Pode ser `primary`, `secondary`, `ghost` ou `dashed`.',
    },
    size: {
      control: {
        type: 'select',
      },
      options: ['sm', 'md', 'lg', 'xl'],
      defaultValue: { summary: 'md' },
      description: 'Tamanho do botão. Pode ser `sm`, `md`, `lg` ou `xl`.',
    },
    danger: {
      description: 'Indica se o botão representa um perigo.',
      defaultValue: { summary: false },
    },
    disabled: {
      description: 'Indica se o botão está desativado.',
      defaultValue: { summary: false },
    },
    loading: {
      description:
        'Indica que o botão está em espera. Ou seja, esperando algum processo terminar para que possa está pronto para uso.',
      defaultValue: { summary: false },
    },
    icon: {
      description:
        'Recebe um objeto que configura o ícone associado ao botão. `type` define o tipo de ícone a ser rederizado. `rightPosition` indica se o ícone deve ser renderizado a direita da label.',
    },
    ionOnClick: {
      action: { handles: 'click' },
      description:
        'Emite um evento quando o botão é clicado. Caso o botão esteja desabilitado, nenhum evento será disparado.',
    },
  },
};

export default meta;
type Story = StoryObj<IonButtonComponent>;
export const Default: Story = {
  args: {
    label: 'Play',
    danger: false,
    disabled: false,
    loading: false,
    size: 'md',
    type: 'dashed',
    icon: {
      type: 'play',
      rightPosition: false,
    },
  } as IonButtonComponent,
};
