import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonNoDataProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-no-data',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
})
export class IonNoDataComponent {
  @Input() iconType: IonNoDataProps['iconType'] = 'exclamation-rounded';
  @Input() label: IonNoDataProps['label'] = 'Não há dados';
}
