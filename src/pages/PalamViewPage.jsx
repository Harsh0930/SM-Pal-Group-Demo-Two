import ResponsiveImage from '../components/ResponsiveImage.jsx';
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import Footer from '../components/Footer.jsx';
import PalamGradientBars from '../components/PalamGradientBars.jsx';
import PalamViewContent from '../components/PalamViewContent.jsx';
import { usePageSeo } from '../hooks/usePageSeo.js';
import { palamViewSeo } from '../data/palamViewContent.js';

export const seo = palamViewSeo;

// CSS Variables from main site design system:
// --green: #0d3b2b
// --deep: #08281e
// --brass: #d9b204
// --ivory: #f7f5ef
// --ink: #30323d
// --muted: #72756e

// Scroll-Telling Canvas Hero Section
//
// Reverse-direction intent:
//   At the top of the hero, the user sees the LAST frame (the "front" view
//   of the building). As they scroll down, the sequence walks BACKWARD through
//   the frames back to frame 0. This is intentional and matches the editorial
//   idea of "zooming in" on the building as the user commits to the project.
//   Do not "fix" the reversal — the static <ResponsiveImage> poster and the loader both
//   rely on the same convention.
const ScrollCanvasHero = () => {
  // Register the ScrollTrigger plugin once. GSAP's plugin registration is
  // global, so calling it here is safe even if multiple components share the
  // gsap import.
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationRef = useRef(null);

  // The frame count is read from a small manifest.json at /assets/palam-view-frames/.
  // If the manifest is missing or fails to load, we fall back to 300 (the
  // current count). The fallback path also guards against a hard 404 if
  // someone adds or removes frames without updating the manifest.
  const FRAME_COUNT_FALLBACK = 300;
  const FRAME_PREFIX_DEFAULT = "ezgif-frame-";
  const FRAME_EXT_DEFAULT = ".png";
  const FRAME_PATH = "/assets/palam-view-frames/";
  const MANIFEST_URL = `${FRAME_PATH}manifest.json`;

  // frameCountRef is mutable so the load and render effects can pick up the
  // manifest value as soon as it arrives, without re-running the heavy
  // effects on a state change.
  const frameCountRef = useRef(FRAME_COUNT_FALLBACK);
  const framePrefixRef = useRef(FRAME_PREFIX_DEFAULT);
  const frameExtRef = useRef(FRAME_EXT_DEFAULT);
  const [frameCount, setFrameCount] = useState(FRAME_COUNT_FALLBACK);

  // Easing for the render loop's lerp toward the ScrollTrigger-driven target.
  // Higher values = less lag, nearly instant tracking. 0.5 gives a gentle
  // 1-frame smoothing pass on fast scrolls while keeping the canvas tightly
  // locked to scroll position.
  const EASING = 0.5;

  // Initial-burst frame counts — tuned per breakpoint so mobile doesn't try
  // to decode 36 jpegs in parallel the moment the section enters the viewport.
  // isMobileViewport() checks at effect time, so a phone that rotates from
  // portrait to landscape gets the right strategy on the next page load.
  const isMobileViewport = () =>
    typeof window !== "undefined" && window.innerWidth <= 640;
  const INITIAL_FRAME_COUNT_DESKTOP = 60;
  const INITIAL_FRAME_COUNT_MOBILE = 30;
  const REMAINING_BATCH_SIZE_DESKTOP = 24;
  const REMAINING_BATCH_SIZE_MOBILE = 12;
  const BATCH_INTERVAL_DESKTOP = 120;
  const BATCH_INTERVAL_MOBILE = 200;

  // Defer frame loading until the section is about to enter the viewport.
  // This prevents hundreds of image requests from firing on the PalamView
  // page mount for users who never scroll down to the canvas (e.g. the link
  // could be a stray browser tab, or the user navigates away quickly).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    let cancelled = false;

    // Try to load the manifest first so we know the real frame count. If the
    // manifest is missing or 404s, we silently keep the fallback (300) so the
    // page still works without a deploy.
    const loadManifest = async () => {
      try {
        const res = await fetch(MANIFEST_URL, { cache: "force-cache" });
        if (!res.ok) return;
        const data = await res.json();
        if (cancelled) return;
        if (Number.isFinite(data?.count) && data.count > 0) {
          frameCountRef.current = data.count;
          setFrameCount(data.count);
        }
        if (typeof data?.prefix === "string" && data.prefix) {
          framePrefixRef.current = data.prefix;
        }
        if (typeof data?.ext === "string" && data.ext) {
          frameExtRef.current = data.ext;
        }
      } catch {
        /* manifest missing — keep fallback frame count and path. */
      }
    };

    loadManifest();

    const startLoading = () => {
      if (cancelled) return;
      const total = frameCountRef.current;
      const mobile = isMobileViewport();
      const initialCount = mobile
        ? INITIAL_FRAME_COUNT_MOBILE
        : INITIAL_FRAME_COUNT_DESKTOP;
      const batchSize = mobile
        ? REMAINING_BATCH_SIZE_MOBILE
        : REMAINING_BATCH_SIZE_DESKTOP;
      const batchInterval = mobile ? BATCH_INTERVAL_MOBILE : BATCH_INTERVAL_DESKTOP;

      const frames = new Array(total);
      let loadedCount = 0;
      let initialLoadedCount = 0;
      let batchHandle = 0;
      let batchIndex = initialCount;

      const loadFrame = (index, isInitial) => {
        const frameNum = String(index + 1).padStart(3, "0");
        const img = new Image();
        const onSettled = () => {
          if (cancelled) return;
          loadedCount++;
          if (isInitial) initialLoadedCount++;
          setLoadProgress(Math.round((loadedCount / total) * 100));
          if (initialLoadedCount >= initialCount) setLoaded(true);
        };
        img.onload = onSettled;
        img.onerror = onSettled;
        img.src = `${FRAME_PATH}${framePrefixRef.current}${frameNum}${frameExtRef.current}`;
        frames[index] = img;
      };

      // Eagerly load the first batch so the canvas can paint quickly.
      const firstBatchEnd = Math.min(initialCount, total);
      for (let i = 0; i < firstBatchEnd; i++) loadFrame(i, true);

      framesRef.current = frames;

      const loadNextBatch = () => {
        if (cancelled || batchIndex >= total) return;
        const end = Math.min(batchIndex + batchSize, total);
        for (let i = batchIndex; i < end; i++) loadFrame(i, false);
        batchIndex = end;
        batchHandle = window.setTimeout(loadNextBatch, batchInterval);
      };
      batchHandle = window.setTimeout(loadNextBatch, 200);

      // Expose a cleanup so the outer effect can cancel the rest of the
      // batches if the user unmounts before they all load.
      cleanup = () => window.clearTimeout(batchHandle);
    };

    let cleanup = null;
    if (typeof IntersectionObserver === "undefined") {
      // Fallback: just start immediately.
      startLoading();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              startLoading();
              observer.disconnect();
              break;
            }
          }
        },
        // 200px pre-fetch: start loading just before the user scrolls in.
        { rootMargin: "200px 0px" },
      );
      observer.observe(section);
      return () => {
        cancelled = true;
        observer.disconnect();
        if (cleanup) cleanup();
      };
    }

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  // Setup canvas with high-quality rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const { width: displayWidth, height: displayHeight } = canvas.parentElement.getBoundingClientRect();

      // Set canvas to full viewport with device pixel ratio for sharp rendering
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        // Enable high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
    };

    setupCanvas();
    const resizeObserver = new ResizeObserver(setupCanvas);
    resizeObserver.observe(canvas.parentElement);
    window.addEventListener('resize', setupCanvas);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', setupCanvas);
    };
  }, [loaded]);

  // Render loop with easing
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderLoop = () => {
      // Read the current CSS size after rotation or mobile browser chrome changes.
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      const total = frameCountRef.current;
      // Lerp current → target. EASING stays small for a soft settle; GSAP's
      // scrub is what gives the per-pixel feel, and this just smooths the last
      // 1-2 frames of catch-up after a fast scroll.
      currentFrameRef.current +=
        (targetFrameRef.current - currentFrameRef.current) * EASING;

      const displayFrame = Math.max(
        0,
        Math.min(total - 1, Math.round(currentFrameRef.current)),
      );
      const img = framesRef.current[displayFrame];

      if (img && img.complete) {
        ctx.clearRect(0, 0, displayWidth, displayHeight);

        // Draw image with 'contain' fit logic for high quality
        const imgRatio = img.width / img.height;
        const canvasRatio = displayWidth / displayHeight;

        let drawWidth, drawHeight, drawX, drawY;

        if (canvasRatio > imgRatio) {
          // Canvas is wider - fit to height
          drawHeight = displayHeight;
          drawWidth = displayHeight * imgRatio;
          drawX = (displayWidth - drawWidth) / 2;
          drawY = 0;
        } else {
          // Canvas is taller - fit to width
          drawWidth = displayWidth;
          drawHeight = displayWidth / imgRatio;
          drawX = 0;
          drawY = (displayHeight - drawHeight) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      }

      animationRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [loaded]);

  // Single source of truth: GSAP ScrollTrigger drives targetFrameRef.
  // The rAF render loop reads it; a lightweight setInterval syncs React state
  // for the on-screen frame counter. This replaces both the native scroll
  // listener and the Framer Motion useScroll/useTransform that previously
  // duplicated the same calculation.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const total = frameCountRef.current;
        // Reverse: at the top of the hero (self.progress = 0) show the LAST frame
        // (the "front" view of the building). At the bottom, show frame 0.
        // Instant scroll-driven target — no GSAP easing delay.
        targetFrameRef.current = Math.min(
          total - 1,
          Math.max(0, Math.round((1 - self.progress) * (total - 1))),
        );
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  // Lightweight React state sync for the on-screen frame counter.
  // Uses a setInterval rather than a useEffect + useMotionValue subscription
  // so it ticks only ~10 times per second, keeping the counter live without
  // forcing canvas re-renders on every scroll frame.
  const [progressDisplay, setProgressDisplay] = useState(0);
  const [activeFrame, setActiveFrame] = useState(FRAME_COUNT_FALLBACK - 1);

  useEffect(() => {
    const total = frameCountRef.current;
    const id = setInterval(() => {
      const raw = currentFrameRef.current;
      const pct = total > 0 ? raw / (total - 1) : 0;
      setProgressDisplay(Math.round(Math.min(100, Math.max(0, pct * 100))));
      setActiveFrame(Math.round(raw));
    }, 100);
    return () => clearInterval(id);
  }, []);

  const tagline = "Where the Himalayas meet refined living";

  return (
    <section ref={sectionRef} className="palam-canvas-section">
      {/* No-JS fallback: shows the "front" view of the building (frame 300)
          before the canvas takes over. Browsers with JS paint the canvas on
          top of this <ResponsiveImage> immediately, so there is no visible flash. */}
      <noscript>
        <ResponsiveImage
          src={`${FRAME_PATH}${FRAME_PREFIX_DEFAULT}300${FRAME_EXT_DEFAULT}`}
          alt="Palam View exterior"
          className="palam-noscript-poster"
        />
      </noscript>
      <div className="palam-canvas-bg" />
      <div className="palam-canvas-sticky">
        <canvas ref={canvasRef} className="palam-canvas" />

        {/* Left-to-right green gradient — matches homepage hero overlay */}
        <div className="palam-canvas-gradient-overlay" />
        {/* Cinematic vignette */}
        <div className="palam-canvas-vignette" />
        {/* Edge blend — soft horizontal fade on image left/right so the canvas
            letterbox gutters blend seamlessly into the green background */}
        <div className="palam-canvas-edge-blend" />

        {/* Brand-tinted vertical gradient bars — animated, ambient */}
        <PalamGradientBars side="left" />
        <PalamGradientBars side="right" />

        <div className="palam-canvas-grain" />

        {/* Vertical brand mark - left rail */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={loaded ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="palam-rail-left"
        >
          <span className="palam-rail-label">SM Pal Group</span>
          <span className="palam-rail-divider" />
          <span className="palam-rail-label">Est. 1995</span>
        </motion.div>

        {/* Headline scrim — soft horizontal gradient that darkens the area
            behind the editorial headline so the text reads cleanly without
            fighting the bright bars on the left. */}
        <div className="palam-hero-headline-scrim" aria-hidden="true" />

        {/* Main editorial headline - bottom left */}
        <motion.div
          initial="hidden"
          animate={loaded ? "show" : "hidden"}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
          }}
          className="palam-hero-headline"
        >
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={loaded ? { opacity: 1, width: "auto" } : {}}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="palam-hero-overline"
          >
            <span className="palam-hero-overline-line" />
            <span>Premium Residences · Haldwani</span>
          </motion.span>

          <h1 className="palam-hero-title">
            <span className="palam-hero-title-row">
              {"Palam".split("").map((char, i) => (
                <motion.span
                  key={`p-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="palam-hero-char"
                >
                  {char}
                </motion.span>
              ))}
            </span>
            <span className="palam-hero-title-row palam-hero-title-row--alt">
              {"View".split("").map((char, i) => (
                <motion.span
                  key={`v-${i}`}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    show: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="palam-hero-char palam-hero-char--italic"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={loaded ? { scaleX: 1 } : {}}
                transition={{ delay: 0.95, duration: 0.5 }}
                className="palam-hero-title-dot"
                aria-hidden="true"
              />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="palam-hero-tagline"
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="palam-hero-cta"
          >
            <a href="#vision" className="palam-hero-cta-btn">
              <span>Explore the Project</span>
              <span className="palam-hero-cta-btn-arrow">
                <ArrowUpRight size={16} />
              </span>
            </a>
            <a href="#contact" className="palam-hero-cta-link">
              Book a Site Visit
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom right - progress indicator + frame counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="palam-hero-progress"
        >
          <div className="palam-hero-progress-track">
            <motion.div
              className="palam-hero-progress-fill"
              style={{ width: `${progressDisplay}%` }}
            />
          </div>
          <div className="palam-hero-progress-meta">
            <span>{String(activeFrame + 1).padStart(3, "0")} / {frameCount}</span>
            <span>{progressDisplay}%</span>
          </div>
        </motion.div>

        {/* Bottom left - scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loaded ? 1 : 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="palam-canvas-scroll-cue"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
          <span>Scroll</span>
        </motion.div>

        {/* Loader */}
        <AnimatePresence>
          {!loaded && (
            <motion.div
              className="palam-canvas-loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="palam-canvas-loader-text">Palam View</div>
              <div className="palam-canvas-loader-bar">
                <div
                  className="palam-canvas-loader-progress"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <div className="palam-canvas-loader-count">Loading {loadProgress}%</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

function PalamViewPage() {
  usePageSeo(seo);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <>
    <main id="main" className="palam-main">
      <ScrollCanvasHero />
      <PalamViewContent />
    </main>
    <Footer />
  </>;
}
export default PalamViewPage;
