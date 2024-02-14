import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { IonInputDirective } from './input.directive';

@Component({
  standalone: true,
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
      <input type="text" ion-input />
    </div>
  `,
  imports: [CommonModule, IonInputDirective],
})
export class inputMockComponent {}
