import { useState } from "react";
import { motion } from "motion/react";
import { Activity, BrainCircuit, ScanSearch, ClipboardCheck, Scale, Compass, Plus, Minus, ArrowUpRight, ShieldCheck, Shield, Bird, BarChart3, Search, Kanban, Hash, BellRing, Workflow, Radar, Hexagon, Share2, Shuffle, ShieldAlert, Fingerprint, Zap, Cpu, Cloud, CloudCog } from "lucide-react";
import { Link } from "react-router-dom";
import { Frame, Reveal, Eyebrow, Heading, Lead, Button, Count, Sweep, VideoBg, redVideo, fade, stagger } from "./ui";
import { services, integrations, industries, trust, principles, regions, faqs } from "../data";
import heroVideo from "../assets/hero.mp4";
import heroPoster from "../assets/hero-poster.jpg";
import { v, poster } from "../videos";
import processVideo from "../assets/process.mp4";
import ctaVideo from "../assets/cta.mp4";
import shield from "../assets/shield.webp";
import clock from "../assets/clock.webp";
import trophy from "../assets/trophy.webp";

export const icons = { monitoring: Activity, "ai-soc": BrainCircuit, "vuln-pentest": ScanSearch, compliance: ClipboardCheck, "risk-governance": Scale, advisory: Compass };
const integrationIcons = { Wazuh: ShieldCheck, "Microsoft Defender": Shield, CrowdStrike: Bird, Splunk: BarChart3, "Elastic SIEM": Search, Jira: Kanban, Slack: Hash, PagerDuty: BellRing, ServiceNow: Workflow, Suricata: Radar, TheHive: Hexagon, MISP: Share2, Shuffle: Shuffle, "IBM QRadar": Activity, Kaspersky: ShieldAlert, Velociraptor: Fingerprint, Thor: Zap, Redline: Cpu, AWS: Cloud, "Microsoft Azure": CloudCog };
const Head = ({ eyebrow, title, lead }) => <div className="text-center"><Eyebrow>{eyebrow}</Eyebrow><Heading center>{title}</Heading>{lead && <Lead>{lead}</Lead>}</div>;

