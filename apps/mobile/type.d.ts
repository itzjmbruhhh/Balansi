import type { ComponentType } from "react";
import type { SvgProps } from "react-native-svg";

declare global {
  interface TabIconProps {
    icon: ComponentType<SvgProps>;
    color: string;
  }
}

export {};
