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

function PrateekPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".prateek-page .reveal");
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

  const prateekFaqs = [
    [
      "What is Prateek Pal's role at SM Pal Group?",
      "Prateek Pal is a director at SM Pal Group, where he has led the expansion of Pal Frozen Foods into the Pal Fresh and Frozzo brands, and guided Pal Colonisers into apartment construction for the first time.",
    ],
    [
      "What inspired Prateek Pal's work with Pal Frozen Foods?",
      "Prateek Pal's move to expand Pal Frozen Foods came from time spent studying in Europe, where he saw rising demand for convenience food and brought that insight back to grow the business beyond frozen peas.",
    ],
    [
      "Has Prateek Pal expanded SM Pal Group internationally?",
      "Yes. Under his leadership, SM Pal Group's frozen food business moved into international markets, work that continues through Pal Fresh Global Trading LLC.",
    ],
  ];

  const prateekContributions = [
    {
      sub: "Frozen foods",
      name: "Pal Fresh and Frozzo",
      text: "Expanded Pal Frozen Foods from a single frozen peas product into two brands covering frozen vegetables and snacks, sold domestically and internationally.",
      href: "/industries/pal-frozen-foods/pal-fresh",
    },
    {
      sub: "International trade",
      name: "Pal Fresh Global Trading LLC",
      text: "Led the frozen foods business into international markets under the Pal Fresh Global Trading LLC banner.",
      href: "/industries/pal-fresh-global-trading",
    },
    {
      sub: "Real estate",
      name: "Pal Colonisers — apartment living",
      text: "Expanded Pal Colonisers into apartment buildings for the first time, bringing a new housing option to the region.",
      href: "/industries/pal-colonisers/pal-sumeera-residency",
    },
    {
      sub: "Operations",
      name: "Group-wide modernisation",
      text: "Invested in advanced food processing machinery, upgraded project amenities, and introduced automated data systems across operations.",
      href: "/about/the-pal-group",
    },
  ];

  const prateekExploreMore = [
    { label: "Owner-Chairman", href: "/about/ownership" },
    { label: "Board of Directors", href: "/about/board-of-directors" },
    { label: "SM Pal Group", href: "/about/the-pal-group" },
    { label: "Our Team", href: "/contact" },
  ];

  const prateekMilestones = [
    {
      year: "2019",
      title: "First steps into the business",
      text: "Joined SM Pal Group while still studying in Europe, beginning to apply what he was learning abroad to the family business back home.",
      image: "/assets/prateek-pal-images/prateek-pal-journey.webp",
      imageAlt: "Portrait of Prateek Pal",
      imagePosition: "50% top",
      align: "left",
    },
    {
      year: "2013",
      title: "Convenience food, reimagined",
      text: "Studied the European food and beverage sector closely, then brought back the insight that became the foundation for Pal Fresh and Frozzo.",
      image: "/assets/prateek-pal-images/pal-fresh-journey.webp",
      imageAlt: "A visit to the Pal Fresh food production facility",
      align: "right",
    },
    {
      year: "2025",
      title: "Pal Colonisers goes vertical",
      text: "Led the move into apartment construction for the first time, opening a new kind of housing for buyers in the region.",
      image: "/assets/prateek-pal-images/palamview-connected-journey.webp",
      imageAlt: "Architectural rendering of Palam View Residences",
      imagePosition: "left center",
      align: "left",
    },
    {
      year: "2025",
      title: "Crossing borders",
      text: "Took the frozen foods business international through Pal Fresh Global Trading LLC, expanding reach well beyond the home market.",
      image: "/assets/prateek-pal-images/ship-ocean-container.webp",
      imageAlt: "Aerial view of container ships and cargo at a port",
      align: "right",
    },
  ];

  return (
    <div className="route-page prateek-page">
      <a className="skip-link" href="#prateek-main">Skip to content</a>
      <PrateekSeo />
      <RouteHeader />
      <main id="prateek-main">
        {/* Hero */}
        <section className="own-hero mobile-photo-hero portrait-hero">
          <ResponsiveImage src={page.image} alt="Prateek Pal, Director at SM Pal Group" fetchPriority="high" />
          <div className="own-hero-shade" />
          <div className="container own-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>Prateek Pal, <em>director at SM Pal Group</em></h1>
            <p className="own-hero-intro">{page.intro}</p>
            <a className="text-link prateek-hero-link" href="#contributions">Explore his work <ArrowDownRight size={17} /></a>
          </div>
        </section>

        {/* 01 — Who is Prateek Pal */}
        <section className="own-who section-pad" id="who">
          <div className="container">
            <div className="own-section-label reveal">
              <span>01</span>
              <i />
              <span>Who is Prateek Pal?</span>
            </div>
            <div className="own-who-grid">
              <div className="own-who-copy reveal">
                <h2>
                  Leading the next
                  <br />
                  <em>chapter of growth.</em>
                </h2>
                <p className="large-copy">{page.body}</p>
                <p>
                  You can read more about the family&apos;s wider leadership on our{" "}
                  <a className="inline-link" href="/about/ownership">Owner-Chairman</a> and{" "}
                  <a className="inline-link" href="/about/board-of-directors">Board of Directors</a> pages.
                </p>
              </div>
              <aside className="own-who-note reveal">
                <span className="legacy-label">Next generation</span>
                <p>Carrying forward the family&apos;s vision for growth and innovation.</p>
                <div className="own-who-line" />
                <small>Director, SM Pal Group</small>
              </aside>
            </div>
          </div>
        </section>

        {/* 02 — A vision shaped in Europe */}
        <section className="own-vision section-pad" id="vision">
          <div className="container">
            <div className="own-section-label reveal">
              <span>02</span>
              <i />
              <span>A vision shaped in Europe</span>
            </div>
            <div className="own-vision-grid reveal">
              <div>
                <p className="eyebrow eyebrow-dark">Where it started</p>
                <h2>
                  One observation,
                  <br />
                  <em>many possibilities.</em>
                </h2>
              </div>
              <div className="own-vision-copy">
                <p className="large-copy">
                  One of the more interesting parts of Prateek Pal&apos;s story is where it started. While studying in Europe, he noticed how much demand was building for convenience food, especially in the food and beverage sector.
                </p>
                <p>
                  That observation stuck with him, and it became the starting point for a real shift in how SM Pal Group approached frozen food back home.
                </p>
                <a className="text-link" href="/industries/pal-frozen-foods/pal-fresh">
                  Explore Pal Frozen Foods <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Key contributions */}
        <section className="own-journey section-pad" id="contributions">
          <div className="container">
            <div className="own-section-label reveal">
              <span>03</span>
              <i />
              <span>Prateek Pal&apos;s key contributions to SM Pal Group</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                From frozen peas
                <br />
                <em>to new markets entirely.</em>
              </h2>
              <p className="large-copy">
                Pal Frozen Foods was mostly known for one product: frozen peas. Prateek Pal pushed the business well beyond that, and extended the group&apos;s reach into real estate and international trade. Here is a closer look at what that involved.
              </p>
            </div>
            <div className="own-journey-grid">
              {prateekContributions.map((item, index) => (
                <a
                  className="own-journey-card reveal"
                  href={item.href}
                  key={item.name}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <p className="own-journey-sub">{item.sub}</p>
                  <h3>{item.name}</h3>
                  <p className="own-journey-text">{item.text}</p>
                  <span className="prateek-card-link">Explore business <ArrowUpRight size={17} /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — A connected journey (interconnected image tile) */}
        <section className="prateek-timeline section-pad" id="timeline">
          <div className="container">
            <div className="own-section-label reveal">
              <span>04</span>
              <i />
              <span>A connected journey</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                The thread that
                <br />
                <em>runs through it all.</em>
              </h2>
              <p className="large-copy">
                A look at the moments that shaped Prateek Pal&apos;s path at SM Pal Group, from his first steps into the business to taking it international. Together, they reflect the same people first approach.
              </p>
            </div>
            <div className="prateek-timeline-track">
              {prateekMilestones.map((moment, index) => (
                <article
                  className={`prateek-timeline-row prateek-timeline-${moment.align} reveal`}
                  key={moment.year}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <div className="prateek-timeline-image">
                    <ResponsiveImage
                      src={moment.image}
                      alt={moment.imageAlt || moment.title}
                      style={{ objectPosition: moment.imagePosition || "center" }}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="prateek-timeline-year">{moment.year}</span>
                  </div>
                  <div className="prateek-timeline-copy">
                    <h3>{moment.title}</h3>
                    <p>{moment.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — Recognition and quote */}
        <section className="own-next-gen section-pad" id="recognition">
          <div className="container">
            <div className="own-section-label reveal">
              <span>05</span>
              <i />
              <span>Recognition</span>
            </div>
            <div className="prateek-recognition-grid">
              <div className="own-section-intro prateek-recognition-intro reveal">
                <h2>Progress built<br /><em>on people.</em></h2>
                <p className="prateek-recognition-statement">As a community, we agree to grow together. Our team is an illustration of what we can accomplish when a group of people united by a common goal works together.</p>
              </div>
              <div className="own-next-gen-card reveal">
              <p>
                Prateek Pal&apos;s work has extended into SM Pal Group&apos;s car dealerships, where his leadership has been recognised through industry awards tied to the group&apos;s automotive performance — accolades that overlap with the{" "}
                <a className="inline-link" href="/about/ownership">Nissan Global Award and Ford President&apos;s Award of Excellence</a>.
              </p>
              <p>
                That same people first approach he inherited from his father has shaped how he runs every project, every partnership, and every team under his care. It is the thread that runs through all of it.
              </p>
            </div>
            </div>
            <div className="own-next-gen-cta reveal">
              <p>
                Interested in the group&apos;s broader story?{' '}
                <a href="/about/the-pal-group">Explore the Pal Group family</a>
                {' '}or{' '}
                <a href="/about/ownership">read Suresh Pal&apos;s story</a>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
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
              {prateekFaqs.map(([question, answer]) => (
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

        {/* Explore more */}
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
              {prateekExploreMore.map((item, index) => (
                <a
                  className="own-explore-card reveal"
                  href={item.href}
                  key={item.href}
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


export default PrateekPage;
