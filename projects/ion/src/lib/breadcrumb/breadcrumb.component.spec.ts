import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IonBreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: IonBreadcrumbComponent;
  let fixture: ComponentFixture<IonBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonBreadcrumbComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
