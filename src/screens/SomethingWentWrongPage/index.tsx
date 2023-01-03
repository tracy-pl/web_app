import React from 'react';
import { Button } from 'antd';

import { persistor } from 'redux/store';

import { S } from './SomethingWentWrongPage.styles';

export function SomethingWentWrongPage() {
  const handleReload = () => window.location.reload();
  const handleLogout = () => {
    persistor.purge();
    window.history.forward();
    window.location.reload();
  };

  return (
    <>
      <S.Wrapper>
        <S.Title>
          <span role="img" aria-label="Crying Face">
            😢
          </span>
        </S.Title>
        <S.P>Something went wrong.</S.P>
        <S.ButtonWrapper>
          <Button onClick={handleReload}>Reload page</Button>
          <Button type="primary" onClick={handleLogout}>
            Reload page and clear cache
          </Button>
        </S.ButtonWrapper>
      </S.Wrapper>
    </>
  );
}
