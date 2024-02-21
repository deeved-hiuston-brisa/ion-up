import { Component, Input } from '@angular/core';
import { callItemAction, selectItemByIndex, unselectAllItems } from './utils';
import { IonSidebarProps } from './types';
import { IonButtonComponent } from '../button';
import { IonSidebarGroupComponent } from './sidebar-group/sidebar-group.component';
import { IonSidebarItemComponent } from './sidebar-item/sidebar-item.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    IonButtonComponent,
    IonSidebarItemComponent,
    IonSidebarGroupComponent,
    CommonModule,
  ],
  selector: 'ion-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class IonSidebarComponent {
  @Input() logo!: IonSidebarProps['logo'];
  @Input() logoAction?: IonSidebarProps['logoAction'];
  @Input() items: IonSidebarProps['items'] = [];
  @Input() closeOnSelect: IonSidebarProps['closeOnSelect'] = false;

  public closed = true;

  public toggleSidebarVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    selectItemByIndex(this.items, itemIndex);
    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }

  public itemOnGroupSelected(groupIndex: number): void {
    unselectAllItems(this.items, groupIndex);
    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }

  public groupSelected(groupIndex: number): void {
    unselectAllItems(this.items);
    callItemAction(this.items, groupIndex);
  }

  public handleLogoClick(): void {
    if (this.logoAction) {
      this.logoAction();
    }

    if (this.closeOnSelect) {
      this.toggleSidebarVisibility();
    }
  }
}
