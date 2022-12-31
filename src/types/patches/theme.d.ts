import 'styled-components';
import { Schema, Theme } from 'shared/theme';

type ThemeInterface = Schema | Theme;
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}
