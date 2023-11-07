import { SVGProps } from "react";
import cn from "clsx";

interface SVGLogoProps extends SVGProps<SVGSVGElement> {
  fill?: string;
}

const LogoSVG = (props: SVGLogoProps) => {
  const { fill, ...rest } = props;

  return (
    <svg
      fill={cn(fill)}
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <title>{"sound"}</title>
      <path d="M26 17l-3 3-3-3-3 3-3-3-3 3-6-6 3-3 3 3 3-3 3 3 3-3 6 6z" />
    </svg>
  );
};

export default LogoSVG;
