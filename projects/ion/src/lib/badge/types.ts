type Type = 'primary' | 'secondary' | 'neutral' | 'negative';

export interface IonBadgeProps {
  /**
   * Badge label.
   * @param label - Text that will be displayed on the Badge. If the value passed is a number and it is greater than 99, 99+ will be displayed.
   * @type {string | number}
   * @example
   * <ion-button label="Text badge" />
   * <ion-button label="99" />
   * <ion-button [label]="300" />
   */
  label: string | number;

  /**
   * Badge type.
   * @param type - Defines the badge style.
   * @type {'primary' | 'secondary' | 'neutral' | 'negative'}
   * @default `primary`
   * @example
   * <ion-badge type="neutral" />
   */
  type?: Type;
}
