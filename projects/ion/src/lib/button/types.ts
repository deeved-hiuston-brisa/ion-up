import { EventEmitter } from '@angular/core';
import { IconType } from '../icon';

/**
 * @typedef {'primary' | 'secondary' | 'ghost' | 'dashed'} ButtonType - Button type.
 * @typedef {'sm' | 'md' | 'lg' | 'xl'} ButtonSize - Button size.
 * @typedef {Object} IconType - Object Icon type.
 * @property {string} type - icon type.
 * @property {boolean} [rightPosition] - Icon position to the right of the text.
 */

export type Type = 'primary' | 'secondary' | 'ghost' | 'dashed';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Icon = {
  type: IconType;
  rightPosition?: boolean;
};

export interface IonButtonProps {
  /**
   * Button label.
   * @type {string}
   */
  label: string;

  /**
   * Button type. Can be 'primary', 'secondary', 'ghost' or 'dashed'.
   * @type {ButtonType}
   * @default 'primary'
   */
  type?: Type;

  /**
   * Indicates whether the button represents a danger.
   * @type {boolean}
   * @default false
   */
  danger?: boolean;

  /**
   * Indicates whether the button is disabled.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;

  /**
   * Button size. Can be 'sm', 'md', 'lg' or 'xl'.
   * @type {ButtonSize}
   * @default 'md'
   */
  size?: Size;

  /**
   * Settings for the icon associated with the button.
   * @type {{ type: IconType; rightPosition?: boolean }}
   */
  icon?: Icon;

  /**
   * Event triggered when button is clicked.
   * @event IonButtonComponent#ionOnClick
   * @type {EventEmitter<null>}
   * @description This event is emitted when the button is clicked. The issuance does not include additional data.
   */
  ionOnClick?: EventEmitter<null>;
}
