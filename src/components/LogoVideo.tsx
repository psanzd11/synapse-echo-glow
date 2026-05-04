import logoVideo from "@/assets/viddix-logo.mp4";

interface LogoVideoProps {
  className?: string;
}

export const LogoVideo = ({ className }: LogoVideoProps) => {
  return (
    <video
      src={logoVideo}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={{ mixBlendMode: "screen" }}
    />
  );
};
