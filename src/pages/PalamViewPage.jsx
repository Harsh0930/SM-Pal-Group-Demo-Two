import React, { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Play,
  Star,
  Award,
  Users,
  TrendingUp,
  Shield,
  Heart,
  ChevronDown,
  Building2,
  Leaf,
  CheckCircle2,
} from "lucide-react";
import Footer from "../components/Footer.jsx";
import ImageTrail from "../components/ImageTrail.jsx";
import PalamGradientBars from "../components/PalamGradientBars.jsx";

// CSS Variables from main site design system:
// --green: #0d3b2b
// --deep: #08281e
// --brass: #d9b204
// --ivory: #f7f5ef
// --ink: #30323d
// --muted: #72756e

// Scroll-Telling Canvas Hero Section
const ScrollCanvasHero = () => {
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const animationRef = useRef(null);

  const FRAME_COUNT = 300;
  const FRAME_PREFIX = 'ezgif-frame-';
  const FRAME_EXT = '.jpg';
  const FRAME_PATH = '/assets/palam-view-frames/';
  const EASING = 0.08;

  // Preload frames
  useEffect(() => {
    const frames = [];
    let loadedCount = 0;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const frameNum = String(i).padStart(3, '0');
      const img = new Image();
      img.src = `${FRAME_PATH}${FRAME_PREFIX}${frameNum}${FRAME_EXT}`;

      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount >= FRAME_COUNT) {
          setLoaded(true);
        }
      };

      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / FRAME_COUNT) * 100));
        if (loadedCount >= FRAME_COUNT) {
          setLoaded(true);
        }
      };

      frames.push(img);
    }

    framesRef.current = frames;
  }, []);

  // Setup canvas with high-quality rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const displayWidth = window.innerWidth;
      const displayHeight = window.innerHeight;

      // Set canvas to full viewport with device pixel ratio for sharp rendering
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = displayWidth + 'px';
      canvas.style.height = displayHeight + 'px';

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
        // Enable high quality image smoothing
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
      }
    };

    setupCanvas();
    window.addEventListener('resize', setupCanvas);
    return () => window.removeEventListener('resize', setupCanvas);
  }, [loaded]);

  // Render loop with easing
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    const renderLoop = () => {
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * EASING;

      const displayFrame = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(currentFrameRef.current)));
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

  // Handle scroll to map to frame (REVERSED: scroll down → frame goes from end → start)
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight - window.innerHeight;

      let progress = 0;
      if (rect.top <= 0 && rect.bottom >= window.innerHeight) {
        progress = Math.abs(rect.top) / sectionHeight;
      } else if (rect.top > 0) {
        progress = 0;
      } else {
        progress = 1;
      }

      // Reverse: at the top of the hero (progress 0) show the LAST frame
      // (the original "front" view of the building), and as the user scrolls
      // down, walk back through the sequence to frame 0.
      const reversed = 1 - progress;
      targetFrameRef.current = Math.min(
        FRAME_COUNT - 1,
        Math.max(0, Math.floor(reversed * FRAME_COUNT))
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track scroll progress for UI overlays
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const frameProgress = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const [progressDisplay, setProgressDisplay] = useState(0);
  const [activeFrame, setActiveFrame] = useState(FRAME_COUNT - 1);

  useEffect(() => {
    const unsub = frameProgress.on("change", (v) => {
      setProgressDisplay(Math.round(v));
      // Reverse the frame index to match the reversed scroll direction
      const reversedPct = 1 - v / 100;
      setActiveFrame(
        Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(reversedPct * FRAME_COUNT)))
      );
    });
    return () => unsub();
  }, [frameProgress]);

  const tagline = "Where the Himalayas meet refined living";

  return (
    <section ref={sectionRef} className="palam-canvas-section">
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
            <span>{String(activeFrame + 1).padStart(3, "0")} / {FRAME_COUNT}</span>
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

// Flip Intro Section — scatter → line → circle → bottom arc
const IMG_WIDTH = 60;
const IMG_HEIGHT = 85;
const TOTAL_IMAGES = 20;
const MAX_SCROLL = 3000;

const FLIP_INTRO_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=300&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&q=80",
  "https://images.unsplash.com/photo-1558002038-1055907df827?w=300&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=300&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=300&q=80",
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=300&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&q=80",
  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=300&q=80",
  "https://images.unsplash.com/photo-1600566753051-6057a1f0b1a1?w=300&q=80",
  "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=300&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=300&q=80",
  "https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=300&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=300&q=80",
];

const lerp = (start, end, t) => start * (1 - t) + end * t;

