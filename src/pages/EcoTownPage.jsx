import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Building2, Mail, MapPin, Phone, Plus, Ruler, ShieldCheck } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import Footer from '../components/Footer.jsx';
import { RouteHeader } from './PageShared.jsx';
import { usePageSeo, buildFaqSchema } from '../hooks/usePageSeo.js';
import { routeGroups } from '../data/navigation.js';
import { ecoTownSeo, ecoTownFaqs, ecoTownReasons } from '../data/ecoTownContent.js';
import '../styles/palam-city.css';

export const seo = ecoTownSeo;
const faqSchema = buildFaqSchema(ecoTownFaqs);
const sections = [['et-overview', 'Overview'], ['et-plots', 'Plots'], ['et-location', 'Location'], ['et-faq', 'FAQs'], ['et-contact', 'Enquire']];
const colonisers = '/about#business-verticals';

export default function EcoTownPage() {
  const [active, setActive] = useState('et-overview');
  usePageSeo({ ...seo, structuredData: faqSchema, structuredDataKey: 'eco-town-faq' });

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(([id]) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  return <div className="route-page pc-shell et-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <RouteHeader />
    <main id="main" className="pc-page et-page">
      <section className="pc-hero mobile-photo-hero" aria-labelledby="et-title">
        <div className="container pc-hero-grid">
          <div className="pc-hero-copy">
            <nav className="pc-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href={colonisers}>Pal Colonisers</a><span>/</span><span aria-current="page">Eco Town</span></nav>
            <p className="eyebrow">Pal Colonisers · Haldwani</p>
            <h1 id="et-title">Eco Town,<br /><em>your dream home plot in the heart of Haldwani</em></h1>
            <p>Eco Town gives you a plot in the heart of Haldwani and lets you build the home that fits how you actually want to live.</p>
            <div className="hero-actions"><a className="button button-brass" href="#et-contact">Enquire about Eco Town <ArrowUpRight size={18} /></a><a className="pc-explore" href="#et-overview">Explore Eco Town <ArrowDownRight size={20} /></a></div>
            <div className="pc-hero-signoff"><span>By <a href={colonisers}>Pal Colonisers</a></span><span>Part of <a href="/about/the-pal-group">SM Pal Group</a></span></div>
          </div>
          <figure className="pc-hero-photo"><ResponsiveImage src="/assets/Ecotown 1 (2).webp" alt="Eco Town residential plot development in Haldwani" fetchPriority="high" sizes="(max-width: 800px) 100vw, 55vw" /><figcaption><MapPin size={17} /> A connected address in Haldwani</figcaption></figure>
        </div>
      </section>

      <nav className="pc-section-nav" aria-label="On this page"><div className="container">{sections.map(([id, title], i) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}><span>0{i + 1}</span>{title}</a>)}</div></nav>

      <section className="section-pad pc-overview" id="et-overview" aria-labelledby="et-overview-title"><div className="container">
        <div className="pc-split"><div><p className="eyebrow eyebrow-dark">01 / About Eco Town</p><h2 id="et-overview-title">Your plot.<br /><em>Your way of living.</em></h2></div><div className="pc-prose"><p>Eco Town is a residential plot development by <a href={colonisers}>Pal Colonisers</a>, part of <a href="/about/the-pal-group">SM Pal Group's</a> real estate portfolio, positioned to bring comfort and convenience together in central Haldwani.</p><p>Rather than offering pre-built units, Eco Town gives buyers a cluster of plots to choose from, each suited to different lifestyle needs and household sizes.</p></div></div>
        <div className="pc-at-glance">{[[Ruler, 'Flexible plot sizes', '2,400 to 2,800 sq ft'], [Building2, 'Build it your way', 'Your layout, design and pace'], [ShieldCheck, 'A trusted developer', 'Pal Colonisers and SM Pal Group']].map(([Icon, title, text]) => <div key={title}><Icon size={26} strokeWidth={1.5} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
      </div></section>

      <section className="section-pad pc-living" id="et-plots" aria-labelledby="et-plots-title"><div className="container"><div className="pc-heading"><p className="eyebrow eyebrow-dark">02 / Plots designed for how you want to live</p><h2 id="et-plots-title">Start with the space.<br /><em>Make it your own.</em></h2></div><div className="pc-living-grid"><figure className="pc-living-photo"><ResponsiveImage src="/assets/Ecotown 1 (2).webp" alt="Eco Town plot development visual" sizes="(max-width: 800px) 100vw, 45vw" /><figcaption>Room to shape the home you imagine.</figcaption></figure><div className="pc-amenities">{[['Choose your scale', 'Plots range from 2,400 to 2,800 square feet, giving you real choice for a compact, efficient home or a larger family home.'], ['Own the design', 'You decide the layout, the architecture and the details instead of adapting to a home someone else has already finished.'], ['Build at your pace', 'A plot-based development gives you control over when and how your home takes shape.']].map(([title, text], i) => <details className="pc-detail" key={title} open={i === 0}><summary><Ruler size={24} strokeWidth={1.5} /><h3>{title}</h3><Plus className="pc-plus" size={20} /></summary><p>{text}</p></details>)}<div className="pc-amenity-note"><span>Designed around choice</span><p>Build a home that reflects how your household actually wants to live.</p></div></div></div></div></section>

      <section className="section-pad pc-location" id="et-location" aria-labelledby="et-location-title"><div className="container pc-split"><div><p className="eyebrow">03 / Connectivity and modern amenities</p><h2 id="et-location-title">Central Haldwani.<br /><em>Connected to everyday life.</em></h2><p>Eco Town is positioned to offer strong connectivity and modern amenities within its Haldwani location, bringing comfort and convenience together for residents.</p><div className="pc-connections"><span><Building2 size={20} /> Modern amenities</span><span><MapPin size={20} /> Central Haldwani</span><span><ShieldCheck size={20} /> Everyday convenience</span></div></div><aside className="pc-address-card"><p className="eyebrow">A trusted name behind Eco Town</p><h3>Built on a legacy of trust.</h3><p>Eco Town is backed by Pal Colonisers, part of SM Pal Group's broader legacy across the region.</p><a href="/about/the-pal-group">Discover the group <ArrowUpRight size={18} /></a></aside></div></section>

      <section className="section-pad pc-reasons" aria-labelledby="et-reasons-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">Why choose Eco Town?</p><h2 id="et-reasons-title">Build the home<br /><em>you have in mind.</em></h2><a className="text-link" href="/industries/pal-colonisers/pallazio">Explore Pallazio <ArrowUpRight size={18} /></a></div><div>{ecoTownReasons.map(([title, text], i) => <article className="pc-reason" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="section-pad pc-faq" id="et-faq" aria-labelledby="et-faq-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">04 / Good to know</p><h2 id="et-faq-title">Your questions,<br /><em>answered.</em></h2></div><div>{ecoTownFaqs.map(([question, answer]) => <details className="pc-detail" key={question}><summary><h3>{question}</h3><Plus className="pc-plus" size={20} /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section-pad pc-contact" id="et-contact" aria-labelledby="et-contact-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">05 / Visit or contact Eco Town</p><h2 id="et-contact-title">Your next chapter<br /><em>starts here.</em></h2><p>You can reach the SM Pal Group team about Eco Town using the details below.</p><a className="button button-green" href="/contact">Enquire with our team <ArrowUpRight size={18} /></a></div><address><div><MapPin size={23} /><div><span>Visit Eco Town</span><p>Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139</p></div></div><div><Phone size={22} /><div><span>Call us</span><a href="tel:+919045599277">+91 90455 99277</a></div></div><div><Mail size={22} /><div><span>Email us</span><a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a></div></div></address></div></section>

      <section className="section-pad pc-related" aria-labelledby="et-related-title"><div className="container"><p className="eyebrow eyebrow-dark">Explore more about SM Pal Group's real estate projects</p><h2 id="et-related-title">More places.<br /><em>The same commitment.</em></h2><p>Pal Colonisers has also developed <a href="/industries/pal-colonisers/pallazio">Pallazio</a> in the same general area of Haldwani. Pallazio's page describes itself as adjacent to Eco Town, though that connection is not currently confirmed on Eco Town's own page.</p><p>Explore <a href="/industries/pal-colonisers/pallazio">Pallazio</a>, <a href="/industries/pal-colonisers/pal-sumeera-residency">Pal Sumeera Residency</a>, <a href="/industries/pal-colonisers/palam-city">Palam City</a>, <a href="/industries/pal-colonisers/paloma-greens">Paloma Greens</a>, and <a href="/industries/pal-colonisers/ram-ji-vihar">Ram Ji Vihar</a>, or visit the <a href={colonisers}>Pal Colonisers</a> page.</p><div className="pc-project-links">{routeGroups.colonisers.filter(item => item.href !== seo.path).map(item => <a key={item.href} href={item.href}>{item.label}<ArrowUpRight size={20} /></a>)}</div></div></section>
    </main><Footer />
  </div>;
}
