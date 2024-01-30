import { IconType } from '../icon';

export type IonTagStatus =
  | 'success'
  | 'info'
  | 'warning'
  | 'negative'
  | 'neutral';

export interface IonTagInterface {
  label: string;
  outline?: boolean;
  status?: IonTagStatus;
  icon?: IconType;
  color?: string;
}
