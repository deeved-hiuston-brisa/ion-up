import { CommonModule, NgClass } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { IonIconComponent } from '../../icon';
import { setTimer } from '../../utils/setTimer';
import { IonNotificationProps } from './types';

const STATUS_ICONS = {
  success: 'check-solid',
  info: 'info-solid',
  warning: 'exclamation-solid',
  negative: 'close-solid',
};

@Component({
  standalone: true,
  selector: 'ion-notification',
  imports: [CommonModule, IonIconComponent, NgClass],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class IonNotificationComponent implements OnInit {
  @Input() title!: IonNotificationProps['title'];
  @Input() message!: IonNotificationProps['message'];
  @Input() icon?: IonNotificationProps['icon'];
  @Input() type: IonNotificationProps['type'] = 'success';
  @Input() fixed: IonNotificationProps['fixed'] = false;
  @Input() fadeIn: IonNotificationProps['fadeIn'] = 'fadeIn';
  @Input() fadeOut: IonNotificationProps['fadeOut'] = 'fadeOut';
  @ViewChild('notificationRef', { static: false }) notification!: ElementRef;
  @Output() ionOnClose = new EventEmitter<void>();

  private timer$!: Subscription;
  public iconClass!: string;

  public timeByWords(message: string = ''): number {
    const wordsBySecond = 3;

    // margin is one second
    const marginOfError = 1;
    const second = 1000;
    const result = message.split(' ').length / wordsBySecond + marginOfError;
    return Number(result.toFixed(0)) * second;
  }

  public closeNotification(): void {
    this.notification.nativeElement.classList.add(this.fadeOut);
    this.ionOnClose.emit();
    setTimer().subscribe(() => {
      this.notification.nativeElement.remove();
    });
  }

  public closeAuto(closeIn: number = this.timeByWords(this.message)): void {
    if (this.fixed) {
      return;
    }
    this.timer$ = setTimer(closeIn).subscribe(() => {
      this.closeNotification();
    });
  }

  public mouseEnter(): void {
    if (this.fixed) {
      return;
    }
    this.timer$.unsubscribe();
  }

  public mouseLeave(): void {
    this.closeAuto();
  }

  private setIcon(): void {
    if (this.icon) {
      return;
    }
    if (!this.type) {
      this.icon = STATUS_ICONS.success;
      return;
    }
    this.icon = STATUS_ICONS[this.type];
  }

  public treatIconClass(): void {
    let hasStatusIcon = false;
    Object.values(STATUS_ICONS).forEach(statusIcon => {
      if (this.icon === statusIcon) {
        hasStatusIcon = true;
      }
    });
    this.iconClass = !hasStatusIcon
      ? 'default-icon'
      : `default-icon ${this.type}-icon`;
  }

  public ngOnInit(): void {
    this.setIcon();
    this.treatIconClass();
    this.closeAuto();
  }
}
