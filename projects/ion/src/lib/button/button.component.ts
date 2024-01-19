import { Component, Input } from '@angular/core';

import { CommonModule, NgClass } from '@angular/common';
import { IconType, IonIconComponent } from '../icon';

@Component({
  standalone: true,
  selector: 'ion-button',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class IonButtonComponent {
  @Input() label!: string;
  @Input() type: 'primary' | 'secondary' | 'ghost' | 'dashed' = 'primary';
  @Input() danger = false;
  @Input() disabled = false;
  @Input() loading = false;
  @Input() shape: 'normal' | 'square' | 'circle' = 'normal';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() icon?: {
    type: IconType;
    rightPosition?: boolean;
  };
}
