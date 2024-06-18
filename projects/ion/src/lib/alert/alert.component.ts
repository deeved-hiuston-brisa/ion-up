import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IconType, IonIconComponent } from '../icon';
import { IonAlertProps } from './types';

export const alertIconTypes = {
  success: 'check-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  negative: 'close-solid',
};

@Component({
  standalone: true,
  selector: 'ion-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
  imports: [CommonModule, IonIconComponent],
  host: {
    '[attr.data-type]': 'type',
  },
})
export class IonAlertComponent implements OnInit {
  @Input() message?: IonAlertProps['message'];
  @Input() customBody?: IonAlertProps['customBody'];
  @Input() type?: IonAlertProps['type'] = 'success';
  @Input() description?: IonAlertProps['description'];
  @Input() closable?: IonAlertProps['closable'] = false;
  @Input() hideBackground?: IonAlertProps['hideBackground'] = false;
  @Input() noRadius?: IonAlertProps['noRadius'] = false;
  @ViewChild('ionAlert', { static: false }) private ionAlert!: ElementRef;

  public iconType!: IconType;

  setIconType(): void {
    this.iconType = alertIconTypes[this.type!];
  }

  closeEvent(): void {
    this.ionAlert.nativeElement.remove();
  }

  ngOnInit(): void {
    this.setIconType();
  }
}
