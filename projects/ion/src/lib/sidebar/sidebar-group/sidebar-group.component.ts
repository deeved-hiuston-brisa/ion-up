import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonIconComponent } from '../../icon';
import { IonSidebarItemComponent } from '../public-api';
import { SidebarGroup } from '../types';
import { selectItemByIndex, unselectAllItems } from '../utils';

@Component({
  standalone: true,
  imports: [CommonModule, IonSidebarItemComponent, IonIconComponent],
  selector: 'ion-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class IonSidebarGroupComponent implements OnChanges {
  @Input() title: SidebarGroup['title'] = '';
  @Input({ required: true }) icon!: SidebarGroup['icon'];
  @Input() items: SidebarGroup['items'] = [];
  @Input() selected: SidebarGroup['selected'] = false;
  @Input() haveGroupAction: SidebarGroup['haveGroupAction'] = false;
  @Output() ionOnClick = new EventEmitter();
  @Output() ionOnGroupClick = new EventEmitter();

  public closed = true;

  public toggleItemsVisibility(): void {
    this.closed = !this.closed;
  }

  public itemSelected(itemIndex: number): void {
    this.selected = true;
    selectItemByIndex(this.items, itemIndex);
    this.ionOnClick.emit();
  }

  public groupSelected(): void {
    this.ionOnGroupClick.emit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedChangedToFalse(changes)) {
      unselectAllItems(this.items);
    }
  }

  private selectedChangedToFalse(changes: SimpleChanges): boolean {
    return (
      !changes['firstChange'] &&
      changes['selected'] &&
      !changes['selected'].currentValue
    );
  }
}
