import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleMenuComponent } from './simple-menu.component';

describe('SimpleMenuComponent', () => {
  let component: SimpleMenuComponent;
  let fixture: ComponentFixture<SimpleMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleMenuComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SimpleMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
