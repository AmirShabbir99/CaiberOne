import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Frame, Reveal, Eyebrow, Heading, Lead, Button, VideoBg, overlayLeft, fade } from "../components/ui";
import { CTA } from "../components/sections";
import { Crumbs, Head } from "./ServiceDetail";
import { services, principles, trust } from "../data";
import { v } from "../videos";
import Seo from "../components/Seo";

// NOTE: caiberone.com/services/ai-soc/workflow/ could not be fetched (robots block), so this page only
// reuses verified copy from the home/about pages. Paste the page's own text into this file when available.
export default function AiSocWorkflow() {
  const soc = services.find((x) => x.id === "ai-soc");
  const cards = [principles[1], trust[1], trust[2]];
  return (
    <div>
      <Seo title="AI SOC Workflow Pilot" path="/services/ai-soc/workflow" description={soc.blurb} />
      <Frame className="p-6 sm:p-10 lg:p-14"><VideoBg src={v.p33} overlay={overlayLeft} /><Reveal>
        <Crumbs trail={[[soc.title, "/services/ai-soc"], ["AI SOC Workflow Pilot"]]} /><Eyebrow>{soc.cat}</Eyebrow>
        <Heading>AI SOC Workflow Pilot</Heading><Lead center={false}>{soc.blurb}</Lead>
        <motion.div variants={fade} className="mt-8 flex flex-wrap gap-3"><Button primary to="/contact">Book a scoping call</Button><Button to="/services/ai-soc">Back to AI-Assisted SOC</Button></motion.div>
      </Reveal></Frame>
      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
        <Head eyebrow="our approach" title={<>Human-controlled AI,<br />on your stack</>} />
        <div className="mt-12 grid gap-3 md:grid-cols-3">{cards.map(([t, p]) => (
          <motion.article variants={fade} whileHover={{ y: -5 }} className="border border-border/60 bg-card bg-grid bg-[size:36px_36px] p-6" key={t}><h3 className="text-lg uppercase">{t}</h3><p className="mt-4 text-xs uppercase leading-5">{p}</p></motion.article>))}</div>
      </Reveal></Frame>
      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
        <Head eyebrow="also under AI-assisted SOC" title="Related services" />
        <div className="mt-12 grid gap-3 md:grid-cols-2">{soc.items.filter((i) => i !== "AI SOC Workflow Pilot").map((i) => (
          <motion.div variants={fade} whileHover={{ y: -5 }} key={i}><Link to="/services/ai-soc" className="block border border-border/60 bg-card p-6 text-sm uppercase hover:border-primary">{i}</Link></motion.div>))}</div>
        <motion.p variants={fade} className="mt-8 border-l-2 border-primary pl-4 text-[11px] uppercase text-muted-foreground">{soc.note}</motion.p>
      </Reveal></Frame>
      <CTA />
    </div>
  );
}
