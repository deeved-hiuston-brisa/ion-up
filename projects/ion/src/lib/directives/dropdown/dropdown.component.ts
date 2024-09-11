import {
  ChangeDetectionStrategy,
  Component,
  computed,
  model,
  output,
  signal,
} from '@angular/core';

import { IonDropdownOption, IonDropdownProps } from './types';
import { IonIconComponent } from '../../icon';
import { IonNoDataComponent } from '../../no-data';
import { IonSpinnerComponent } from '../../spinner';
import { IonButtonComponent } from '../../button';

@Component({
  standalone: true,
  selector: 'ion-dropdown',
  templateUrl: 'dropdown.component.html',
  styleUrls: ['dropdown.component.scss'],
  imports: [
    IonIconComponent,
    IonNoDataComponent,
    IonSpinnerComponent,
    IonButtonComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonDropdownComponent<T extends IonDropdownOption> {
  config = signal<IonDropdownProps<T>['config']>({});
  loading = signal<IonDropdownProps<T>['loading']>(false);
  options = model<IonDropdownProps<T>['options']>([]);
  optionsChange = output<IonDropdownProps<T>['options']>();

  public selectedOptions = computed(() =>
    this.options().filter(option => option.selected)
  );

  public handleHover(hoveredOption: T, mouseEnter: boolean): void {
    if (hoveredOption.disabled || !hoveredOption.selected) {
      return;
    }

    this.options.update(oldOptions =>
      oldOptions.map(option => {
        return option.value === hoveredOption.value
          ? {
              ...option,
              hovered: mouseEnter,
            }
          : option;
      })
    );
  }

  public clearOptions(): void {
    this.options.update(oldOptions =>
      oldOptions.map(option => {
        return option.disabled
          ? option
          : {
              ...option,
              selected: false,
            };
      })
    );
  }

  public selectOption(selectedOption: T): void {
    if (selectedOption.disabled) {
      return;
    }

    if (this.config().multiple) {
      this.handleMultipleOptions(selectedOption);
      this.optionsChange.emit(this.options());
      return;
    }

    this.handleSingleOptions(selectedOption);
    this.optionsChange.emit(this.options());
  }

  private handleMultipleOptions(selectedOption: T): void {
    if (
      (this.isAtSelectedMaxLength() && !selectedOption.selected) ||
      (this.config().required &&
        selectedOption.selected &&
        this.selectedOptions().length === 1)
    ) {
      return;
    }

    this.options.update(options => {
      return options.map(option =>
        option.value === selectedOption.value
          ? { ...option, selected: !option.selected }
          : option
      );
    });
  }

  private isAtSelectedMaxLength(): boolean {
    if (!this.config().maxSelected) {
      return false;
    }

    const selectedOptions = this.options().filter(option => option.selected);

    return selectedOptions.length === this.config().maxSelected;
  }

  private handleSingleOptions(selectedOption: T): void {
    if (
      this.config().required &&
      selectedOption.selected &&
      this.selectedOptions().length === 1
    ) {
      return;
    }
    this.options.update(oldOptions =>
      oldOptions.map(option => {
        return option.value === selectedOption.value
          ? {
              ...option,
              selected: !option.selected,
            }
          : { ...option, selected: false };
      })
    );
  }
}
