import { Component, Input, OnInit } from '@angular/core';

import { IonIconComponent } from '../icon';
import { IonMessageProps } from './types';

const iconTypes = {
  positive: 'check-solid',
  negative_alert: 'exclamation-solid',
  negative_error: 'close-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  custom: 'plus-solid',
};

@Component({
  selector: 'ion-message',
  standalone: true,
  imports: [IonIconComponent],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss',
  host: {
    '[attr.data-type]': 'type',
  },
})
export class IonMessageComponent implements OnInit {
  @Input() label!: IonMessageProps['label'];
  @Input() type: IonMessageProps['type'] = 'positive';
  @Input() iconType?: IonMessageProps['iconType'];

  setIcon(): void {
    this.iconType = iconTypes[this.type as keyof typeof iconTypes];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
