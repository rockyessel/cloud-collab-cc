import cn from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

const Button = (props: ButtonProps) => {
  const { className, ...rest } = props;
  return (
    <button {...rest} className={cn(className)}>
      {props.children}
    </button>
  );
};

export default Button;
