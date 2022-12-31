export const Theme = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

export interface Schema {
  colors: {
    primary: string;
    text: string;
    background: string;
  };
}
