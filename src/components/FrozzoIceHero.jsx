import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import '../styles/frozzo-hero.css';

export default function FrozzoIceHero({ eyebrow }) {
  const hero = useRef(null);
    const canvas = useRef(null);
    useEffect(() => {
      const section = hero.current;
      const context = canvas.current?.getContext('2d');
      if (!section || !context) return undefined;

      const frameCount = 300;
      const frames = new Array(frameCount);
      const initialFrameCount = window.innerWidth <= 640 ? 2 : 4;
      const frameRadius = window.innerWidth <= 640 ? 3 : 6;
      let idleLoadHandle = 0;

      const loadFrame = (index) => {
        if (index < 0 || index >= frameCount || frames[index]) return;
        const image = new Image();
        image.src = `/assets/frozzo-frames/optimized/ezgif-frame-${String(index + 1).padStart(3, '0')}.webp`;
        frames[index] = image;
      };

      for (let index = 0; index < initialFrameCount; index += 1) loadFrame(index);
      let targetFrame = 0;
      let displayedFrame = 0;
      let animationFrame = 0;
      let isActive = true;

      const draw = (image) => {
        if (!image.complete || !image.naturalWidth) return;
        const width = canvas.current.clientWidth;
        const height = canvas.current.clientHeight;
        const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
        const drawnWidth = image.naturalWidth * scale;
        const drawnHeight = image.naturalHeight * scale;
        context.fillStyle = '#dce7eb';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, (width - drawnWidth) / 2, (height - drawnHeight) / 2, drawnWidth, drawnHeight);
      };

      const resize = () => {
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const width = canvas.current.clientWidth;
        const height = canvas.current.clientHeight;
        canvas.current.width = width * ratio;
        canvas.current.height = height * ratio;
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        const requestedFrame = Math.round(displayedFrame);
        let image = frames[requestedFrame];
        if (!image?.complete || !image.naturalWidth) {
          for (let offset = 1; offset < frameCount; offset += 1) {
            const before = frames[requestedFrame - offset];
            const after = frames[requestedFrame + offset];
            if (before?.complete && before.naturalWidth) { image = before; break; }
            if (after?.complete && after.naturalWidth) { image = after; break; }
          }
        }
        draw(image);
      };

      const updateTarget = () => {
        const bounds = section.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0, -bounds.top / (section.offsetHeight - window.innerHeight)));
        targetFrame = progress * (frameCount - 1);
        const center = Math.round(targetFrame);
        for (let offset = -frameRadius; offset <= frameRadius; offset += 1) loadFrame(center + offset);
      };

      const render = () => {
        if (!isActive) return;
        displayedFrame += (targetFrame - displayedFrame) * 0.12;
        if (Math.abs(targetFrame - displayedFrame) < 0.05) displayedFrame = targetFrame;
        const requestedFrame = Math.round(displayedFrame);
        let image = frames[requestedFrame];
        if (!image?.complete || !image.naturalWidth) {
          for (let offset = 1; offset < frameCount; offset += 1) {
            const before = frames[requestedFrame - offset];
            const after = frames[requestedFrame + offset];
            if (before?.complete && before.naturalWidth) { image = before; break; }
            if (after?.complete && after.naturalWidth) { image = after; break; }
          }
        }
        draw(image);
        animationFrame = requestAnimationFrame(render);
      };

      const onScroll = () => {
        updateTarget();
        document.querySelector('.route-header')?.classList.toggle('frozzo-nav-scrolled', window.scrollY > 24);
      };
      const firstFrame = () => draw(frames[0]);
      frames[0].addEventListener('load', firstFrame, { once: true });
      window.addEventListener('resize', resize);
      window.addEventListener('scroll', onScroll, { passive: true });
      resize();
      onScroll();
      idleLoadHandle = window.setTimeout(() => {
        for (let index = 0; index < frameCount; index += 1) loadFrame(index);
      }, 10000);
      animationFrame = requestAnimationFrame(render);

      return () => {
        isActive = false;
        cancelAnimationFrame(animationFrame);
        window.clearTimeout(idleLoadHandle);
        window.removeEventListener('resize', resize);
        window.removeEventListener('scroll', onScroll);
        document.querySelector('.route-header')?.classList.remove('frozzo-nav-scrolled');
      };
    }, []);

    return (
      <section ref={hero} className="fz-hero fz-ice-hero" aria-labelledby="frozzo-hero-title">
        <div className="fz-ice-sticky">
          <canvas ref={canvas} className="fz-ice-canvas" aria-label="Frozzo ice sequence animation" />
          <div className="fz-ice-overlay" aria-hidden="true" />
          <div className="fz-ice-edge-blend" aria-hidden="true" />
          <div className="container fz-hero-copy fz-ice-copy">
            <p className="eyebrow">{eyebrow}</p>
            <h1 id="frozzo-hero-title">Frozzo, from our farms<br /><em>to your freezer.</em></h1>
            <p className="fz-hero-intro">Frozzo brings the taste of authentic Indian spices to frozen snacking, made with vegetables grown through direct farming partnerships and frozen using IQF technology. Since 2021, Frozzo has been Pal Frozen Foods' answer to a simple question, why should convenience mean giving up on real flavor.</p>
            <div className="fz-hero-actions">
              <a className="button button-brass" href="#fz-products">Explore our snacks <ArrowDownRight size={17} /></a>
              <a className="button button-outline" href="/contact">Talk to our team <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="container fz-ice-footer">
            <a className="fz-ice-scroll" href="#fz-about"><span className="fz-ice-scroll-icon"><ArrowDown size={17} /></span><span>Scroll to break the ice</span></a>
            <div className="fz-ice-origin"><strong>2021</strong><span>RTF &amp; RTE frozen snacks</span></div>
          </div>
        </div>
      </section>
    );
}
