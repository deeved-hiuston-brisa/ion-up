import {
  Component,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Component({
  standalone: true,
  template: `oieee`,
  selector: 'ion-test',
})
export class DropdownComponent {}

@Directive({
  selector: '[ionDropdown]',
  standalone: true,
})
export class DropdownDirective implements OnDestroy {
  @Input() ionTrigger: 'click' | 'hover' = 'hover';

  private overlayRef: OverlayRef | null = null;

  constructor(
    private elementRef: ElementRef,
    private overlay: Overlay
  ) {}

  @HostListener('document:click', ['$event'])
  handleClickDocument(event: PointerEvent) {
    if (
      this.overlayRef &&
      !this.elementRef.nativeElement.contains(event.target)
    ) {
      this.destroyOverlay();
    }
  }

  @HostListener('click', ['$event'])
  handleClick() {
    if (this.ionTrigger === 'click') {
      !this.overlayRef ? this.createOverlay() : this.destroyOverlay();
    }
  }

  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  handleHoverLeave() {
    if (this.ionTrigger === 'hover') {
      !this.overlayRef ? this.createOverlay() : this.destroyOverlay();
    }
  }

  private createOverlay(): void {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
      ]);
    this.overlayRef = this.overlay.create({
      backdropClass: 'cdk-overlay-transparent-backdrop',
      hasBackdrop: true,
      positionStrategy: positionStrategy,
    });
    const component = new ComponentPortal(DropdownComponent);
    this.overlayRef.attach(component);

    this.overlayRef.backdropClick().subscribe(() => {
      this.destroyOverlay();
    });
  }

  private destroyOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.detach();
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  ngOnDestroy() {
    this.destroyOverlay();
  }
}
