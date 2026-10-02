import { Frame, Reveal, Eyebrow, Heading, Lead, VideoBg, overlayLeft } from "../components/ui";
import { Principles, Regions, CTA } from "../components/sections";
import cables from "../assets/blog-cables.webp";
import Seo from "../components/Seo";
import { v } from "../videos";
export default function About() {
  return (
    <div className="pt-3">
      <Seo title="About" path="/about" description="CaiberOne is a cybersecurity operations and advisory company. We help startups, SMBs, MSPs, and lean security teams build practical, well-run security programs." />
      <Frame className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:p-14"><VideoBg src={v.p1} overlay={overlayLeft} /><Reveal>
        <Eyebrow>about CaiberOne</Eyebrow><Heading>Security that works<br />the way your team does.</Heading>
        <Lead center={false}>CaiberOne is a cybersecurity operations and advisory company. We help startups, SMBs, MSPs, and lean security teams build practical, well-run security programs — without the overhead of an enterprise vendor.</Lead>
      </Reveal><img src={cables} alt="Network cables plugged into a wall panel" loading="lazy" decoding="async" className="h-72 w-full border border-border/60 object-cover lg:h-full" /></Frame>
      <Principles /><Regions /><CTA />
    </div>
  );
}
