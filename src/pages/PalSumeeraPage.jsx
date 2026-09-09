import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, MapPin, Trees, ShieldCheck, Users, Plus, Phone, Mail, Hospital, Bus, Route, Smile, Store, Landmark } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import Footer from '../components/Footer.jsx';
import { RouteHeader } from './PageShared.jsx';
import { usePageSeo, buildFaqSchema } from '../hooks/usePageSeo.js';
import { routeGroups } from '../data/navigation.js';
import { sumeeraSeo, sumeeraFaqs, sumeeraAmenities, sumeeraReasons, sumeeraHighlights } from '../data/sumeeraContent.js';
import '../styles/palam-city.css';
import '../styles/sumeera.css';

export const seo = sumeeraSeo;
const faqSchema = buildFaqSchema(sumeeraFaqs);
// Source: https://smpalgroup.com/wp-content/uploads/2025/12/best-luxury-society-uttarakhand.jpeg
const photo = '/assets/pal-sumeera/township.webp';
const colonisers = '/about#business-verticals';
const sections = [['sumeera-about', 'Overview'], ['sumeera-amenities', 'Life here'], ['sumeera-highlights', 'Highlights'], ['sumeera-location', 'Location'], ['sumeera-faq', 'FAQs'], ['sumeera-contact', 'Enquire']];
const icons = [Users, Smile, Trees, Store, Landmark];

