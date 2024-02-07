import { Component, HostBinding, Input } from '@angular/core';

import { IonDividerProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class IonDividerComponent {
  @Input() label: IonDividerProps['label'] = '';
  @Input() direction?: IonDividerProps['direction'] = 'horizontal';
  @HostBinding('[attr.data-type]')
  @Input()
  type?: IonDividerProps['type'] = 'solid';
}
