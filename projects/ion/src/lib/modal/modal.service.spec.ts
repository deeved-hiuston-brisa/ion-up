import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { firstValueFrom } from 'rxjs';
import { MockComponent } from './mock/mock.component';
import { IonModalService } from './modal.service';

@Component({
  standalone: true,
  selector: 'ion-component-to-render',
  template: `<div></div>`,
})
class ToModalComponent {}

let service: IonModalService;
let fixture: ComponentFixture<ToModalComponent>;

describe('IonModalService', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [IonModalService],
    });
    fixture = TestBed.createComponent(ToModalComponent);
    service = TestBed.inject(IonModalService);
  }));

  it('should open a modal with default values and component inside', () => {
    service.open(MockComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    expect(screen.getByRole('heading', { name: /ion modal/i })).toBeVisible();
  });
  it('should set params to component inside modal', () => {
    service.open(MockComponent, {
      params: { title: 'Test' },
    });
    fixture.detectChanges();
    expect(screen.getByText('Test')).toBeVisible();
  });
  it('should emit action when header button is clicked', async () => {
    const { observable } = service.open(MockComponent, {
      headerButton: { label: 'Test', icon: { type: 'test' } },
    });
    fixture.detectChanges();
    const action = firstValueFrom(observable);
    await userEvent.click(screen.getByTestId('ion-button-Test'));
    await expect(action).resolves.toMatchObject({ action: 'onHeaderAction' });
  });
  it('should emit action when close button is clicked', async () => {
    const { observable } = service.open(MockComponent);
    fixture.detectChanges();
    const action = firstValueFrom(observable);
    await userEvent.click(
      within(screen.getByTestId('close-btn')).getByRole('button')
    );
    await expect(action).resolves.toMatchObject({ action: 'onClose' });
  });
  it('should emit action when confirm button is clicked', async () => {
    const { observable } = service.open(MockComponent, {
      footer: {
        primaryButton: { label: 'Confirmar', icon: { type: 'check' } },
      },
    });
    fixture.detectChanges();
    const action = firstValueFrom(observable);
    await userEvent.click(screen.getByTestId('ion-button-Confirmar'));
    await expect(action).resolves.toMatchObject({ action: 'onConfirm' });
  });
  it('should close modal', async () => {
    service.open(MockComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    service.close();
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });
  it('should close modal with a given id', async () => {
    const { id } = service.open(MockComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-modal')).toBeVisible();
    service.closeById(id);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });
  it('should close all modals', async () => {
    service.open(MockComponent);
    service.open(MockComponent);
    fixture.detectChanges();
    expect(screen.getAllByTestId('ion-modal').length).toBe(2);
    service.closeAll();
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-modal')).toBeNull();
  });
  it('should update modal configuration', () => {
    service.open(MockComponent);
    fixture.detectChanges();
    service.update({ title: 'Updated' });
    fixture.detectChanges();
    expect(screen.getByRole('heading', { name: /updated/i })).toBeVisible();
  });
});
