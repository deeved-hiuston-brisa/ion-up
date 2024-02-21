import { SidebarItem } from './types';

function selectItem(items: SidebarItem[], index: number): void {
  items[index].selected = true;
}

export function callItemAction(items: SidebarItem[], index: number): void {
  const item = items[index];
  if (item && item.action) {
    item.action();
  }
}

export function unselectAllItems(
  items: SidebarItem[],
  exceptItemIndex?: number
): void {
  items.forEach((item, index) => {
    item.selected =
      exceptItemIndex !== undefined ? index === exceptItemIndex : false;
  });
}

export function selectItemByIndex(
  items: SidebarItem[],
  itemIndex: number
): SidebarItem[] {
  unselectAllItems(items);
  selectItem(items, itemIndex);
  callItemAction(items, itemIndex);
  return items;
}
