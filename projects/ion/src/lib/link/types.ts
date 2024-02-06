import { EventEmitter } from '@angular/core';
import { IconType } from '../icon';

/**
 *  @typedef {'sm' | 'md'} FontSize - The size of the font
 */
export type FontSize = 'sm' | 'md';

/**
 *  @typedef {'left' | 'right'} IconSide - The side of the icon
 */
export type IconSide = 'left' | 'right';

/**
 *  @typedef {'_blank' | '_self' | '_parent' | '_top'} LinkTarget - The target of the link
 */
export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export interface IonLinkProps {
  /**
   * Link label.
   * @type {string}
   * */
  label?: string;

  /**
   * Link icon.
   * @type {IconType}
   * */
  icon?: IconType;

  /**
   * Link icon side. Can be 'left' or 'right'.
   * @type {IconSide}
   * @default 'right'
   * */
  iconSide?: IconSide;

  /**
   * Link size. Can be 'sm' or 'md'.
   * @type {FontSize}
   * @default 'sm'
   * */
  size?: FontSize;

  /**
   * Link bold font.
   * @type {boolean}
   * @default false
   * */
  bold?: boolean;

  /**
   * Link disabled.
   * @type {boolean}
   * @default false
   * */
  disabled?: boolean;

  /**
   * Link target. Can be '_blank', '_self', '_parent' or '_top'.
   * @type {LinkTarget}
   * @default '_self'
   * */
  target?: LinkTarget;

  /**
   * Link href.
   * @type {string}
   * */
  link?: string;

  /**
   * Link click event.
   * @type {EventEmitter<void>}
   * */
  ionOnClick?: EventEmitter<void>;
}
