/* eslint-disable @next/next/no-img-element */
import cn from "clsx";
import { ImgHTMLAttributes } from "react";

interface ExternalImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const ExternalImg = (props: ExternalImgProps) => {
  const { className, ...rest } = props;
  return (
    <img
      {...rest}
      src={props.src}
      className={cn(className)}
      width={props.width}
      height={props.height}
      alt={props.alt}
      title={props.title}
    />
  );
};

export default ExternalImg;
