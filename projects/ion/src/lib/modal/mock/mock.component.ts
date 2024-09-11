import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { IonButtonComponent } from '../../../public-api';
import { IonModalService } from '../modal.service';

@Component({
  standalone: true,
  selector: 'ion-mock-component',
  template: `<div>
    <p>
      {{ title }}
    </p>
    <ion-button label="Close modal" (ionOnClick)="action()" />
  </div>`,
  imports: [CommonModule, IonButtonComponent],
})
export class MockComponent {
  ionModalService = inject(IonModalService);

  @Input() title = '';

  action() {
    this.ionModalService.emitModalResponse('onClose');
    this.ionModalService.close();
  }
}
