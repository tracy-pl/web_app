import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { S } from './NotFoundPage.styles';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <S.Wrapper>
        <S.Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </S.Title>
        <S.P>Page not found.</S.P>
        <Link to="/">
          <Button>Go to Home page</Button>
        </Link>
      </S.Wrapper>
    </>
  );
}
