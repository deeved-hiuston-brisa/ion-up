import { render, screen } from '@testing-library/angular';
import { IonBadgeComponent } from './badge.component';
import { IonBadgeProps } from './types';

const types: Array<IonBadgeProps['type']> = [
  'primary',
  'secondary',
  'neutral',
  'negative',
];

const sut = async (customProps: Partial<IonBadgeProps>): Promise<void> => {
  await render(IonBadgeComponent, {
    componentInputs: { ...customProps },
  });
};

describe('IonBadgeComponent', () => {
  it.each(['text badge', 10, 30])(
    'should render a badge with label %s',
    async label => {
      await sut({ label });
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  );

  it('should render 99+ when label is bigger than 99', async () => {
    await sut({ label: 1000 });
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it.each(types)('should correctly render badge %s types.', async type => {
    await sut({ label: type, type });
    expect(screen.getByTestId(`ion-badge-${type}`)).toHaveAttribute(
      'data-type',
      type
    );
  });
});
