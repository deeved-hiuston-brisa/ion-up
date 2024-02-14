import { Directive, HostBinding } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'input[ion-input]',
  exportAs: 'ionInput',
  standalone: true,
})
export class IonInputDirective {
  @HostBinding('class')
  class = 'ion-input';

  // @HostBinding('class.ion-input-disabled')
  // get isDisabled() {
  //   return this.disabled;
  // }
  // disabled = false;
}
