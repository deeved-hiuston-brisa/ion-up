import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IonIconComponent } from '../icon';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonSwitchProps } from './types';

@Component({
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  selector: 'ion-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IonSwitchComponent,
      multi: true,
    },
  ],
})
export class IonSwitchComponent implements ControlValueAccessor {
  @Input() key!: IonSwitchProps['key'];
  @Input() value: IonSwitchProps['value'] = false;
  @Input() size: IonSwitchProps['size'] = 'sm';
  @Input() disabled: IonSwitchProps['disabled'] = false;
  @Output() atValueChange: IonSwitchProps['atValueChange'] =
    new EventEmitter<boolean>();

  onTouch = (): void => {};

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_value: boolean): void => {};

  // Allow Angular to set the value on the component
  writeValue(value: boolean): void {
    this.value = value;
    this.atValueChange.emit(value);
    this.executeFunction(this.onChange, value);
    this.executeFunction(this.onTouch);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  executeFunction(func: unknown, params?: unknown): void {
    if (typeof func === 'function') {
      func.bind(this)(params);
    }
  }
}
