/**
 * Asynchronously loads the component for NotFoundPage
 */

import { lazyLoad } from 'utils/loadable';

export const SomethingWentWrongPage = lazyLoad(
  () => import('./index'),
  module => module.SomethingWentWrongPage,
);
