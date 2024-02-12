import { Component, Input } from '@angular/core';
import {
  CdkMenu,
  CdkMenuBar,
  CdkMenuGroup,
  CdkMenuItem,
  CdkMenuItemCheckbox,
  CdkMenuItemRadio,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import { Options } from './types';

@Component({
  standalone: true,
  selector: 'ion-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss'],
  imports: [
    CdkMenuBar,
    CdkMenuItem,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuGroup,
    CdkMenuItemCheckbox,
    CdkMenuItemRadio,
  ],
})
export class DropdownComponent {
  @Input({ required: true }) options!: Options[];
}
