import { HTMLProps } from "react";
import cn from "clsx";

interface HrSeparatorProps extends HTMLProps<HTMLHRElement> {
  className?: string;
}

const HrSeparator = (props: HrSeparatorProps) => {
  const { className, ...rest } = props;

  return <hr {...rest} className={cn(className, "border-gray-200")} />;
};

export default HrSeparator;
