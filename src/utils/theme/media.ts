/*
 * Media queries utility
 */

/*
 * Inspired by https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32914
 */

// Update your breakpoints if you want
import { Sizes } from 'shared/theme';

export const sizes = {
  [Sizes.SM]: 600,
  [Sizes.MD]: 1024,
  [Sizes.LG]: 1440,
  [Sizes.XL]: 1920,
};

// Iterate through the sizes and create min-width media queries
export const media = (Object.keys(sizes) as Array<keyof typeof sizes>).reduce(
  (acc, size) => {
    acc[size] = () => `@media (min-width:${sizes[size]}px)`;
    return acc;
  },
  {} as { [key in keyof typeof sizes]: () => string },
);

/* Example
const SomeDiv = styled.div`
  display: flex;
  ....
  ${media.md} {
    display: block
  }
`;
*/
