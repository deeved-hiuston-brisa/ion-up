import { TemplateRef } from '@angular/core';

export type IonAlertStatus = 'success' | 'info' | 'warning' | 'negative';

export interface IonAlertProps {
  message?: string;
  customBody?: TemplateRef<void>;
  description?: string;
  type?: IonAlertStatus;
  closable?: boolean;
  hideBackground?: boolean;
  noRadius?: boolean;
}
