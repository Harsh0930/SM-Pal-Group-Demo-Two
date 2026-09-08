import { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, MapPin, Trees, ShieldCheck, PencilRuler, Plus, Phone, Mail, Building2 } from 'lucide-react';
import ResponsiveImage from '../components/ResponsiveImage.jsx';
import PallazioGallery from '../components/PallazioGallery.jsx';
import Footer from '../components/Footer.jsx';
import { RouteHeader } from './PageShared.jsx';
import { usePageSeo, buildFaqSchema } from '../hooks/usePageSeo.js';
import { routeGroups } from '../data/navigation.js';
import { pallazioSeo, pallazioFaqs, pallazioLiving, pallazioReasons } from '../data/pallazioContent.js';
import '../styles/palam-city.css';
import '../styles/pallazio.css';

export const seo = pallazioSeo;
const faqSchema = buildFaqSchema(pallazioFaqs);
const colonisers = '/about#business-verticals';
const ecoTown = '/industries/pal-colonisers/eco-town';
const sections = [['pz-overview', 'Overview'], ['pz-living', 'Life here'], ['pz-gallery', 'Gallery'], ['pz-location', 'Location'], ['pz-faq', 'FAQs'], ['pz-contact', 'Enquire']];
const icons = [PencilRuler, Trees, ShieldCheck];

