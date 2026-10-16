"use client";

import { useEffect, useRef } from "react";

export function HomeVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const tryPlay = () => {
      // Autoplay can be blocked until a gesture; stay muted and fail quietly.
      void video.play().catch(() => {});
    };

    // preload="none" keeps the 6MB reel off the critical path until it nears view.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { rootMargin: "200px 0px" },
    );
    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="home-video-section" aria-label="Showreel">
      <div className="home-video-frame" data-reveal="scale">
        <video
          ref={ref}
          className="home-video"
          muted
          loop
          playsInline
          preload="none"
          poster="/video-poster.jpg"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback"
          tabIndex={-1}
          aria-hidden="true"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>
    </section>
  );
}
