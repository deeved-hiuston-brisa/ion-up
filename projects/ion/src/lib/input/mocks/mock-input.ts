import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonInputDirective } from '../input.directive';

@Component({
  standalone: true,
  template: `<input ionInput [disabled]="disabled" [invalid]="invalid" />`,
  imports: [CommonModule, IonInputDirective, FormsModule],
  styleUrls: ['../../colors/index.scss'],
})
export class inputMockComponent {
  @Input() invalid: boolean = false;
  @Input() disabled: boolean = false;
}