export default function PallazioPage() {
  usePageSeo(seo);
  const [active, setActive] = useState('pz-overview');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return <div className="route-page pc-shell pz-shell">
    <a className="skip-link" href="#main">Skip to content</a>
    <RouteHeader />
    <main id="main" className="pc-page pz-page">
      <section className="pc-hero mobile-photo-hero" aria-labelledby="pz-title"><div className="container pc-hero-grid">
        <div className="pc-hero-copy"><nav className="pc-breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href={colonisers}>Pal Colonisers</a><span>/</span><span aria-current="page">Pallazio</span></nav><p className="eyebrow">Ecotown-Pallazio · Haldwani</p><h1 id="pz-title">Pallazio.<br /><em>Build your own palace.</em></h1><p>Gated residential and commercial plots near Pilikothi Chauraha. A hill view, tree-lined roads, and the freedom to create a place that's yours.</p><div className="hero-actions"><a className="button button-brass" href="#pz-contact">Enquire about a plot <ArrowUpRight size={18} /></a><a className="pc-explore" href="#pz-gallery">Explore the gallery <ArrowDownRight size={20} /></a></div><div className="pc-hero-signoff"><span>By <a href={colonisers}>Pal Colonisers</a></span><span>Part of <a href="/about/the-pal-group">SM Pal Group</a></span></div></div>
        <figure className="pc-hero-photo"><ResponsiveImage src="/assets/Gate Cam.webp" alt="Architectural visualisation of Pallazio's landscaped entrance and tree-lined road" fetchPriority="high" sizes="(max-width: 800px) 100vw, 55vw" /><figcaption><MapPin size={17} /><span>Near Pilikothi Chauraha, Haldwani<small>Architectural visualisation</small></span></figcaption></figure>
      </div></section>

      <nav className="pc-section-nav" aria-label="On this page"><div className="container">{sections.map(([id, title], i) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}><span>0{i + 1}</span>{title}</a>)}</div></nav>

      <section className="section-pad pc-overview" id="pz-overview" aria-labelledby="pz-overview-title"><div className="container"><div className="pc-split"><div><p className="eyebrow eyebrow-dark">01 / A place to begin</p><h2 id="pz-overview-title">Your land.<br /><em>Your vision of home.</em></h2></div><div className="pc-prose"><p>Pallazio, formally known as Ecotown-Pallazio, is a gated plot development in Haldwani where you design and build the home you actually want, not just the one that came finished. Set near Pilikothi Chauraha with tree-lined roads and a genuine hill view, Pallazio is built for people who want to own their home from the ground up.</p><p>Pallazio is a gated community developed by <a href={colonisers}>Pal Colonisers</a>, part of <a href="/about/the-pal-group">SM Pal Group's</a> real estate portfolio, offering plots for both residential and commercial use. Set in a picturesque location with hill views, the development is built around tree-lined internal roads ranging from 30 to 50 feet wide, giving every plot room to breathe.</p></div></div><div className="pc-at-glance">{[[PencilRuler, 'Freedom to self-build', 'Residential & commercial plots'], [Trees, '30–50 ft internal roads', 'Tree-lined avenues & green spaces'], [ShieldCheck, 'Gated community', 'Controlled access & play areas']].map(([Icon, title, text]) => <div key={title}><Icon size={26} strokeWidth={1.5} /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>

      <section className="section-pad pc-living" id="pz-living" aria-labelledby="pz-living-title"><div className="container"><div className="pc-heading"><p className="eyebrow eyebrow-dark">02 / Life, on your terms</p><h2 id="pz-living-title">Make room for<br /><em>your kind of living.</em></h2></div><div className="pc-living-grid"><figure className="pc-living-photo"><ResponsiveImage src="/assets/pallazio/view-07.jpg" alt="Architectural visualisation of Pallazio's central green spaces and residential plots" sizes="(max-width: 800px) 100vw, 45vw" /><figcaption>Green spaces at the centre · Architectural visualisation</figcaption></figure><div className="pc-amenities">{pallazioLiving.map(([title, text], i) => { const Icon = icons[i]; return <details className="pc-detail" key={title} open={i === 0}><summary><Icon size={24} strokeWidth={1.5} /><h3>{title}</h3><Plus className="pc-plus" size={20} /></summary><p>{text}</p></details>; })}<div className="pc-amenity-note"><span>From the ground up</span><p>A terrace garden, a balcony, or a space for the whole family. Start with the home you imagine.</p></div></div></div><article className="pc-tower"><Building2 size={40} strokeWidth={1.2} aria-hidden="true" /><div><p className="eyebrow eyebrow-dark">Space for opportunity</p><h3>Residential and commercial possibilities.</h3></div><p>Alongside residential plots for your own home, Pallazio offers plots for commercial establishments. <a className="inline-link" href="#pz-contact">Speak with our team</a> about the right plot for your plans.</p></article></div></section>

      <section className="section-pad pz-gallery" id="pz-gallery" aria-labelledby="pz-gallery-title"><div className="container"><div className="pz-gallery-heading"><div><p className="eyebrow eyebrow-dark">03 / Picture the possibilities</p><h2 id="pz-gallery-title">A closer look<br /><em>at Pallazio.</em></h2></div><p>Explore the entrance, green spaces and wider layout. Select an image to view it in full.<span>Architectural visualisations from the project gallery.</span></p></div><PallazioGallery /></div></section>

      <section className="section-pad pc-location" id="pz-location" aria-labelledby="pz-location-title"><div className="container pc-split"><div><p className="eyebrow">04 / A connected address</p><h2 id="pz-location-title">A quieter setting.<br /><em>A connected everyday.</em></h2><p>Pallazio sits in a well-developed part of Haldwani near Pilikothi Chauraha, close to hospitals, educational institutions, and commercial zones. For a self-build project especially, location matters just as much as the plot itself, it shapes your commute, your children's school options, and how connected daily life feels once you have actually moved in.</p><a className="pc-explore pz-location-link" href="#pz-contact">Talk to our team about visiting <ArrowDownRight size={20} /></a></div><aside className="pc-address-card pz-distances"><p className="eyebrow">Around the neighbourhood</p><h3>Everyday essentials, within reach.</h3><dl>{[['Pantnagar Airport', '30 km'], ['Railway station', '5 km'], ['Hospital', '2 km'], ['City centre', '2 km'], ['National highway', 'Within a 5 km radius']].map(([label, distance]) => <div key={label}><dt>{label}</dt><dd>{distance}</dd></div>)}</dl><p className="pz-distance-note">Approximate distances.</p></aside></div></section>

      <section className="section-pad pc-reasons" aria-labelledby="pz-reasons-title"><div className="container"><div className="pc-split"><div><p className="eyebrow eyebrow-dark">Built on trust</p><h2 id="pz-reasons-title">Why choose<br /><em>Pallazio?</em></h2><a className="text-link" href="/about">Explore our four-decade legacy <ArrowUpRight size={18} /></a></div><div>{pallazioReasons.map(([title, text], i) => <article className="pc-reason" key={title}><span>0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div><aside className="pz-ecotown"><div><p className="eyebrow eyebrow-dark">Part of a familiar neighbourhood</p><h3>Alongside Eco Town.</h3><p>Pallazio sits adjacent to Eco Town Phase I and II, two of Pal Colonisers' earlier landmark developments in the same area.</p></div><a className="button button-green" href={ecoTown}>Explore Eco Town <ArrowUpRight size={18} /></a></aside></div></section>

      <section className="section-pad pc-faq" id="pz-faq" aria-labelledby="pz-faq-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">05 / Good to know</p><h2 id="pz-faq-title">Your questions,<br /><em>answered.</em></h2></div><div>{pallazioFaqs.map(([question, answer]) => <details className="pc-detail" key={question}><summary><h3>{question}</h3><Plus className="pc-plus" size={20} /></summary><p>{answer}</p></details>)}</div></div></section>

      <section className="section-pad pc-contact" id="pz-contact" aria-labelledby="pz-contact-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">06 / Start a conversation</p><h2 id="pz-contact-title">A plot of possibility.<br /><em>A place of your own.</em></h2><p>You can reach the SM Pal Group team about Pallazio using the details below.</p><a className="button button-green" href="/contact">Enquire about Pallazio <ArrowUpRight size={18} /></a></div><address><div><MapPin size={23} /><div><span>SM Pal Group office</span><p>Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139</p><a href="/industries/pal-colonisers/palam-city">Explore Palam City <ArrowUpRight size={16} /></a></div></div><div><Phone size={22} /><div><span>Call us</span><a href="tel:+919045599277">+91 90455 99277</a></div></div><div><Mail size={22} /><div><span>Email us</span><a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a></div></div></address></div></section>

      <section className="section-pad pc-related" aria-labelledby="pz-related-title"><div className="container"><p className="eyebrow eyebrow-dark">Explore more</p><h2 id="pz-related-title">More places.<br /><em>The same commitment.</em></h2><p>See how Pallazio compares with <a href={ecoTown}>Eco Town</a> and other <a href={colonisers}>Pal Colonisers developments</a>, or read about <a href="/about/the-pal-group">SM Pal Group</a>.</p><div className="pc-project-links">{routeGroups.colonisers.filter(item => item.href !== seo.path).map(item => <a key={item.href} href={item.href}>{item.label}<ArrowUpRight size={20} /></a>)}</div></div></section>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </main><Footer />
  </div>;
}
