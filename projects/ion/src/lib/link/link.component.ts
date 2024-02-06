import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

import { IonLinkProps } from './types';
import { IonIconComponent } from '../icon';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, IonIconComponent, NgClass],
  selector: 'ion-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class IonLinkComponent implements OnChanges {
  @Input() label?: IonLinkProps['label'] = '';
  @Input() icon?: IonLinkProps['icon'];
  @Input() iconSide?: IonLinkProps['iconSide'] = 'right';
  @Input() size?: IonLinkProps['size'] = 'sm';
  @Input() bold?: IonLinkProps['bold'] = false;
  @Input() disabled?: IonLinkProps['disabled'] = false;
  @Input() target?: IonLinkProps['target'] = '_self';
  @Input() link?: IonLinkProps['link'];
  @Output() ionOnClick?: IonLinkProps['ionOnClick'] = new EventEmitter<void>();

  public iconSize = 16;

  public onClick(): void {
    if (this.disabled) {
      return;
    }
    this.ionOnClick?.emit();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const sizeControls = {
      sm: 16,
      md: 24,
    };

    if (changes['size']) {
      this.iconSize = sizeControls[this.size!];
    }
  }
}
