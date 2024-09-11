import { DialogRef } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import {
  IonAlertComponent,
  IonButtonComponent,
  IonButtonProps,
} from '../../public-api';
import { SafeAny } from '../utils/safe-any';
import { IonModalComponent } from './modal.component';
import { ModalConfiguration } from './types';

const action = jest.fn();
const close = jest.fn();

const headerButton: ModalConfiguration['headerButton'] = {
  label: 'Back',
  icon: {
    type: 'left',
  },
  hidden: () => false,
};

const alert: ModalConfiguration['alert'] = {
  type: 'success',
  message: 'This is a success message',
  description: 'This is a description',
};

const primaryButton: Partial<
  Pick<IonButtonProps, 'label' | 'icon' | 'disabled' | 'loading'>
> = {
  label: 'Confirmar',
  disabled: false,
  loading: false,
  icon: {
    type: 'check',
  },
};

const secondaryButton: Partial<Pick<IonButtonProps, 'label' | 'icon'>> = {
  label: 'Cancelar',
  icon: {
    type: 'close',
  },
};

const sut = async () => {
  return render(IonModalComponent, {
    componentImports: [CommonModule, IonAlertComponent, IonButtonComponent],
    componentProviders: [
      {
        provide: DialogRef,
        useValue: {
          close,
        },
      },
    ],
    componentOutputs: {
      onAction: {
        emit: action,
      } as SafeAny,
    },
  });
};

const changeConfiguration = (
  fixture: ComponentFixture<IonModalComponent>,
  configuration: ModalConfiguration
) => {
  fixture.componentInstance.configuration.update(config => ({
    ...config,
    ...configuration,
  }));
  fixture.detectChanges();
};

describe('IonModalComponent', () => {
  it('should render default width and title', async () => {
    await sut();
    expect(screen.getByTestId('ion-modal')).toHaveStyle('width: 500px');
    expect(screen.getByRole('heading', { name: /ion modal/i })).toBeVisible();
  });
  describe('Header', () => {
    describe('Button', () => {
      afterEach(() => {
        action.mockClear();
        close.mockClear();
      });
      it('should render a header button with icon', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { headerButton });
        expect(
          screen.getByTestId(`ion-button-${headerButton.label}`)
        ).toBeVisible();
        expect(
          document.getElementById(`ion-icon-${headerButton.icon.type}`)
        ).toBeVisible();
      });
      it('should call action with onHeaderAction type when clicked', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { headerButton });
        await userEvent.click(
          screen.getByTestId(`ion-button-${headerButton.label}`)
        );
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith('onHeaderAction');
      });
      it('should not close modal when clicked', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { headerButton });
        await userEvent.click(
          screen.getByTestId(`ion-button-${headerButton.label}`)
        );
        expect(close).not.toHaveBeenCalled();
      });
      it('should not render when hidden is true', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, {
          headerButton: { ...headerButton, hidden: () => true },
        });
        expect(
          screen.queryByTestId(`ion-button-${headerButton.label}`)
        ).toBeNull();
      });
    });
    describe('Title', () => {
      it('should render title', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { title: 'My Modal' });
        expect(
          screen.getByRole('heading', { name: /my modal/i })
        ).toBeVisible();
      });
    });
    describe('Close Button', () => {
      afterEach(() => {
        action.mockClear();
        close.mockClear();
      });
      it('should render close button by default', async () => {
        await sut();
        expect(screen.getByTestId('ion-button-Fechar')).toBeVisible();
      });
      it('should emit onClose action and close modal when clicked', async () => {
        await sut();
        await userEvent.click(screen.getByTestId('ion-button-Fechar'));
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith('onClose');
        expect(close).toHaveBeenCalledTimes(1);
      });
      it('should not render when hideCloseButton is true', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { hideCloseButton: true });
        expect(screen.queryByTestId('ion-button-Fechar')).toBeNull();
      });
    });
  });
  describe('Alert', () => {
    it('should render alert message and description', async () => {
      const { fixture } = await sut();
      changeConfiguration(fixture, { alert });
      expect(screen.getByText(alert.message)).toBeVisible();
      expect(screen.getByText(alert.description)).toBeVisible();
    });
  });
  describe('Footer', () => {
    it('should hide footer', async () => {
      const { fixture } = await sut();
      changeConfiguration(fixture, { footer: { hide: true } });
      expect(screen.queryByTestId('ion-modal-footer')).toBeNull();
    });
    it('should show divider', async () => {
      const { fixture } = await sut();
      changeConfiguration(fixture, { footer: { showDivider: true } });
      expect(screen.getByTestId('ion-modal-footer')).toHaveClass(
        'footer__divider'
      );
    });
    describe('Primary Button', () => {
      it('should have label and icon', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, {
          footer: { primaryButton },
        });
        expect(
          screen.getByTestId(`ion-button-${primaryButton.label}`)
        ).toBeVisible();
        expect(
          document.getElementById(`ion-icon-${primaryButton.icon?.type}`)
        ).toBeVisible();
      });
      it('should be disabled', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, {
          footer: { primaryButton: { ...primaryButton, disabled: true } },
        });
        expect(
          screen.getByTestId(`ion-button-${primaryButton.label}`)
        ).toBeDisabled();
      });
      it('should be loading', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, {
          footer: { primaryButton: { ...primaryButton, loading: true } },
        });
        expect(
          screen.getByTestId(`ion-button-${primaryButton.label}`)
        ).toHaveClass('ion-btn--loading');
      });
      it('should call action with onConfirm type when clicked and close modal', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { footer: { primaryButton } });
        await userEvent.click(
          screen.getByTestId(`ion-button-${primaryButton.label}`)
        );
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith('onConfirm');
        expect(close).toHaveBeenCalledTimes(1);
      });
    });
    describe('Secondary Button', () => {
      it('should have label and icon', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, {
          footer: { secondaryButton },
        });
        expect(
          screen.getByTestId(`ion-button-${secondaryButton.label}`)
        ).toBeVisible();
        expect(
          document.getElementById(`ion-icon-${secondaryButton.icon?.type}`)
        ).toBeVisible();
      });
      it('should call action with onClose type when clicked and close modal', async () => {
        const { fixture } = await sut();
        changeConfiguration(fixture, { footer: { secondaryButton } });
        await userEvent.click(
          screen.getByTestId(`ion-button-${secondaryButton.label}`)
        );
        expect(action).toHaveBeenCalledTimes(1);
        expect(action).toHaveBeenCalledWith('onClose');
        expect(close).toHaveBeenCalledTimes(1);
      });
    });
  });
});
