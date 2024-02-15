import { CommonModule } from '@angular/common';
import { RenderResult, render, screen } from '@testing-library/angular';

import { IonMessageComponent } from './message.component';
import { IonMessageProps, MessageStatusType } from './types';
import { IonIconComponent } from '../icon';

const defaultValue: IonMessageProps = {
  label: 'Message',
};

const messageIDs = {
  message: 'ion-message',
  iconStatus: 'message-ion',
};

export const icontypes = [
  'custom',
  'positive',
  'negative_alert',
  'negative_error',
  'warning',
  'info',
];

const sut = async (
  customProps: IonMessageProps = defaultValue
): Promise<{
  fixture: RenderResult<IonMessageComponent>;
  element: HTMLElement;
}> => {
  const fixture = await render(IonMessageComponent, {
    componentProperties: customProps,
    imports: [CommonModule, IonIconComponent],
  });
  const element = fixture.fixture.nativeElement as HTMLElement;
  return {
    fixture,
    element,
  };
};

describe('MessageComponent', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should render woth default positive class', async () => {
    expect(screen.getByTestId('ion-message')).toHaveClass('positive');
  });

  it('should have a message', async () => {
    expect(screen.getAllByText(defaultValue.label)).toHaveLength(1);
  });
});

describe('', () => {
  it.each(icontypes)('should render %s type', async (type: string) => {
    const { fixture, element } = await sut({
      ...defaultValue,
      type: type as MessageStatusType,
    });
    fixture.detectChanges();
    expect(element.getAttribute('data-type')).toBe(`${type}`);
  });
});
