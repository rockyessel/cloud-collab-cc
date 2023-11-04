'use client';
import Image from 'next/image';

import cn from 'clsx';
import { ComponentProps, useState } from 'react';

const NextImage = (props: ComponentProps<typeof Image>) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <Image
      {...props}
      src={props.src}
      alt={props.alt}
      width={props.width}
      height={props.height}
      priority={true}
      className={cn(
        props.className,
        'duration-700 ease-in-out',
        isLoading ? 'scale-105 blur-lg' : 'scale-100 blur-0'
      )}
      onLoad={() => setLoading(false)}
    />
  );
};

export default NextImage;
