import { IconType } from '../icon';

export type StatusType = 'success' | 'info' | 'warning' | 'negative';

/**
 * @description The `variant` parameter represents the default color scheme.
 * @type {InfoBadgeStatus}
 * @default 'primary'
 */
export type InfoBadgeStatus = StatusType | 'primary';

/**
 * @description The `size` parameter represents the size of the badge.
 * @type {InfoBadgeSize}
 * @default 'md'
 */
export type InfoBadgeSize = 'sm' | 'md';

export interface InfoBadgeProps {
  /**
   * @description The `variant` parameter represents the default color scheme.
   * @type {InfoBadgeStatus}
   * @default 'primary'
   */
  variant: InfoBadgeStatus;

  /**
   * @description The `icon` parameter represents the type of icon that will be displayed.
   * @type {IconType}
   */
  icon?: IconType;

  /**
   * @description The `text` parameter represents the text that will be displayed.
   * @type {string}
   */
  text?: string;

  /**
   * @description The `size` parameter represents the size of the badge.
   * @type {InfoBadgeSize}
   * @default 'md'
   */
  size?: InfoBadgeSize;
}
