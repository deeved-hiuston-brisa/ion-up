import { IconType } from '../../icon';

export interface IonDropdownOption {
  label: string;
  value: unknown;
  icon?: IconType;
  selected?: boolean;
  disabled?: boolean;
  hovered?: boolean;
}

export interface IonDropdownConfig<T extends IonDropdownOption> {
  multiple?: boolean;
  clearButton?: boolean;
  maxSelected?: number;
  required?: boolean;
  closeOnScroll?: boolean;
  propLabel?: keyof T;
  noDataConfig?: {
    label?: string;
    iconType?: IconType;
  };
}

export interface IonDropdownProps<T extends IonDropdownOption> {
  options: T[];
  config: IonDropdownConfig<T>;
  loading: boolean;
}
