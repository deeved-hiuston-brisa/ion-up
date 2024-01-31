import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonIconComponent } from '../icon';
import { InfoBadgeProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-info-badge',
  templateUrl: './info-badge.component.html',
  imports: [CommonModule, IonIconComponent],
  styleUrls: ['./info-badge.component.scss'],
})
export class IonInfoBadgeComponent {
  @Input() public variant: InfoBadgeProps['variant'] = 'primary';
  @Input() public icon?: InfoBadgeProps['icon'];
  @Input() public text?: InfoBadgeProps['text'];
  @Input() public size?: InfoBadgeProps['size'] = 'md';
}
