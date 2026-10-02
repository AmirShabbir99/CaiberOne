import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, ArrowUpRight } from "lucide-react";
import { Frame, Reveal, Eyebrow, Heading, Lead, Button, VideoBg, overlayLeft, fade } from "../components/ui";
import { CTA, icons } from "../components/sections";
import { services, trust } from "../data";
import { v } from "../videos";
import processVideo from "../assets/process.mp4";
import Seo from "../components/Seo";
const heroVideo = { monitoring: v.p7, "ai-soc": v.p6, "vuln-pentest": v.p4, compliance: v.p11, "risk-governance": v.p55, advisory: v.p44 };

export const Crumbs = ({ trail }) => (
  <motion.p variants={fade} className="mb-6 flex flex-wrap gap-2 text-[11px] uppercase text-muted-foreground">
    <Link to="/services" className="hover:text-primary">Services</Link>
    {trail.map(([t, to]) => <span key={t}>/ {to ? <Link to={to} className="hover:text-primary">{t}</Link> : <span className="text-foreground">{t}</span>}</span>)}
  </motion.p>
);
export const Head = ({ eyebrow, title }) => <div className="text-center"><Eyebrow>{eyebrow}</Eyebrow><Heading center>{title}</Heading></div>;

export default function ServiceDetail() {
  const { slug } = useParams();
  const s = services.find((x) => x.id === slug);
  if (!s) return <Navigate to="/services" replace />;
  return (
    <div key={s.id}>
      <Seo title={s.title} path={`/services/${s.id}`} description={`${s.blurb} ${s.items.slice(0, 3).join(", ")}.`} />
      <Frame className="grid min-h-[440px] content-center gap-10 p-6 sm:p-10 lg:p-14">
        <VideoBg src={heroVideo[s.id]} overlay={overlayLeft} />
        <Reveal className="max-w-3xl">
          <Crumbs trail={[[s.title]]} /><Eyebrow>{s.cat}</Eyebrow><Heading>{s.title}</Heading><Lead center={false}>{s.blurb}</Lead>
        </Reveal>
      </Frame>
      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
        <Head eyebrow="what we do" title="Included services" />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{s.items.map((i) => {
          const link = s.id === "ai-soc" && i === "AI SOC Workflow Pilot";
          const card = <><CheckCircle2 size={22} strokeWidth={1} className="text-primary" /><h3 className="mt-6 text-sm uppercase leading-5">{i}</h3>{link && <ArrowUpRight size={16} className="mt-4" />}</>;
          return <motion.div variants={fade} whileHover={{ y: -5 }} key={i}>{link
            ? <Link to="/services/ai-soc/workflow" className="block h-full min-h-40 border border-border/60 bg-card bg-grid bg-[size:36px_36px] p-6 hover:border-primary">{card}</Link>
            : <div className="h-full min-h-40 border border-border/60 bg-card bg-grid bg-[size:36px_36px] p-6">{card}</div>}</motion.div>; })}</div>
        {s.note && <motion.p variants={fade} className="mt-8 border-l-2 border-primary pl-4 text-[11px] uppercase leading-5 text-muted-foreground">{s.note}</motion.p>}
      </Reveal></Frame>
      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><VideoBg src={processVideo} graded /><Reveal>
        <Head eyebrow="how we work" title={<>Fixed scope.<br />Documented handover.</>} />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{trust.map(([t, p]) => (
          <motion.article variants={fade} whileHover={{ y: -5 }} className="border border-border/60 bg-card p-6" key={t}><h3 className="text-sm uppercase">{t}</h3><p className="mt-3 text-xs uppercase leading-5 text-muted-foreground">{p}</p></motion.article>))}</div>
      </Reveal></Frame>
      <Frame className="mt-20 p-6 sm:p-10 lg:p-14"><Reveal>
        <Head eyebrow="more services" title="Explore other capabilities" />
        <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{services.filter((x) => x.id !== s.id).map((o) => { const I = icons[o.id]; return (
          <motion.div variants={fade} whileHover={{ y: -5 }} key={o.id}><Link to={`/services/${o.id}`} className="block h-full border border-border/60 bg-card bg-grid bg-[size:36px_36px] p-6 hover:border-primary">
            <I size={26} strokeWidth={1} /><h3 className="mt-5 text-sm uppercase">{o.title}</h3><p className="mt-3 text-xs uppercase leading-5 text-muted-foreground">{o.blurb}</p></Link></motion.div>); })}</div>
      </Reveal></Frame>
    </div>
  );
}
