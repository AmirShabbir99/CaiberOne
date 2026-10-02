import { Frame, Reveal, Eyebrow, Heading, Lead, VideoBg, overlayLeft } from "../components/ui";
import ContactForm from "../components/ContactForm";
import Seo from "../components/Seo";
import { v } from "../videos";

export default function Contact() {
  return (
    <>
      <Seo title="Contact" path="/contact" description="Book a scoping call with CaiberOne. Tell us about your needs and a consultant will reach out within one business day." />
      <Frame className="mt-3 grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
        <VideoBg src={v.p2} overlay="bg-gradient-to-r from-background/90 via-background/55 to-background/10" />
        <Reveal>
          <Eyebrow>book a scoping call</Eyebrow><Heading>Tell us about<br />your needs</Heading>
          <Lead center={false}>A consultant will reach out within one business day. Prefer email? Write to info@caiberone.com.</Lead>
        </Reveal>
        <ContactForm />
      </Frame>
    </>
  );
}
