import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input, OnInit } from '@angular/core';

import { AvatarType, IonAvatarProps } from './types';
import { IconType } from '../icon/types';
import { IonIconComponent } from '../icon';
import { DefaultImageDirective } from './defaultImage.directive';

@Component({
  selector: 'ion-avatar',
  standalone: true,
  imports: [CommonModule, IonIconComponent, DefaultImageDirective],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class IonAvatarComponent implements OnInit {
  @Input({ required: true }) type!: IonAvatarProps['type'];
  @HostBinding('[attr.data-size]')
  @Input()
  size?: IonAvatarProps['size'] = 'md';
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
