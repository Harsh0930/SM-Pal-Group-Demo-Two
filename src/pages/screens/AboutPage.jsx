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

function AboutPage({ page }) {
  const businessVerticals = [
    {
      name: "Pal Stone Industries",
      category: "Stone & construction materials",
      text: "Our founding business, supplying premium stone and grit for major infrastructure projects.",
      href: "/industries/pal-stone-industries",
      image: "/assets/our-verticals-images/pal stone.png",
    },
    {
      name: "Pal Colonisers",
      category: "Real estate",
      text: "Modern residential projects including Pal Sumeera Residency, Palam City, Pallazio, Eco Town and Paloma Greens.",
      href: "/industries/pal-colonisers/pal-sumeera-residency",
      image: "/assets/our-verticals-images/coloniser.png",
    },
    {
      name: "Pal Frozen Foods",
      category: "Food & trading",
      text: "Home to Pal Fresh frozen vegetables and Frozzo frozen snacks, with Pal Fresh Global Trading LLC extending our international reach.",
      href: "/industries/pal-frozen-foods/pal-fresh",
      image: "/assets/our-verticals-images/pal frozen foods.png",
    },
    {
      name: "Car Dealerships",
      category: "Automotive",
      text: "Including Pal Skoda Haldwani, Pal Nissan Haldwani and Pal Ford Haldwani.",
      href: "/industries/car-dealerships/pal-skoda-haldwani",
      image: "/assets/our-verticals-images/skoda.png",
    },
  ];
  const values = [
    [
      "People First",
      "Our strength lies in valuing and empowering people, while building a culture of respect and collaboration.",
    ],
    [
      "Integrity",
      "Honesty, transparency, and ethical practice form the foundation of everything we do.",
    ],
    [
      "Customer-Centric Approach",
      "We put customer needs first, delivering seamless service, real innovation, and consistent quality.",
    ],
    [
      "Excellence",
      "We aim to meet the highest global standards in every product and service we offer.",
    ],
    [
      "Commitment",
      "We hold ourselves to these values with dedication, so that trust and satisfaction follow in everything we do.",
    ],
  ];
  const faqs = [
    [
      "Who founded SM Pal Group?",
      "SM Pal Group was founded in 1982 by Shri Suresh Pal, who remains at the forefront of the business today.",
    ],
    [
      "Where is SM Pal Group based?",
      "SM Pal Group is headquartered in Haldwani, Uttarakhand, and serves customers across the Kumaon region and beyond.",
    ],
    [
      "Who leads SM Pal Group today?",
      "SM Pal Group is led by Shri Suresh Pal, Mrs. Meera Pal, and Mr. Prateek Pal, who guide the group’s growth across all its business verticals.",
    ],
    [
      "What does the SM Pal Group Foundation do?",
      "The SM Pal Group Foundation supports more than 10,000 people every year and runs two educational institutes that offer merit-based education, including to underprivileged students.",
    ],
    [
      "What industries does SM Pal Group operate in?",
      "SM Pal Group operates across stone and construction materials, real estate, frozen foods, agriculture, and car dealerships through its group businesses and brands.",
    ],
  ];
  return (
    <div className="route-page about-page">
      <a className="skip-link" href="#about-main">Skip to content</a>
      <AboutSeo />
      <RouteHeader />
      <main id="about-main">
        <section className="about-hero mobile-photo-hero">
          <ResponsiveImage
            src={page.image}
            alt="Modern architecture representing SM Pal Group's growth"
            fetchPriority="high"
          />
          <div className="route-hero-shade" />
          <div className="container about-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Transforming lives for a <em>better future.</em>
            </h1>
            <p>{page.intro}</p>
            <a className="button button-brass" href="#about-story">
              Explore our story <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="about-hero-mark">
            <strong>
              45<span>+</span>
            </strong>
            <p>Years of trust</p>
          </div>
        </section>
        <section className="about-story section-pad" id="about-story">
          <div className="container about-story-grid">
            <div className="about-section-label">
              <span>01</span>
              <i />
            </div>
            <div className="about-story-copy">
              <p className="eyebrow eyebrow-dark">Our story</p>
              <h2>
                One beginning.
                <br />
                <em>Many possibilities.</em>
              </h2>
              <p className="large-copy">
                SM Pal Group's journey started in 1982, when Shri Suresh Pal
                laid the foundation with Pal Stone Industries. More than 42
                years later, that single idea has grown into a group of
                companies working across several industries.
              </p>
              <p>
                From Pal Stone Industries and Pal Prateek automobile dealerships
                to Pal Colonisers and Pal Frozen Foods, every vertical is run
                with the same transparent, customer-first approach that built
                the company. That consistency is a big part of why customers
                keep coming back.
              </p>
              <a className="text-link" href="#business-verticals">
                Explore our business verticals <ArrowRight size={17} />
              </a>
            </div>
            <div className="about-story-note">
              <span>Established in</span>
              <p>1982 — a foundation of trust, built in Haldwani.</p>
            </div>
          </div>
        </section>
        <LegacyWall values={values} />
        <section className="about-leadership section-pad">
          <div className="container about-leadership-grid">
            <ResponsiveImage
              src="/assets/chairman-images/chairman-about-us.webp"
              alt="Suresh Pal Ji, founder and chairman of SM Pal Group"
              width={5504}
              height={8256}
              loading="lazy"
              decoding="async"
            />
            <div>
              <p className="eyebrow eyebrow-dark">Meet our leadership</p>
              <h2>
                Rooted locally.
                <br />
                <em>Thinking long term.</em>
              </h2>
              <p className="large-copy">
                SM Pal Group is led by Shri Suresh Pal, Mrs. Meera Pal,
                and Mr. Prateek Pal — three family members who guide the
                business with a shared focus on integrity and long-term thinking.
              </p>
              <p>
                Under their leadership, Pal Group Haldwani has grown into a name
                recognised beyond the region, with a vision that reaches toward
                global standards while staying rooted in local values.
              </p>
              <div className="about-leadership-links">
                <a className="button button-brass" href="/about/ownership">
                  Owner-Chairman <ArrowUpRight size={17} />
                </a>
                <a
                  className="text-link"
                  href="/about/board-of-directors"
                >
                  Meet the board of directors <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="about-community section-pad">
          <div className="container about-community-grid">
            <div className="about-community-copy">
              <p className="eyebrow eyebrow-dark">
                Our commitment to community
              </p>
              <h2>
                Success that
                <br />
                <em>reaches further.</em>
              </h2>
              <p className="large-copy">
                Being a responsible business means more to SM Pal Group than
                good numbers. Every year, the SM Pal Group Foundation reaches
                more than 10,000 people through community programs.
              </p>
              <p>
                It also runs two respected educational institutes that offer
                quality, merit-based education, including to students from
                underprivileged backgrounds. This is a part of the SM Pal Group
                story that goes beyond any single business vertical.
              </p>
            </div>
            <div className="about-community-image">
              <ResponsiveImage
                src="/assets/Our commitment to community.jpg"
                alt="Students learning together"
                loading="lazy"
              />
              <div className="about-community-stat">
                <p>People reached every year through community programs</p>
                <i />
                <small>
                  Two educational institutes supporting merit-based education
                </small>
              </div>
            </div>
          </div>
        </section>
        <section className="about-direction section-pad">
          <div className="container">
            <div className="about-direction-heading">
              <p className="eyebrow">Our vision and mission</p>
              <h2>
                Guided by purpose.
                <br />
                <em>Measured by impact.</em>
              </h2>
            </div>
            <div className="about-direction-grid">
              <article>
                <span>Our vision</span>
                <p>
                  To lead with integrity, set the standard for responsible
                  growth, and create lasting value for society and future
                  generations, while inspiring others to hold the same
                  principles in everything they do.
                </p>
              </article>
              <article>
                <span>Our mission</span>
                <p>
                  To build a future where responsibility drives growth,
                  integrity guides every decision, and success is measured by
                  the long-term value we create for people, society, and the
                  generations ahead.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          className="about-businesses section-pad"
          id="business-verticals"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow eyebrow-dark">Our business verticals</p>
                <h2>
                  Different fields.
                  <br />
                  <em>Shared standards.</em>
                </h2>
              </div>
              <p>
                SM Pal Group operates across industries, each carrying the same
                standard of quality and trust the group was built on in 1982.
              </p>
            </div>
            <div className="about-business-grid">
              {businessVerticals.map((business, index) => (
                <a
                  className="about-business-card"
                  href={business.href}
                  key={business.name}
                >
                  <div>
                    <span>0{index + 1}</span>
                    <p>{business.category}</p>
                    <h3>{business.name}</h3>
                    <small>{business.text}</small>
                  </div>
                  <ResponsiveImage src={business.image} alt="" loading="lazy" />
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="about-recognition section-pad">
          <div className="container about-recognition-grid">
            <div>
              <p className="eyebrow eyebrow-dark">
                Awards and media recognition
              </p>
              <h2>
                Recognition earned
                <br />
                <em>along the way.</em>
              </h2>
            </div>
            <div>
              <p className="large-copy">
                SM Pal Group's approach to business has earned recognition
                across its industries over the years.
              </p>
              <p>
                Explore the honours earned by our businesses in the
                group's awards and recognition section.
              </p>
              <a className="text-link" href="/#awards">
                Explore awards and recognition <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="about-faq section-pad">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow eyebrow-dark">Frequently asked questions</p>
              <h2>
                Helpful answers,
                <br />
                <em>at a glance.</em>
              </h2>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details className="faq-item" key={question}>
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
        <section className="about-contact section-pad">
          <div className="container about-contact-grid">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2>
                Let’s start a<br />
                <em>conversation.</em>
              </h2>
            </div>
            <div>
              <p>
                If you would like to know more about SM Pal Group, explore
                career opportunities, or simply have a question, we would love
                to hear from you. Visit our Contact Us page to reach the team
                directly.
              </p>
              <a className="button button-dark" href="/contact">
                Contact us <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default AboutPage;
