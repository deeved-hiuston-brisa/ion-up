import {
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { IonDividerProps } from './types';

@Component({
  standalone: true,
  selector: 'ion-divider',
  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
})
export class IonDividerComponent implements OnInit {
  @Input() label: IonDividerProps['label'] = '';
  @Input() direction?: IonDividerProps['direction'] = 'horizontal';
  @HostBinding('[attr.data-type]')
  @Input()
  type?: IonDividerProps['type'] = 'solid';
  @Input() margin?: IonDividerProps['margin'] = false;

  private renderer = inject(Renderer2);
  private element = inject(ElementRef);

  ngOnInit(): void {
    this.renderer.setAttribute(
      this.element.nativeElement,
      'data-testid',
      `ion-divider`
    );
  }
}
