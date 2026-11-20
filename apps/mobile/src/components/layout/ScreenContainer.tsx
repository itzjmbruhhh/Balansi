import { styled } from "nativewind";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);

type ScreenContainerProps = {
  children: React.ReactNode;
  className?: string;
}

const ScreenContainer = ({
  children,
  className = "",
}: ScreenContainerProps) => {
  return (
    <SafeAreaView
      className={`flex-1 p-5 ${className}`}>
      {children}
    </SafeAreaView>
  )
}

export default ScreenContainer