import { useTheme } from "@/contexts/ThemeContext";

interface LogoVideoProps {
  className?: string;
}

export const LogoVideo = ({ className }: LogoVideoProps) => {
  const { theme } = useTheme();
  const isLight = theme === "light";

  // Theme-specific assets with a REAL alpha channel (VP9 yuva420p):
  // - dark:  white logo  (viddix-logo-alpha.webm)
  // - light: black logo, inversion baked into the asset (viddix-logo-alpha-black.webm)
  // Deliberately NO css filter and NO mix-blend-mode here: GPU video overlays
  // (e.g. Chrome on Windows) render those unreliably on <video> and they
  // produced visible boxes/tints. key={theme} forces a reload on theme switch.
  return (
    <video
      key={theme}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    >
      <source
        src={isLight ? "/viddix-logo-alpha-black.webm" : "/viddix-logo-alpha.webm"}
        type="video/webm"
      />
      {/* Fallback for browsers without WebM support (older iOS Safari).
          White-on-black source, so only meaningful in dark mode. */}
      {!isLight && <source src="/logo.mp4" type="video/mp4" />}
    </video>
  );
};
