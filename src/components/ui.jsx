import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, animate } from "motion/react";
import { boost } from "../videos";

export const fade = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.075 } } };
const MLink = motion.create(Link);

export function Reveal({ children, className = "" }) {
  // Controlled by `animate` (not whileInView) so cards mounted LATER (e.g. after navigating between service pages) still inherit "show".
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, amount: 0.12 });
  return <motion.div ref={ref} className={className} variants={stagger} initial="hidden" animate={seen ? "show" : "hidden"}>{children}</motion.div>;
}
export const Frame = ({ children, className = "", id }) => (
  <section id={id} className={`relative isolate mx-auto w-[calc(100%-24px)] max-w-[1450px] border border-border/55 bg-panel ${className}`}>
    {["-left-px -top-px", "-right-px -top-px", "-bottom-px -left-px", "-bottom-px -right-px"].map((p) => (
      <Fragment key={p}><i className={`absolute ${p} h-4 w-px bg-foreground`} /><i className={`absolute ${p} h-px w-4 bg-foreground`} /></Fragment>
    ))}
    {children}
  </section>
);
export const redVideo = "[filter:url(#red-grade)]";
const tones = {
  primary: ["bg-black", "bg-[#4a4a4a]", "bg-[#1a1a1a]"],
  light: ["bg-black", "bg-[#9b9b9b]", "bg-[#ececec]"],
  soft: ["bg-transparent", "bg-primary/10", "bg-primary/25"],
};
// Three stacked layers wipe top→bottom on hover (~0.9s), then keep wiping downward on leave.
const layer = "absolute inset-0 origin-bottom scale-y-0 transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)] will-change-transform group-hover:origin-top group-hover:scale-y-100";
export const Sweep = ({ primary, soft }) => {
  const [dark, mid, final] = tones[soft ? "soft" : primary ? "primary" : "light"];
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <i className={`absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 ${dark}`} />
      <i className={`${layer} delay-[120ms] group-hover:delay-[80ms] ${mid}`} />
      <i className={`${layer} delay-0 group-hover:delay-[220ms] ${final}`} />
    </span>
  );
};
export function Button({ children, primary = false, to, href, onClick, type = "button", disabled }) {
  const cls = `group relative isolate inline-flex min-h-12 items-center justify-center overflow-hidden border px-6 text-xs font-semibold uppercase transition-colors duration-700 disabled:opacity-60 ${primary ? "border-primary bg-primary text-primary-foreground shadow-glow hover:border-[#1a1a1a]" : "border-border bg-card/60 text-foreground hover:border-[#ececec]"}`;
  const m = { whileTap: { scale: 0.97 }, className: cls };
  const inner = <><Sweep primary={primary} /><span className={`relative transition-colors duration-500 group-hover:delay-300 ${primary ? "" : "group-hover:text-black"}`}>{children}</span></>;
  if (to) return <MLink to={to} {...m}>{inner}</MLink>;
  if (href) return <motion.a href={href} {...m}>{inner}</motion.a>;
  return <motion.button type={type} onClick={onClick} disabled={disabled} {...m}>{inner}</motion.button>;
}
export const Eyebrow = ({ children }) => <motion.p variants={fade} className="mb-4 text-xs uppercase text-primary">/ {children}</motion.p>;
export const Heading = ({ children, center = false }) => (
  <motion.h2 variants={fade} className={`text-3xl font-medium uppercase leading-[1.05] sm:text-4xl lg:text-5xl ${center ? "mx-auto text-center" : ""}`}>{children}</motion.h2>
);
export const Lead = ({ children, center = true }) => <motion.p variants={fade} className={`mt-6 max-w-3xl text-xs uppercase leading-5 ${center ? "mx-auto text-center" : ""}`}>{children}</motion.p>;
export const Logo = () => (
  <Link to="/" className="flex shrink-0 items-center gap-2 font-semibold uppercase">
    <span className="grid h-7 w-7 rotate-45 place-items-center border-4 border-primary"><span className="h-2 w-2 border-2 border-primary" /></span><span>CaiberOne</span>
  </Link>
);
export function Count({ to }) {
  const ref = useRef(null); const seen = useInView(ref, { once: true }); const [n, setN] = useState(0);
  useEffect(() => { if (!seen) return; const c = animate(0, to, { duration: 1.4, onUpdate: (v) => setN(Math.round(v)) }); return () => c.stop(); }, [seen, to]);
  return <span ref={ref}>{n}</span>;
}

// Lazy, pausable background video. Loads only near the viewport, pauses off-screen, skips motion if user prefers reduced motion.
export const overlayLeft = "bg-gradient-to-r from-background/75 via-background/30 to-transparent";
export function VideoBg({ src, poster, graded = false, opacity = "opacity-100", overlay = "bg-gradient-to-b from-background/40 via-transparent to-background/50" }) {
  const wrap = useRef(null), vid = useRef(null);
  const [load, setLoad] = useState(false), [ready, setReady] = useState(false);
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!still) setLoad(true); vid.current?.play().catch(() => {}); } else vid.current?.pause();
    }, { rootMargin: "250px" });
    io.observe(el); return () => io.disconnect();
  }, []);
  const fx = graded ? redVideo : "";
  const lift = !graded && boost[src] > 1 ? { filter: `brightness(${boost[src]})` } : undefined;
  return (
    <div ref={wrap} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className={`absolute inset-0 ${opacity}`}>
        {poster && <img src={poster} alt="" loading="lazy" decoding="async" style={lift} className={`absolute inset-0 h-full w-full object-cover ${fx}`} />}
        {load && <video ref={vid} src={src} style={lift} autoPlay muted loop playsInline preload="metadata" onLoadedData={() => setReady(true)} className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"} ${fx}`} />}
      </div>
      <div className={`absolute inset-0 ${overlay}`} />
    </div>
  );
}
