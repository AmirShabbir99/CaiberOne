import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Frame, Reveal, Eyebrow, Heading, Lead, Button, VideoBg, overlayLeft, fade } from "../components/ui";
import { Crumbs, Head } from "./ServiceDetail";
import Seo from "../components/Seo";
import { v } from "../videos";
import { services, alertQueue } from "../data";

const sev = { CRITICAL: "text-primary", HIGH: "text-orange-400", ELEVATED: "text-amber-300", CLEAR: "text-emerald-400" };

// Content mirrors https://caiberone.com/services/ai-soc/
export default function AiSoc() {
  const soc = services.find((x) => x.id === "ai-soc");
  return (
    <div>
      <Seo title="AI-Assisted SOC" path="/services/ai-soc" description="AI-assisted triage and recommendations — with your team approving every action. Every alert is triaged, summarized, and prioritized by AI — and every response action still waits on a person to say go." />
      <Frame className="grid min-h-[440px] content-center gap-10 p-6 sm:p-10 lg:p-14">
        <VideoBg src={v.p6} overlay={overlayLeft} />
        <Reveal className="max-w-3xl">
          <motion.p variants={fade} className="mb-6 flex flex-wrap gap-2 text-[11px] uppercase text-muted-foreground">
            <Link to="/services" className="hover:text-primary">Services</Link><span>/ <Link to="/services" className="hover:text-primary">Security Operations</Link></span><span>/ <span className="text-foreground">AI-Assisted SOC</span></span>
          </motion.p>
          <motion.span variants={fade} className="mb-5 inline-block bg-primary px-2 py-1 text-[10px] font-semibold uppercase">Flagship</motion.span>
          <Heading>AI does the analysis. Your team stays in control.</Heading>
          <Lead center={false}>AI-assisted triage and recommendations — with your team approving every action. Every alert is triaged, summarized, and prioritized by AI — and every response action still waits on a person to say go.</Lead>
         </Reveal>
      </Frame>

      <Frame className="mt-20 grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <Reveal className="self-center">
          <Eyebrow>how it works</Eyebrow><Heading>An alert with an owner and a route.</Heading>
          <Lead center={false}>From detection to enrichment, AI-assisted triage, human approval, ticketing, and reporting — see the full workflow step by step.</Lead>
          <motion.div variants={fade} className="mt-8"><Button to="/services/ai-soc/workflow">See the full workflow</Button></motion.div>
        </Reveal>
        <Reveal>
          <motion.div variants={fade} className="border border-border/60 bg-black p-5">
            <div className="flex items-center justify-between gap-3 border-b border-border/60 pb-4 text-[11px] uppercase">
              <span>Alert Queue · Your Tenancy</span><span className="flex items-center gap-2 text-primary"><i className="size-2 animate-pulse rounded-full bg-primary" />P1 Critical</span>
            </div>
            <div className="overflow-x-auto">
              <table className="mt-3 w-full min-w-[420px] text-left text-[11px] uppercase">
                <thead className="text-muted-foreground"><tr>{["ID", "Severity", "Asset", "Seen"].map((h) => <th key={h} className="py-2 font-normal">{h}</th>)}</tr></thead>
                <tbody>{alertQueue.map(([id, s, a, t]) => (
                  <tr key={id} className="border-t border-border/40"><td className="py-3">{id}</td><td className={`py-3 font-semibold ${sev[s]}`}>{s}</td><td className="py-3 normal-case">{a}</td><td className="py-3 text-muted-foreground">{t}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </motion.div>
        </Reveal>
      </Frame>

      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
        <Head eyebrow="" title="What this includes" />
        <div className="mt-12 grid gap-3 md:grid-cols-3">{soc.items.map((i) => {
          const link = i === "AI SOC Workflow Pilot";
          const body = <><CheckCircle2 size={22} strokeWidth={1} className="text-primary" /><h3 className="mt-6 text-sm uppercase leading-5">{i}</h3>{link && <ArrowUpRight size={16} className="mt-4" />}</>;
          return <motion.div variants={fade} whileHover={{ y: -5 }} key={i}>{link
            ? <Link to="/services/ai-soc/workflow" className="block h-full min-h-40 border border-border/60 bg-black p-6 hover:border-primary">{body}</Link>
            : <div className="h-full min-h-40 border border-border/60 bg-black p-6">{body}</div>}</motion.div>;
        })}</div>
        <motion.p variants={fade} className="mt-8 border-l-2 border-primary pl-4 text-[11px] uppercase leading-5 text-muted-foreground">{soc.note}</motion.p>
      </Reveal></Frame>
    </div>
  );
}
