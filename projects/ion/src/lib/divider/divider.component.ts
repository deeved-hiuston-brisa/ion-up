import { Component, Input } from '@angular/core';

import { IonDividerProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  host: {
    '[attr.data-type]': 'type',
  },
})
export class IonDividerComponent {
  @Input() label: IonDividerProps['label'] = '';
  @Input() direction?: IonDividerProps['direction'] = 'horizontal';
  @Input() type?: IonDividerProps['type'] = 'solid';
}
