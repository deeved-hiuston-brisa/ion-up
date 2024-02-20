import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SafeAny } from '../utils/safe-any';
import { IonAccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionItemOutput, IonAccordionProps } from './types';

@Component({
  standalone: true,
  imports: [CommonModule, IonAccordionItemComponent],
  selector: 'ion-accordion',
  templateUrl: 'accordion.component.html',
  styleUrls: ['accordion.component.scss'],
})
export class IonAccordionComponent implements OnInit {
  @Input() accordions: IonAccordionProps['accordions'] = [];
  @Input() templateBody!: IonAccordionProps['templateBody'];
  @Input() modeAccordion: IonAccordionProps['modeAccordion'] = true;
  @Input() templateHeader!: IonAccordionProps['templateHeader'];
  @Output() activeChange: IonAccordionProps['activeChange'] =
    new EventEmitter<AccordionItemOutput>();

  public ngOnInit(): void {
    this.validate();
  }

  public toggle(index: number): void {
    const state: boolean = this.accordions[index].show;

    if (this.modeAccordion) {
      this.closeAccordions();
    }

    this.accordions[index] = {
      ...this.accordions[index],
      show: !state,
      key: index,
    };

    this.activeChange.emit(this.accordions[index]);
  }

  private closeAccordions(): void {
    this.accordions.forEach(accordion => (accordion.show = false));
  }

  private validate(): void {
    if (!this.accordions.length) {
      throw new Error('The accordions property is not configured correctly');
    }

    if (!this.templateHeader) {
      throw new Error('The TemplateHeader propertie have not been set');
    }

    if (!this.templateBody) {
      throw new Error('The TempleteBody propertie have not been set');
    }
  }

  public generateContext(element: SafeAny): SafeAny {
    return {
      $implicit: element,
    };
  }
}
