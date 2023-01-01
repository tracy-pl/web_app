import { theme as antdTheme } from 'antd';
import { useTheme as useSCTheme } from 'styled-components';

import { useAppSelector } from './useAppSelector';
import { getIsDarkTheme, getTheme } from 'redux/app';

export const useTheme = () => {
  const theme = useSCTheme();
  const { token: antdToken } = antdTheme.useToken();
  const currentTheme = useAppSelector(getTheme);
  const isDarkTheme = useAppSelector(getIsDarkTheme);

  return { theme, currentTheme, isDarkTheme, antdToken };
};
