import {
  ConnectionPositionPair,
  Overlay,
  OverlayPositionBuilder,
  OverlayRef,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Output,
  ViewContainerRef,
} from '@angular/core';

import { IonPopoverComponent } from './popover.component';
import {
  PopoverDirectiveProps,
  PopoverPosition,
  PopoverTrigger,
} from './types';
import { POSITION_MAP_OVERLAY } from '../utils/overlay-positions';

// import { SafeAny } from '../utils/safe-any';
@Directive({
  selector: '[ionPopover]',
  standalone: true,
})
export class ionPopoverDirective implements OnDestroy {
  @Input() ionPopoverTitle: PopoverDirectiveProps['ionPopoverTitle'];
  @Input() ionPopoverKeep: PopoverDirectiveProps['ionPopoverKeep'] = false;
  @Input() ionPopoverBody: PopoverDirectiveProps['ionPopoverBody'];
  @Input() ionPopoverActions: PopoverDirectiveProps['ionPopoverActions'];
  @Input() ionPopoverIcon: PopoverDirectiveProps['ionPopoverIcon'];
  @Input() ionPopoverIconClose: PopoverDirectiveProps['ionPopoverIconClose'] =
    false;
  @Input() ionPopoverPosition: PopoverDirectiveProps['ionPopoverPosition'] =
    PopoverPosition.DEFAULT;
  @Input()
  ionPopoverArrowPointAtCenter: PopoverDirectiveProps['ionPopoverArrowPointAtCenter'] =
    true;
  @Input()
  ionPopoverCustomClass: PopoverDirectiveProps['ionPopoverCustomClass'];
  @Input() ionPopoverTrigger: PopoverDirectiveProps['ionPopoverTrigger'] =
    PopoverTrigger.DEFAULT;
  @Output() ionOnClose: PopoverDirectiveProps['ionOnClose'] =
    new EventEmitter<void>();

  private componentRef: ComponentRef<IonPopoverComponent> | null = null;
  private overlayRef: OverlayRef | null = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private viewContainerRef: ViewContainerRef,
    private appRef: ApplicationRef,
    private elementRef: ElementRef,
    private overlay: Overlay,
    private overlayPositionBuild: OverlayPositionBuilder
  ) {}

  createPopover(position: ConnectionPositionPair): void {
    const positionStrategy = this.overlayPositionBuild
      .flexibleConnectedTo(this.elementRef)
      .withPositions([position]);

    this.overlayRef = this.overlay.create({
      positionStrategy,
    });

    this.componentRef = this.overlayRef.attach(
      new ComponentPortal(IonPopoverComponent)
    );
  }

  @HostListener('click')
  show() {
    if (this.isComponentRefNull()) {
      console.log('POSITION_MAP_OVERLAY', POSITION_MAP_OVERLAY);
      console.log('this.ionPopoverPosition', this.ionPopoverPosition);
      console.log('show', POSITION_MAP_OVERLAY[this.ionPopoverPosition!]);

      this.createPopover(POSITION_MAP_OVERLAY[this.ionPopoverPosition!]);

      this.componentRef!.instance.ionPopoverTitle = this.ionPopoverTitle;
      this.componentRef!.instance.ionPopoverPosition = this.ionPopoverPosition;
    }
  }

  // @HostListener('mouseleave')
  // hide() {
  //   if (this.overlayRef) {
  //     this.overlayRef.detach();
  //   }
  //   this.destroyComponent();
  // }

  destroyComponent(): void {
    if (!this.isComponentRefNull()) {
      this.appRef.detachView(this.componentRef!.hostView);
      this.componentRef!.destroy();
      this.componentRef = null;
    }
  }

  ngOnDestroy() {
    this.destroyComponent();
  }

  // open(): void {
  //   this.createPopover();
  // }

  // createPopover(): void {
  //   this.componentRef =
  //     this.viewContainerRef.createComponent(IonPopoverComponent);

  //   this.appRef.attachView(this.componentRef.hostView);

  //   const popoverElement = this.componentRef.location
  //     .nativeElement as HTMLElement;

  //   this.document.body.appendChild(popoverElement);
  //   this.componentRef.changeDetectorRef.detectChanges();
  //   this.updatePopoverDirectiveProps(this.componentRef.instance);
  //   this.showPopover();
  //   this.setComponentPosition();
  // }

  // updatePopoverDirectiveProps(popoverInstance: IonPopoverComponent): void {
  // const instanceProps = {
  //   ionPopoverTitle: this.ionPopoverTitle,
  //   ionPopoverKeep: this.ionPopoverKeep,
  //   ionPopoverBody: this.ionPopoverBody,
  //   ionPopoverActions: this.ionPopoverActions,
  //   ionPopoverIcon: this.ionPopoverIcon,
  //   ionPopoverIconClose: this.ionPopoverIconClose,
  //   ionPopoverPosition: this.ionPopoverPosition,
  //   ionPopoverCustomClass: this.ionPopoverCustomClass,
  // };
  // Object.keys(instanceProps).forEach((prop: SafeAny) => {
  //   popoverInstance[prop] = instanceProps[prop];
  // });
  // const eventSubscriptions: [string, EventEmitter<void>][] = [
  //   ['ionOnFirstAction', this.ionOnFirstAction],
  //   ['ionOnSecondAction', this.ionOnSecondAction],
  //   ['ionOnClose', this.ionOnClose],
  // ];
  // eventSubscriptions.forEach(([event, emitter], index) => {
  //   popoverInstance[event].subscribe(() => {
  //     this.handlePopoverAction(index);
  //     emitter.emit();
  //   });
  // });
  //   console.log('updatePopoverDirectiveProps', popoverInstance);
  // }

  // showPopover(): void {
  //   if (!this.isComponentRefNull()) {
  // this.componentRef.instance.ionPopoverVisible = true;
  //   }
  // }

  // setComponentPosition(): void {
  // const hostElement = this.elementRef.nativeElement.getBoundingClientRect();
  // this.positionService.setHostPosition(hostElement);
  // this.positionService.setChoosedPosition(
  //   this.popoverComponentRef.instance.ionPopoverPosition
  // );
  // this.positionService.setPointAtCenter(this.ionPopoverArrowPointAtCenter);
  // const ionPopoverPosition =
  //   this.positionService.getNewPosition(getPositionsPopover);
  // const props = {
  //   top: ionPopoverPosition.top + window.scrollY,
  //   left: ionPopoverPosition.left + window.scrollX,
  //   ionPopoverTrigger: this.ionPopoverTrigger,
  // };
  // Object.keys(props).forEach(prop => {
  //   this.componentRef.instance[prop] = props[prop];
  // });
  // }

  isComponentRefNull(): boolean {
    return this.componentRef === null;
  }

  // protected registerTriggers(): void {}
}