export function Hero() {
  const go = () => document.getElementById("more")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section
  id="home"
  aria-label="CaiberOne cybersecurity"
  className="relative isolate min-h-[max(100svh,900px)] overflow-hidden bg-background pt-[30px] min-[1600px]:min-h-[max(100svh,1040px)] max-[700px]:min-h-[600px]"
>
  <video
    poster={heroPoster}
    className={`absolute inset-0 -z-10 h-full w-full object-cover ${redVideo}`}
    autoPlay
    muted
    loop
    playsInline
    aria-hidden="true"
  >
    <source src={heroVideo} />
  </video>
    <div className="relative max-[760px]:pb-12">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative ml-5 flex min-h-[790px] w-[58.5%] flex-col bg-panel-surface px-[26px] pb-[25px] pt-[29px] backdrop-blur-[6px] min-[1600px]:min-h-[910px] max-[1100px]:w-[57%] max-[760px]:ml-3 max-[760px]:min-h-[500px] sm:max-[760px]:min-h-[720px] max-[760px]:w-[calc(100%-24px)] max-[760px]:px-[19px] max-[760px]:py-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 border border-border opacity-70"
          >
            {/* Top Left */}
            <span className="absolute -left-px -top-px h-[13px] w-[13px] border-l-2 border-t-2 border-foreground" />

            {/* Top Right */}
            <span className="absolute -right-px -top-px h-[13px] w-[13px] border-r-2 border-t-2 border-foreground" />

            {/* Bottom Left */}
            <span className="absolute -bottom-px -left-px h-[13px] w-[13px] border-b-2 border-l-2 border-foreground" />

            {/* Bottom Right */}
            <span className="absolute -bottom-px -right-px h-[13px] w-[13px] border-b-2 border-r-2 border-foreground" />
          </div>
          <motion.span variants={fade} className="text-sm font-semibold leading-normal text-primary max-[480px]:text-[10px]">/ CYBERSECURITY OPERATIONS &amp; ADVISORY</motion.span>
          <motion.h1 variants={fade} transition={{ duration: 0.65 }} className="mt-5 whitespace-nowrap text-[clamp(42px,5vw,73px)] font-medium leading-[1.015] min-[1600px]:text-[83px] max-[1100px]:text-[clamp(39px,5vw,57px)] max-[760px]:text-[clamp(30px,6.8vw,51px)] max-[480px]:text-[clamp(27px,7vw,35px)]">SECURING<br />ORGANIZATIONS<br />WITH<br />PRACTICAL,<br />RELIABLE<br />CYBERSECURITY<br />SOLUTIONS</motion.h1>
          <motion.p variants={fade} className="mt-8 text-[15px] font-semibold uppercase leading-[1.7] min-[1600px]:text-[17px] max-[1100px]:text-[13px] max-[760px]:mt-6 max-[480px]:text-[11px] max-[480px]:leading-[1.55]">AI-ASSISTED SECURITY OPERATIONS, TESTING, AND COMPLIANCE READINESS<br className="max-[480px]:hidden" /> — IMPLEMENTED, DOCUMENTED, AND HANDED TO YOUR TEAM.</motion.p>
          <motion.div variants={fade} className="mt-auto flex flex-wrap gap-2.5 pt-1 sm:pt-[30px]"><Button primary to="/contact">Book a scoping call</Button><Button to="/services">See our services</Button></motion.div>
        </motion.div>
        <button type="button" onClick={go} className="absolute bottom-[22px] left-[calc(20px+58.5%+39px)] border-0 bg-transparent p-0 text-[18.5px] font-medium leading-6 text-foreground max-[1100px]:left-[calc(20px+57%+39px)] max-[1100px]:text-base max-[760px]:bottom-3 max-[760px]:left-auto max-[760px]:right-4 max-[760px]:text-xs">SCROLL DOWN</button>
        <span className="absolute bottom-[22px] right-[26px] text-[18.5px] font-medium leading-6 max-[1100px]:text-base max-[760px]:hidden">/ CaiberOne</span>
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <Frame id="more" className="mt-3 p-6 scroll-mt-28">
      <div className="grid gap-6 sm:grid-cols-3">
        {[
          [integrations.length, "Security tools integrated"],
          [services.length, "Service capabilities"],
          [regions.length, "Regions served"],
        ].map(([n, l]) => (
          <div key={l} className="text-center">
            <p className="text-4xl font-medium text-primary">
              <Count to={n} />
            </p>
            <p className="mt-2 text-xs uppercase">{l}</p>
          </div>
        ))}
      </div>
    </Frame>
  );
}

export function Integrations() {
  const row = [...integrations, ...integrations];
  return (
    <div className="mx-auto mt-6 max-w-[1450px] overflow-hidden border-y border-border/60 py-5" aria-label="Integrations we work with">
      <p className="mb-4 px-6 text-xs uppercase">Integrations we work with</p>
      <div className="animate-marquee flex w-max gap-12 opacity-80">{row.map((x, i) => { const Icon = integrationIcons[x] || ShieldCheck; return <span key={i} className="inline-flex items-center gap-2.5 whitespace-nowrap text-sm font-semibold uppercase"><Icon size={18} strokeWidth={1.5} className="text-primary" aria-hidden="true" />{x}</span>; })}</div>
    </div>
  );
}

