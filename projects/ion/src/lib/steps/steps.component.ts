import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IonIconComponent } from '../icon';
import { IonStepsProps, Status, StatusType, Step } from './types';

@Component({
  standalone: true,
  selector: 'ion-steps',
  imports: [CommonModule, IonIconComponent],
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss'],
})
export class IonStepsComponent implements OnInit, OnChanges {
  @Input() current: IonStepsProps['current'] = 1;
  @Input({ required: true }) steps!: IonStepsProps['steps'];
  @Input() disabled: IonStepsProps['disabled'] = false;
  @Input() clickable: IonStepsProps['clickable'] = false;
  @Output() indexChange: IonStepsProps['indexChange'] =
    new EventEmitter<number>();

  private firstCatchStatus = true;
  public FIRST_STEP = 1;

  public handleClick(index: number | undefined): void {
    if (index && this.clickable && !this.disabled) {
      this.goToStep(index);
    }
  }

  private goToStep(index: number) {
    this.indexChange.emit(index);
    this.changeStep(index);
  }

  public ngOnInit(): void {
    this.generateIndexesForStep();
  }

  private stepStatus(step: Step, currentIndex: number): StatusType {
    if (step.index && step.index < currentIndex) return Status.checked;
    if (step.index === currentIndex) return Status.selected;
    return Status.default;
  }

  private checkStartedStatus(step: Step, currentIndex: number): StatusType {
    return step.status ? step.status : this.stepStatus(step, currentIndex);
  }

  private changeStep(currentIndex: number): void {
    if (currentIndex < 1 || currentIndex > this.steps.length) {
      return;
    }

    this.steps = this.steps.map(step => {
      return {
        ...step,
        status: this.firstCatchStatus
          ? this.checkStartedStatus(step, currentIndex)
          : this.stepStatus(step, currentIndex),
      };
    });

    this.firstCatchStatus = false;
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const { current } = changes;
    if (current && !current.firstChange) {
      this.changeStep(current.currentValue);
    }
  }

  private generateIndexesForStep(): void {
    this.steps.forEach((step, index) => {
      step.index = index + 1;
    });
    this.changeStep(this.current);
  }
}
