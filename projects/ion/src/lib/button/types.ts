import { EventEmitter } from '@angular/core';
import { IconType } from '../icon';

/**
 * @typedef {'primary' | 'secondary' | 'ghost' | 'dashed'} ButtonType - Tipo do botão.
 * @typedef {'normal' | 'square' | 'circle'} ButtonShape - Formato do botão.
 * @typedef {'sm' | 'md' | 'lg' | 'xl'} ButtonSize - Tamanho do botão.
 * @typedef {Object} IconType - Tipo de ícone.
 * @property {string} type - Tipo de ícone.
 * @property {boolean} [rightPosition] - Posição do ícone à direita do texto.
 */

export type Type = 'primary' | 'secondary' | 'ghost' | 'dashed';
export type Size = 'sm' | 'md' | 'lg' | 'xl';
export type Icon = {
  type: IconType;
  rightPosition?: boolean;
};

export interface IonButtonProps {
  /**
   * Rótulo do botão.
   * @type {string}
   */
  label: string;

  /**
   * Tipo do botão. Pode ser 'primary', 'secondary', 'ghost' ou 'dashed'.
   * @type {ButtonType}
   * @default 'primary'
   */
  type?: Type;

  /**
   * Indica se o botão representa um perigo.
   * @type {boolean}
   * @default false
   */
  danger?: boolean;

  /**
   * Indica se o botão está desativado.
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;

  /**
   * Tamanho do botão. Pode ser 'sm', 'md', 'lg' ou 'xl'.
   * @type {ButtonSize}
   * @default 'md'
   */
  size?: Size;

  /**
   * Configurações do ícone associado ao botão.
   * @type {{ type: IconType; rightPosition?: boolean }}
   */
  icon?: Icon;

  /**
   * Evento acionado quando o botão é clicado.
   * @event IonButtonComponent#ionOnClick
   * @type {EventEmitter<null>}
   * @description Este evento é emitido quando o botão é clicado. A emissão não inclui dados adicionais.
   */
  ionOnClick?: EventEmitter<null>;
}
