import type { Meta, StoryObj } from '@storybook/angular';
import { IonBreadcrumbComponent } from '../lib/breadcrumb';
import { IonIconComponent } from '../public-api';

const meta: Meta<IonBreadcrumbComponent> = {
  title: 'Ion/Navigation/Breadcrumb',
  component: IonBreadcrumbComponent,
  tags: ['autodocs'],
  render: (args: IonBreadcrumbComponent) => ({
    moduleMetadata: {
      imports: [IonIconComponent],
    },
    props: {
      ...args,
    },
    argTypes: {
      label: {
        description:
          'O parametro `label` é obrigatório e representa o texto que sera apresentado em cada breadcrumb.',
        control: 'text',
      },
      link: {
        description:
          'O parametro `link` é obrigatório e representa a url de cada breadcrumb.',
      },
    },
  }),
};

export default meta;

type Story = StoryObj<IonBreadcrumbComponent>;
export const Default: Story = {
  args: {
    breadcrumbs: [
      { label: 'Home', link: '/home' },
      { label: 'Recursos', link: '/recursos' },
      { label: 'Técnico', link: '/recursos/1' },
    ],
  },
};
