import cn from "clsx";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}
const Container = (props: SectionProps) => {
  return (
    <div
      {...props}
      className={cn(props.className, "w-full mt-2 px-4 sm:px-6 md:px-10")}
    >
      {props.children}
    </div>
  );
};

export default Container;
