import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IconType, IonIconComponent } from '../../icon';
import { SidebarItem } from '../types';
import { selectItemByIndex, unselectAllItems } from '../utils';
import { CommonModule } from '@angular/common';
import { IonSidebarItemComponent } from '../public-api';

@Component({
  standalone: true,
  imports: [CommonModule, IonSidebarItemComponent, IonIconComponent],
  selector: 'ion-sidebar-group',
  templateUrl: './sidebar-group.component.html',
  styleUrls: ['./sidebar-group.component.scss'],
})
export class IonSidebarGroupComponent implements OnChanges {
  @Input() title = '';
  @Input() icon!: IconType;
  @Input() items: SidebarItem[] = [];
  @Input() selected = false;
  @Input() haveGroupAction = false;
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
