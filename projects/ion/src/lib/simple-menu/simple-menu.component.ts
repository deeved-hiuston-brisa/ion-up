import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { SimpleMenuProps } from './types';
import { NgClass } from '@angular/common';
import { IonAvatarComponent } from '../avatar';

@Component({
  selector: 'ion-simple-menu',
  standalone: true,
  imports: [IonButtonComponent, NgClass, IonAvatarComponent],
  templateUrl: './simple-menu.component.html',
  styleUrl: './simple-menu.component.scss',
})
export class IonSimpleMenuComponent {
  @Input() options!: SimpleMenuProps['options'];
  @Input() profile!: SimpleMenuProps['profile'];
  @Input() logo?: SimpleMenuProps['logo'];

  @Output() selected = new EventEmitter<SimpleMenuProps['selected']>();
  @Output() logoutClick = new EventEmitter<SimpleMenuProps['logoutClick']>();

  open = false;

  private timeToToAutoClose = 1000;
  private menuTimeout!: ReturnType<typeof setTimeout>;

  dismissMenu(): void {
    this.menuTimeout = setTimeout(() => {
      this.open = false;
    }, this.timeToToAutoClose);
  }

  openMenu(): void {
    clearTimeout(this.menuTimeout);
    this.open = true;
  }

  logout(): void {
    this.logoutClick.emit();
  }
}
