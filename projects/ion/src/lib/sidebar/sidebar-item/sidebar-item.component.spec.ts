import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from '../../utils/safe-any';
import { IonSidebarItemComponent } from './sidebar-item.component';

const defaultTestId = 'ion-sidebar-item';
const defaultClass = 'ion-sidebar-item';

const sut = async (
  props: Partial<IonSidebarItemComponent> = {}
): Promise<void> => {
  await render(IonSidebarItemComponent, {
    componentProperties: { ...props },
  });
};

describe('SidebarItem', () => {
  it('should render sidebar item', async () => {
    await sut();
    expect(screen.getByTestId(defaultTestId)).toBeInTheDocument();
  });
  it('should render a given text', async () => {
    const title = 'Título';
    await sut({ title });
    expect(screen.getByTestId(defaultTestId)).toHaveTextContent(title);
  });
  it('should render a given icon', async () => {
    const icon = 'pencil';
    await sut({ icon });
    expect(document.getElementById(`ion-icon-${icon}`)).toBeInTheDocument();
  });
  it('should render unselected by default', async () => {
    await sut();
    expect(screen.getByTestId(defaultTestId)).toHaveClass(defaultClass);
  });
  it('should render selected when prop is passed as true', async () => {
    await sut({ selected: true });
    expect(screen.getByTestId(defaultTestId)).toHaveClass(
      `${defaultClass}--selected`
    );
  });
  it('should select on click', async () => {
    await sut({ selected: false });
    const element = screen.getByTestId(defaultTestId);
    await userEvent.click(element);
    expect(element).toHaveClass(`${defaultClass}--selected`);
  });
  it('should render disabled when prop is passed as true', async () => {
    await sut({ disabled: true });
    expect(screen.getByTestId(defaultTestId)).toBeDisabled();
  });
  it('should render block icon when disabled', async () => {
    await sut({ disabled: true });
    expect(document.getElementById('ion-icon-block')).toBeInTheDocument();
  });
  it('should emit an event when click', async () => {
    const emit = jest.fn();
    await sut({ ionOnClick: { emit } as SafeAny });
    await userEvent.click(screen.getByTestId(defaultTestId));
    expect(emit).toHaveBeenCalled();
  });
});
