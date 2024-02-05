import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumbItem } from './types';
import { IonIconComponent } from '../icon';

@Component({
  selector: 'ion-breadcrumb',
  standalone: true,
  imports: [IonIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class IonBreadcrumbComponent {
  @Input() breadcrumbs!: Array<BreadcrumbItem>;
  @Output() selected = new EventEmitter<BreadcrumbItem>();

  onSelected(item: BreadcrumbItem): void {
    if (item !== this.breadcrumbs[this.breadcrumbs.length - 1]) {
      this.selected.emit(item);
    }
  }
}
