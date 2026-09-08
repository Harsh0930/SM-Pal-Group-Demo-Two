import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import React, { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Languages,
  Menu,
  X,
} from "lucide-react";
import Footer from "../../components/Footer.jsx";
import CursorGrid from "../../components/CursorGrid.jsx";
import { routeGroups } from "../../data/navigation.js";
import { heroImages, stories, awards, news } from "../../data/homeContent.js";
import { businesses } from "../../data/businesses.js";
import { insights, legacyMoments, journeyStages } from "../../data/aboutContent.js";
import { usePageSeo, buildFaqSchema } from "../../hooks/usePageSeo.js";

import { setHeadMeta, AboutSeo, PalGroupSeo, OwnershipSeo, BoardSeo, PrateekSeo, PalFreshSeo, PalFreshGlobalSeo, FrozzoSeo, PalSkodaSeo, PalNissanSeo, PalFordSeo, PalStoneSeo } from '../PageSeo.jsx';
import { RouteHeader, LegacyWall, ContactSection } from '../PageShared.jsx';
import { businessRoutes } from '../../data/routes.js';

function PalStoneIndustriesPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".pal-stone-page .reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("is-visible"),
        ),
      { threshold: 0.12 },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const materials = {
    natural: [
      { size: "8 mm" },
      { size: "10 mm" },
      { size: "20 mm" },
      { size: "Pea gravel" },
    ],
    crushed: [
      { size: "10 mm" },
      { size: "20 mm" },
      { size: "40 mm" },
      { size: "65 mm" },
      { size: "Crushed sand" },
    ],
  };

  const whyChoose = [
    {
      title: "Track record since 1982",
      text: "Decades of experience including work with major clients like Indian Railways.",
    },
    {
      title: "Full material range",
      text: "From natural aggregate to crushed stone and sand, all sourced from one supplier.",
    },
    {
      title: "Genuine sustainability commitment",
      text: "Not an afterthought bolted onto an existing product line, but built into our approach.",
    },
    {
      title: "Backed by SM Pal Group",
      text: "A diversified group with over four decades of operating history across multiple verticals.",
    },
  ];

  const faqs = [
    [
      "What is Pal Stone Industries?",
      "Pal Stone Industries is SM Pal Group's founding business, established in 1982, supplying natural and crushed stone, grit, and sand for construction and infrastructure projects.",
    ],
    [
      "What materials does Pal Stone Industries supply?",
      "Pal Stone Industries supplies natural materials in 8 mm, 10 mm, and 20 mm sizes along with pea gravel, as well as crushed stone in 10 mm, 20 mm, 40 mm, and 65 mm sizes and crushed sand.",
    ],
    [
      "What major projects has Pal Stone Industries worked on?",
      "Pal Stone Industries has supplied stone and grit to Indian Railways and carried out civil works for the Gokul Dam Project, two of the milestones that shaped the business's growth.",
    ],
    [
      "Does Pal Stone Industries offer sustainable materials?",
      "Yes. Pal Stone Industries has expanded into eco-friendly and sustainable stone solutions to meet growing demand for environmentally conscious construction practices.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Vertical", label: "SM Pal Group", href: "/about/the-pal-group" },
    { eyebrow: "Vertical", label: "Pal Frozen Foods", href: "/about/the-pal-group" },
    { eyebrow: "Vertical", label: "Pal Farms", href: "/industries/pal-farms" },
    { eyebrow: "Real Estate", label: "Pal Colonisers", href: "/industries/pal-colonisers/pal-sumeera-residency" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  const materialSvgs = [
    // Natural stone
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M12 68 L18 32 L62 28 L72 68 Z" fill="#9E9E9E" />
        <path d="M18 32 L28 40 L58 38 L62 28" fill="#757575" />
        <path d="M28 40 L38 48 L54 46 L58 38" fill="#BDBDBD" />
        <ellipse cx="40" cy="30" rx="8" ry="4" fill="#616161" />
        <path d="M32 32 Q40 22 48 32" stroke="#424242" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    // Crushed stone
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M14 66 L22 34 L58 30 L70 66 Z" fill="#8D6E63" />
        <path d="M22 34 L32 44 L54 40 L58 30" fill="#6D4C41" />
        <circle cx="30" cy="42" r="3" fill="#5D4037" />
        <circle cx="42" cy="38" r="2.5" fill="#6D4C41" />
        <circle cx="50" cy="44" r="2" fill="#8D6E63" />
        <path d="M26 48 L34 48 M38 52 L46 52" stroke="#4E342E" strokeWidth="1.5" />
      </svg>
    ),
    // Crushed sand
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="58" rx="28" ry="14" fill="#BCAAA4" />
        <ellipse cx="40" cy="56" rx="24" ry="10" fill="#A1887F" />
        <circle cx="30" cy="52" r="1.5" fill="#8D6E63" />
        <circle cx="44" cy="50" r="1" fill="#8D6E63" />
        <circle cx="54" cy="54" r="1.5" fill="#6D4C41" />
        <circle cx="36" cy="48" r="1" fill="#8D6E63" />
        <circle cx="48" cy="46" r="1" fill="#6D4C41" />
        <circle cx="52" cy="58" r="1" fill="#8D6E63" />
      </svg>
    ),
    // Stone processing
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="16" y="28" width="48" height="36" rx="4" fill="#78909C" />
        <rect x="22" y="34" width="36" height="24" rx="2" fill="#546E7A" />
        <rect x="26" y="38" width="28" height="16" rx="1" fill="#90A4AE" />
        <circle cx="40" cy="46" r="4" fill="#455A64" />
        <path d="M32 50 L32 60 M40 50 L40 60 M48 50 L48 60" stroke="#455A64" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  ];

  return (
    <div className="route-page industry-brand pal-stone-page">
      <PalStoneSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="ps-hero mobile-photo-hero">
          <ResponsiveImage
            src="/assets/hero-gradient-images/pal-stone-industries-gradient.jpeg"
            alt="Pal Stone Industries premium stone and grit quarry"
          />
          <div className="ps-hero-shade" />
          <div className="container ps-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Pal Stone Industries,
              <br />
              <em>premium stone and grit since 1982.</em>
            </h1>
            <p className="ps-hero-intro">
              Pal Stone Industries has been supplying quality stone and grit since 1982, the founding business behind what eventually grew into SM Pal Group. From a single stone crushing operation, it has grown into a trusted supplier for some of the region's largest infrastructure projects, without losing sight of the material quality that built its reputation in the first place.
            </p>
            <div className="ps-hero-actions">
              <a className="button button-brass" href="#ps-materials">
                Explore materials <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="ps-hero-mark">
            <strong>1982</strong>
            <p>Founding business of SM Pal Group</p>
          </div>
        </section>

        {/* About Pal Stone Industries */}
        <section className="ps-about section-pad" id="ps-about">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>01</span>
              <i />
              <span>About Pal Stone Industries</span>
            </div>
            <div className="ps-about-grid reveal">
              <div className="ps-about-copy">
                <h2>
                  From a single quarry
                  <br />
                  <em>to major infrastructure.</em>
                </h2>
                <p className="large-copy">
                  Pal Stone Industries was established in 1982 as the first venture of what would become SM Pal Group, starting with a focus on supplying stone and grit. You can read the fuller story behind the group's founding on our <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a> and <a className="inline-link" href="/about/ownership">Owner-Chairman</a> pages. Here, we will focus on what Pal Stone Industries actually does today, the materials it supplies and the projects it supports.
                </p>
                <p>
                  Pal Stone Industries' growth turned a corner when it secured a contract to supply stone and grit to <strong>Indian Railways</strong>, a project that proved the business could meet the demands of large-scale, high-standard infrastructure work. That success opened the door to further diversification, including civil works for the <strong>Gokul Dam Project</strong>, one of the region's significant infrastructure undertakings.
                </p>
                <p>
                  In the years since, Pal Stone Industries has steadily expanded its operations and capacity, building the kind of track record that comes only from consistently delivering on large projects, not just winning them.
                </p>
              </div>
              <aside className="ps-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a>
                <p>The diversified group behind Pal Stone Industries, with over four decades of operating history across stone, frozen foods, real estate, and automobile dealerships.</p>
                <div className="ps-about-line" />
                <small>Founding business since <strong>1982</strong>.</small>
              </aside>
            </div>
          </div>
        </section>

        {/* Our stone and grit materials */}
        <section className="ps-materials section-pad" id="ps-materials">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>02</span>
              <i />
              <span>Our stone and grit materials</span>
            </div>
            <div className="ps-section-intro reveal">
              <h2>
                Natural and crushed options
                <br />
                <em>under one supplier.</em>
              </h2>
              <p className="large-copy">
                Pal Stone Industries supplies both natural and crushed materials, giving construction and infrastructure clients the range they need for different project requirements.
              </p>
            </div>
            <div className="ps-materials-grid">
              <article className="ps-material-card reveal">
                <div className="ps-material-icon" aria-hidden="true">
                  {materialSvgs[0]}
                </div>
                <h3>Natural materials</h3>
                <ul className="ps-material-list">
                  {materials.natural.map((item, index) => (
                    <li key={index}>{item.size}</li>
                  ))}
                </ul>
              </article>
              <article className="ps-material-card reveal">
                <div className="ps-material-icon" aria-hidden="true">
                  {materialSvgs[1]}
                </div>
                <h3>Crushed materials</h3>
                <ul className="ps-material-list">
                  {materials.crushed.slice(0, 4).map((item, index) => (
                    <li key={index}>{item.size}</li>
                  ))}
                </ul>
              </article>
              <article className="ps-material-card reveal">
                <div className="ps-material-icon" aria-hidden="true">
                  {materialSvgs[2]}
                </div>
                <h3>Crushed sand</h3>
                <ul className="ps-material-list">
                  <li>{materials.crushed[4].size}</li>
                </ul>
              </article>
            </div>
            <p className="ps-materials-note">
              Having both natural and crushed options under one supplier means clients working across multiple project requirements, from fine aggregate to larger stone, can source consistently from Pal Stone Industries rather than juggling multiple vendors.
            </p>
          </div>
        </section>

        {/* Sustainable stone solutions */}
        <section className="ps-sustainable section-pad" id="ps-sustainable">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>03</span>
              <i />
              <span>Committed to sustainable stone solutions</span>
            </div>
            <div className="ps-sustainable-grid reveal">
              <div className="ps-sustainable-copy">
                <h2>
                  Construction moves forward.
                  <br />
                  <em>Our materials move with it.</em>
                </h2>
                <p className="large-copy">
                  As construction increasingly moves toward environmentally conscious practices, Pal Stone Industries has expanded into eco-friendly and sustainable stone solutions to meet that demand.
                </p>
                <p>
                  Backed by advanced technology and a dedicated team, the business continues investing in ways to supply quality materials without ignoring the environmental cost of getting there.
                </p>
              </div>
              <div className="ps-sustainable-visual" aria-hidden="true">
                {materialSvgs[3]}
              </div>
            </div>
          </div>
        </section>

        {/* Built for large-scale infrastructure */}
        <section className="ps-infrastructure section-pad" id="ps-infrastructure">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>04</span>
              <i />
              <span>Built for large-scale infrastructure</span>
            </div>
            <div className="ps-infrastructure-grid reveal">
              <div className="ps-infrastructure-copy">
                <h2>
                  The same standard
                  <br />
                  <em>for every project.</em>
                </h2>
                <p className="large-copy">
                  Pal Stone Industries' work with Indian Railways and the Gokul Dam Project reflects the kind of standard the business is built around, consistent quality at a scale that matters for national infrastructure, not just local construction.
                </p>
                <p>
                  That same standard carries through to every client the business works with today, regardless of project size.
                </p>
              </div>
              <div className="ps-infrastructure-highlights">
                <div className="ps-highlight reveal">
                  <span className="ps-highlight-label">Indian Railways</span>
                  <p className="ps-highlight-text">Stone and grit supply for railway infrastructure</p>
                </div>
                <div className="ps-highlight reveal">
                  <span className="ps-highlight-label">Gokul Dam Project</span>
                  <p className="ps-highlight-text">Civil works for major regional infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Pal Stone Industries */}
        <section className="ps-why section-pad" id="ps-why">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>05</span>
              <i />
              <span>Why choose Pal Stone Industries</span>
            </div>
            <div className="ps-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Pal Stone apart.</em>
              </h2>
            </div>
            <div className="ps-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="ps-why-card reveal"
                  key={reason.title}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <h3>{reason.title}</h3>
                  <p>{reason.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="ps-faq section-pad" id="ps-faq">
          <div className="container faq-grid">
            <div className="reveal">
              <p className="eyebrow eyebrow-dark">Frequently asked questions</p>
              <h2>
                Helpful answers,
                <br />
                <em>at a glance.</em>
              </h2>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details className="faq-item reveal" key={question}>
                  <summary>
                    {question}
                    <ArrowDownRight size={18} />
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact/Visit */}
        <section className="ps-contact section-pad" id="ps-contact">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>06</span>
              <i />
              <span>Visit or contact Pal Stone Industries</span>
            </div>
            <div className="ps-contact-grid reveal">
              <aside className="ps-contact-facts">
                <div className="ps-contact-fact">
                  <span>01</span>
                  <strong>Address</strong>
                  <p>Palam City, Devalchaur<br />Opposite Pal Ford, Rampur Road<br />Haldwani, 263139</p>
                </div>
                <div className="ps-contact-fact">
                  <span>02</span>
                  <strong>Phone</strong>
                  <a href="tel:+919045599277">+91 90455 99277</a>
                </div>
                <div className="ps-contact-fact">
                  <span>03</span>
                  <strong>Email</strong>
                  <a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a>
                </div>
              </aside>
              <div className="ps-contact-copy">
                <p className="eyebrow eyebrow-dark">Reach out</p>
                <h2>
                  to our
                  <br />
                  <em>team.</em>
                </h2>
                <p className="large-copy">
                  Reach out to Pal Stone Industries directly using the details above, or start a conversation with our team to discuss your project requirements.
                </p>
                <a className="button button-brass ps-contact-cta" href="/contact">
                  Start a conversation <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="ps-explore section-pad">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>07</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="ps-explore-intro reveal">
              <p className="large-copy">
                To see where Pal Stone Industries fits into the wider group, visit our <a className="inline-link" href="/about/the-pal-group">SM Pal Group page</a>, or explore <a className="inline-link" href="/industries/pal-colonisers/pal-sumeera-residency">Pal Colonisers</a> to see how the group's real estate projects draw on the same construction expertise. You can also read the founder's story on our <a className="inline-link" href="/about/ownership">Owner-Chairman page</a>.
              </p>
            </div>
            <div className="ps-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="ps-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="ps-explore-card-top">
                    <span className="ps-explore-eyebrow">{item.eyebrow}</span>
                    <span className="ps-explore-label">{item.label}</span>
                  </div>
                  <span className="ps-explore-arrow" aria-hidden="true">
                    <ArrowUpRight size={16} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default PalStoneIndustriesPage;
