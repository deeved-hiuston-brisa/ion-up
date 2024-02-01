import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { IonIconComponent } from '../icon';
import { Icon, Size, Type } from './types';

@Component({
  standalone: true,
  selector: 'ion-button',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent {
  @Input() label!: string;
  @Input() type: Type = 'primary';
  @Input() danger = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() size: Size = 'md';
  @Input() icon?: Icon;
  @Output() ionOnClick: EventEmitter<null> = new EventEmitter();
}
