import homeFilled from '@/assets/icons/filled/ home-filled.svg';
import homeOutlined from '@/assets/icons/outlined/home-outlined.svg';
import categoryFilled from '@/assets/icons/filled/category-filled.svg';
import categoryOutlined from '@/assets/icons/outlined/category-outlined.svg';
import settingsFilled from '@/assets/icons/filled/settings-filled.svg';
import settingsOutlined from '@/assets/icons/outlined/settings-outlined.svg';
import walletFilled from '@/assets/icons/filled/wallet-filled.svg';
import walletOutlined from '@/assets/icons/outlined/wallet-outlined.svg';
import addFilled from '@/assets/icons/filled/add-filled.svg';

export const icons = {
  homeFilled,
  homeOutlined,
  categoryFilled,
  categoryOutlined,
  settingsFilled,
  settingsOutlined,
  walletFilled,
  walletOutlined,
  addFilled
} as const;

export type IconKey = keyof typeof icons;