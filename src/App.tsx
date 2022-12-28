import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from 'screens/HomePage/Loadable';
import { NotFoundPage } from 'screens/NotFoundPage/Loadable';
import { LoginScreen } from 'features/auth/screens/Login/Loadable';
import { UsersPage } from 'features/admin/screens/UsersPage/Loadable';

import { Layout } from 'components/Layout';

import { useAppSelector } from 'hooks';
import { isLoggedInSelector } from 'redux/user';

export function App() {
  const { i18n } = useTranslation();
  const isLoggedIn = useAppSelector(isLoggedInSelector);

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
        {!isLoggedIn ? (
          <Route path="*" element={<LoginScreen />} />
        ) : (
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/tracy" element={<div>Tracy</div>} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        )}
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
