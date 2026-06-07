import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { CaseStudyMediaItem } from "@/data/caseStudies";

type Props = {
  media: CaseStudyMediaItem[];
  /** Optional label rendered in the fake browser address pill. */
  urlLabel?: string;
  /** Auto-advance interval in ms (paused while a video is playing). 0 disables. */
  intervalMs?: number;
  /** Gradient class for the soft glow behind the frame. */
  accent?: string;
};

const isEmbed = (src: string) => /youtube\.com|youtu\.be|vimeo\.com/.test(src);

const ImageItem = ({ item }: { item: Extract<CaseStudyMediaItem, { kind: "image" }> }) => (
  <img
    src={item.src}
    alt={item.alt ?? item.caption ?? ""}
    loading="lazy"
    className="absolute inset-0 h-full w-full object-cover"
  />
);

const VideoItem = ({
  item,
  isActive,
  onPlayStateChange,
}: {
  item: Extract<CaseStudyMediaItem, { kind: "video" }>;
  isActive: boolean;
  onPlayStateChange: (playing: boolean) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Pause native videos when the slide is rotated away.
  useEffect(() => {
    if (!isActive && videoRef.current && !videoRef.current.paused) {
      videoRef.current.pause();
    }
  }, [isActive]);

  if (isEmbed(item.src)) {
    return (
      <iframe
        src={item.src}
        title={item.caption ?? "Video"}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return (
    <video
      ref={videoRef}
      src={item.src}
      poster={item.poster}
      controls
      playsInline
      preload="metadata"
      onPlay={() => onPlayStateChange(true)}
      onPause={() => onPlayStateChange(false)}
      onEnded={() => onPlayStateChange(false)}
      className="absolute inset-0 h-full w-full object-cover bg-black"
    />
  );
};

export const CaseStudyMediaGallery = ({
  media,
  urlLabel = "viddix.app",
  intervalMs = 5200,
  accent,
}: Props) => {
  const [idx, setIdx] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const total = media.length;

  useEffect(() => {
    if (total <= 1 || intervalMs <= 0 || videoPlaying) return;
    const id = setInterval(() => setIdx((i) => (i + 1) % total), intervalMs);
    return () => clearInterval(id);
  }, [total, intervalMs, videoPlaying]);

  if (total === 0) return null;

  const current = media[idx];
  const go = (dir: 1 | -1) => setIdx((i) => (i + dir + total) % total);

  return (
    <section className="relative px-5 sm:px-6 pb-4 border-t border-white/5">
      <div className="relative mx-auto max-w-5xl pt-10 sm:pt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          {accent && (
            <div
              className={`pointer-events-none absolute -inset-x-4 sm:-inset-x-10 -inset-y-6 -z-10 rounded-[2.5rem] bg-gradient-to-br ${accent} blur-3xl opacity-30`}
            />
          )}

          <div className="relative w-full rounded-2xl border border-white/10 bg-gradient-to-b from-[#1c1d2a] to-[#0d0e16] overflow-hidden shadow-[0_25px_70px_-15px_rgba(124,92,255,0.35)]">
            <div className="absolute -top-px left-1/2 -translate-x-1/2 h-px w-2/3 bg-gradient-to-r from-transparent via-[#A78BFA] to-transparent" />

            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 flex justify-center">
                <span className="inline-block max-w-[70%] truncate rounded-full bg-white/[0.06] border border-white/5 px-3 py-1 text-[10.5px] text-white/55">
                  {urlLabel}
                </span>
              </div>
              <div className="w-12" aria-hidden />
            </div>

            {/* Media stage */}
            <div className="relative w-full aspect-video bg-black">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${idx}-${current.src}`}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.99 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  {current.kind === "image" ? (
                    <ImageItem item={current} />
                  ) : (
                    <VideoItem
                      item={current}
                      isActive
                      onPlayStateChange={setVideoPlaying}
                    />
                  )}
                  {current.kind === "video" && !isEmbed(current.src) && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/55 backdrop-blur px-2 py-0.5 text-[10px] font-medium text-white/85"
                    >
                      <Play className="h-2.5 w-2.5" strokeWidth={2.5} />
                      Video
                    </span>
                  )}
                </motion.div>
              </AnimatePresence>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 backdrop-blur text-white/85 hover:bg-black/75 hover:text-white transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-10 inline-flex h-11 w-11 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/15 bg-black/55 backdrop-blur text-white/85 hover:bg-black/75 hover:text-white transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </div>

            {/* Footer — caption + dots */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-white/5 bg-white/[0.02] min-h-[44px]">
              <p className="text-[11.5px] text-white/65 leading-snug">
                {current.caption ?? ""}
              </p>
              {total > 1 && (
                <div className="flex gap-1.5 shrink-0">
                  {media.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setIdx(i)}
                      aria-label={`Go to item ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 ${
                        i === idx
                          ? "w-6 bg-white/85"
                          : "w-1.5 bg-white/25 hover:bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
