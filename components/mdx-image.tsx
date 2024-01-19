"use client";

import NextImage from "next/image";

export interface MdxImageProps {
  base: string;
  fileName?: string;
  className?: string;
}

/**
 * MDX 파일에서 사용하는 이미지 컴포넌트
 */
const MdxImage = ({ base, fileName, className }: MdxImageProps) => {
  return (
    fileName && (
      <NextImage
        src={`${base}${fileName ? `/${fileName}` : ""}`}
        alt={`${base}-${fileName}`}
        width={640}
        height={100}
        className={className}
      />
    )
  );
};

export default MdxImage;
