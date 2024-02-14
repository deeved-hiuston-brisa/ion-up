import { Component, Input, OnInit } from '@angular/core';
import { IonMessageProps } from './types';
import { IonIconComponent } from '../icon';

const icontypes = {
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
})
export class IonMessageComponent implements OnInit {
  @Input() label!: IonMessageProps['label'];
  @Input() type?: IonMessageProps['type'] = 'positive';
  @Input() icon?: IonMessageProps['iconType'];

  setIcon(): void {
    this.icon = icontypes[this.type as keyof typeof icontypes];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
