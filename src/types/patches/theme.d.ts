import 'styled-components';
import { Schema } from 'shared/theme';

type ThemeInterface = Schema;
declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends ThemeInterface {}
}
