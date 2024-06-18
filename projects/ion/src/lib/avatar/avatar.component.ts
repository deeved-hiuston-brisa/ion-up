import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { IonIconComponent } from '../icon';
import { IconType } from '../icon/types';
import { DefaultImageDirective } from './defaultImage.directive';
import { AvatarType, IonAvatarProps } from './types';

@Component({
  selector: 'ion-avatar',
  standalone: true,
  imports: [CommonModule, IonIconComponent, DefaultImageDirective],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  host: {
    '[attr.data-size]': 'size',
  },
})
export class IonAvatarComponent implements OnInit {
  @Input({ required: true }) type!: IonAvatarProps['type'];
  @Input() size?: IonAvatarProps['size'] = 'md';
  @Input() value?: IonAvatarProps['value'];
  @Input()
  image: IonAvatarProps['image'] = '';
  @Input() onErrorImage: IonAvatarProps['onErrorImage'] = '';
  @Input() icon: IconType = 'union';
  initials!: string;

  private getInitials(name?: string): string {
    return name
      ? name
          .split(' ')
          .map(word => word[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : '--';
  }

  ngOnInit(): void {
    if (this.type === AvatarType.initials) {
      this.initials = this.getInitials(this.value);
    }
  }
}
