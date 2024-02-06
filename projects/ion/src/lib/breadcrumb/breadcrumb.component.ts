import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreadcrumbItem, BreadcrumbProps } from './types';
import { IonIconComponent } from '../icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ion-breadcrumb',
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss',
})
export class IonBreadcrumbComponent {
  @Input() breadcrumbs!: BreadcrumbProps['breadcrumbItems'];
  @Output() selected = new EventEmitter<BreadcrumbItem>();

  onSelected(item: BreadcrumbItem): void {
    if (item !== this.breadcrumbs[this.breadcrumbs.length - 1]) {
      this.selected.emit(item);
    }
  }
}
