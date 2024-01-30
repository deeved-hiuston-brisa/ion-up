import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon';
import { IonTagInterface } from './types';

@Component({
  standalone: true,
  selector: 'ion-tag',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
})
export class IonTagComponent {
  @Input({ required: true }) label!: IonTagInterface['label'];
  @Input() outline: IonTagInterface['outline'] = true;
  @Input() status?: IonTagInterface['status'] = 'neutral';
  @Input() icon?: IonTagInterface['icon'];
  @Input() color?: IonTagInterface['color'];

  protected getTagType(): string {
    return `ion-tag ${this.outline ? 'outline' : ''} ${this.status}`;
  }

  protected getTagColorAndBackground(): string {
    return this.color && this.validateHexColor(this.color) ? this.color : '';
  }

  private validateHexColor(color: string): boolean {
    return /^#(?:[0-9a-fA-F]{3,4}){1,2}$/.test(color);
  }
}
