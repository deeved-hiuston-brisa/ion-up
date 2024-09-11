import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonButtonComponent } from '../../button';
import { IonModalService } from '../modal.service';
import { MockComponent } from './mock.component';

@Component({
  standalone: true,
  selector: 'ion-open-modal',
  template: `<ion-button label="Open modal" (ionOnClick)="openModal()" />`,
  imports: [CommonModule, IonButtonComponent],
})
export class OpenModalComponent {
  ionModalService = inject(IonModalService);

  openModal(): void {
    this.ionModalService.open(MockComponent, {
      title: 'Mock Modal',
      params: {
        ionModalService: this.ionModalService,
        title: 'Mock Modal',
      },
    });
  }
}
