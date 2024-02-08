import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/angular';

import { SafeAny } from '../utils/safe-any';
import { IonSwitchComponent } from './switch.component';
import { SwitchSize } from './types';

let ionSwitch: HTMLElement;

const emitValue = {
  emit: jest.fn(),
} as SafeAny;

const sizes: SwitchSize[] = ['sm', 'md', 'lg'];

const sut = async (
  customProps: Partial<IonSwitchComponent> = {}
): Promise<HTMLElement> => {
  await render(IonSwitchComponent, {
    componentProperties: { ...customProps, atValueChange: emitValue },
  });
  return screen.getByTestId('ion-switch');
};

describe('IonSwitchComponent', () => {
  describe('General', () => {
    beforeEach(async () => {
      ionSwitch = await sut();
    });
    it('should render switch', async () => {
      expect(ionSwitch).toBeInTheDocument();
    });
    it('should render switch with default class', () => {
      expect(ionSwitch).toHaveClass('ion-switch');
    });
    it('should change class to active when switch is clicked', () => {
      fireEvent.click(ionSwitch);
      expect(ionSwitch).toHaveClass('ion-switch--active');
    });
    it('should remove active class when switch is clicked twice', () => {
      fireEvent.click(ionSwitch);
      expect(ionSwitch).toHaveClass('ion-switch--active');

      fireEvent.click(ionSwitch);
      expect(ionSwitch).toHaveClass('ion-switch');
    });
    it('should emit correct value when switch is clicked', () => {
      fireEvent.click(ionSwitch);
      expect(emitValue.emit).toHaveBeenCalledWith(true);

      fireEvent.click(ionSwitch);
      expect(emitValue.emit).toHaveBeenCalledWith(false);
    });
  });
  describe.each(sizes)('Sizes - %s', size => {
    beforeEach(async () => {
      ionSwitch = await sut({ size });
    });
    it(`should render a switch with size attribute and value '${size}'`, () => {
      expect(ionSwitch).toHaveAttribute('size', size);
    });
  });
  describe('Disabled', () => {
    it('should be enabled by default', async () => {
      ionSwitch = await sut();
      expect(ionSwitch).not.toBeDisabled();
    });
    it('should be disabled', async () => {
      ionSwitch = await sut({ disabled: true });
      expect(ionSwitch).toBeDisabled();
    });
  });
});

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonSwitchComponent],
  template: `
    <form [formGroup]="formGroup">
      <ion-switch formControlName="name" key="name"></ion-switch>
      <ion-switch formControlName="email" key="email"></ion-switch>
    </form>
  `,
})
class HostInputComponent {
  formGroup = new FormGroup({
    name: new FormControl(false),
    email: new FormControl({ value: false, disabled: true }),
  });
}

const sutHost = async (): Promise<RenderResult<HostInputComponent>> => {
  return render(HostInputComponent);
};

describe('SwitchComponent - Angular Forms', () => {
  let container: Element;

  beforeEach(async () => {
    ({ container } = await sutHost());
  });

  it('should render switch', () => {
    expect(container.querySelector('#name')).toBeInTheDocument();
  });
  it('should render component disabled', () => {
    expect(container.querySelector('#email')).toBeDisabled();
  });
  it('should change to active when click', () => {
    fireEvent.click(container.querySelector('#name')!);
    expect(container.querySelector('#name')).toHaveClass('ion-switch--active');
  });
});
