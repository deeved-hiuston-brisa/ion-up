import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'input[ionInput]',
  exportAs: 'ionInput',
  standalone: true,
})
export class IonInputDirective {
  @HostBinding('class')
  class = 'ion-input';

  @HostBinding('class.disabled')
  disabled = false;

  @HostBinding('class.invalid')
  @Input()
  invalid = false;
}
