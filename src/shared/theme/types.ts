import { DefaultTheme } from 'styled-components';

import { colors } from './colors';
import { spacings } from './spacings';

export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export interface Schema {
  colors: {
    border: string;
    primary: string;
    text: string;
    background: string;
  };
  spacings: typeof spacings;
  allColors: typeof colors;
}

export type ThemePropsWith<T> = T & { theme: DefaultTheme };
