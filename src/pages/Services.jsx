import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Services as ServiceGrid, Integrations, Industries, CTA } from "../components/sections";
import Seo from "../components/Seo";
import { v } from "../videos";

export default function Services() {
  const { hash } = useLocation();
  useEffect(() => { if (hash) setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "center" }), 150); }, [hash]);
  return (
    <div className="pt-3">
      <Seo title="Services" path="/services" description="Six capabilities, one cybersecurity team: security monitoring, AI-assisted SOC, vulnerability assessment and penetration testing, compliance readiness, risk and governance, and security advisory." />
      <ServiceGrid full video={v.p3} /><Integrations /><Industries /><CTA />
    </div>
  );
}
