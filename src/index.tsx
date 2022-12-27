import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import * as React from 'react';
import 'sanitize.css/sanitize.css';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';

import { App } from 'App';
import { ErrorBoundary, ReduxProvider, ThemeProvider } from 'providers';

import reportWebVitals from 'reportWebVitals';
import 'locales/i18n';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ErrorBoundary>
    <ReduxProvider>
      <ThemeProvider>
        <HelmetProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </HelmetProvider>
      </ThemeProvider>
    </ReduxProvider>
  </ErrorBoundary>,
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept(['./locales/i18n'], () => {
    // No need to render the App again because i18next works with the hooks
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
