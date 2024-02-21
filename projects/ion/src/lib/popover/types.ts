import { EventEmitter, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

import { IonButtonProps } from '../button';
import { IonIconProps } from '../icon';

export enum PopoverPosition {
  TOP_RIGHT = 'topRight',
  TOP_CENTER = 'topCenter',
  TOP_LEFT = 'topLeft',
  RIGHT_TOP = 'rightTop',
  RIGHT_CENTER = 'rightCenter',
  RIGHT_BOTTOM = 'rightBottom',
  LEFT_TOP = 'leftTop',
  LEFT_CENTER = 'leftCenter',
  LEFT_BOTTOM = 'leftBottom',
  BOTTOM_RIGHT = 'bottomRight',
  BOTTOM_CENTER = 'bottomCenter',
  BOTTOM_LEFT = 'bottomLeft',
  DEFAULT = PopoverPosition.BOTTOM_LEFT,
}

export enum PopoverTrigger {
  CLICK = 'click',
  HOVER = 'hover',
  DEFAULT = PopoverTrigger.CLICK,
}

export interface PopoverProps {
  ionPopoverTitle?: string;
  ionPopoverBody?: TemplateRef<void>;
  ionPopoverActions?: PopoverButtonsProps[];
  ionPopoverIcon?: Pick<IonIconProps, 'type' | 'color'>;
  ionPopoverIconClose?: boolean;
  ionPopoverPosition?: PopoverPosition;
  ionPopoverKeep?: boolean;
  ionPopoverCustomClass?: string;
  ionOnClose?: EventEmitter<void>;
}

export interface PopoverDirectiveProps extends PopoverProps {
  ionPopoverArrowPointAtCenter?: boolean;
  ionPopoverKeep?: boolean;
  ionPopoverTrigger?: PopoverTrigger;
}

export interface PopoverButtonsProps extends IonButtonProps {
  onClick: Subject<void>;
  keepOpen?: boolean;
}
