import { Meta, StoryObj } from '@storybook/angular';
import { OpenModalComponent } from '../lib/modal/mock/open-modal.mock.component';
import {
  IonButtonComponent,
  IonModalComponent,
  IonModalService,
} from '../public-api';

const meta: Meta<OpenModalComponent> = {
  title: 'Ion/Data Display/Modal',
  component: OpenModalComponent,
  tags: ['autodocs'],
  render: args => ({
    props: {
      ...args,
    },
    moduleMetadata: {
      imports: [OpenModalComponent, IonButtonComponent],
      providers: [IonModalService],
    },
  }),
};
export default meta;

type Story = StoryObj<IonModalComponent>;
export const Service: Story = {};
