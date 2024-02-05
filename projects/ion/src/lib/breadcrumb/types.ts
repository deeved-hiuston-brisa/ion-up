import { EventEmitter } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  link: string;
}

export interface BreadcrumbProps {
  breadcrumbItems: BreadcrumbItem[];
  selected: EventEmitter<BreadcrumbItem>;
}
