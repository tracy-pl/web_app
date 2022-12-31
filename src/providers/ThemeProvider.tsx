import React, { useMemo } from 'react';
import { ConfigProvider, theme } from 'antd';
import { ThemeProvider as SCThemeProvider } from 'styled-components';

import { useAppSelector } from 'hooks';
import { getIsDarkTheme } from 'redux/app';
import { colors, Schema } from 'shared/theme';

const CustomSCThemeProvider = ({ children }) => {
  const { token } = theme.useToken();
  const schema: Schema = useMemo(
    () => ({
      colors: {
        text: token.colorText,
        primary: token.colorPrimary,
        background: token.colorBgContainer,
      },
    }),
    [token],
  );

  return <SCThemeProvider theme={schema}>{children}</SCThemeProvider>;
};

export const ThemeProvider = ({ children }) => {
  const isDarkTheme = useAppSelector(getIsDarkTheme);
  const themeConfig = useMemo(
    () => ({
      algorithm: isDarkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm,
      token: {
        colorPrimary: colors.blue1,
      },
    }),
    [isDarkTheme],
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <CustomSCThemeProvider>{children}</CustomSCThemeProvider>
    </ConfigProvider>
  );
};
