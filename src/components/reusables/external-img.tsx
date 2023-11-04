"use client";

/* eslint-disable @next/next/no-img-element */
import cn from "clsx";
import { ImgHTMLAttributes, useState } from "react";

interface ExternalImgProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

const ExternalImg = (props: ExternalImgProps) => {
  const { className, ...rest } = props;
  const [isLoading, setLoading] = useState(true);

  return (
    <img
      {...rest}
      src={props.src}
      className={cn(
        className,
        "duration-700 ease-in-out",
        isLoading ? "scale-105 blur-lg" : "scale-100 blur-0"
      )}
      width={props.width}
      height={props.height}
      alt={props.alt}
      title={props.title}
      onLoad={() => setLoading(false)}
    />
  );
};

export default ExternalImg;
