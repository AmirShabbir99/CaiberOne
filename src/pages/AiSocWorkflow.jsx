import { motion } from "motion/react";
import { Frame, Reveal, Eyebrow, Heading, Lead, Button, VideoBg, overlayLeft, fade } from "../components/ui";
import { Crumbs } from "./ServiceDetail";
import Seo from "../components/Seo";
import { v } from "../videos";
import { workflowSteps } from "../data";

// Content mirrors https://caiberone.com/services/ai-soc/workflow/
export default function AiSocWorkflow() {
  return (
    <div>
      <Seo title="AI-SOC Workflow" path="/services/ai-soc/workflow" description="Every alert moves through a fixed sequence — detection, enrichment, AI-assisted triage, human approval, ticketing, and reporting. Nothing skips a step." />
      <Frame className="grid min-h-[440px] content-center gap-10 p-6 sm:p-10 lg:p-14">
        <VideoBg src={v.p33} overlay={overlayLeft} />
        <Reveal className="max-w-3xl">
          <Crumbs trail={[["AI-Assisted SOC", "/services/ai-soc"], ["How it works"]]} />
          <Eyebrow>how it works</Eyebrow>
          <Heading>An alert with an owner and a route.</Heading>
          <Lead center={false}>Every alert moves through a fixed sequence — detection, enrichment, AI-assisted triage, human approval, ticketing, and reporting. Nothing skips a step.</Lead>
          <motion.p variants={fade} className="mt-6 inline-flex gap-3 border border-border/60 bg-black/60 px-4 py-2 text-[11px] uppercase backdrop-blur-[6px]"><span className="text-primary">9 steps</span><span>Alert → Report</span></motion.p>
        </Reveal>
      </Frame>

      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">{workflowSteps.map(([t, p, ai], i) => (
          <motion.article variants={fade} whileHover={{ y: -5 }} key={t} className="relative min-h-44 border border-border/60 bg-black p-6">
            <div className="flex items-start justify-between"><span className="text-3xl font-medium text-primary">{String(i + 1).padStart(2, "0")}</span>{ai && <span className="bg-primary px-2 py-1 text-[10px] font-semibold uppercase">AI</span>}</div>
            <h3 className="mt-6 text-lg uppercase">{t}</h3><p className="mt-3 text-xs uppercase leading-5 text-muted-foreground">{p}</p>
          </motion.article>))}</div>
      </Reveal></Frame>

     
    </div>
  );
}
