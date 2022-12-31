import { theme } from 'antd';
import { getIsDarkTheme, getTheme } from 'redux/app';
import { useAppSelector } from './useAppSelector';

export const useTheme = () => {
  const { token: antdToken } = theme.useToken();
  const currentTheme = useAppSelector(getTheme);
  const isDarkTheme = useAppSelector(getIsDarkTheme);

  return { currentTheme, isDarkTheme, antdToken };
};
