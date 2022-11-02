import { Oval } from "react-loader-spinner";
import {
  loaderPrimaryColor,
  loaderSecondaryColor,
  loaderStrokeWidth,
  loaderStrokeWidthSecondary,
} from "../helpers";

interface LoaderProps {
  primaryColor?: string;
  secondaryColor?: string;
  visible?: boolean;
  strokeWidth?: number;
  strokeWidthSecondary?: number;
}

export function LoaderSpinner({
  primaryColor,
  secondaryColor,
  visible,
  strokeWidth,
  strokeWidthSecondary,
}: LoaderProps) {
  return (
    <Oval
      height={80}
      width={80}
      color={primaryColor || loaderPrimaryColor}
      secondaryColor={secondaryColor || loaderSecondaryColor}
      wrapperStyle={{}}
      wrapperClass=""
      visible={visible || true}
      ariaLabel="oval-loading"
      strokeWidth={strokeWidth || loaderStrokeWidth}
      strokeWidthSecondary={strokeWidthSecondary || loaderStrokeWidthSecondary}
    />
  );
}
