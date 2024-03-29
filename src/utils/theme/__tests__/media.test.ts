import { css } from 'styled-components/macro';

import { media, sizes } from '../media';

describe('media', () => {
  it('should return media query in css', () => {
    const mediaQuery = `${media.sm()}{color:red;}`;
    const cssVersion = css`
      @media (min-width: ${sizes.sm}px) {
        color: red;
      }
    `.join('');
    expect(mediaQuery).toMatch(cssVersion);
  });
});
