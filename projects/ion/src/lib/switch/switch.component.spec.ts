import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  fireEvent,
  render,
  RenderResult,
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

const getSwitchByTestId = (): HTMLElement => {
  return screen.getByTestId('ion-switch');
};

const sut = async (
  customProps: Partial<IonSwitchComponent> = {}
): Promise<ComponentFixture<IonSwitchComponent>> => {
  const { fixture } = await render(IonSwitchComponent, {
    componentProperties: { ...customProps, atValueChange: emitValue },
  });

  return fixture;
};

describe('IonSwitchComponent', () => {
  describe('General', () => {
    beforeEach(async () => {
      await sut();
    });
    it('should render switch', async () => {
      expect(getSwitchByTestId()).toBeInTheDocument();
    });
    it('should render switch with default class', () => {
      expect(getSwitchByTestId()).toHaveClass('ion-switch');
    });
    it('should change class to active when switch is clicked', () => {
      fireEvent.click(getSwitchByTestId());
      expect(getSwitchByTestId()).toHaveClass('ion-switch--active');
    });
    it('should remove active class when switch is clicked twice', () => {
      fireEvent.click(getSwitchByTestId());
      expect(getSwitchByTestId()).toHaveClass('ion-switch--active');

      fireEvent.click(getSwitchByTestId());
      expect(getSwitchByTestId()).toHaveClass('ion-switch');
    });
    it('should emit correct value when switch is clicked', () => {
      fireEvent.click(getSwitchByTestId());
      expect(emitValue.emit).toHaveBeenCalledWith(true);

      fireEvent.click(getSwitchByTestId());
      expect(emitValue.emit).toHaveBeenCalledWith(false);
    });
  });
  describe.each(sizes)('Sizes - %s', size => {
    beforeEach(async () => {
      ionSwitch = (await sut({ size })).nativeElement;
    });
    it(`should render a switch with size attribute and value '${size}'`, () => {
      screen.debug(ionSwitch, 1000000);
      expect(ionSwitch).toHaveAttribute('data-size', size);
    });
  });
  describe('Disabled', () => {
    it('should be enabled by default', async () => {
      await sut();
      expect(getSwitchByTestId()).not.toBeDisabled();
    });
    it('should be disabled', async () => {
      await sut({ disabled: true });
      expect(getSwitchByTestId()).toBeDisabled();
    });
  });
});

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonSwitchComponent],
  template: `
    <form [formGroup]="formGroup">
      <ion-switch formControlName="name" key="name" />
      <ion-switch formControlName="email" key="email" />
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
