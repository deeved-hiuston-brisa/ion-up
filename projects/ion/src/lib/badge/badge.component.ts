import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { IonBadgeProps } from './types';

@Component({
  selector: 'ion-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  host: {
    '[attr.data-type]': 'type()',
    '[attr.data-testid]': `'ion-badge-' + label()`,
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonBadgeComponent {
  type = input<IonBadgeProps['type']>('primary');
  label = input.required<IonBadgeProps['label']>();

  displayLabel = computed(() => {
    return Number(this.label()) > 99 ? '99+' : this.label();
  });
}
