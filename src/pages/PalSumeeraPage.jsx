import { ArrowDownRight, ArrowRight, ArrowUpRight, Users, Smile, Trees, Store, Landmark, MapPin, Phone, Mail } from "lucide-react";
import Footer from "../components/Footer.jsx";
import { usePageSeo, buildFaqSchema } from "../hooks/usePageSeo.js";
import { routeGroups } from "../data/navigation.js";
import { sumeeraSeo, sumeeraFaqs, sumeeraAmenities, sumeeraHighlights, sumeeraReasons } from "../data/sumeeraContent.js";
import "../styles/sumeera.css";

const faqSchema = buildFaqSchema(sumeeraFaqs);
const amenityIcons = [Users, Smile, Trees, Store, Landmark];
const colonisersOverview = "/about#business-verticals";

export default function PalSumeeraPage({ page }) {
  usePageSeo({ ...sumeeraSeo, image: page.image, imageAlt: "Residential architecture", structuredData: faqSchema, structuredDataKey: "pal-sumeera" });

  return (
    <>
      <main id="main" className="sumeera-page">
        <section className="route-hero">
          <img src={page.image} alt="" fetchPriority="high" />
          <div className="route-hero-shade" />
          <div className="container route-hero-copy">
            <nav className="sumeera-breadcrumb" aria-label="Breadcrumb">
              <a href="/">Home</a><span aria-hidden="true">/</span>
              <a href={colonisersOverview}>Pal Colonisers</a><span aria-hidden="true">/</span>
              <span aria-current="page">Pal Sumeera Residency</span>
            </nav>
            <p className="eyebrow">Pal Colonisers · Kichha, Uttarakhand</p>
            <h1>Pal Sumeera Residency, <em className="route-accent">premium living in the heart of Kichha</em></h1>
            <p className="sumeera-hero-intro">Pal Sumeera Residency is a premium residential township in Kichha, developed by <a href={colonisersOverview}>Pal Colonisers</a> to bring thoughtful design, modern amenities, and genuine connectivity together in one community. This is not just a place to build a house, it is a place designed around how people actually want to live.</p>
            <div className="hero-actions">
              <a className="button button-brass" href="#sumeera-contact">Enquire about your home <ArrowUpRight size={17} /></a>
              <a className="button button-outline" href="#sumeera-amenities">Explore amenities <ArrowDownRight size={17} /></a>
            </div>
          </div>
        </section>

        <section className="route-content section-pad" aria-labelledby="sumeera-about">
          <div className="container route-content-grid">
            <aside className="route-facts" aria-label="At a glance">
              {["Kichha, Uttarakhand", "Developed by Pal Colonisers", "20-plus years of developer experience", "Part of SM Pal Group"].map((fact, i) => <div key={fact}><span>0{i + 1}</span><strong>{fact}</strong></div>)}
              <a className="text-link" href="/about">Discover our legacy <ArrowUpRight size={17} /></a>
            </aside>
            <div className="route-copy">
              <p className="eyebrow eyebrow-dark">A place to belong</p>
              <h2 id="sumeera-about">About Pal Sumeera Residency</h2>
              <p className="large-copy">Pal Sumeera Residency sits in a prime location in Kichha, developed by <a className="inline-link" href={colonisersOverview}>Pal Colonisers</a>, a name with more than 20 years of experience building residential societies across Uttarakhand. As part of <a className="inline-link" href="/about/the-pal-group">SM Pal Group's</a> broader legacy of over four decades, the project carries the same commitment to trust and quality found across the group's other businesses.</p>
              <p>What sets Pal Sumeera Residency apart is the intent behind it. Every layout, amenity, and shared space has been planned around building an actual community, not just a collection of individual homes.</p>
            </div>
          </div>
        </section>

        <section className="sumeera-location section-pad" aria-labelledby="sumeera-location">
          <div className="container sumeera-split">
            <div>
              <p className="eyebrow eyebrow-dark">Connected to everyday life</p>
              <h2 id="sumeera-location">Location and connectivity</h2>
              <p className="large-copy">Pal Sumeera Residency is positioned near several of Kichha's key landmarks and major roads, giving residents genuinely convenient access to daily life. The township connects to AIIMS, the ISBT (Inter State Bus Terminal), and the Khurpia area, alongside other essential hubs nearby.</p>
            </div>
            <div className="sumeera-landmarks" aria-label="Nearby connections">
              <p className="eyebrow eyebrow-dark"><MapPin size={18} aria-hidden="true" /> Kichha, Uttarakhand</p>
              {[['AIIMS', 'Healthcare connectivity'], ['ISBT', 'Inter State Bus Terminal'], ['Khurpia', 'Growing connectivity']].map(([name, detail]) => <div className="sumeera-landmark" key={name}><h3>{name}</h3><p>{detail}</p><ArrowUpRight size={20} aria-hidden="true" /></div>)}
            </div>
          </div>
        </section>

        <section className="sumeera-amenities section-pad" id="sumeera-amenities" aria-labelledby="sumeera-amenities-title">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow eyebrow-dark">Room for a fuller life</p><h2 id="sumeera-amenities-title">Amenities designed for elevated living</h2><p>Pal Sumeera Residency's amenities are built around how residents actually spend their time, not just what looks good on a brochure.</p></div></div>
            <div className="sumeera-amenity-grid">
              {sumeeraAmenities.map(([title, text], i) => { const Icon = amenityIcons[i]; return <article className="sumeera-amenity" key={title}><Icon size={28} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><p>{text}</p></article>; })}
            </div>
          </div>
        </section>

        <section className="sumeera-highlights section-pad" aria-labelledby="sumeera-highlights-title">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow eyebrow-dark">Thoughtfully planned, throughout</p><h2 id="sumeera-highlights-title">Project highlights</h2><p>Pal Sumeera Residency's planning goes well beyond individual amenities. Here is how the township comes together as a whole.</p></div></div>
            <div className="sumeera-highlight-grid">{sumeeraHighlights.map(([title, text], i) => <article className="sumeera-highlight" key={title}><span className="sumeera-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          </div>
        </section>

        <section className="sumeera-why section-pad" aria-labelledby="sumeera-why-title">
          <div className="container sumeera-split">
            <div><p className="eyebrow">Built on trust</p><h2 id="sumeera-why-title">Why choose<br /><em>Pal Sumeera Residency?</em></h2><a className="button button-brass" href="#sumeera-contact">Talk to our team <ArrowRight size={17} /></a></div>
            <div className="sumeera-reasons">{sumeeraReasons.map(([title, text], i) => <article key={title}><span className="sumeera-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
          </div>
        </section>

        <section className="sumeera-contact section-pad" id="sumeera-contact" aria-labelledby="sumeera-contact-title">
          <div className="container sumeera-split">
            <div><p className="eyebrow eyebrow-dark">Start a conversation</p><h2 id="sumeera-contact-title">Visit or contact Pal Sumeera Residency</h2><p className="large-copy">You can reach the SM Pal Group team about Pal Sumeera Residency using the details below.</p><a className="text-link" href="/contact">SM Pal Group contact page <ArrowUpRight size={17} /></a></div>
            <address className="sumeera-contact-details">
              <div><MapPin size={22} aria-hidden="true" /><div><span>SM Pal Group office</span><p>Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139</p></div></div>
              <div><Phone size={22} aria-hidden="true" /><div><span>Phone</span><a href="tel:+919045599277">+91 90455 99277</a></div></div>
              <div><Mail size={22} aria-hidden="true" /><div><span>Email</span><a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a></div></div>
            </address>
          </div>
        </section>

        <section className="faq section-pad" aria-labelledby="sumeera-faq-title">
          <div className="container faq-grid">
            <div><p className="eyebrow eyebrow-dark">Good to know</p><h2 id="sumeera-faq-title">Frequently asked questions</h2></div>
            <div className="faq-list">{sumeeraFaqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<ArrowDownRight size={18} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="route-related section-pad" aria-labelledby="sumeera-more-title">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow eyebrow-dark">Explore more</p><h2 id="sumeera-more-title">Explore more about SM Pal Group's real estate projects</h2><p>To see the rest of Pal Colonisers' residential projects, explore Palam City, Pallazio, Eco Town, Paloma Greens, and Ram Ji Vihar. You can also explore <a className="inline-link" href={colonisersOverview}>Pal Colonisers in our business overview</a> for the real estate story, or read about <a className="inline-link" href="/about/the-pal-group">SM Pal Group itself</a>.</p></div></div>
            <div className="route-related-grid">{routeGroups.colonisers.filter(item => item.href !== sumeeraSeo.path).map(item => <a className="route-related-card" href={item.href} key={item.href}><span>{item.label}</span><ArrowUpRight size={19} aria-hidden="true" /></a>)}</div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
