import { EventEmitter } from '@angular/core';
import { IconType } from '../icon';

export interface SidebarItem {
  /**
   * Sidebar item title.
   * @param title - Text that will be displayed
   * @type {string}
   */
  title: string;
  /**
   * Sidebar item icon.
   * @param icon - Icon that will be displayed
   * @type {IconType}
   */
  icon: IconType;
  /**
   * Sidebar item selection.
   * @param selected - Defines if the sidebar is selected
   * @type {boolean}
   */
  selected?: boolean;
  /**
   * Sidebar item disabled.
   * @param disabled - Defines if the sidebar is disabled
   * @type {boolean}
   */
  disabled?: boolean;
  /**
   * Sidebar item action.
   * @param action - Defines the action to be executed when clicking the item
   * @type {() => void}
   */
  action?: () => void;
  ionOnClick?: EventEmitter<void>;
}

export interface SidebarGroup extends SidebarItem {
  /**
   * Sidebar group items.
   * @param items - Defines the sidebar items that belongs to the group
   * @type {SidebarItem[]}
   */
  items: SidebarItem[];
  /**
   * Sidebar group haveGroupAction.
   * @param haveGroupAction - Defines if the click on the group title will trigger an action.
   * @type {boolean}
   */
  haveGroupAction?: boolean;
}

export interface IonSidebarProps {
  /**
   * Sidebar logo.
   * @param logo - Defines the of the logo to be rendered
   * @type {string}
   */
  logo: string;
  /**
   * Sidebar logoAction.
   * @param logoAction - Defines the to be executed when clicking the logo
   * @type {() => void}
   */
  logoAction?: () => void;
  /**
   * Sidebar items.
   * @param items - Defines the sidebar items or group of items to be rendered
   * @type {(SidebarItem & { options?: [SidebarItem, ...SidebarItem[]] })[]}
   */
  items: (SidebarItem & { options?: [SidebarItem, ...SidebarItem[]] })[];
  /**
   * Sidebar closeOnSelect.
   * @param closeOnSelect - Defines if the sidebar should close after selecting an item
   * @type {boolean}
   */
  closeOnSelect?: boolean;
}
