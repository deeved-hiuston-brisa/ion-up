// describe('IonComponent', () => {
//   it('should', () => {
//     expect(true).toBeTruthy();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonComponent } from './ion.component';

describe('AppComponent', () => {
  let component: IonComponent;
  let fixture: ComponentFixture<IonComponent>;

  // beforeEach(async () => {
  //   await TestBed.configureTestingModule({
  //     declarations: [IonComponent],
  //     imports: [IonComponent],
  //   }).compileComponents();
  // });

  beforeEach(() => {
    fixture = TestBed.createComponent(IonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(fixture.nativeElement).toHaveTextContent('ion works!');
  });
});
