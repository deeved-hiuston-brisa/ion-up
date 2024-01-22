import { render, screen, fireEvent } from '@testing-library/angular';
import { IonButtonProps } from './types';
import { IonButtonComponent } from './button.component';
import { SafeAny } from '../utils/safe-any';

const defaultName = 'button';

const types: Array<IonButtonProps['type']> = [
  'primary',
  'secondary',
  'ghost',
  'dashed',
];

const sizes: Array<IonButtonProps['size']> = ['lg', 'md', 'sm', 'xl'];

const sut = async (customProps: IonButtonProps): Promise<HTMLElement> => {
  await render(IonButtonComponent, {
    componentProperties: customProps,
  });

  return screen.getByTestId(`ion-button-${customProps.label}`);
};

describe('IonButtonComponent', () => {
  it('should render a button with a custom label.', async () => {
    const textButton = 'Click here';
    const button = await sut({ label: textButton });
    expect(button.textContent).toContain(textButton);
  });

  it.each(types)('should correctly render button types.', async (type) => {
    expect(await sut({ label: defaultName, type })).toHaveClass(
      `ion-btn-${type}`
    );
  });

  it.each(types)(
    'should correctly render button types with the danger property.',
    async (type) => {
      expect(await sut({ label: defaultName, type, danger: true })).toHaveClass(
        `ion-btn-danger`
      );
    }
  );

  it.each(sizes)('should correctly render button sizes.', async (size) => {
    expect(await sut({ label: defaultName, size })).toHaveClass(
      `ion-btn-${size}`
    );
  });

  it('should render a button with a pencil icon.', async () => {
    const button = await sut({ label: 'Edit', icon: { type: 'pencil' } });
    expect(button.querySelector('ion-icon')).toBeTruthy();
    expect(
      button.querySelector('ion-icon')!.getAttribute('ng-reflect-type')
    ).toContain('pencil');
  });

  it('should render a button with an icon to the right of the label.', async () => {
    const button = await sut({
      label: 'Delete',
      icon: { type: 'trash', rightPosition: true },
    });
    const children = button.children;
    expect(children.length).toBe(2);
    expect(children[0].tagName.toLocaleLowerCase()).toBe('span');
    expect(children[1].tagName.toLocaleLowerCase()).toBe('ion-icon');
  });

  it('should trigger an event when the button is clicked.', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      ionOnClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(button);
    expect(clickEvent).toHaveBeenCalled();
  });

  it('should not trigger an event when the button is disabled.', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      disabled: true,
      ionOnClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    fireEvent.click(button);
    expect(clickEvent).not.toHaveBeenCalled();
  });
});
