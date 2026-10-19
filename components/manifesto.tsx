import { Eyebrow } from "./ui";
import { Reveal } from "./reveal";

export function Manifesto() {
  return <section className="manifesto container" id="the-approach">
    <Reveal><div className="manifesto-grid"><Eyebrow>The thought behind the work</Eyebrow><div><h2>First, a feeling.<br /><span>Then, a reason</span><br /><em>to choose you.</em></h2><div className="manifesto-copy"><p>People notice how a business feels before they know its whole story. The detail. The clarity. The sense that someone has thought it through.</p><p>We bring that care to your website, your content, and the way people find you—so the first impression has somewhere meaningful to go.</p></div></div></div></Reveal>
    <div className="manifesto-foot"><span>For local & service businesses</span><span className="manifesto-rule" /><span>For startups & technology companies</span></div>
  </section>;
}
