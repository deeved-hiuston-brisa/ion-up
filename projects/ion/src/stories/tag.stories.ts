import type { Meta, StoryObj } from '@storybook/angular';
import type { IonTagStatus } from '../lib/tag';
import { IonTagComponent } from '../lib/tag';
import { iconsPaths, IonIconComponent } from '../lib/icon';

const statusOptions: IonTagStatus[] = [
  'info',
  'negative',
  'neutral',
  'success',
  'warning',
];

const meta: Meta<IonTagComponent> = {
  title: 'Ion/Data Display/Tag',
  component: IonTagComponent,
  tags: ['autodocs'],
  render: (args: IonTagComponent) => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [IonIconComponent],
    },
  }),
  argTypes: {
    label: {
      description:
        'O parâmetro `label` é obrigatório e representa o texto que será apresentado na tag.',
    },
    icon: {
      options: Object.keys(iconsPaths),
      control: { type: 'select' },
      description:
        'O parâmetro `icon` representa o tipo de ícone que será exibido.',
    },
    status: {
      options: statusOptions,
      control: { type: 'radio' },
      description:
        'O parâmetro `status` representa o esquema de cor predefinido.',
      defaultValue: { summary: 'neutral' },
    },
    outline: {
      defaultValue: { summary: 'true' },
      control: { type: 'boolean' },
      options: true,
      description:
        'Um boolean que define se irá ter borda(por padrão vem verdadeiro, trazendo a `tag` com borda)',
    },
    color: {
      control: { type: 'color' },
      description: 'Que pode passar uma cor customizada para a `tag`',
    },
  },
};
export default meta;
type Story = StoryObj<IonTagComponent>;
export const Default: Story = {
  args: {
    label: 'Texto exemplo',
    status: 'neutral',
    outline: true,
  },
};
