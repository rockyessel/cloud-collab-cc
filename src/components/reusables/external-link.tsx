import cn from "clsx";
import { AnchorHTMLAttributes } from "react";

interface ExternalLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
}
const ExternalLink = (props: ExternalLinkProps) => {
  const { className, ...rest } = props;
  return (
    <a
      {...rest}
      className={cn(className)}
      href={props.href}
      title={props.title}
      rel="noopener noreferrer"
      target="_blank"
    >
      {props.children}
    </a>
  );
};

export default ExternalLink;
