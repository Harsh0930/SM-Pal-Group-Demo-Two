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

function OwnershipPage({ page }) {
  const ownershipFaqs = [
    [
      "Who is the owner of SM Pal Group?",
      "Shri Suresh Pal is the owner and chairman of SM Pal Group. He founded the company in 1982 and continues to lead it today.",
    ],
    [
      "When did Shri Suresh Pal found SM Pal Group?",
      "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, starting with a stone supply business that later grew into a group spanning real estate, automobiles, and frozen foods.",
    ],
    [
      "What businesses has Shri Suresh Pal built under SM Pal Group?",
      "Shri Suresh Pal has built Pal Stone Industries, Pal Colonisers, a network of car dealerships, and Pal Frozen Foods, each reflecting a different stage of his entrepreneurial journey since 1982.",
    ],
    [
      "What is Shri Suresh Pal's vision for SM Pal Group?",
      "Shri Suresh Pal's guiding vision is transforming lives for a better future, a philosophy that shapes SM Pal Group's culture of collaboration, trust, and community focused growth.",
    ],
  ];

  const journeyChapters = [
    {
      name: "Pal Stone Industries",
      sub: "Where it all began",
      href: "/industries/pal-stone-industries",
      text: "Pal Stone Industries was Shri Suresh Pal's first venture, founded in 1982 as a supplier of stone and grit from a crushing unit in Haldwani. It grew to serve major clients, including Indian Railways and the Gokul Dam Project, and it remains the foundation that the rest of the group was built on.",
    },
    {
      name: "Pal Colonisers",
      sub: "Bringing organized living to Kumaon",
      href: "/about#business-verticals",
      text: "As Haldwani grew, Shri Suresh Pal saw a need for well planned, modern housing in the region. That led to Pal Colonisers, which has since delivered residential projects including Pal Sumeera Residency and Palam City, built around the idea that people deserve organized, dependable living spaces, not just buildings.",
    },
    {
      name: "Car Dealerships",
      sub: "Bringing trusted brands to Haldwani",
      href: "/industries/car-dealerships/pal-skoda-haldwani",
      text: "Shri Suresh Pal later expanded into the automotive sector, building a dealership network under Car Dealerships, including Pal Skoda Haldwani, Pal Nissan Haldwani, and Pal Ford Haldwani. The goal was simple: bring the same trust the group had earned in stone and real estate into car buying and after-sales service.",
    },
    {
      name: "Pal Frozen Foods",
      sub: "Supporting farmers and families",
      href: "/industries/pal-frozen-foods/pal-fresh",
      text: "With Pal Frozen Foods, Shri Suresh Pal took the group into food, launching Pal Fresh frozen vegetables and Frozzo frozen snacks. This venture carries a community focus as well, supporting local farmers and sustainable agricultural practices so the group's growth benefits the wider region, not just its own bottom line.",
    },
  ];

  const progressAreas = [
    {
      title: "Technology",
      text: "From high tech stone crushing machinery to advanced infrastructure and freezing technologies, we are dedicated to using technology to raise the bar in everything we do.",
    },
    {
      title: "Innovation",
      text: "By encouraging creativity and new ideas across our teams, we have been able to sharpen our operations and deliver a better experience for every customer.",
    },
    {
      title: "Our people",
      text: "Our employees are at the heart of our success. Prioritizing their growth through training and continuous learning strengthens our team and lifts morale across the group.",
    },
    {
      title: "Expansion",
      text: "We have refined our real estate strategies, grown our automotive dealership network with globally renowned brands like Skoda, Nissan, and Ford, and expanded our frozen food offerings to meet the needs of a modern generation.",
    },
  ];

  const exploreMore = [
    { label: "Our full story", href: "/about" },
    { label: "The Pal Group", href: "/about/the-pal-group" },
    { label: "Board of Directors", href: "/about/board-of-directors" },
    { label: "Contact our team", href: "/contact" },
    { label: "Awards & Recognition", href: "/#awards" },
  ];

  // Named areas keep the photographs and text tiles aligned at each breakpoint.
  const ownerMoments = [
    {
      // 7008x4672 landscape — founder in his office
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen.webp",
      alt: "Shri Suresh Pal seated at his office desk, the founder of SM Pal Group",
      caption: "At the foundation of the group",
      area: "founder",
      span: "wide",
    },
    {
      // 3008x4512 portrait — at the modern office desk, checkered white shirt
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 4.webp",
      alt: "Shri Suresh Pal at his modern office desk",
      caption: "Where the work still happens",
      area: "office",
      span: "tall",
    },
    {
      // 5504x8256 portrait — award ceremony portrait
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen (2).webp",
      alt: "Shri Suresh Pal receiving an award on stage",
      caption: "Recognising industry leadership",
      area: "award",
      span: "tall",
    },
    {
      type: "stat",
      area: "stat",
      span: "square",
      number: "45+",
      label: "Years of Legacy",
      sub: "",
    },
    {
      // 1200x800 landscape — armchair formal portrait
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 6.webp",
      alt: "Shri Suresh Pal in a formal suit, seated in an armchair",
      caption: "Four decades in the frame",
      area: "formal",
      span: "square",
    },
    {
      // Founder's quote — given a WIDE cell so the full text fits without overflow
      type: "quote",
      area: "quote",
      span: "wide",
      text: "I have never believed in building for myself. I have always believed in building for the people around me.",
      cite: "Shri Suresh Pal",
    },
    {
      // 3008x4512 portrait — speaking on stage with microphone
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 5.webp",
      alt: "Shri Suresh Pal addressing an audience on stage",
      caption: "Addressing the people he leads",
      area: "stage",
      span: "square",
    },
    {
      // 5504x8256 portrait — armchair suit, smiling warmly
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 3.webp",
      alt: "Shri Suresh Pal in a suit, smiling in an armchair",
      caption: "With the people behind the work",
      area: "portrait",
      span: "square",
    },
  ];

  return (
    <div className="route-page ownership-page">
      <a className="skip-link" href="#ownership-main">Skip to content</a>
      <OwnershipSeo />
      <RouteHeader />
      <main id="ownership-main">
        <section className="own-hero mobile-photo-hero portrait-hero">
          <ResponsiveImage src={page.image} alt="Shri Suresh Pal, Founder and Chairman of SM Pal Group" fetchPriority="high" />
          <div className="own-hero-shade" />
          <div className="container own-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>Shri Suresh Pal, <em>owner and chairman of SM Pal Group</em></h1>
            <p className="own-hero-intro">{page.intro}</p>
            <a className="text-link ownership-hero-link" href="#journey">Explore his journey <ArrowDownRight size={17} /></a>
          </div>
        </section>

        <section className="own-who section-pad" id="who">
          <div className="container">
            <div className="own-section-label reveal">
              <span>01</span>
              <i />
              <span>Who is Shri Suresh Pal?</span>
            </div>
            <div className="own-who-grid">
              <div className="own-who-copy reveal">
                <h2>
                  A founder who
                  <br />
                  <em>still shows up.</em>
                </h2>
                <p className="large-copy">
                  Shri Suresh Pal is the founder, owner, and chairman of SM Pal Group, based in Haldwani, Uttarakhand. He started the group in 1982 with a single stone supply venture and has since guided it into several industries, always with the same hands on, people first approach he started with.
                </p>
                <p>
                  His leadership style has stayed consistent even as the group has grown. He is known for staying closely involved in each business under SM Pal Group, rather than stepping back once a venture finds its footing. That involvement is a big part of why the group's businesses share such a consistent standard of quality, even across very different industries.
                </p>
              </div>
              <aside className="own-who-note reveal">
                <span className="legacy-number">45+</span>
                <span className="legacy-label">Years of Legacy</span>
                <p>at SM Pal Group, from the same founding city of Haldwani.</p>
                <div className="own-who-line" />
                <small>Founder, Owner, and Chairman, SM Pal Group</small>
              </aside>
            </div>
          </div>
        </section>

        <section className="own-journey section-pad" id="journey">
          <div className="container">
            <div className="own-section-label reveal">
              <span>02</span>
              <i />
              <span>Shri Suresh Pal's journey through SM Pal Group's businesses</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                Each business, a
                <br />
                <em>chapter of the journey.</em>
              </h2>
              <p className="large-copy">
                Each business under SM Pal Group reflects a different chapter of Shri Suresh Pal's entrepreneurial journey. Here is how that journey unfolded.
              </p>
            </div>
            <div className="own-journey-grid">
              {journeyChapters.map((chapter, index) => (
                <article
                  className="own-journey-card reveal"
                  key={chapter.name}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <p className="own-journey-sub">{chapter.sub}</p>
                  <h3>{chapter.name}</h3>
                  <p className="own-journey-text">{chapter.text}</p>
                  <a className="text-link ownership-chapter-link" href={chapter.href}>Explore {chapter.name} <ArrowUpRight size={17} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="own-vision section-pad" id="vision">
          <div className="container">
            <div className="own-section-label reveal">
              <span>03</span>
              <i />
              <span>His vision</span>
            </div>
            <div className="own-vision-grid reveal">
              <div>
                <p className="eyebrow eyebrow-dark">His guiding philosophy</p>
                <h2>
                  Transforming lives
                  <br />
                  <em>for a better future.</em>
                </h2>
              </div>
              <div className="own-vision-copy">
                <p className="large-copy">
                  Shri Suresh Pal describes his guiding philosophy in five words: <em>transforming lives for a better future</em>. That vision shows up in how he runs every business under SM Pal Group, not just in how the company talks about itself.
                </p>
                <p>
                  Under his leadership, SM Pal Group has built a culture centered on collaboration, trust, and participation. You can read more about the values that guide this culture, including people first thinking and a strong customer centric approach, on our <a href="/about/the-pal-group">SM Pal Group</a> page.
                </p>
                <a className="text-link" href="/about/the-pal-group">
                  See the wider Pal Group family <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Owner moments and milestones (image tile) */}
        <section className="own-moments section-pad" id="moments">
          <div className="container">
            <div className="own-section-label reveal">
              <span>04</span>
              <i />
              <span>Owner moments and milestones</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                Four decades
                <br />
                <em>in the frame.</em>
              </h2>
              <p className="large-copy">
                A look at some of the moments, meetings, and milestones that have shaped Shri Suresh Pal&apos;s journey and SM Pal Group&apos;s story along the way.
              </p>
            </div>
            <div className="own-moments-grid">
              {ownerMoments.map((moment, index) => {
                if (moment.type === "image") {
                  return (
                    <figure
                      className={`own-moment-tile own-moment-${moment.span} reveal`}
                      data-moment={moment.area}
                      key={moment.caption}
                      style={{ "--delay": `${index * 60}ms`, "--moment-area": moment.area }}
                    >
                      <ResponsiveImage src={moment.src} alt={moment.alt} loading="lazy" decoding="async" />
                    </figure>
                  );
                }
                if (moment.type === "stat") {
                  return (
                    <div
                      className={`own-moment-tile own-moment-stat own-moment-${moment.span} reveal`}
                      key={`stat-${moment.number}`}
                      style={{ "--delay": `${index * 60}ms`, "--moment-area": moment.area }}
                    >
                      <span className="own-moment-stat-number">{moment.number}</span>
                      {moment.label ? (
                        <span className="own-moment-stat-label">{moment.label}</span>
                      ) : null}
                      {moment.sub ? (
                        <p className="own-moment-stat-sub">{moment.sub}</p>
                      ) : null}
                    </div>
                  );
                }
                return (
                  <blockquote
                    className={`own-moment-tile own-moment-quote own-moment-${moment.span} reveal`}
                    key={`quote-${moment.cite}`}
                    style={{ "--delay": `${index * 60}ms`, "--moment-area": moment.area }}
                  >
                    <span className="own-moment-quote-mark" aria-hidden="true">"</span>
                    <p>{moment.text}</p>
                    <cite>— {moment.cite}</cite>
                  </blockquote>
                );
              })}
            </div>
          </div>
        </section>

        <section className="own-next-gen section-pad" id="next-generation">
          <div className="container">
            <div className="own-section-label reveal">
              <span>05</span>
              <i />
              <span>A message from the next generation of SM Pal Group</span>
            </div>
            <div className="ownership-message-grid">
            <div className="ownership-message-intro reveal">
              <h2>A lasting legacy.<br /><em>A shared future.</em></h2>
              <a className="text-link" href="/about/prateek-pal">Meet Prateek Pal <ArrowUpRight size={17} /></a>
            </div>
            <div className="own-next-gen-card">
              <div className="own-next-gen-mark" aria-hidden="true">"</div>
              <p>
                For over four decades, SM Pal Group has stood as a pillar of trust and excellence, a legacy initiated by my father, Shri Suresh Pal, in 1982. I am honored to carry on his people-first vision and build on the solid foundation he laid, and I am committed to leading SM Pal Group to continued success.
              </p>
              <p>
                Every day, I feel the weight and the warmth of the legacy my father built. Our journey from the stone industry to diverse ventures in real estate, frozen foods, and automobiles is a reflection of our commitment to values and innovation. But beyond the milestones and the expansion, it is the impact we make on people's lives that truly matters to me. That thought is what pushes me to build a workplace that is supportive, inclusive, and ethical, where every team member feels valued and empowered. Maintaining this legacy is both a privilege and a responsibility, a chance to shape a better future and take our group to new heights.
              </p>
              <p>
                Our evolution is more than growth. It is a reflection of our commitment to staying connected with our values while we embrace the future. Here are four things driving that progress across all four of our verticals today.
              </p>
              <div className="own-progress-grid">
                {progressAreas.map((area, index) => (
                  <div className="own-progress-card" key={area.title}>
                    <span>0{index + 1}</span>
                    <h3>{area.title}</h3>
                    <p>{area.text}</p>
                  </div>
                ))}
              </div>
              <p>
                Success, to me, is about more than milestones. It is about honoring the journey, the challenges, the triumphs, and most importantly, the people who make it all possible. Together, we are building a future that reflects our shared values and our shared aspirations.
              </p>
            </div>
            </div>
            <div className="own-next-gen-cta reveal">
              <p>
                Interested in the broader story of the group?{' '}
                <a href="/about/the-pal-group">Explore the Pal Group family</a>
                {' '}or{' '}
                <a href="/about">learn more about the group</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="own-faq section-pad">
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
              {ownershipFaqs.map(([question, answer]) => (
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

        <section className="own-explore section-pad">
          <div className="container">
            <div className="own-section-label reveal">
              <span>06</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="own-explore-intro reveal">
              <h2>
                See the fuller
                <br />
                <em>picture of the group.</em>
              </h2>
            </div>
            <div className="own-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="own-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={20} />
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


export default OwnershipPage;
