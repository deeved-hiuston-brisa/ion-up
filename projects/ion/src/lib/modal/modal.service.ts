import { Dialog } from '@angular/cdk/dialog';
import { Injectable, Type, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { SafeAny } from '../utils/safe-any';
import { IonModalComponent } from './modal.component';
import {
  Action,
  DialogConfiguration,
  ModalConfiguration,
  ModalResponse,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class IonModalService {
  private dialog = inject(Dialog);
  private modalRef?: IonModalComponent;
  private modalSubscriber?: Subject<ModalResponse>;

  public open(
    component: Type<SafeAny>,
    configuration?: ModalConfiguration & DialogConfiguration
  ): { id: string; observable: Observable<ModalResponse> } {
    this.modalSubscriber = new Subject<ModalResponse>();

    const ref = this.dialog.open(IonModalComponent, {
      hasBackdrop: configuration?.showOverlay ?? true,
      disableClose: configuration?.disableClose ?? false,
      autoFocus: false,
    });

    if (ref.componentInstance) {
      this.modalRef = ref.componentInstance;
      const componentInstance = this.modalRef
        .content()
        ?.createComponent(component);

      if (configuration?.params) {
        this.setParamsToComponent(
          componentInstance?.instance,
          configuration?.params
        );
      }

      this.modalRef?.onAction.subscribe(action => {
        this.emitModalResponse(action, componentInstance?.instance);
      });
    }

    if (this.modalRef && configuration) {
      this.modalRef.configuration.set(configuration);
    }

    return {
      id: ref.id,
      observable: this.modalSubscriber.asObservable(),
    };
  }

  public update(configuration: ModalConfiguration): void {
    if (this.modalRef) {
      this.modalRef.configuration.update(prev => ({
        ...prev,
        ...configuration,
      }));
    }
  }

  public close(): void {
    if (this.modalRef) {
      this.modalRef.closeModal('onClose');
    }
  }

  public closeById(id: string): void {
    const modalRef = this.dialog.getDialogById(id);

    if (modalRef) {
      modalRef.close();
    }
  }

  public closeAll(): void {
    this.dialog.closeAll();
  }

  public emitModalResponse(
    action: Action,
    instance?: Record<string, unknown>
  ): void {
    if (this.modalSubscriber) {
      this.modalSubscriber.next({ action, instance });
    }
  }

  private setParamsToComponent(instance: SafeAny, params: SafeAny): void {
    Object.assign(instance, params);
  }
}
