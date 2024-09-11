import { IonDropdownConfig } from './types';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonDropdownComponent } from './dropdown.component';
import { IonDropdownProps, IonDropdownOption } from '.';
import { SafeAny } from '../../utils/safe-any';
import { ComponentFixture } from '@angular/core/testing';

interface MockOption extends IonDropdownOption {
  name?: string;
}

const mockOptions: MockOption[] = [
  { label: 'Option 1', value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const mockOptionsWithDisabled: MockOption[] = [
  { label: 'Option 1', disabled: true, selected: true, value: 1 },
  { label: 'Option 2', value: 2 },
  { label: 'Option 3', value: 3 },
];

const mockOptionsWithSelected: MockOption[] = [
  { label: 'Option 1', selected: true, value: 1 },
  { label: 'Option 2', selected: false, value: 2 },
  { label: 'Option 3', selected: false, value: 3 },
];

const mockOptionsWithPropLabel: MockOption[] = [
  { label: 'Option 1', name: 'Name 1', value: 1 },
  { label: 'Option 2', name: 'Name 2', value: 2 },
  { label: 'Option 3', name: 'Name 3', value: 3 },
];

const MockOptionsWithIcons = mockOptions.map(option => {
  return {
    ...option,
    icon: 'box',
  };
});

const sut = async (customProps: Partial<IonDropdownProps<MockOption>> = {}) => {
  const { optionsChange, ...rest } = customProps;
  const { fixture } = await render(IonDropdownComponent, {
    componentInputs: {
      ...rest,
    },
    componentOutputs: {
      optionsChange: {
        emit: optionsChange || jest.fn(),
      } as SafeAny,
    },
  });
  return fixture;
};

describe('IonDropdownComponent', () => {
  let fixture: ComponentFixture<IonDropdownComponent<IonDropdownOption>>;
  const mockEmission = jest.fn();

  describe('Default props', () => {
    beforeEach(async () => {
      fixture = await sut({
        options: mockOptions,
        optionsChange: mockEmission as SafeAny,
      });
    });

    afterEach(() => {
      mockEmission.mockClear();
    });

    it('should render the dropdown component', () => {
      expect(screen.getByTestId('ion-dropdown')).toBeVisible();
    });

    it.each(mockOptions)('should render $label label', ({ label }) => {
      const currentOption = screen.getByText(label);

      expect(currentOption).toBeVisible();
    });

    it('should select an option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(1);
    });

    it('should show a check icon when an option is selected', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);

      const checkIcon = document.getElementById('ion-icon-check');

      expect(checkIcon).toBeVisible();
    });

    it('should change the check icon to close when hovering a selected option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);
      fireEvent.mouseEnter(firstOption);

      const closeIcon = document.getElementById('ion-icon-close');

      expect(closeIcon).toBeVisible();
    });

    it('should not show an icon when hovering an unselected option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);
      fireEvent.mouseEnter(firstOption);
      const closeIcon = document.getElementById('ion-icon-close');

      expect(closeIcon).toBeFalsy();
    });

    it('should unselect an option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);
      fireEvent.click(firstOption);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(0);
    });

    it('should not render options with icons when no icon is provided', () => {
      const optionIcon = document.getElementById('ion-icon-box');

      expect(optionIcon).toBeFalsy();
    });

    it('should emit the options array when option changes', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);

      expect(mockEmission).toHaveBeenCalledWith(mockOptionsWithSelected);
    });

    it('should show the loading spinner when loading', () => {
      fixture.componentInstance.loading.set(true);
      fixture.detectChanges();
      const spinnerComponent = screen.getByTestId('ion-spinner');

      expect(spinnerComponent).toBeVisible();
    });
  });

  describe('Without data', () => {
    it('should show the no data component when an empty array of options is provided', async () => {
      await sut({
        options: [],
      });

      const noDataComponent = screen.getByTestId('no-data-component');

      expect(noDataComponent).toBeVisible();
    });
  });

  describe('Option with icon', () => {
    it('should render options with icons when informed', async () => {
      await sut({
        options: MockOptionsWithIcons,
      });

      const optionIcon = document.getElementById('ion-icon-box');

      expect(optionIcon).toBeVisible();
    });
  });

  describe('Disabled option', () => {
    beforeEach(async () => {
      fixture = await sut({
        options: mockOptionsWithDisabled,
        optionsChange: mockEmission as SafeAny,
      });
    });

    it('should disable an option when informed', async () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      expect(firstOption).toHaveClass('dropdown-menu__item--disabled');
    });

    it('should not show the close icon when hovering a disabled option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);
      fireEvent.mouseEnter(firstOption);
      const closeIcon = document.getElementById('ion-icon-close');

      expect(closeIcon).toBeFalsy();
    });

    it('should not emit when clicking a disabled option', async () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);

      expect(mockEmission).not.toHaveBeenCalled();
    });

    it('should not unselect a disabled option that is selected', () => {
      fixture.componentInstance.config.set({
        multiple: true,
        clearButton: true,
      });

      fixture.detectChanges();

      const clearButton = screen.getByTestId('ion-button-Limpar');

      fireEvent.click(clearButton);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(1);
    });
  });

  describe('PropLabel', () => {
    it.each(mockOptionsWithPropLabel)(
      'should render propLabel $name as label',
      async ({ name }) => {
        fixture = await sut({
          options: mockOptionsWithPropLabel,
          optionsChange: mockEmission as SafeAny,
        });

        const config: IonDropdownConfig<MockOption> = {
          propLabel: 'name',
        };

        fixture.componentInstance.config.set(config);
        fixture.detectChanges();

        const currentOption = screen.getByText(name!);

        expect(currentOption).toBeVisible();
      }
    );
  });

  describe('Required', () => {
    it('should not unselect when there is only one option selected and is required mode', async () => {
      fixture = await sut({
        options: mockOptions,
      });

      fixture.componentInstance.config.set({
        required: true,
      });

      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);
      fireEvent.click(firstOption);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(1);
    });
  });

  describe('Multiple selection', () => {
    beforeEach(async () => {
      fixture = await sut({
        options: mockOptions,
        optionsChange: mockEmission as SafeAny,
      });

      fixture.componentInstance.config.set({ multiple: true });
    });

    afterEach(() => {
      mockEmission.mockClear();
    });

    it('should select more than one option', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);
      const secondOption = screen.getByTestId(`dropdown-item-2`);

      fireEvent.click(firstOption);
      fireEvent.click(secondOption);

      const selectedOptions = document.getElementsByClassName(
        'dropdown-menu__item--selected'
      );

      expect(selectedOptions.length).toBe(2);
    });

    it('should emit the options array when option changes', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);
      const secondOption = screen.getByTestId(`dropdown-item-2`);

      fireEvent.click(firstOption);
      fireEvent.click(secondOption);

      expect(mockEmission).toHaveBeenCalledTimes(2);
    });

    it('should not show clear button by default', () => {
      const firstOption = screen.getByTestId(`dropdown-item-1`);

      fireEvent.click(firstOption);

      const clearButton = screen.queryByTestId('clear-button');

      expect(clearButton).not.toBeInTheDocument();
    });

    describe('With clear button', () => {
      beforeEach(() => {
        fixture.componentInstance.config.update(prevOptions => {
          return {
            ...prevOptions,
            clearButton: true,
          };
        });
      });

      it('should not show clear button when informed and no option is selected', () => {
        const clearButton = screen.queryByTestId('ion-button-Limpar');

        expect(clearButton).not.toBeInTheDocument();
      });

      it('should show clear button when informed and an option is selected', () => {
        const firstOption = screen.getByTestId(`dropdown-item-1`);

        fireEvent.click(firstOption);

        const clearButton = screen.getByTestId('ion-button-Limpar');

        expect(clearButton).toBeInTheDocument();
      });

      it('should clear all options when clicked', () => {
        const firstOption = screen.getByTestId(`dropdown-item-1`);
        const secondOption = screen.getByTestId(`dropdown-item-2`);

        fireEvent.click(firstOption);
        fireEvent.click(secondOption);

        const clearButton = screen.getByTestId('ion-button-Limpar');

        fireEvent.click(clearButton);

        const selectedOptions = document.getElementsByClassName(
          'dropdown-menu__item--selected'
        );

        expect(selectedOptions.length).toBeFalsy();
      });
    });

    describe('With Max Selected', () => {
      it('should not select after the max selected is reached', () => {
        fixture.componentInstance.config.update(prevOptions => {
          return {
            ...prevOptions,
            maxSelected: 2,
          };
        });

        const firstOption = screen.getByTestId(`dropdown-item-1`);
        const secondOption = screen.getByTestId(`dropdown-item-2`);
        const thirdOption = screen.getByTestId(`dropdown-item-3`);

        fireEvent.click(firstOption);
        fireEvent.click(secondOption);
        fireEvent.click(thirdOption);

        const selectedOptions = document.getElementsByClassName(
          'dropdown-menu__item--selected'
        );

        expect(selectedOptions.length).toBe(2);
      });
    });

    describe('Required', () => {
      it('should not unselect when there is only one option selected and is required mode', () => {
        fixture.componentInstance.config.update(prevOptions => {
          return {
            ...prevOptions,
            required: true,
          };
        });

        const firstOption = screen.getByTestId(`dropdown-item-1`);
        const secondOption = screen.getByTestId(`dropdown-item-2`);

        fireEvent.click(firstOption);
        fireEvent.click(secondOption);
        fireEvent.click(firstOption);
        fireEvent.click(secondOption);

        const selectedOptions = document.getElementsByClassName(
          'dropdown-menu__item--selected'
        );

        expect(selectedOptions.length).toBe(1);
      });
    });
  });
});