export function Principles() {
  return (
    <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><VideoBg src={v.p11} /><Reveal>
      <Eyebrow>what we stand for</Eyebrow><Heading>Security should be accessible,<br />transparent, and practical.</Heading>
      <div className="mt-8 grid gap-6 text-xs uppercase leading-6 md:grid-cols-2">
        <motion.p variants={fade}>Too many organizations are priced out of enterprise security or locked into opaque platforms that make bold claims but offer little visibility into how decisions are made.</motion.p>
        <motion.p variants={fade}>We combine AI-driven automation with human analyst oversight, integrate with the tools you already run, and deliver outcomes you can measure.</motion.p>
      </div>
      <div className="mt-16 grid gap-5 md:grid-cols-3">{principles.map(([t, p]) => (
        <motion.article variants={fade} whileHover={{ y: -5 }} className="border-t border-border bg-card bg-grid bg-[size:36px_36px] p-6 sm:p-8" key={t}><h3 className="mb-10 text-2xl uppercase">{t}</h3><p className="text-xs uppercase leading-5">{p}</p></motion.article>
      ))}</div>
    </Reveal></Frame>
  );
}

export function Services({ full = false, video }) {
  return (
    <Frame id="services" className="mt-2 p-6 sm:p-10 lg:p-14">
      {video && <VideoBg src={video} />}
      <div className="absolute inset-0 bg-service-radial" />
      <Reveal className="relative">
        <Head eyebrow="what we do" title={<>Six capabilities.<br />One cybersecurity team.</>} />
        <div className="mx-auto mt-14 grid max-w-6xl md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = icons[s.id]; return (
              <motion.article id={s.id} variants={fade} whileHover={{ y: -6 }} className={`flex flex-col border bg-card/60 p-6 backdrop-blur-[6px] ${s.flag ? "border-primary shadow-glow" : "border-border/60"}`} key={s.id}>
                <div className="flex items-center justify-between"><Icon size={30} strokeWidth={1} />{s.flag && <span className="bg-primary px-2 py-1 text-[10px] font-semibold uppercase">Flagship</span>}</div>
                <p className="mt-6 text-[10px] uppercase text-primary">{s.cat}</p>
                <h3 className="mt-2 text-lg uppercase">{s.title}</h3>
                <p className="mt-3 text-xs uppercase leading-5">{s.blurb}</p>
                <ul className="mt-5 space-y-2 border-t border-border/60 pt-4">{s.items.map((i) => <li key={i} className="text-[11px] uppercase text-muted-foreground">— {i}</li>)}</ul>
                {s.note && <p className={`mt-4 text-[10px] uppercase leading-4 text-muted-foreground ${full ? "" : "line-clamp-2"}`}>{s.note}</p>}
                {<Link to={`/services/${s.id}`} className="group mt-auto inline-flex items-center gap-1 self-start pt-6 text-xs uppercase hover:text-primary"><span className="relative after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 group-hover:after:scale-x-100">Learn more</span> <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>}
              </motion.article>);
          })}
        </div>
      </Reveal>
    </Frame>
  );
}

export function Why() {
  const cards = [[trust[0], trophy], [trust[1], shield], [trust[3], clock]];
  return (
    <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><VideoBg src={v.p55} /><Reveal>
      <Head eyebrow="why us" title={<>You stay in control.<br />You keep everything.</>} lead="Every engagement is built so your team owns the process, approves the actions, and inherits the documentation." />
      <div className="mt-14 grid gap-4 md:grid-cols-3">{cards.map(([[t, p], img]) => (
        <motion.article variants={fade} whileHover={{ y: -8, boxShadow: "0 14px 40px rgba(212,27,10,.15)" }} className="flex min-h-[410px] flex-col items-center justify-between border border-border/50 bg-card p-7 text-center" key={t}>
          <img src={img} alt="" loading="lazy" decoding="async" width="176" height="176" className="h-44 w-44 object-contain" /><div><h3 className="text-lg uppercase">{t}</h3><p className="mt-3 text-xs uppercase leading-5">{p}</p></div>
        </motion.article>))}</div>
    </Reveal></Frame>
  );
}

