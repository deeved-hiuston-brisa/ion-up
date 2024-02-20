import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from '../utils/safe-any';
import { IonAccordionComponent } from './accordion.component';
import { IonAccordionProps } from './types';

interface Websites {
  name: string;
  url: string;
}

const webSites = [
  { name: 'Brisanet', url: 'https://www.brisanet.com.br/' },
  { name: 'Google', url: 'https://www.google.com.br/' },
];
@Component({
  standalone: true,
  imports: [CommonModule, IonAccordionComponent],
  template: `<ion-accordion
      [accordions]="accordions"
      [modeAccordion]="modeAccordion"
      [templateBody]="customBody"
      [templateHeader]="customHeader">
    </ion-accordion>

    <ng-template #customHeader let-data>
      {{ data.name }}
    </ng-template>

    <ng-template #customBody let-data>
      <h3>Url</h3>
      <p>{{ data.url }}</p>
    </ng-template> `,
})
class AccordionTestComponent {
  accordions: Websites[] = webSites;
  modeAccordion = true;
}

describe('IonAccordion', () => {
  let accordionTestComponent!: AccordionTestComponent;
  let fixture!: ComponentFixture<AccordionTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AccordionTestComponent);
    accordionTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render ion-accordion', async () => {
    expect(screen.getByTestId('ion-accordion')).toBeTruthy();
  });

  it('should render headers correctly', async () => {
    const headers = screen.getAllByTestId('ion-accordion-item__header');
    expect(headers[0]).toHaveTextContent(
      accordionTestComponent.accordions[0].name
    );
    expect(headers[1]).toHaveTextContent(
      accordionTestComponent.accordions[1].name
    );
  });

  it('should correctly render the main of the corresponding header', async () => {
    const headers = screen.getAllByTestId('ion-accordion-item__header');
    headers.forEach((accordion, index) => {
      fireEvent.click(accordion);
      fixture.detectChanges();
      expect(screen.getByTestId('ion-accordion-item__main')).toHaveTextContent(
        webSites[index].url
      );
    });
  });
});

describe('IonAccordion - throw an error', () => {
  const sut = async (
    customProps: IonAccordionProps = {} as SafeAny
  ): Promise<void> => {
    await render(IonAccordionComponent, {
      componentProperties: { ...customProps },
    });
  };

  it('should throw an error when accordions propertie do not exist', async () => {
    try {
      await sut();
    } catch (error: SafeAny) {
      expect(error.message).toBe(
        'The accordions property is not configured correctly'
      );
    }
  });

  it('should throw an error when TemplateHeader propertie do not exist', async () => {
    try {
      await sut({ accordions: webSites } as SafeAny);
    } catch (error: SafeAny) {
      expect(error.message).toBe(
        'The TemplateHeader propertie have not been set'
      );
    }
  });

  it('should throw an error when templateBody propertie do not exist', async () => {
    try {
      await sut({
        accordions: webSites,
        templateHeader: `<p>Test</p>`,
      } as SafeAny);
    } catch (error: SafeAny) {
      expect(error.message).toBe(
        'The TempleteBody propertie have not been set'
      );
    }
  });
});
