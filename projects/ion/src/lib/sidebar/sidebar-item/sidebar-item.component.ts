import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonIconComponent } from '../../icon';
import { SidebarItem } from '../types';

@Component({
  standalone: true,
  imports: [IonIconComponent],
  selector: 'ion-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.scss'],
})
export class IonSidebarItemComponent {
  @Input() title: SidebarItem['title'] = '';
  @Input() icon: SidebarItem['icon'] = '';
  @Input() selected: SidebarItem['selected'] = false;
  @Input() disabled: SidebarItem['disabled'] = false;
  @Output() ionOnClick = new EventEmitter();

  public selectItem(): void {
    this.selected = true;
    this.ionOnClick.emit();
  }
}
