import Link from "next/link";
import cn from "clsx";
import { ComponentProps } from "react";

const NextLink = (props: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className={cn(props.className)}
      href={props.href}
      title={props.title}
    >
      {props.children}
    </Link>
  );
};

export default NextLink;
