import { useTheme } from "@/contexts/ThemeContext";

interface LogoVideoProps {
  className?: string;
}

export const LogoVideo = ({ className }: LogoVideoProps) => {
  const { theme } = useTheme();

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={theme === "light" ? { filter: "invert(1)" } : undefined}
    >
      <source src="/viddix-logo-removed-background.webm" type="video/webm" />
    </video>
  );
};
