import { CommonModule, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonBadgeComponent } from '../badge';
import { IonIconComponent } from '../icon';
import { IonTabProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-tab',
  imports: [CommonModule, IonIconComponent, IonBadgeComponent, NgClass],
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss'],
})
export class IonTabComponent {
  @Input() label!: IonTabProps['label'];
  @Input() tabSize?: IonTabProps['tabSize'] = 'sm';
  @Input() disabled?: IonTabProps['disabled'] = false;
  @Input() selected?: IonTabProps['selected'] = false;
  @Input() direction?: IonTabProps['direction'] = 'bottom';
  @Input() iconType?: IonTabProps['iconType'];
  @Input() badge?: IonTabProps['badge'];

  public handleClick(): void {
    if (!this.disabled) {
      this.selected = true;
    }
  }
}
