import { motion } from "motion/react";
import { Frame, Reveal, Eyebrow, Heading, Lead, VideoBg, fade } from "../components/ui";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import { v } from "../videos";

const steps = [
  ["Email us", "Send a brief description of your environment — your team size, current tooling, and the security challenges you want to address. No form, no intake questionnaire."],
  ["30-minute scoping call", "We schedule a focused call to understand your priorities, existing stack, and any compliance requirements. No pitch, no pressure — just the right questions."],
  ["Proposal within 48 hours", "You receive a clear written proposal: scope, deliverables, timelines, and pricing. Nothing vague, nothing open-ended."],
];

// Content mirrors https://caiberone.com/contact/
export default function Contact() {
  return (
    <>
      <Seo title="Contact" path="/contact" description="Tell us about your environment, your team, and your priorities. We will listen, ask the right questions, and come back with a clear proposal — not a sales deck." />
      <Frame className="mt-3 grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <VideoBg src={v.p2} overlay="bg-gradient-to-r from-background/90 via-background/55 to-background/10" />
        <Reveal>
         <motion.p variants={fade} className="text-xs uppercase text-primary">What to expect</motion.p>
          <motion.h2 variants={fade} className="mt-3 text-2xl font-medium uppercase leading-tight sm:text-3xl">Three steps from first email to proposal.</motion.h2>
          <ol className="mt-8 grid gap-3">{steps.map(([t, p], i) => (
            <motion.li variants={fade} whileHover={{ x: 4 }} key={t} className="grid grid-cols-[auto_1fr] gap-4 border border-border/60 bg-black/70 p-5 backdrop-blur-[6px]">
              <span className="text-2xl font-medium text-primary">{String(i + 1).padStart(2, "0")}</span>
              <div><h3 className="text-sm uppercase">{t}</h3><p className="mt-2 text-xs uppercase leading-5 text-muted-foreground">{p}</p></div>
            </motion.li>))}</ol>
          <motion.p variants={fade} className="mt-6 text-[11px] uppercase leading-5">Email: <a href="mailto:info@caiberone.com" className="text-primary hover:underline">info@caiberone.com</a> — we respond within one business day.</motion.p>
          <motion.p variants={fade} className="mt-3 text-[11px] uppercase leading-5 text-muted-foreground">Proposals are delivered within 48 hours of the scoping call. Scoping calls are typically scheduled within two business days of your first email.</motion.p>
        </Reveal>
        <ContactForm />
      </Frame>
    </>
  );
}
