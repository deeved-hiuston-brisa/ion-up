import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';

import { IonButtonComponent } from '../../button';
import { ionPopoverDirective } from '../popover.directive';

@Component({
  template: `
    <style>
      div {
        height: 400px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
    <div>
      <ion-button
        ionPopover
        label="click me"
        ionPopover
        ionPopoverTitle="Popover tItle text"
        ionPopoverPosition="topCenter">
      </ion-button>
    </div>
  `,
  styles: [
    `
      @import '@angular/cdk/overlay-prebuilt.css';
    `,
  ],
  standalone: true,
  imports: [IonButtonComponent, ionPopoverDirective, OverlayModule],
})
export class OpenPopoverComponent {
  args = {};
}
