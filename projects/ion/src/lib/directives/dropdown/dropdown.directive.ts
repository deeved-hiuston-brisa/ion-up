import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import { ConnectedPosition, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { DropdownComponent } from './dropdown.component';
import { Options } from './types';

@Directive({
  selector: '[ionDropdown]',
  standalone: true,
})
export class DropdownDirective implements OnDestroy {
  @Input({ required: true }) options!: Options[];
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
  /**
   * TODO: debounce
   */
  @HostListener('mouseenter', ['$event'])
  @HostListener('mouseleave', ['$event'])
  handleHoverEnterAndLeave() {
    if (this.ionTrigger === 'hover') {
      !this.overlayRef ? this.createOverlay() : this.destroyOverlay();
    }
  }

  private createOverlay(): void {
    const nativeElement = this.elementRef.nativeElement;
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(nativeElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        } as ConnectedPosition,
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        } as ConnectedPosition,
      ])
      .withDefaultOffsetY(10);
    this.overlayRef = this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: ['drop'],
      positionStrategy: positionStrategy,
    });
    const dropdownComponent = DropdownComponent;
    dropdownComponent.prototype.options = this.options;
    const component = new ComponentPortal(dropdownComponent);
    this.overlayRef.attach(component);

    const rect = nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (windowHeight - rect.bottom < 200) {
      console.log('oie');
      // Se estiver perto da parte inferior, ajuste a posição para abrir para cima
      positionStrategy.withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        } as ConnectedPosition,
      ]);
      positionStrategy.withDefaultOffsetY(30);
      this.overlayRef.updatePosition();
    }

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
