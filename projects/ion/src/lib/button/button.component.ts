import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { timer } from 'rxjs';
import { IonIconComponent } from '../icon';
import { IonButtonProps } from './types';

const CLASS_PREFIX = 'ion-btn';
const ANIMATION_TIME = 300;

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
  @ViewChild('ionButton', { static: false }) private ionButton!: ElementRef;

  public handleButtonClick(): void {
    if (!this.disabled && !this.loading) {
      this.ionOnClick?.emit();
    }
  }

  public pressAnimation() {
    const classList = this.ionButton.nativeElement.classList;
    classList.remove(`${CLASS_PREFIX}--unpress`);
    classList.add(`${CLASS_PREFIX}--press`);
  }

  public unpressAnimation() {
    const classList = this.ionButton.nativeElement.classList;
    classList.forEach((className: string) => {
      if (className === `${CLASS_PREFIX}--press`) {
        classList.remove(`${CLASS_PREFIX}--press`);
        classList.add(`${CLASS_PREFIX}--unpress`);
      }
    });
    timer(ANIMATION_TIME).subscribe(() => {
      classList.remove(`${CLASS_PREFIX}--unpress`);
    });
  }
}
