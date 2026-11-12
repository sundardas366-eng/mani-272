"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./TopMusicBar.module.css";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: any;
  }
}

export function TopMusicBar() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<any>(null);

  const YOUTUBE_VIDEO_ID = "5mvCVJIZWtA"; // Song from: https://youtu.be/5mvCVJIZWtA

  useEffect(() => {
    // Dynamically load YouTube IFrame API if not already present
    if (typeof window === "undefined") return;

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.body.appendChild(tag);
    }

    const initPlayer = () => {
      try {
        if (window.YT && window.YT.Player) {
          playerRef.current = new window.YT.Player("yt-bg-audio-frame", {
            events: {
              onReady: (event: any) => {
                try {
                  event.target.setVolume(80);
                } catch {
                  // ignore
                }
              },
              onStateChange: (event: any) => {
                // 1 = playing, 2 = paused, 0 = ended
                if (event.data === 1) {
                  setIsPlaying(true);
                } else if (event.data === 2 || event.data === 0) {
                  setIsPlaying(false);
                }
              },
            },
          });
        }
      } catch {
        // Fallback to direct iframe postMessage
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }
  }, []);

  const sendIframeCommand = (func: "playVideo" | "pauseVideo") => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({
          event: "command",
          func,
          args: [],
        }),
        "*"
      );
    }
  };

  const handleToggleSound = () => {
    if (isPlaying) {
      // Pause
      sendIframeCommand("pauseVideo");
      if (playerRef.current && typeof playerRef.current.pauseVideo === "function") {
        try {
          playerRef.current.pauseVideo();
        } catch {
          // ignore
        }
      }
      setIsPlaying(false);
    } else {
      // Play
      sendIframeCommand("playVideo");
      if (playerRef.current && typeof playerRef.current.playVideo === "function") {
        try {
          playerRef.current.playVideo();
        } catch {
          // ignore
        }
      }
      setIsPlaying(true);
    }
  };

  return (
    <>
      {/* Top Fixed Music Bar Section */}
      <section className={styles.topBar} aria-label="Audio player controls">
        <div className={styles.container}>
          {/* Left: Track Information + Animated Equalizer */}
          <div className={styles.trackInfo}>
            <span className={styles.badgeTag}>
              <span className={styles.dotLive} aria-hidden="true" />
              BGM
            </span>

            {/* Sound Equalizer Waves */}
            <div
              className={`${styles.equalizer} ${isPlaying ? styles.playing : ""}`}
              aria-hidden="true"
            >
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
              <span className={styles.bar} />
            </div>

            <span className={styles.trackTitle}>Suzume (Theme Track)</span>
            <span className={styles.trackArtist}>· RADWIMPS ft. Toaka</span>
          </div>

          {/* Right: Sound ON / OFF Button Toggle */}
          <div className={styles.controls}>
            <button
              type="button"
              className={`${styles.toggleBtn} ${isPlaying ? styles.toggleBtnActive : ""}`}
              onClick={handleToggleSound}
              aria-label={isPlaying ? "Turn background music OFF" : "Turn background music ON"}
              title="Click to toggle soundtrack playback"
            >
              <span className={styles.switchIndicator} aria-hidden="true">
                {isPlaying ? "❚❚" : "▶"}
              </span>
              <span>{isPlaying ? "SOUND: ON" : "SOUND: OFF"}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Invisible YouTube IFrame Player (Offscreen Active DOM to prevent browser throttling) */}
      <iframe
        id="yt-bg-audio-frame"
        ref={iframeRef}
        src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=0&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0`}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
        title="Background Audio Engine"
        style={{
          position: "fixed",
          top: "-9999px",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }}
      />
    </>
  );
}

