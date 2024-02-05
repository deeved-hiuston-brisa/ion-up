import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IonSpinnerProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-spinner',
  imports: [CommonModule],
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class IonSpinnerComponent {
  @Input() size?: IonSpinnerProps['size'] = 24;
  @Input() color: IonSpinnerProps['color'] = 'primary';
  @Input() customColor?: IonSpinnerProps['customColor'];
  @Input() text?: IonSpinnerProps['text'] = '';
  @Input() textSize?: IonSpinnerProps['textSize'] = 'sm';
}
