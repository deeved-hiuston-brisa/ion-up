import { EventEmitter } from '@angular/core';
import { IconDirection } from '../icon';
import { IonButtonProps } from '../button';
import { SafeAny } from '../utils/safe-any';

export type InputType = 'text' | 'password' | 'number' | 'email';

export interface IonInputProps {
  key?: string;
  placeholder?: string;
  button?: string;
  iconInput?: string;
  disabled?: boolean;
  readonly?: boolean;
  iconDirection?: IconDirection;
  valid?: boolean;
  invalid?: boolean;
  inputButton?: boolean;
  clickButton?: EventEmitter<SafeAny>;
  inputButtonConfig?: IonButtonProps;
  value?: string;
  clearButton?: boolean;
  inputType?: InputType;
  valueChange?: EventEmitter<string>;
  maxLength?: string | number | null;
}
