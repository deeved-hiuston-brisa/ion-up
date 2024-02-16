import { IconType } from '../icon';

export interface SidebarItem {
  title: string;
  icon: IconType;
  selected?: boolean;
  disabled?: boolean;
  action?: () => void;
}

export interface IonSidebarProps {
  logo: string;
  logoAction?: () => void;
  items: (SidebarItem & { options?: [SidebarItem, ...SidebarItem[]] })[];
  closeOnSelect?: boolean;
}
