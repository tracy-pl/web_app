import React from 'react';
import { ConfigProvider } from 'antd';

export const ThemeProvider = ({ children }) => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#0081F6',
      },
    }}
  >
    {children}
  </ConfigProvider>
);
