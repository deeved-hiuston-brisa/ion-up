import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonInputDirective } from '../input.directive';

@Component({
  standalone: true,
  template: `<input
    ionInput
    [type]="type"
    [(ngModel)]="value"
    [invalid]="invalid"
    [placeholder]="placeholder"
    [readonly]="readonly"
    [maxlength]="maxlength"
    [minlength]="minlength"
    [disabled]="disabled" />`,
  imports: [CommonModule, IonInputDirective, FormsModule],
  styleUrls: ['../../colors/index.scss'],
})
export class inputMockComponent {
  @Input() value: string = '';
  @Input() type: string = 'text';
  @Input() invalid: boolean = false;
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() maxlength: number = 100;
  @Input() minlength: number = 0;
}
