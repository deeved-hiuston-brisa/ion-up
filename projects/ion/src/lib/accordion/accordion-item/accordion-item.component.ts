import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonIconComponent } from '../../icon';
import { SafeAny } from '../../utils/safe-any';
import { IonAccordionItemProps } from '../types';

@Component({
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  selector: 'ion-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class IonAccordionItemComponent implements OnInit {
  @Input() templateHeader!: IonAccordionItemProps['templateHeader'];
  @Input() show?: IonAccordionItemProps['show'] = false;
  @Input() data?: IonAccordionItemProps['data'];
  @Output() activeChange: IonAccordionItemProps['activeChange'] =
    new EventEmitter<void>();

  public iconSize = 24;

  public ngOnInit(): void {
    if (!this.templateHeader) {
      throw new Error('The templateHeader propertie were not set correctly');
    }
  }

  public toggle(): void {
    this.show = !this.show;
    this.activeChange.emit();
  }

  public generateContext(element: SafeAny): SafeAny {
    return {
      $implicit: element,
    };
  }
}