export function HowWeWork() {
  return (
    <Frame className="mt-20 min-h-[700px] overflow-hidden">
      <video autoPlay muted loop playsInline className={`absolute inset-0 h-full w-full object-cover ${redVideo}`}><source src={processVideo} /></video>
      <div className="absolute inset-0 bg-process-overlay" />
      <Reveal className="relative grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:p-8">
        <div><Eyebrow>how we work</Eyebrow><Heading>Working security,<br />delivered on your terms</Heading><Lead center={false}>Fixed scope, agreed before work begins. Built on your tooling. Documented and handed to your team.</Lead></div>
        <div className="grid gap-3">{[trust[3], trust[2], trust[1], trust[0]].map(([t, p], i) => (
          <motion.article variants={fade} whileHover={{ x: -6 }} className="flex min-h-32 flex-col items-center justify-center bg-card/85 p-6 text-center backdrop-blur-[6px]" key={t}>
            <span className="grid h-10 w-10 place-items-center bg-muted text-xs">{i + 1}</span><h3 className="mt-4 text-lg uppercase">{t}</h3><p className="mt-2 max-w-md text-xs uppercase leading-5">{p}</p>
          </motion.article>))}</div>
      </Reveal>
    </Frame>
  );
}

export function Industries() {
  return (
    <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><VideoBg src={v.p7} /><Reveal>
      <Head eyebrow="industries we serve" title={<>Built for lean teams,<br />not enterprise budgets.</>} />
      <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{industries.map(([t, p]) => (
        <motion.article variants={fade} whileHover={{ y: -5 }} className="min-h-44 border border-border/60 bg-card bg-grid bg-[size:36px_36px] p-6" key={t}><h3 className="text-lg uppercase">{t}</h3><p className="mt-4 text-xs uppercase leading-5">{p}</p></motion.article>))}</div>
    </Reveal></Frame>
  );
}

export function Regions() {
  return (
    <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><VideoBg src={v.p44} poster={poster} /><Reveal>
      <Head eyebrow="global presence" title={<>Three regions.<br />One standard of delivery.</>} />
      <div className="mt-12 grid gap-4 md:grid-cols-3">{regions.map(([r, t, p]) => (
        <motion.article variants={fade} whileHover={{ y: -6 }} className="border border-border/60 bg-card p-7" key={t}><p className="text-[10px] uppercase text-primary">{r}</p><h3 className="mt-6 text-2xl uppercase">{t}</h3><p className="mt-4 text-xs uppercase leading-5">{p}</p></motion.article>))}</div>
    </Reveal></Frame>
  );
}

export function FAQ() {
  const [active, setActive] = useState(0);
  return (
    <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
      <Head eyebrow="faq" title={<>Got questions?<br />Straight answers.</>} />
      <div className="mx-auto mt-14 max-w-2xl space-y-3">{faqs.map(([q, a], i) => (
        <motion.article variants={fade} className="border-t border-border bg-card" key={q}>
          <button aria-expanded={active === i} onClick={() => setActive(active === i ? -1 : i)} className="group relative isolate grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 overflow-hidden p-5 text-left text-xs uppercase"><Sweep soft /><span className="relative">{q}</span><span className="relative">{active === i ? <Minus size={16} /> : <Plus size={16} />}</span></button>
          {active === i && <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="px-5 pb-5 text-xs uppercase leading-5 text-muted-foreground">{a}</motion.p>}
        </motion.article>))}</div>
    </Reveal></Frame>
  );
}

export function CTA() {
  return (
    <Frame className="mt-20 min-h-[520px] overflow-hidden">
      <video autoPlay muted loop playsInline className={`absolute inset-0 h-full w-full object-cover ${redVideo}`}><source src={ctaVideo} /></video>
      <div className="absolute bg-cta-overlay" />
      <Reveal className="relative flex min-h-[520px] flex-col items-center justify-center px-6 text-center">
        <Heading center>Ready to see what a<br />working process looks like?</Heading>
        <Lead>Tell us about your needs and a consultant will reach out within one business day.</Lead>
        <motion.div variants={fade} className="mt-7"><Button primary to="/contact">Book a scoping call</Button></motion.div>
      </Reveal>
    </Frame>
  );
}
