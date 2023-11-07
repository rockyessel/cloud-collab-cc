import cn from "clsx";
import { HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}
const Container = (props: SectionProps) => {
  return (
    <div {...props} className={cn(props.className, "mt-2 container mx-auto")}>
      {props.children}
    </div>
  );
};

export default Container;
