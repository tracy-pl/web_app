import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from 'screens/HomePage/Loadable';
import { NotFoundPage } from 'screens/NotFoundPage/Loadable';
import { useAppSelector } from './hooks';

import 'antd/dist/reset.css';

import { LoginScreen } from './features/auth/screens/Login.screen';
import { isLoggedIn } from './redux/user';

export function App() {
  const { i18n } = useTranslation();
  const isAuthenticated = useAppSelector(isLoggedIn);

  console.info({ isAuthenticated });

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Tracy"
        defaultTitle="Tracy"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Tracy application" />
      </Helmet>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<LoginScreen />} />
        ) : (
          <Route path="/" element={<HomePage />} />
        )}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
