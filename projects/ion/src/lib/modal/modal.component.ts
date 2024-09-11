import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewContainerRef,
  inject,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { IonAlertComponent, IonButtonComponent } from '../../public-api';
import { Action, ModalConfiguration } from './types';

@Component({
  standalone: true,
  selector: 'ion-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  imports: [CommonModule, IonButtonComponent, IonAlertComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonModalComponent {
  DEFAULT_WIDTH = 500;
  modalRef = inject(DialogRef);

  content = viewChild('content', { read: ViewContainerRef });

  configuration = signal<ModalConfiguration>({
    title: 'Ion Modal',
    width: this.DEFAULT_WIDTH,
  });

  onAction = output<Action>();

  onHeaderAction() {
    this.onAction.emit('onHeaderAction');
  }

  closeModal(action: Action) {
    this.onAction.emit(action);
    this.modalRef.close();
  }
}
