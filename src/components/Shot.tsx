import React, { useEffect, useRef, useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { ImageIcon } from 'lucide-react';

type Props = {
  /** File name under static/img/docs/, without extension: "links/create-form" */
  id: string;
  /** What the screenshot should show (also the image's alt text) */
  title: string;
  caption?: React.ReactNode;
  /** Phone screenshots are shown narrower */
  device?: 'desktop' | 'phone';
};

const EXTENSIONS = ['webp', 'png', 'jpg'];

/**
 * A screenshot slot. Drop static/img/docs/<id>.webp (or .png / .jpg) in place and it shows up;
 * until then a placeholder says what to capture and where to save it.
 */
export default function Shot({ id, title, caption, device = 'desktop' }: Props) {
  const [ext, setExt] = useState(0);
  const [zoom, setZoom] = useState(false);
  const img = useRef<HTMLImageElement>(null);
  const src = useBaseUrl(`/img/docs/${id}.${EXTENSIONS[ext] ?? 'webp'}`);
  const missing = ext >= EXTENSIONS.length;
  const next = () => setExt((e) => e + 1);

  // The page is pre-rendered, so the image may have failed before React was listening
  useEffect(() => {
    const el = img.current;
    if (el && el.complete && el.naturalWidth === 0) next();
  }, [src]);

  useEffect(() => {
    if (!zoom) return undefined;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoom(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [zoom]);

  return (
    <figure className={`shot shot--${device}`}>
      {missing ? (
        <div className="shot__slot" role="img" aria-label={title}>
          <ImageIcon size={20} strokeWidth={1.6} aria-hidden="true" />
          <span className="shot__slot-title">{title}</span>
          {process.env.NODE_ENV === 'development' ? (
            <code className="shot__slot-path">static/img/docs/{id}.png</code>
          ) : (
            <span className="shot__slot-path">Screenshot coming soon</span>
          )}
        </div>
      ) : (
        <button type="button" className="shot__frame" onClick={() => setZoom(true)} aria-label={`Enlarge: ${title}`}>
          <img ref={img} key={src} src={src} alt={title} loading="lazy" decoding="async" onError={next} />
        </button>
      )}
      {caption && <figcaption>{caption}</figcaption>}
      {zoom && !missing && (
        <div className="shot__zoom" role="dialog" aria-label={title} onClick={() => setZoom(false)}>
          <img src={src} alt={title} />
        </div>
      )}
    </figure>
  );
}
