import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import ContactForm from "./ContactForm";
import { ContactCtx } from "./contactContext";

// Every "Book a scoping call" button opens this dialog (z-[1100], above the mobile drawer).
export default function ContactDialogProvider({ children }) {
  const [isOpen, setOpen] = useState(false);
  const panel = useRef(null);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panel.current?.querySelector("input")?.focus(), 350);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); clearTimeout(t); };
  }, [isOpen]);
  const corner = "absolute size-[13px] border-foreground";
  return (
    <ContactCtx.Provider value={{ open }}>
      {children}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[1100] overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="book-title">
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} className="fixed inset-0 bg-black/75 backdrop-blur-[4px]" />
              <div className="pointer-events-none relative flex min-h-full items-center justify-center p-3 sm:p-6">
                <motion.div ref={panel} initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16, scale: 0.98 }} transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                  className="pointer-events-auto relative w-full max-w-lg border border-border bg-panel p-5 sm:p-8">
                  <i className={`${corner} -left-px -top-px border-l-2 border-t-2`} /><i className={`${corner} -right-px -top-px border-r-2 border-t-2`} />
                  <i className={`${corner} -bottom-px -left-px border-b-2 border-l-2`} /><i className={`${corner} -bottom-px -right-px border-b-2 border-r-2`} />
                  <button aria-label="Close" onClick={close} className="absolute right-3 top-3 grid h-10 w-10 place-items-center border border-border transition-colors hover:border-primary"><X size={18} /></button>
                  <p className="mb-3 text-xs uppercase text-primary">/ contact</p>
                  <h2 id="book-title" className="pr-10 text-2xl font-medium uppercase leading-tight sm:text-3xl">Book a scoping call</h2>
                  <p className="mb-6 mt-3 text-xs uppercase leading-5">Tell us about your needs and a consultant will reach out within one business day.</p>
                  <ContactForm />
                </motion.div>
              </div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </ContactCtx.Provider>
  );
}
