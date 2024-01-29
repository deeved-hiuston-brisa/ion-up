import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { IonIconComponent } from '../icon';
import { IonButtonProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-button',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent {
  @Input() label!: IonButtonProps['label'];
  @Input() type: IonButtonProps['type'] = 'primary';
  @Input() danger: IonButtonProps['danger'] = false;
  @Input() disabled: IonButtonProps['disabled'] = false;
  @Input() loading: IonButtonProps['loading'] = false;
  @Input() size: IonButtonProps['size'] = 'md';
  @Input() icon?: IonButtonProps['icon'];
  @Input() shape?: IonButtonProps['shape'] = 'normal';
  @Output() ionOnClick: IonButtonProps['ionOnClick'] = new EventEmitter();
}
