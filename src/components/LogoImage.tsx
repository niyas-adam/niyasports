"use client";

import { useState } from "react";
import Image from "next/image";

type LogoImageProps = {
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
};

export default function LogoImage({ width, height, className, priority }: LogoImageProps) {
  const [usePng, setUsePng] = useState(true);

  return (
    <Image
      src={usePng ? "/logo.png" : "/logo.svg"}
      alt="United Sports"
      width={width}
      height={height}
      className={className}
      priority={priority}
      onError={() => setUsePng(false)}
    />
  );
}
