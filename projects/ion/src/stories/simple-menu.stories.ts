import type { Meta, StoryObj } from '@storybook/angular';

import { IonSimpleMenuComponent } from '../lib/simple-menu';
import { IonButtonComponent } from '../public-api';

const meta: Meta<IonSimpleMenuComponent> = {
  title: 'Ion/Data Display/Simple Menu',
  component: IonSimpleMenuComponent,
  tags: ['autodocs'],
  render: (args: IonSimpleMenuComponent) => ({
    props: { ...args },
    moduleMetadata: {
      imports: [IonButtonComponent],
    },
  }),
  argTypes: {
    options: {
      description:
        'O parametro `options` representa a lista de opções que será exibida no menu.',
    },
    profile: {
      description:
        'O parametro `profile` representa o perfil do usuário que será exibido no menu. ',
    },
  },
};

export default meta;
type Story = StoryObj<IonSimpleMenuComponent>;
export const Default: Story = {
  args: {
    options: [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
      { label: 'Option 3', value: 'Option 3' },
    ],
    profile: {
      imageUrl:
        '"https://ovicio.com.br/wp-content/uploads/2022/01/20220123-rocket-raccoon-guardians-of-the-galaxy.jpeg"',
      name: 'User Name',
    },
  },
};
