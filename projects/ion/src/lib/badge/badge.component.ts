import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { IonBadgeProps } from './type';

@Component({
  selector: 'ion-badge',
  standalone: true,
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
})
export class IonBadgeComponent implements OnInit {
  @HostBinding('[attr.data-type]')
  @Input()
  type: IonBadgeProps['type'] = 'primary';
  @Input({ transform: handleLabel, required: true })
  label!: IonBadgeProps['label'];

  private rederer = inject(Renderer2);
  private element = inject(ElementRef);

  ngOnInit(): void {
    if (!String(this.label).trim()) {
      throw new Error(`Label can't be empty!`);
    }

    this.rederer.setAttribute(
      this.element.nativeElement,
      'data-testid',
      `ion-badge-${this.label}`
    );
  }
}

function handleLabel(value: string | number) {
  return Number(value) > 99 ? '99+' : value;
}