export default function PalSumeeraPage() {
  usePageSeo(seo);
  const [active, setActive] = useState('sumeera-about');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return <div className="route-page pc-shell ps-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <RouteHeader />
    <main id="main" className="pc-page ps-page">
      <section className="pc-hero mobile-photo-hero" aria-labelledby="sumeera-title">
        <div className="container pc-hero-grid">
          <div className="pc-hero-copy">
            <nav className="pc-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href={colonisers}>Pal Colonisers</a><span>/</span><span aria-current="page">Pal Sumeera Residency</span></nav>
            <p className="eyebrow">Kichha, Uttarakhand</p>
            <h1 id="sumeera-title">Pal Sumeera Residency,<br /><em>premium living in the heart of Kichha.</em></h1>
            <p>Pal Sumeera Residency is a premium residential township in Kichha, developed by Pal Colonisers to bring thoughtful design, modern amenities, and genuine connectivity together in one community.</p>
            <div className="hero-actions"><a className="button button-brass" href="#sumeera-contact">Enquire about your plot <ArrowUpRight size={18} /></a><a className="pc-explore" href="#sumeera-about">Explore the township <ArrowDownRight size={20} /></a></div>
            <div className="pc-hero-signoff"><span>By <a href={colonisers}>Pal Colonisers</a></span><span>Part of <a href="/about/the-pal-group">SM Pal Group</a></span></div>
          </div>
          <figure className="pc-hero-photo"><ResponsiveImage src={photo} alt={seo.imageAlt} fetchPriority="high" sizes="(max-width: 800px) 100vw, 55vw" /><figcaption><MapPin size={17} /> Kichha, Uttarakhand <span>Architectural visualisation</span></figcaption></figure>
        </div>
      </section>

      <nav className="pc-section-nav" aria-label="On this page"><div className="container">{sections.map(([id, title], i) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}><span>0{i + 1}</span>{title}</a>)}</div></nav>

      <section className="section-pad pc-overview" id="sumeera-about" aria-labelledby="sumeera-about-title"><div className="container">
        <div className="pc-split"><div><p className="eyebrow eyebrow-dark">01 / The township</p><h2 id="sumeera-about-title">A thoughtful address.<br /><em>A community to call your own.</em></h2></div><div className="pc-prose"><p>This is not just a place to build a house, it is a place designed around how people actually want to live.</p><p>Pal Sumeera Residency sits in a prime location in Kichha, developed by <a href={colonisers}>Pal Colonisers</a>, a name with more than 20 years of experience building residential societies across Uttarakhand. As part of <a href="/about/the-pal-group">SM Pal Group's</a> broader legacy of over four decades, the project carries the same commitment to trust and quality found across the group's other businesses.</p><p>What sets Pal Sumeera Residency apart is the intent behind it. Every layout, amenity, and shared space has been planned around building an actual community, not just a collection of individual homes.</p></div></div>
        <div className="pc-at-glance">{[[Trees, 'Space to breathe', 'Parks & green landscapes'], [ShieldCheck, 'Peace of mind', 'Controlled access & surveillance'], [MapPin, 'At the heart of it', 'Kichha, Uttarakhand']].map(([Icon, title, text]) => <div key={title}><Icon size={26} strokeWidth={1.5} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      </div></section>

      <section className="section-pad pc-living" id="sumeera-amenities" aria-labelledby="sumeera-amenities-title"><div className="container">
        <div className="pc-heading"><p className="eyebrow eyebrow-dark">02 / Life at Pal Sumeera Residency</p><h2 id="sumeera-amenities-title">Amenities designed<br /><em>for elevated living.</em></h2></div>
        <div className="pc-living-grid"><figure className="pc-living-photo"><ResponsiveImage src={photo} alt="Architectural visualisation of the illuminated Pal Sumeera Residency gateway" sizes="(max-width: 800px) 100vw, 45vw" /><figcaption>Pal Sumeera Residency entrance. Architectural visualisation.</figcaption></figure>
          <div className="pc-amenities">{sumeeraAmenities.map(([title, text], i) => { const Icon = icons[i]; return <details key={title} open={i === 0} className="pc-detail"><summary><Icon size={24} strokeWidth={1.5} /><h3>{title}</h3><Plus className="pc-plus" size={20} /></summary><p>{text}</p></details>; })}<div className="pc-amenity-note"><span>Thoughtfully planned</span><p>Pal Sumeera Residency's amenities are built around how residents actually spend their time, not just what looks good on a brochure.</p></div></div>
        </div>
      </div></section>

      <section className="section-pad ps-highlights" id="sumeera-highlights" aria-labelledby="sumeera-highlights-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">03 / The details that matter</p><h2 id="sumeera-highlights-title">Planned with care.<br /><em>Connected by design.</em></h2><p className="ps-section-intro">Pal Sumeera Residency's planning goes well beyond individual amenities. Here is how the township comes together as a whole.</p><a className="text-link" href="#sumeera-contact">Find your place here <ArrowUpRight size={18} /></a></div><div>{sumeeraHighlights.map(([title, text], i) => <details className="pc-detail" key={title} open={i === 0}><summary><span className="ps-number">0{i + 1}</span><h3>{title}</h3><Plus className="pc-plus" size={20} aria-hidden="true" /></summary><p>{text}</p></details>)}</div></div></section>

      <section className="section-pad pc-location" id="sumeera-location" aria-labelledby="sumeera-location-title"><div className="container pc-split">
        <div><p className="eyebrow">04 / A connected address</p><h2 id="sumeera-location-title">Close to what matters.<br /><em>At home in Kichha.</em></h2><p>Pal Sumeera Residency is positioned near several of Kichha's key landmarks and major roads, giving residents genuinely convenient access to daily life. The township connects to AIIMS, the ISBT (Inter State Bus Terminal), and the Khurpia area, alongside other essential hubs nearby.</p><div className="pc-connections">{[[Hospital, 'AIIMS'], [Bus, 'ISBT'], [Route, 'Khurpia']].map(([Icon, label]) => <span key={label}><Icon size={20} />{label}</span>)}</div><a className="pc-explore" href="#sumeera-contact">Plan your visit <ArrowDownRight size={20} /></a></div>
        <aside className="pc-address-card"><MapPin size={32} strokeWidth={1.5} /><p className="eyebrow">Growing connectivity</p><h3>A location with room to grow.</h3><p>Beyond its current access to AIIMS and the ISBT, the township is positioned for upcoming connectivity improvements around the Khurpia area, adding to its long term convenience.</p><a href="/contact">Discuss the location with our team <ArrowUpRight size={18} /></a></aside>
      </div></section>

      <section className="section-pad pc-reasons" aria-labelledby="sumeera-why-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">Built on trust</p><h2 id="sumeera-why-title">Why choose<br /><em>Pal Sumeera Residency?</em></h2><a className="text-link" href="/about">Explore our four-decade legacy <ArrowUpRight size={18} /></a></div><div>{sumeeraReasons.map(([title, text], i) => <article className="pc-reason" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section-pad pc-faq" id="sumeera-faq" aria-labelledby="sumeera-faq-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">05 / Good to know</p><h2 id="sumeera-faq-title">Your questions,<br /><em>answered.</em></h2></div><div>{sumeeraFaqs.map(([question, answer]) => <details className="pc-detail" key={question}><summary><h3>{question}</h3><Plus className="pc-plus" size={20} /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section-pad pc-contact" id="sumeera-contact" aria-labelledby="sumeera-contact-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">06 / Start a conversation</p><h2 id="sumeera-contact-title">Your next chapter<br /><em>starts here.</em></h2><p>You can reach the SM Pal Group team about Pal Sumeera Residency using the details below.</p><a className="button button-green" href="/contact">Enquire with our team <ArrowUpRight size={18} /></a></div><address><div><MapPin size={23} /><div><span>SM Pal Group office, Haldwani</span><p>Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139</p><a href="https://www.google.com/maps/search/?api=1&query=Palam+City+Devalchaur+Rampur+Road+Haldwani+263139" target="_blank" rel="noopener noreferrer">Directions to our office <ArrowUpRight size={16} /></a></div></div><div><Phone size={22} /><div><span>Call us</span><a href="tel:+919045599277">+91 90455 99277</a></div></div><div><Mail size={22} /><div><span>Email us</span><a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a></div></div></address></div></section>

      <section className="section-pad pc-related" aria-labelledby="sumeera-more-title"><div className="container"><p className="eyebrow eyebrow-dark">Explore more</p><h2 id="sumeera-more-title">More places.<br /><em>The same commitment.</em></h2><p>Explore more of <a href={colonisers}>Pal Colonisers' residential projects</a>, or discover the story of <a href="/about/the-pal-group">SM Pal Group</a>.</p><div className="pc-project-links">{routeGroups.colonisers.filter(item => item.href !== seo.path).map(item => <a key={item.href} href={item.href}>{item.label}<ArrowUpRight size={20} /></a>)}</div></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main><Footer />
  </div>;
}
