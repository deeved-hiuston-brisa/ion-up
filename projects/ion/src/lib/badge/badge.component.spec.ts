import { render, screen } from '@testing-library/angular';
import { IonBadgeComponent } from './badge.component';
import { IonBadgeProps } from './type';

const types: Array<IonBadgeProps['type']> = [
  'primary',
  'secondary',
  'neutral',
  'negative',
];

const sut = async (customProps: IonBadgeProps): Promise<HTMLElement> => {
  await render(IonBadgeComponent, {
    componentProperties: customProps,
    autoDetectChanges: true,
  });

  return screen.getByTestId(`ion-badge-${customProps.label}`);
};

describe('IonBadgeComponent', () => {
  it.each(['text badge', 10, 30])(
    'should render a badge with label %s',
    async label => {
      const { fixture } = await render(IonBadgeComponent, {
        componentInputs: { label },
      });
      const componentInstance = fixture.componentInstance;
      expect(componentInstance.label).toBe(label);
    }
  );

  it('should render 99+ when label is bigger than 99', async () => {
    const { fixture } = await render(IonBadgeComponent, {
      componentInputs: { label: 1000 },
    });
    const componentInstance = fixture.componentInstance;
    expect(componentInstance.label).toBe('99+');
  });

  it.each(types)('should correctly render badge %s types.', async type => {
    expect(await sut({ label: `type`, type })).toHaveAttribute(
      'data-type',
      type
    );
  });

  it('should throw an error when the label property is not configured', async () => {
    try {
      await render(IonBadgeComponent, {
        componentProperties: { label: ' ' },
      });
    } catch (e) {
      expect((e as unknown as Error).message).toBe(`Label can't be empty!`);
    }
  });
});
