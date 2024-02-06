import { EventEmitter } from '@angular/core';
import { SafeAny } from '../utils/safe-any';

interface MenuProfile {
  imageUrl: string;
  name: string;
}

interface Image {
  src: string;
  alt: string;
}

export interface SimpleMenuProps {
  /**
   * @description The `options` parameter is required and represents the list of options that will be displayed in the menu.
   * @types {TabInGroup[]}
   * CHANGE THE ANY TYPE AFTER TABGROUP COMPONENT IS CREATED
   */
  options: SafeAny[];
  /**
   * @description The `profile` parameter represents the user's profile that will be displayed in the menu.
   * @types {MenuProfile}
   */
  profile: MenuProfile;
  /**
   * @description The `selected` parameter is an event that is triggered when an option is selected.
   * @types {EventEmitter<TabInGroup>}
   * CHANGE THE ANY TYPE AFTER TABGROUP COMPONENT IS CREATED
   */
  selected?: EventEmitter<SafeAny>;
  /**
   * @description The `logoutClick` parameter is an event that is triggered when the logout button is clicked.
   * @types {EventEmitter<SafeAny>}
   */
  logoutClick?: EventEmitter<SafeAny>;
  /**
   * @description The `logo` parameter represents the logo that will be displayed in the menu.
   * @types {Image}
   */
  logo?: Image;
}
