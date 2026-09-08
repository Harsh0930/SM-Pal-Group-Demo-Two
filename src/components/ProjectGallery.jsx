import { useEffect, useId, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import ResponsiveImage, { imageUrl } from './ResponsiveImage.jsx';
import '../styles/project-gallery.css';

export default function ProjectGallery({ images, project, imageNote }) {
  const id = useId();
  const dialog = useRef(null);
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const move = direction => setSelected(current => (current + direction + images.length) % images.length);
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = previousOverflow; };
  }, [open]);
  const current = images[selected];
  return <>
    <div className="pz-gallery-grid">{images.map((item, index) => <a
      className="pz-gallery-item" key={item.src} href={imageUrl(item.src)}
      aria-label={`View ${item.title.toLowerCase()} in gallery`}
      onClick={event => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); setSelected(index); setOpen(true); }}
    ><figure><ResponsiveImage src={item.src} alt={item.alt} style={{ objectPosition: item.position }} sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 40vw" /><figcaption><span>{item.title}</span><Expand size={18} aria-hidden="true" /></figcaption></figure></a>)}</div>
    <dialog className="pz-lightbox" ref={dialog} aria-labelledby={id + "-title"} aria-describedby={id + "-note"}
      onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}
      onKeyDown={event => {
        if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
        if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
        if (event.key === 'Tab') {
          const buttons = event.currentTarget.querySelectorAll('button');
          const first = buttons[0], last = buttons[buttons.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}>
      <div className="pz-lightbox-content">
        <div className="pz-lightbox-top"><span>Explore {project}</span><button type="button" autoFocus aria-label="Close gallery" onClick={() => dialog.current.close()}><X size={23} /></button></div>
        {open && <ResponsiveImage src={current.src} alt={current.alt} loading="eager" sizes="(max-width: 1100px) 94vw, 1100px" />}
        <div className="pz-lightbox-bottom"><button type="button" aria-label="Previous image" onClick={() => move(-1)}><ArrowLeft size={22} /></button><div aria-live="polite"><p id={id + "-title"}>{current.title}</p><span>{selected + 1} / {images.length}</span></div><button type="button" aria-label="Next image" onClick={() => move(1)}><ArrowRight size={22} /></button></div>
        <p className="pz-image-note" id={id + "-note"}>{imageNote}</p>
      </div>
    </dialog>
  </>;
}
