import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';

import { IonButtonComponent } from '../button';
import { IonDividerComponent } from '../divider';
import { IonIconComponent } from '../icon';
import { PopoverPosition, PopoverProps } from './types';

@Component({
  selector: 'ion-popover',
  standalone: true,
  imports: [
    CommonModule,
    IonDividerComponent,
    IonIconComponent,
    IonButtonComponent,
  ],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class IonPopoverComponent {
  @Input() ionPopoverTitle: PopoverProps['ionPopoverTitle'];
  @Input() ionPopoverKeep: PopoverProps['ionPopoverKeep'];
  @Input() ionPopoverBody: PopoverProps['ionPopoverBody'];
  @Input() ionPopoverActions?: PopoverProps['ionPopoverActions'];
  @Input() ionPopoverIcon?: PopoverProps['ionPopoverIcon'];
  @Input() ionPopoverIconClose: PopoverProps['ionPopoverIconClose'] = false;
  @Input() ionPopoverPosition?: PopoverProps['ionPopoverPosition'] =
    PopoverPosition.DEFAULT;
  @Input() ionPopoverCustomClass: PopoverProps['ionPopoverCustomClass'] = '';

  readonly ionOnClose = new Subject<void>();

  left = 0;
  top = 0;

  close(): void {
    this.ionOnClose.next();
  }

  onActionClick(callback: Subject<void>): void {
    callback.next();
  }
}
