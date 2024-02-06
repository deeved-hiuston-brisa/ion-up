import { EventEmitter } from '@angular/core';

export interface BreadcrumbItem {
  /**
   *  @description Indicates the name of the breadcrumb that will be displayed.
   * @type {string}
   */
  label: string;
  /**
   *  @description Indicates the link to the breadcrumb.
   * @type {string}
   */
  link: string;
}

export interface BreadcrumbProps {
  /**
   *  @description Represents the breadcrumbs to be displayed. Each breadcrumb must contain a `label` and a `link`.
   * @type {BreadcrumbItem[]}
   */
  breadcrumbItems: BreadcrumbItem[];
  selected: EventEmitter<BreadcrumbItem>;
}