function FlipCard({ src, index, target, isFlipped, onToggle }) {
  return (
    <motion.div
      animate={{
        x: target.x,
        y: target.y,
        rotate: target.rotation,
        scale: target.scale,
        opacity: target.opacity,
      }}
      transition={{
        type: "spring",
        stiffness: 40,
        damping: 15,
      }}
      style={{
        position: "absolute",
        width: IMG_WIDTH,
        height: IMG_HEIGHT,
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      className="flip-intro-card"
    >
      <motion.div
        className="flip-intro-inner"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ rotateY: 180, scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        onClick={onToggle}
        transition={{ duration: 0.7, type: "spring", stiffness: 200, damping: 22 }}
      >
        {/* Front Face */}
        <div className="flip-intro-face flip-intro-front">
          <img src={src} alt={`palam-${index}`} className="flip-intro-img" />
          <div className="flip-intro-img-shade" />
          <div className="flip-intro-card-index">{String(index + 1).padStart(2, "0")}</div>
        </div>

        {/* Back Face */}
        <div className="flip-intro-face flip-intro-back">
          <p className="flip-intro-back-eyebrow">Palam View</p>
          <p className="flip-intro-back-title">{String(index + 1).padStart(2, "0")}</p>
          <p className="flip-intro-back-sub">Residence</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const FlipIntroSection = () => {
  const [introPhase, setIntroPhase] = useState("scatter");
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [flippedIndex, setFlippedIndex] = useState(null);
  const containerRef = useRef(null);
  const [morphValue, setMorphValue] = useState(0);
  const [rotateValue, setRotateValue] = useState(0);
  const [parallaxValue, setParallaxValue] = useState(0);

  // Container size observer
  useEffect(() => {
    if (!containerRef.current) return;

    const handleResize = (entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(containerRef.current);

    // Set initial size immediately from window as a fallback
    setContainerSize({
      width: containerRef.current.offsetWidth || window.innerWidth,
      height: containerRef.current.offsetHeight || window.innerHeight,
    });

    return () => observer.disconnect();
  }, []);

  // Virtual scroll capture
  const virtualScroll = useMotionValue(0);
  const scrollRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      // Only capture wheel once the cards are arranged in the circle/arc phase
      // During the initial scatter/line/circle intro, let normal page scroll work
      if (introPhase !== "circle" || morphValue < 0.5) return;

      e.preventDefault();
      const newScroll = Math.min(Math.max(scrollRef.current + e.deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      if (introPhase !== "circle" || morphValue < 0.5) return;
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e) => {
      if (introPhase !== "circle" || morphValue < 0.5) return;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      touchStartY = touchY;
      const newScroll = Math.min(Math.max(scrollRef.current + deltaY, 0), MAX_SCROLL);
      scrollRef.current = newScroll;
      virtualScroll.set(newScroll);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [virtualScroll, introPhase, morphValue]);

  // Morph progress: 0 (circle) → 1 (bottom arc), driven by scroll 0–600
  const morphProgress = useTransform(virtualScroll, [0, 600], [0, 1]);
  const smoothMorph = useSpring(morphProgress, { stiffness: 40, damping: 20 });

  // Scroll rotation for shuffling the arc: scroll 600–3000 → 0–360
  const scrollRotate = useTransform(virtualScroll, [600, 3000], [0, 360]);
  const smoothScrollRotate = useSpring(scrollRotate, { stiffness: 40, damping: 20 });

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const normalizedX = (relativeX / rect.width) * 2 - 1;
      mouseX.set(normalizedX * 100);
    };
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX]);

  // Intro sequence: scatter → line (500ms) → circle (2500ms)
  useEffect(() => {
    const timer1 = setTimeout(() => setIntroPhase("line"), 500);
    const timer2 = setTimeout(() => setIntroPhase("circle"), 2500);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Random scatter positions (memoized once)
  const scatterPositions = useMemo(() => {
    return FLIP_INTRO_IMAGES.map(() => ({
      x: (Math.random() - 0.5) * 1500,
      y: (Math.random() - 0.5) * 1000,
      rotation: (Math.random() - 0.5) * 180,
      scale: 0.6,
      opacity: 0,
    }));
  }, []);

  // Subscribe to motion values
  useEffect(() => {
    const unsubscribeMorph = smoothMorph.on("change", setMorphValue);
    const unsubscribeRotate = smoothScrollRotate.on("change", setRotateValue);
    const unsubscribeParallax = smoothMouseX.on("change", setParallaxValue);
    return () => {
      unsubscribeMorph();
      unsubscribeRotate();
      unsubscribeParallax();
    };
  }, [smoothMorph, smoothScrollRotate, smoothMouseX]);

  // Content fade
  const contentOpacity = useTransform(smoothMorph, [0.8, 1], [0, 1]);
  const contentY = useTransform(smoothMorph, [0.8, 1], [20, 0]);

  return (
    <section ref={containerRef} className="flip-intro-section">
      <div className="flip-intro-stage">
        {/* Intro text — top centered, never overlaps cards */}
        <div className="flip-intro-introtext">
          <motion.p
            initial={{ opacity: 0 }}
            animate={introPhase === "circle" && morphValue < 0.5 ? { opacity: 0.5 - morphValue } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flip-intro-introsub"
          >
            SCROLL TO EXPLORE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={
              introPhase === "circle" && morphValue < 0.5
                ? { opacity: 1 - morphValue * 2, y: 0, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(10px)" }
            }
            transition={{ duration: 1 }}
            className="flip-intro-introtitle"
          >
            Crafted for the way you live.
          </motion.h1>
        </div>

        {/* Arc active content — top */}
        <motion.div
          style={{ opacity: contentOpacity, y: contentY }}
          className="flip-intro-active"
        >
          <p className="flip-intro-active-eyebrow">A curated showcase</p>
          <h2 className="flip-intro-active-title">Explore Our Vision</h2>
          <p className="flip-intro-active-text">
            Twenty perspectives of refined living. Scroll to shuffle through our
            collection of homes, gardens, and architecture — designed to shape the
            way you live tomorrow.
          </p>
        </motion.div>

        {/* Card layer — centered lower */}
        <div className="flip-intro-cards">
          {FLIP_INTRO_IMAGES.slice(0, TOTAL_IMAGES).map((src, i) => {
            let target = { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 };

            if (introPhase === "scatter") {
              target = scatterPositions[i];
            } else if (introPhase === "line") {
              const lineSpacing = 70;
              const lineTotalWidth = TOTAL_IMAGES * lineSpacing;
              const lineX = i * lineSpacing - lineTotalWidth / 2;
              target = { x: lineX, y: 0, rotation: 0, scale: 1, opacity: 1 };
            } else {
              const isMobile = containerSize.width < 768;
              const minDimension = Math.min(containerSize.width, containerSize.height);

              // Circle position — center of available area below the heading
              const circleRadius = Math.min(minDimension * 0.28, 220);
              const circleAngle = (i / TOTAL_IMAGES) * 360;
              const circleRad = (circleAngle * Math.PI) / 180;
              const circlePos = {
                x: Math.cos(circleRad) * circleRadius,
                y: Math.sin(circleRad) * circleRadius + 60, // push circle down so heading sits above
                rotation: circleAngle + 90,
              };

              // Bottom arc position
              const baseRadius = Math.min(containerSize.width, containerSize.height * 1.5);
              const arcRadius = baseRadius * (isMobile ? 1.4 : 1.1);
              const arcApexY = containerSize.height * (isMobile ? 0.35 : 0.25);
              const arcCenterY = arcApexY + arcRadius;
              const spreadAngle = isMobile ? 100 : 130;
              const startAngle = -90 - spreadAngle / 2;
              const step = spreadAngle / (TOTAL_IMAGES - 1);

              const scrollProgress = Math.min(Math.max(rotateValue / 360, 0), 1);
              const maxRotation = spreadAngle * 0.8;
              const boundedRotation = -scrollProgress * maxRotation;
              const currentArcAngle = startAngle + i * step + boundedRotation;
              const arcRad = (currentArcAngle * Math.PI) / 180;
              const arcPos = {
                x: Math.cos(arcRad) * arcRadius + parallaxValue,
                y: Math.sin(arcRad) * arcRadius + arcCenterY,
                rotation: currentArcAngle + 90,
                scale: isMobile ? 1.4 : 1.8,
              };

              target = {
                x: lerp(circlePos.x, arcPos.x, morphValue),
                y: lerp(circlePos.y, arcPos.y, morphValue),
                rotation: lerp(circlePos.rotation, arcPos.rotation, morphValue),
                scale: lerp(1, arcPos.scale, morphValue),
                opacity: 1,
              };
            }

            return (
              <FlipCard
                key={i}
                src={src}
                index={i}
                target={target}
                isFlipped={flippedIndex === i}
                onToggle={() => setFlippedIndex(flippedIndex === i ? null : i)}
              />
            );
          })}
        </div>

        {/* Interaction hint + progress */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: morphValue > 0.3 ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="flip-intro-hint"
        >
          <span className="flip-intro-hint-dot" />
          <span>Hover cards to flip · Scroll to shuffle</span>
        </motion.div>

        <div className="flip-intro-progress">
          <div
            className="flip-intro-progress-fill"
            style={{ width: `${(rotateValue / 360) * 100}%` }}
          />
        </div>
      </div>
    </section>
  );
};

// Vision Section
const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const visions = [
    {
      title: "Architectural Excellence",
      description: "Every structure, designed by renowned architects, embodies contemporary elegance with timeless appeal.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    },
    {
      title: "Sustainable Living",
      description: "Green building practices and eco-friendly solutions for a healthier tomorrow.",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=2094",
    },
    {
      title: "Smart Home Ready",
      description: "Integrated smart home technology for a seamless modern living experience.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070",
    },
  ];

  return (
    <section id="vision" ref={ref} className="section-pad">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-heading"
        >
          <p className="eyebrow eyebrow-dark">Our Vision</p>
          <h2>
            Crafting Tomorrow's
            <br />
            <em>Living Spaces</em>
          </h2>
          <p className="section-intro">
            At Palam View, we believe in creating more than just homes — we craft lifestyles that inspire and elevate.
          </p>
        </motion.div>

        <div className="palam-vision-grid">
          {visions.map((vision, index) => (
            <motion.article
              key={vision.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="palam-vision-card"
            >
              <div className="palam-vision-image-wrap">
                <img src={vision.image} alt={vision.title} className="palam-vision-image" />
                <div className="palam-vision-shade" />
              </div>
              <div className="palam-vision-body">
                <h3>{vision.title}</h3>
                <p>{vision.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Section
const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: "Club House",
      description: "5000 sq.ft. clubhouse with modern amenities, gym, swimming pool, and spa facilities.",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
    },
    {
      title: "Landscape Gardens",
      description: "Beautifully designed landscape gardens where you can breathe fresh air and enjoy the beauty of nature.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2099",
    },
    {
      title: "24/7 Security",
      description: "Comprehensive security system with smart access control and trained personnel ensuring your complete safety.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074",
    },
  ];

  return (
    <section id="experience" ref={ref} className="section-pad palam-experience-section">
      <div className="palam-experience-bg" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-heading"
        >
          <p className="eyebrow">Premium Experience</p>
          <h2>
            World-Class
            <br />
            <em>Amenities</em>
          </h2>
          <p className="section-intro-light">
  Every detail has been meticulously crafted to deliver an extraordinary living experience.
          </p>
        </motion.div>

        <div className="palam-experience-grid">
          {experiences.map((exp, index) => (
            <motion.article
              key={exp.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ scale: 1.02 }}
              className="palam-experience-card"
            >
              <div className="palam-experience-image-wrap">
                <img src={exp.image} alt={exp.title} />
              </div>
              <div className="palam-experience-body">
                <h3>{exp.title}</h3>
                <p>{exp.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Amenities Section
const AmenitiesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const amenities = [
    { icon: Building2, label: "Gated Community", desc: "Fully secured residential enclave" },
    { icon: Shield, label: "CCTV Surveillance", desc: "24/7 monitored security" },
    { icon: Heart, label: "Fitness Center", desc: "Modern fully-equipped gym" },
    { icon: Users, label: "Community Hall", desc: "Multi-purpose social space" },
    { icon: Leaf, label: "Green Spaces", desc: "Lush eco-friendly gardens" },
    { icon: Award, label: "Premium Parking", desc: "Dedicated luxury parking" },
    { icon: TrendingUp, label: "Power Backup", desc: "Uninterrupted power supply" },
    { icon: CheckCircle2, label: "Water Supply", desc: "Exclusive water system" },
  ];

  return (
    <section id="amenities" ref={ref} className="section-pad">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-heading"
        >
          <p className="eyebrow eyebrow-dark">Lifestyle Features</p>
          <h2>
            Thoughtful
            <br />
            <em>Amenities</em>
          </h2>
          <p className="section-intro">
Everything thoughtfully prepared to make life more convenient and comfortable.
          </p>
        </motion.div>

        <div className="palam-amenities-grid">
          {amenities.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -5 }}
              className="palam-amenity-card"
            >
              <div className="palam-amenity-icon">
                <item.icon size={24} />
              </div>
              <h4>{item.label}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Life Showcase Section — ImageTrail cursor reveal
const LIFE_TRAIL_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80",
  "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&q=80",
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&q=80",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&q=80",
];

const LifeShowcaseSection = () => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [trailKey, setTrailKey] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            setTrailKey((k) => k + 1);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="palam-life-section">
      <div className="palam-life-bg" aria-hidden="true" />
      {inView && (
        <div className="palam-life-trail" aria-hidden="true">
          <ImageTrail key={trailKey} items={LIFE_TRAIL_IMAGES} variant={2} />
        </div>
      )}
      <div className="palam-life-overlay" aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="palam-life-content"
      >
        <p className="palam-life-eyebrow">Life at Palam View</p>
        <h2 className="palam-life-title">
          Move through our
          <br />
          <em>world of details.</em>
        </h2>
        <p className="palam-life-intro">
          Twelve perspectives on the homes, gardens, and quiet corners that make Palam View feel
          less like a development and more like a place to belong. Move your cursor to explore.
        </p>
        <span className="palam-life-hint">
          <span className="palam-life-hint-dot" />
          Move your cursor to reveal
        </span>
      </motion.div>
    </section>
  );
};

// Gallery Section
const GallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const images = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?q=80&w=2074",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=2084",
  ];

  return (
    <section id="gallery" ref={ref} className="section-pad palam-gallery-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-heading"
        >
          <p className="eyebrow eyebrow-dark">Photo Gallery</p>
          <h2>
            Visual
            <br />
            <em>Tour</em>
          </h2>
        </motion.div>

        <div className="palam-gallery-grid">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ scale: 1.03 }}
              className={`palam-gallery-item ${index === 0 ? "palam-gallery-featured" : ""}`}
            >
              <img src={image} alt={`Gallery ${index + 1}`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "IT Professional, Delhi",
      text: "Palam View offers the perfect blend of modern amenities and natural beauty. A true masterpiece of living.",
    },
    {
      name: "Priya Sharma",
      role: "Doctor, Mumbai",
      text: "From site visits to move-in, the entire process was extremely professional. The home quality and community environment exceeded all expectations!",
    },
    {
      name: "Amit Verma",
      role: "Business Owner, Haldwani",
      text: "Best investment decision I've made. The quality of construction and attention to detail are remarkable.",
    },
  ];

  return (
    <section ref={ref} className="section-pad">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="section-heading"
        >
          <p className="eyebrow eyebrow-dark">Testimonials</p>
          <h2>
            What Our
            <br />
            <em>Residents Say</em>
          </h2>
        </motion.div>

        <div className="palam-testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.article
              key={testimonial.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.12 }}
              whileHover={{ y: -5 }}
              className="palam-testimonial-card"
            >
              <div className="palam-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="palam-star-filled" />
                ))}
              </div>
              <p className="palam-testimonial-text">"{testimonial.text}"</p>
              <div className="palam-testimonial-author">
                <div className="palam-author-avatar">{testimonial.name.charAt(0)}</div>
                <div>
                  <strong>{testimonial.name}</strong>
                  <span>{testimonial.role}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: "200+", label: "Premium Units" },
    { value: "150+", label: "Happy Families" },
    { value: "12", label: "Awards Won" },
    { value: "4.9/5", label: "Satisfaction" },
  ];

  return (
    <section ref={ref} className="palam-stats-section">
      <div className="palam-stats-bg" />
      <div className="container">
        <div className="palam-stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="palam-stat"
            >
              <span className="palam-stat-value">{stat.value}</span>
              <span className="palam-stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="palam-cta-section">
      <div className="palam-cta-bg" />
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="palam-cta-content"
        >
          <p className="eyebrow">Get Started</p>
          <h2>
            Ready to Make
            <br />
            <em>Palam View Your Home?</em>
          </h2>
          <p className="palam-cta-intro">
            Schedule a private tour today and discover the lifestyle you deserve. Limited premium plots available.
          </p>

          <div className="palam-cta-actions">
            <a href="/contact" className="button button-brass">
              Schedule Free Visit <ArrowRight size={17} />
            </a>
            <a href="/contact" className="button button-outline-light">
              Download Brochure
            </a>
          </div>

          <div className="palam-cta-features">
            <span>Premium Plots Starting ₹25 Lakhs</span>
            <span>Flexible Payment Plans</span>
            <span>RERA Approved</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Main Page Component
function PalamViewPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Palam View | Premium Living by Pal Colonisers";
  }, []);

  return (
    <>
      <ScrollCanvasHero />
      <VisionSection />
      <ExperienceSection />
      <AmenitiesSection />
      <LifeShowcaseSection />
      <GallerySection />
      <TestimonialsSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default PalamViewPage;
