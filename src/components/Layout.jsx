import { Suspense, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button, Logo, Reveal, Sweep, fade } from "./ui";
import { services } from "../data";
import RedGrade from "./RedGrade";
import ContactDialogProvider from "./ContactDialog";

const groups = Object.entries(services.reduce((a, s) => ((a[s.cat] ||= []).push(s), a), {}));
const ul = "relative py-2 text-base uppercase after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100";
const cls = ({ isActive }) => `${ul} ${isActive ? "after:scale-x-100" : ""}`;

function ServicesMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} onFocus={() => setOpen(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
      <NavLink to="/services" end={false} aria-haspopup="true" aria-expanded={open} onClick={() => setOpen(false)} className={(s) => `flex items-center gap-1 ${cls(s)}`}>
        Services <ChevronDown size={14} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </NavLink>
      <div className="absolute left-1/2 top-full -translate-x-1/2">
        <AnimatePresence>{open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="w-[min(92vw,680px)] border border-border bg-card p-5 shadow-glow">
            <div className="grid gap-6 sm:grid-cols-3">
              {groups.map(([cat, items]) => (
                <div key={cat}><p className="mb-3 text-[10px] uppercase text-primary">{cat}</p>
                  {items.map((s) => <Link key={s.id} to={`/services/${s.id}`} onClick={() => setOpen(false)} className="relative my-1.5 block w-fit text-[11px] uppercase leading-4 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-foreground after:transition-transform after:duration-300 hover:after:scale-x-100">{s.title}</Link>)}
                </div>
              ))}
            </div>
            <Link to="/services" onClick={() => setOpen(false)} className="mt-5 block border-t border-border pt-4 text-[11px] font-semibold uppercase hover:text-primary">View all services</Link>
          </motion.div>
        )}</AnimatePresence>
      </div>
    </div>
  );
}

// Mobile drawer: rendered in a portal on <body> so it always sits above page content (z-[1000]).
function MobileDrawer({ open, setOpen }) {
  const [svc, setSvc] = useState(false);
  const close = () => setOpen(false);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener("keydown", onKey); window.addEventListener("resize", onResize);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); window.removeEventListener("resize", onResize); };
  }, [open, setOpen]);
  const item = (s) => `flex items-center justify-between border-b border-border py-4 ${cls(s)}`;
  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[1000] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="absolute inset-0 bg-black/70 backdrop-blur-[3px]" />
          <motion.aside initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="absolute right-0 top-0 flex h-dvh w-[min(88vw,380px)] flex-col overflow-y-auto border-l border-border bg-card p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <div className="flex items-center justify-between pb-4"><Logo /><button aria-label="Close menu" onClick={close} className="grid h-12 w-12 place-items-center border border-border"><X size={20} /></button></div>
            <NavLink to="/" end onClick={close} className={item}>Overview</NavLink>
            <button onClick={() => setSvc(!svc)} aria-expanded={svc} className="flex items-center justify-between border-b border-border py-4 text-base uppercase">Services <ChevronDown size={16} className={`transition-transform ${svc ? "rotate-180" : ""}`} /></button>
            {svc && <div className="grid border-b border-border pb-2 pl-3">
              <Link to="/services" onClick={close} className="py-2.5 text-[11px] font-semibold uppercase text-primary">View all services</Link>
              {services.map((s) => <Link key={s.id} to={`/services/${s.id}`} onClick={close} className="py-2.5 text-[11px] uppercase leading-4">{s.title}</Link>)}
            </div>}
            <NavLink to="/about" onClick={close} className={item}>About</NavLink>
            <NavLink to="/contact" onClick={close} className={item}>Contact</NavLink>
            <div className="mt-6"><Button primary book onClick={close}>Book a scoping call</Button></div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0, behavior: "instant" }); }, [loc.pathname]);
  return (
    <motion.header initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="fixed inset-x-3 top-3 z-50 sm:inset-x-5 sm:top-5">
      <div className="flex h-[66px] items-center justify-between gap-4 bg-white/10 px-4 backdrop-blur-[8px] sm:h-[72px]">
        <Logo />
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Main navigation">
          <NavLink to="/" end className={cls}>Overview</NavLink><ServicesMenu />
          <NavLink to="/about" className={cls}>About</NavLink><NavLink to="/contact" className={cls}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><Button primary book>Book a scoping call</Button></span>
          <button aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)} className="group relative isolate grid h-12 w-12 place-items-center overflow-hidden lg:hidden"><Sweep primary /><span className="relative">{open ? <X size={20} /> : <Menu size={20} />}</span></button>
        </div>
      </div>
      <MobileDrawer open={open} setOpen={setOpen} />
    </motion.header>
  );
}

function Footer() {
  const col = "mb-3 block text-[11px] uppercase text-muted-foreground hover:text-primary";
  return (
    <footer className="mx-auto mt-20 max-w-[1450px] border-x border-t border-border/60 bg-footer p-6 sm:p-10">
      <Reveal className="grid gap-12 md:grid-cols-[1.3fr_2.2fr]">
        <motion.div variants={fade}><Logo /><p className="mt-8 max-w-xs text-xs uppercase leading-5">Cybersecurity operations & advisory. Securing organizations with practical, reliable cybersecurity solutions.</p></motion.div>
        <div className="grid gap-8 sm:grid-cols-3">
          <motion.div variants={fade}><h3 className="mb-7 text-xs uppercase">Services</h3>
            {services.map((s) => <Link key={s.id} to={`/services/${s.id}`} className={col}>{s.title}</Link>)}<Link to="/services" className={col}>View all services</Link></motion.div>
          <motion.div variants={fade}><h3 className="mb-7 text-xs uppercase">Company</h3><Link to="/" className={col}>Overview</Link><Link to="/about" className={col}>About</Link><Link to="/contact" className={col}>Contact</Link></motion.div>
          <motion.div variants={fade}><h3 className="mb-7 text-xs uppercase">Contact</h3><a href="mailto:info@caiberone.com" className={col}>info@caiberone.com</a></motion.div>
        </div>
      </Reveal>
      <div className="mt-14 border-t border-border/50 pt-6 text-[10px] uppercase text-muted-foreground">© 2026 CaiberOne</div>
    </footer>
  );
}

export default function Layout() {
  const home = useLocation().pathname === "/";
  return <ContactDialogProvider><div className="overflow-x-clip"><RedGrade /><Navbar /><main className={home ? "" : "pt-28"}><Suspense fallback={<div className="min-h-[70svh]" />}><Outlet /></Suspense></main><Footer /></div></ContactDialogProvider>;
}
  