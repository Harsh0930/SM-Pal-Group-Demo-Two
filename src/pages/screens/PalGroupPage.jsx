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

function PalGroupPage({ page }) {
  const palGroupFaqs = [
    [
      "Is The Pal Group the same as SM Pal Group?",
      "Yes. The Pal Group and SM Pal Group refer to the same founding family enterprise, established in 1982 by Shri Suresh Pal in Haldwani. SM Pal Group is the name used across this website and our customer facing businesses, while The Pal Group refers to the same group in its broader, original form.",
    ],
    [
      "How many businesses are part of SM Pal Group?",
      "SM Pal Group's core businesses include Pal Stone Industries, Pal Colonisers, Pal Frozen Foods, and its car dealerships. The wider Pal Group family also includes more than a dozen additional brands across healthcare, education, infrastructure, consulting, manufacturing, media, retail, and pharmaceuticals.",
    ],
    [
      "What is Brij Lal Hospital's connection to SM Pal Group?",
      "Brij Lal Hospital and Research Centre, along with Kaya Hospital, is part of the wider Pal Group family of businesses, reflecting the group's expansion into healthcare alongside its founding industries.",
    ],
    [
      "Who leads SM Pal Group and The Pal Group?",
      "Shri Suresh Pal founded the group in 1982 and continues to lead it today, with over 45+ years of business experience guiding its growth across every industry it now operates in.",
    ],
    [
      "Where is SM Pal Group headquartered?",
      "SM Pal Group and The Pal Group are both headquartered in Haldwani, Uttarakhand, the city where the group's first business began.",
    ],
  ];

  const coreBusinesses = [
    {
      name: "Pal Stone Industries",
      category: "Stone & Construction Materials",
      text: "The founding business, supplying premium stone and grit for major infrastructure projects across the region.",
      href: "/industries/pal-stone-industries",
      image: "/assets/our-verticals-images/pal stone.png",
    },
    {
      name: "Pal Colonisers",
      category: "Real Estate Development",
      text: "Developing residential projects including Pal Sumeera Residency, Palam City, Palam View, Pallazio, Eco Town, and Paloma Greens.",
      href: "/industries/pal-colonisers/pal-sumeera-residency",
      image: "/assets/our-verticals-images/coloniser.png",
    },
    {
      name: "Pal Frozen Foods",
      category: "Frozen Foods & Trading",
      text: "Home to Pal Fresh frozen vegetables and Frozzo frozen snacks, alongside Pal Fresh Global Trading LLC for international reach.",
      href: "/industries/pal-frozen-foods/pal-fresh",
      image: "/assets/our-verticals-images/pal frozen foods.png",
    },
    {
      name: "Car Dealerships",
      category: "Automotive Retail",
      text: "Including Pal Skoda Haldwani, Pal Nissan Haldwani, and Pal Ford Haldwani.",
      href: "/industries/car-dealerships/pal-skoda-haldwani",
      image: "/assets/our-verticals-images/skoda.png",
    },
  ];

  const widerFamily = [
    {
      name: "Brij Lal Hospital and Research Centre",
      category: "Healthcare",
      text: "Together with Kaya Hospital, offers advanced medical infrastructure and dedicated healthcare professionals, focused on affordable, accessible, and high-quality care for all.",
    },
    {
      name: "Pal College of Nursing and Medical Sciences",
      category: "Education",
      text: "Supports the group's healthcare mission by training the next generation of skilled healthcare providers.",
    },
    {
      name: "Pal College of Technology and Management",
      category: "Education",
      text: "Focused on academic excellence and real-world skills, aiming to produce socially responsible professionals who contribute meaningfully to society and industry.",
    },
    {
      name: "Pal Infra Solutions",
      category: "Infrastructure",
      text: "Shapes the region's infrastructure through construction and structural project work, offering end-to-end solutions for both public and private sector clients.",
    },
    {
      name: "Panorama India Consulting Group & Digital Quest",
      category: "Consulting & Marketing",
      text: "Helps other companies grow through innovative marketing, data-driven solutions, and strategic consulting, working with everyone from startups to established enterprises.",
    },
    {
      name: "Quanta Cables & Pal Alloy and Steel Casting",
      category: "Manufacturing",
      text: "Produces high performance components and materials that meet national and international standards, supporting industries from infrastructure to energy.",
    },
    {
      name: "JJN News",
      category: "Media & Communication",
      text: "Connects the region with timely, accurate reporting, built on a commitment to journalistic integrity and regional relevance.",
    },
    {
      name: "Tanishq & Titan Eyeplus",
      category: "Retail",
      text: "Through partnerships with two of India's most trusted retail brands, offers retail experiences built on trust, variety, and affordability.",
    },
    {
      name: "GN Pal Speciality Molecules LLP",
      category: "Pharmaceuticals",
      text: "Dedicated to the research, development, and distribution of high-quality specialty pharmaceutical products, aiming to improve patient outcomes and bridge gaps in healthcare.",
    },
  ];

  const diversificationReasons = [
    {
      title: "One set of values",
      text: "Across every business, from stone supply to healthcare and media.",
    },
    {
      title: "Local roots, growing reach",
      text: "Still headquartered in Haldwani while serving customers well beyond Uttarakhand.",
    },
    {
      title: "People-first philosophy",
      text: "Shapes how every business in the family treats its customers, patients, students, and readers.",
    },
    {
      title: "Decades of proven execution",
      text: "Over 45+ years of experience guiding decisions across every industry the group enters.",
    },
  ];

  const exploreMore = [
    { label: "Our full story", href: "/about" },
    { label: "Owner-Chairman", href: "/about/ownership" },
    { label: "Board of Directors", href: "/about/board-of-directors" },
    { label: "Awards & Recognition", href: "/#awards" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="route-page pal-group-page">
      <a className="skip-link" href="#pal-group-main">Skip to content</a>
      <PalGroupSeo />
      <RouteHeader />
      <main id="pal-group-main">
        <section className="pg-hero">
          <ResponsiveImage
            src={page.image}
            alt=""
            fetchPriority="high"
          />
          <div className="pg-hero-shade" />
          <div className="container pg-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>SM Pal Group: <em>A Multi-Industry Legacy Since 1982</em></h1>
            <p className="pg-hero-intro">{page.intro}</p>
            <a className="button button-brass" href="#core-businesses">
              Explore our businesses <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="pg-hero-mark">
            <strong>
              45<span>+</span>
            </strong>
            <p>Years of trust</p>
          </div>
        </section>

        <section className="pg-story section-pad" id="our-story">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>01</span>
              <i />
              <span>Our Story</span>
            </div>
            <div className="pg-story-grid">
              <div className="pg-story-copy reveal">
                <h2>
                  One founder.
                  <br />
                  <em>One city.</em>
                </h2>
                <p className="large-copy">
                  Every business under this roof traces back to one founder and one city. Shri Suresh Pal established the group in 1982 in Haldwani, often called the gateway to Uttarakhand's Kumaon region, starting with a small stone supply venture.
                </p>
                <p>
                  With over 45+ years of business experience behind him, his leadership has carried the group from that single idea into a name recognised across many industries today.
                </p>
                <p>
                  What has carried through every stage of that growth is a simple approach: <strong>Quality first, transparency always,</strong> and a genuine focus on the people the group serves.
                </p>
                <div className="pg-story-links">
                  <a className="text-link" href="/about/ownership">
                    Read about our founder <ArrowRight size={17} />
                  </a>
                  <a className="text-link" href="/about">
                    Explore our full story <ArrowRight size={17} />
                  </a>
                </div>
              </div>
              <aside className="pg-story-note reveal">
                <span>Established in</span>
                <p>1982 — a foundation of trust, built in Haldwani.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="pg-naming section-pad" id="naming">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>02</span>
              <i />
              <span>SM Pal Group &amp; The Pal Group</span>
            </div>
            <div className="pg-naming-grid reveal">
              <div>
                <h2>
                  Two names.
                  <br />
                  <em>One enterprise.</em>
                </h2>
              </div>
              <div className="pg-naming-copy">
                <p className="large-copy">
                  You may notice this page refers to both SM Pal Group and The Pal Group. Here is the simple version:
                </p>
                <p>
                  <strong>SM Pal Group</strong> is the name used across our website and daily business, the brand you see on this site and across our dealerships, projects, and products.
                </p>
                <p>
                  <strong>The Pal Group</strong> is the same founding family enterprise, referred to here in its broader, original form as the parent name behind every business in this portfolio.
                </p>
                <p>
                  In short, they describe the same group of companies, built by the same founder, from the same starting point in 1982. Any reference to SM Pal Group or The Pal Group points back to one and the same trusted family enterprise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-core-businesses section-pad" id="core-businesses">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>03</span>
              <i />
              <span>Our Core Businesses</span>
            </div>
            <div className="pg-section-intro reveal">
              <h2>
                The businesses
                <br />
                <em>closest to our brand.</em>
              </h2>
              <p className="large-copy">
                These are the businesses most closely tied to the SM Pal Group brand, each with its own dedicated page you can explore further.
              </p>
            </div>
            <div className="pg-core-grid">
              {coreBusinesses.map((biz, index) => (
                <a
                  className="pg-core-card reveal"
                  href={biz.href}
                  key={biz.name}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <div>
                    <span>0{index + 1}</span>
                    <p className="pg-core-category">{biz.category}</p>
                    <h3>{biz.name}</h3>
                    <small>{biz.text}</small>
                  </div>
                  <ResponsiveImage src={biz.image} alt="" loading="lazy" />
                  <ArrowUpRight size={22} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-wider-family section-pad" id="wider-family">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>04</span>
              <i />
              <span>Beyond SM Pal Group</span>
            </div>
            <div className="pg-section-intro reveal">
              <h2>
                The wider
                <br />
                <em>Pal Group family.</em>
              </h2>
              <p className="large-copy">
                Alongside these core businesses, the wider Pal Group family has grown into several other industries over the years. These ventures reflect the same founding values, even though they sit outside the four core businesses listed above.
              </p>
            </div>
            <div className="pg-wider-grid">
              {widerFamily.map((biz, index) => (
                <div
                  className="pg-wider-card reveal"
                  key={biz.name}
                  style={{ "--delay": `${index * 50}ms` }}
                >
                  <span className="pg-wider-category">{biz.category}</span>
                  <h3>{biz.name}</h3>
                  <p>{biz.text}</p>
                </div>
              ))}
            </div>
            <div className="pg-wider-cta reveal">
              <p>
                Every venture in the wider Pal Group family reflects the same founding values and the same long-term thinking.
              </p>
              <a className="text-link" href="/about/ownership">
                Meet Shri Suresh Pal, the founder behind it all <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="pg-diversified section-pad" id="why-it-works">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>05</span>
              <i />
              <span>Why This Diversified Approach Works</span>
            </div>
            <div className="pg-diversified-intro reveal">
              <h2>
                One foundation.
                <br />
                <em>Many industries.</em>
              </h2>
              <p className="large-copy">
                SM Pal Group has grown into so many industries for one reason: every new venture is built on the same foundation the group started with in 1982.
              </p>
            </div>
            <div className="pg-diversified-grid">
              {diversificationReasons.map((reason, index) => (
                <div
                  className="pg-diversified-card reveal"
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

        <section className="pg-faq section-pad">
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
              {palGroupFaqs.map(([question, answer]) => (
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

        <section className="pg-explore section-pad">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>06</span>
              <i />
              <span>Explore More</span>
            </div>
            <div className="pg-explore-intro reveal">
              <h2>
                Want to know more
                <br />
                <em>about the people and story?</em>
              </h2>
            </div>
            <div className="pg-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="pg-explore-card reveal"
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


export default PalGroupPage;
