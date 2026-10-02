import { Hero, Stats, Integrations, Principles, Services, Why, HowWeWork, FAQ, CTA } from "../components/sections";
import Seo from "../components/Seo";
import { v } from "../videos";
import { faqs } from "../data";

export default function Home() {
  return (
    <>
      <Seo path="/" description="Securing organizations with practical, reliable cybersecurity solutions. AI-assisted security operations, testing, and compliance readiness — implemented, documented, and handed to your team."
        jsonLd={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) }} />
      <Hero /><Stats /><Integrations /><Services video={v.p33} /><Why /><HowWeWork /><Principles /><FAQ /><CTA />
    </>
  );
}
