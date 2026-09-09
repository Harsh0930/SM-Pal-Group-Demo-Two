import { useEffect, useState } from 'react';
import { ArrowUpRight, Building2, Trees, ShieldCheck, Users, MapPin, Phone, Plus, MoveUpRight, Car, Compass } from 'lucide-react';
import ResponsiveImage from './ResponsiveImage.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import { routeGroups } from '../data/navigation.js';
import { buildFaqSchema } from '../hooks/usePageSeo.js';
import { palamViewSeo, palamViewAmenities, palamViewAreas, palamViewRooms, palamViewDistances, palamViewGallery, palamViewFaqs, palamViewNote } from '../data/palamViewContent.js';
import '../styles/palam-city.css';
import '../styles/palam-view-content.css';

const colonisers = '/about#business-verticals';
const palamCity = '/industries/pal-colonisers/palam-city';
const sections = [['vision', 'Overview'], ['amenities', 'Life here'], ['gallery', 'Gallery'], ['location', 'Location'], ['pv-faq', 'FAQs'], ['contact', 'Enquire']];
const icons = [Users, Trees, Car, ShieldCheck, Building2, Compass];
const map = '/assets/palam-view-brochure/location-map.webp';

export default function PalamViewContent() {
  const [active, setActive] = useState('vision');
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
    }, { rootMargin: '-15% 0px -55% 0px' });
    sections.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  return <div className="pc-page pv-content">
    <nav className="pc-section-nav" aria-label="On this page"><div className="container">{sections.map(([id, label], i) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined}><span>0{i + 1}</span>{label}</a>)}</div></nav>

    <section className="section-pad pc-overview" id="vision" aria-labelledby="pv-overview-title"><div className="container">
      <div className="pc-split"><div><p className="eyebrow eyebrow-dark">01 / Discover elevated living</p><h2 id="pv-overview-title">One floor. One family.<br /><em>A home that feels like yours.</em></h2></div><div className="pc-prose"><p>Palam View is more than a residence; it is a considered way of living, shaped around comfort, elegance, and distinction. Set within the established <a href={palamCity}>Palam City community</a>, it offers a harmonious blend of contemporary design and timeless elegance.</p><p>Premium 4 BHK residences with a study, exclusive private floors and panoramic balcony views bring space and privacy together. One home with more room to live, four sides with countless moments, and a lifestyle that moves with you.</p><p>Discover Palam View by <a href={colonisers}>Pal Colonisers</a>, part of <a href="/about/the-pal-group">SM Pal Group</a>, in Haldwani.</p></div></div>
      <div className="pc-at-glance">{[[Building2, '4 BHK with study', 'Room for every part of your day'], [Users, 'Exclusive private floors', 'One floor, one family'], [Trees, 'Panoramic balcony views', 'Four sides, countless moments']].map(([Icon, title, text]) => <div key={title}><Icon size={26} strokeWidth={1.5} aria-hidden="true" /><div><h3>{title}</h3><p>{text}</p></div></div>)}</div>
    </div></section>

    <section className="section-pad pc-living" id="amenities" aria-labelledby="pv-living-title"><div className="container">
      <div className="pc-heading"><p className="eyebrow eyebrow-dark">03 / Life at Palam View</p><h2 id="pv-living-title">Comfort in the details.<br /><em>Privacy at the heart.</em></h2></div>
      <div className="pc-living-grid"><div><figure className="pc-living-photo"><ResponsiveImage src="/assets/palam-view-brochure/hallway.webp" alt="Brochure interior visualisation of an open hallway and dining area" sizes="(max-width: 800px) 100vw, 45vw" /><figcaption>Considered spaces for everyday living. Conceptual visualisation.</figcaption></figure><div className="pc-amenity-note"><span>Space. Privacy. View. Lifestyle. Legacy.</span><p>A home that moves with you, and something worth passing down.</p></div></div><div className="pc-amenities">{palamViewAmenities.map(([title, text], i) => { const Icon = icons[i]; return <details className="pc-detail" key={title} open={i === 0}><summary><Icon size={24} strokeWidth={1.5} aria-hidden="true" /><h3>{title}</h3><Plus className="pc-plus" size={20} aria-hidden="true" /></summary><p>{text}</p></details>; })}</div></div>
    </div></section>

    <section className="section-pad pc-gallery" id="gallery" aria-labelledby="pv-gallery-title"><div className="container"><div className="pz-gallery-heading"><div><p className="eyebrow eyebrow-dark">04 / Living reimagined</p><h2 id="pv-gallery-title">Refined interiors.<br /><em>A wider perspective.</em></h2></div><p>Explore the living spaces and panoramic outlook presented in the Palam View brochure.<span>Select an image to view it in full.</span></p></div><ProjectGallery images={palamViewGallery} project="Palam View" imageNote="Conceptual visuals from the Palam View brochure. Plans and specifications are subject to change." /></div></section>

    <section className="section-pad pc-location" id="location" aria-labelledby="pv-location-title"><div className="container">
      <div className="pc-split"><div><p className="eyebrow">05 / A connected address</p><h2 id="pv-location-title">Within Palam City.<br /><em>Connected to Haldwani.</em></h2><p>Palam View is located in Palam City, opposite Pal Skoda, Dewalchaur, Rampur Road, Haldwani, District Nainital, Uttarakhand 263139.</p><a className="pc-explore" href={palamCity}>Explore the wider Palam City community <ArrowUpRight size={20} /></a><dl className="pv-distances">{palamViewDistances.map(([place, distance]) => <div key={place}><dt>{place}</dt><dd>{distance}</dd></div>)}</dl><p className="pv-small-note">Distances shown are those listed in the brochure.</p></div>
        <figure className="pv-location-map"><a href={imageUrl(map)} target="_blank" rel="noopener noreferrer" aria-label="Open the Palam View brochure location map"><ResponsiveImage src={map} alt="Illustrated brochure map locating Palam View within Palam City near the police station and Pal Skoda" sizes="(max-width: 800px) 100vw, 50vw" /><span>Explore the location map <MoveUpRight size={18} /></span></a><figcaption>Illustrated location map from the brochure; not to scale.</figcaption></figure>
      </div>
    </div></section>

    <section className="section-pad pc-faq" id="pv-faq" aria-labelledby="pv-faq-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">06 / Good to know</p><h2 id="pv-faq-title">Your questions,<br /><em>answered.</em></h2></div><div>{palamViewFaqs.map(([question, answer]) => <details className="pc-detail" key={question}><summary><h3>{question}</h3><Plus className="pc-plus" size={20} aria-hidden="true" /></summary><p>{answer}</p></details>)}</div></div></section>

    <section className="section-pad pc-contact" id="contact" aria-labelledby="pv-contact-title"><div className="container pc-split"><div><p className="eyebrow eyebrow-dark">07 / Start a conversation</p><h2 id="pv-contact-title">A home of your own.<br /><em>Come take a closer look.</em></h2><p>Speak with Pal Colonisers about Palam View and arrange your site visit.</p><a className="button button-green" href="/contact">Arrange a site visit <ArrowUpRight size={18} /></a></div><address><div><MapPin size={23} aria-hidden="true" /><div><span>Pal Colonisers Pvt. Ltd.</span><p>Palam City, Opposite Pal Skoda, Dewalchaur, Rampur Road, Haldwani, District Nainital, Uttarakhand 263139</p><a href="https://www.google.com/maps/search/?api=1&query=Palam+City+Dewalchaur+Rampur+Road+Haldwani+263139" target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={16} /></a></div></div><div><Phone size={22} aria-hidden="true" /><div><span>Call us</span><a href="tel:+919045599277">+91 90455 99277</a></div></div></address></div></section>

    <section className="section-pad pc-related" aria-labelledby="pv-related-title"><div className="container"><p className="eyebrow eyebrow-dark">Explore more</p><h2 id="pv-related-title">More places.<br /><em>The same commitment.</em></h2><p>Explore more of <a href={colonisers}>Pal Colonisers' residential projects</a>, or discover the story of <a href="/about/the-pal-group">SM Pal Group</a>.</p><div className="pc-project-links">{routeGroups.colonisers.filter(item => item.href !== palamViewSeo.path).map(item => <a key={item.href} href={item.href}>{item.label}<ArrowUpRight size={20} /></a>)}</div><p className="pv-brochure-note">{palamViewNote}</p></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqSchema(palamViewFaqs)) }} />
  </div>;
}
