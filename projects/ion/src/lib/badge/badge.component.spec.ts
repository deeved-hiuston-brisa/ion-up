import { render, screen } from '@testing-library/angular';
import { IonBadgeComponent } from './badge.component';
import { IonBadgeProps } from './types';

const types: Array<IonBadgeProps['type']> = [
  'primary',
  'secondary',
  'neutral',
  'negative',
];

const sut = async (
  customProps: Partial<IonBadgeProps>
): Promise<HTMLElement> => {
  await render(IonBadgeComponent, {
    componentInputs: { ...customProps },
    autoDetectChanges: true,
  });

  return screen.getByTestId(`ion-badge-${customProps.label}`);
};

describe('IonBadgeComponent', () => {
  it.each(['text badge', 10, 30])(
    'should render a badge with label %s',
    async label => {
      await render(IonBadgeComponent, {
        componentInputs: { label },
      });
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  );

  it('should render 99+ when label is bigger than 99', async () => {
    await render(IonBadgeComponent, {
      componentInputs: { label: 1000 },
    });
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it.each(types)('should correctly render badge %s types.', async type => {
    expect(await sut({ label: `type`, type })).toHaveAttribute(
      'data-type',
      type
    );
  });
});
