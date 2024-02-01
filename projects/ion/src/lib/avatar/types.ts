export type Size = 'sm' | 'md' | 'lg' | 'xl';

export enum AvatarType {
  initials = 'initials',
  icon = 'icon',
  photo = 'photo',
}

export interface IonAvatarProps {
  /**
   * @description The `type` paramater
   * @default AvatarType.initials
   *
   */
  type: AvatarType;
  size: Size;
  value?: string;
  image?: string;
  onErrorImage?: string;
}
