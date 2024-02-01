import { Component, Input, OnInit } from '@angular/core';
import { AvatarType, IonAvatarProps } from './types';

import { IconType } from '../icon/types';
import { CommonModule } from '@angular/common';
import { IonIconComponent } from '../icon';

@Component({
  selector: 'ion-avatar',
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class IonAvatarComponent implements OnInit {
  @Input() type!: IonAvatarProps['type'];
  @Input() size: IonAvatarProps['size'] = 'md';
  @Input() value?: IonAvatarProps['value'];
  @Input() image?: IonAvatarProps['image'];
  @Input() onErrorImage?: IonAvatarProps['onErrorImage'];

  initials!: string;
  icon!: IconType;

  private getInitials(name: string): string {
    return (
      name &&
      name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    );
  }

  ngOnInit(): void {
    if (this.type === AvatarType.initials) {
      this.initials = this.getInitials(this.value as string) || '--';
      return;
    }
  }
}
