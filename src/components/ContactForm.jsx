import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Button } from "./ui";
import { services } from "../data";

const field =
  "w-full border border-border bg-card px-4 py-3 text-xs outline-none focus:border-primary";

const options = [
  ...services.map((s) => s.title),
  "Multiple services",
  "Not sure yet",
];

export default function ContactForm() {
  const [state, setState] = useState({ status: "idle", ref: "" });

  async function submit(e) {
    e.preventDefault();

    setState({ status: "sending", ref: "" });

    try {
      await emailjs.sendForm(
        "service_2fuuh5q",
        "template_uduy71k",
        e.target,
        "7nJVgsVNuINo2c3yt"
      );

      setState({
        status: "done",
        ref: `CB-${Date.now().toString(36).toUpperCase()}`,
      });

      e.target.reset();
    } catch (error) {
      console.error("EmailJS Error:", error);
      setState({ status: "error", ref: "" });
    }
  }

  if (state.status === "done")
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid place-items-center border border-primary/60 bg-card p-10 text-center"
      >
        <CheckCircle2 className="text-primary" size={36} strokeWidth={1} />

        <h3 className="mt-5 text-lg uppercase">Request sent</h3>

        <p className="mt-3 text-xs uppercase leading-5">
          A consultant will reach out within one business day.
        </p>

        <p className="mt-4 text-[11px] uppercase text-muted-foreground">
          Reference: {state.ref}
        </p>
      </motion.div>
    );

  return (
    <form
      onSubmit={submit}
      className="relative grid gap-4 border border-border/60 bg-card bg-grid bg-[size:36px_36px] p-6 sm:p-8"
    >
      {/* 4 CORNERS */}
      <span className="pointer-events-none absolute -left-px -top-px h-[13px] w-[13px] border-l-2 border-t-2 border-foreground" />
      <span className="pointer-events-none absolute -right-px -top-px h-[13px] w-[13px] border-r-2 border-t-2 border-foreground" />
      <span className="pointer-events-none absolute -bottom-px -left-px h-[13px] w-[13px] border-b-2 border-l-2 border-foreground" />
      <span className="pointer-events-none absolute -bottom-px -right-px h-[13px] w-[13px] border-b-2 border-r-2 border-foreground" />

      <label className="grid gap-2 text-[11px] uppercase">
        Full name *
        <input required name="name" className={field} />
      </label>

      <label className="grid gap-2 text-[11px] uppercase">
        Email *
        <input
          required
          type="email"
          name="email"
          placeholder="Work email preferred"
          className={field}
        />
      </label>

      <label className="grid gap-2 text-[11px] uppercase">
        Company name *
        <input required name="company" className={field} />
      </label>

      <label className="grid gap-2 text-[11px] uppercase">
        Phone number
        <input type="tel" name="phone" className={field} />
      </label>

      <label className="grid gap-2 text-[11px] uppercase">
        What services are you interested in? *
        <select
          required
          name="service"
          defaultValue=""
          className={field}
        >
          <option value="" disabled>
            Select a service…
          </option>

          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>

      {state.status === "error" && (
        <p className="text-xs uppercase text-primary">
          Could not send. Try again or email info@caiberone.com.
        </p>
      )}

      <Button primary type="submit" disabled={state.status === "sending"}>
        {state.status === "sending" ? "Sending…" : "Send request"}
      </Button>
    </form>
  );
}