import { VideoHTMLAttributes } from "react";

export type VideoProps = VideoHTMLAttributes<HTMLVideoElement>;

export const Video = ({ src, ...rest }: VideoProps) => {
  return (
    <video controls width="100%" {...rest}>
      <source src={src} type="video/mp4" />
    </video>
  );
};
