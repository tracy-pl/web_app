/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const LoginScreen = lazyLoad(
  () => import('./index'),
  module => module.LoginScreen,
);
