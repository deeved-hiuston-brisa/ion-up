import { Component, input } from '@angular/core';
import { IonDropdownConfig, IonDropdownOption } from '../types';
import { IonButtonComponent } from '../../../button';
import { IonDropdownDirective } from '../dropdown.directive';

export interface Character extends IonDropdownOption {
  name: string;
}

@Component({
  standalone: true,
  selector: 'ion-open-dropdown',
  styleUrls: ['open-dropdown.component.scss'],
  imports: [IonButtonComponent, IonDropdownDirective],
  template: ` <ion-button
    label="open dropdown"
    ionDropdown
    [dropdownConfig]="config()"
    [dropdownLoading]="loading"
    [(dropdownOptions)]="options" />`,
})
export class OpenDropdownComponent {
  config = input<IonDropdownConfig<Character>>({});
  loading = false;
  options: Character[] = [];
}
