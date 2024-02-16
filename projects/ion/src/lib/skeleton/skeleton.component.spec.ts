import { render, screen } from '@testing-library/angular';

import { IonSkeletonComponent } from './skeleton.component';

const defaultProps = {
  variant: 'rect',
  width: 50,
  height: 50,
} as IonSkeletonComponent;

const rectangularProps = {
  variant: 'rect',
  width: 400,
  height: 100,
} as IonSkeletonComponent;

const circularProps = {
  variant: 'circular',
  width: 50,
  height: 50,
} as IonSkeletonComponent;

const sut = async (customProps: IonSkeletonComponent): Promise<HTMLElement> => {
  await render(IonSkeletonComponent, {
    componentProperties: customProps,
  });
  return screen.findByTestId('ion-skeleton');
};

describe('SkeletonComponent', () => {
  it('should render correctly', async () => {
    await sut(defaultProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveClass('ion-skeleton');
  });

  it('should render rectagular skeleton', async () => {
    await sut(rectangularProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'width: 400px; height: 100px;'
    );
  });

  it('should render circular skeleton', async () => {
    await sut(circularProps);
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'border-radius: 50%'
    );
  });

  it('should accept custom border radius', async () => {
    await sut({
      variant: 'rect',
      width: 50,
      height: 50,
      radius: 12,
    } as IonSkeletonComponent);
    expect(screen.getByTestId('ion-skeleton')).toHaveStyle(
      'border-radius: 12px'
    );
  });
});
