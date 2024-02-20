/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { IonSwitchProps } from './types';

@Component({
  standalone: true,
  imports: [CommonModule, NgClass],
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
  @HostBinding('attr.data-size')
  @Input()
  size: IonSwitchProps['size'] = 'sm';
  @Input() disabled: IonSwitchProps['disabled'] = false;
  @Output() atValueChange: IonSwitchProps['atValueChange'] =
    new EventEmitter<boolean>();

  onTouched = (): void => {};

  onChange = (value: boolean): void => {};

  writeValue(value: boolean): void {
    this.value = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  handleClick(value: boolean): void {
    this.value = !value;
    this.atValueChange.emit(this.value);
    this.onChange(this.value);
    this.onTouched();
  }
}
