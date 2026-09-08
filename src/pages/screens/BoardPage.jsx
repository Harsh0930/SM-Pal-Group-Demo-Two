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

function BoardPage({ page }) {
  const directors = [
    {
      name: "Shri Suresh Pal",
      role: "Chairman",
      description:
        "Suresh Pal is the owner and chairman of SM Pal Group, and the founder who built the company from a single stone supply business into a group spanning multiple industries. Under his leadership, the group has earned recognition including the Nissan Global Award and the Ford President's Award of Excellence, alongside a continued focus on sustainable agriculture and community development. You can read his full story on our Owner-Chairman page.",
      cta: { label: "Read his full story", href: "/about/ownership" },
    },
    {
      name: "Meera Pal",
      role: "Director",
      description:
        "Meera Pal serves as a director of SM Pal Group, contributing to the leadership guiding the group's values and growth.",
      cta: null,
    },
    {
      name: "Prateek Pal",
      role: "Director",
      description:
        "Prateek Pal serves as a director of SM Pal Group and is part of the next generation carrying the family's leadership forward. Visit his dedicated profile to learn more about his role.",
      cta: { label: "Meet Prateek Pal", href: "/about/prateek-pal" },
    },
    {
      name: "Tushika Pal",
      role: "Director",
      description:
        "Tushika Pal serves as a director of SM Pal Group, supporting the board's leadership across the group's businesses.",
      cta: null,
    },
  ];

  const leadershipPoints = [
    {
      title: "Consistency across generations.",
      text: "The same founding values guide every business decision, from the group's first stone supply venture to its latest real estate and automotive ventures.",
    },
    {
      title: "Accountability at the top.",
      text: "Having a defined board of directors gives customers, partners, and employees a clear picture of who leads the group and how decisions get made.",
    },
    {
      title: "A shared commitment to values.",
      text: "Every director on this board is connected to the people-first, integrity-driven culture described on our <a href=\"/about/the-pal-group\">SM Pal Group</a> page.",
    },
  ];

  const boardFaqs = [
    [
      "Who is on the board of directors at SM Pal Group?",
      "SM Pal Group's board includes Chairman Suresh Pal, along with directors Meera Pal, Prateek Pal, and Tushika Pal.",
    ],
    [
      "Who is the chairman of SM Pal Group?",
      "Suresh Pal is the chairman of SM Pal Group. He founded the company in 1982 and continues to lead it today.",
    ],
    [
      "How can I get in touch with SM Pal Group's leadership?",
      "You can reach SM Pal Group's leadership team through our Contact Us page.",
    ],
  ];

  const exploreMore = [
    { label: "Owner-Chairman", href: "/about/ownership" },
    { label: "The Pal Group", href: "/about/the-pal-group" },
    { label: "About SM Pal Group", href: "/about" },
    { label: "Contact the team", href: "/contact" },
  ];

  return (
    <div className="board-page">
      <a className="skip-link" href="#board-main">Skip to content</a>
      <BoardSeo />
      <RouteHeader />
      <main id="board-main">
        <section className="board-hero">
          <ResponsiveImage src={page.image} alt="" fetchPriority="high" />
          <div className="board-hero-shade" />
          <div className="container board-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>Board of directors <em>at SM Pal Group</em></h1>
            <p className="board-hero-intro">{page.intro}</p>
            <a className="button button-brass" href="#board">
              Meet our board <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="board-hero-mark" aria-hidden="true">
            BoD
          </div>
        </section>

        {/* Meet our board */}
        <section className="board-meet section-pad" id="board">
          <div className="container">
            <div className="board-section-label reveal">
              <span>01</span>
              <i />
              <span>Meet our board</span>
            </div>
            <div className="board-section-intro reveal">
              <h2>
                The people
                <br />
                <em>behind the progress.</em>
              </h2>
              <p className="large-copy">{page.body}</p>
            </div>
            <div className="board-directors-grid">
              {directors.map((director) => (
                <article className="board-director-card reveal" key={director.name}>
                  <header>
                    <div>
                      <h3>{director.name}</h3>
                      <span className="board-director-role">{director.role}</span>
                    </div>
                  </header>
                  <p>{director.description}</p>
                  {director.cta && (
                    <a className="text-link" href={director.cta.href}>
                      {director.cta.label} <ArrowRight size={17} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why board leadership matters */}
        <section className="board-matters section-pad" id="matters">
          <div className="container">
            <div className="board-section-label reveal">
              <span>02</span>
              <i />
              <span>Why board leadership matters at SM Pal Group</span>
            </div>
            <div className="board-section-intro reveal">
              <h2>
                A family-led board,
                <br />
                <em>shaping how we operate.</em>
              </h2>
              <p className="large-copy">
                A family-led board has guided SM Pal Group since 1982, and that
                continuity shapes how the group operates today.
              </p>
            </div>
            <div className="board-matters-grid">
              {leadershipPoints.map((point, index) => (
                <div
                  className="board-matters-card reveal"
                  key={point.title}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <h3>{point.title}</h3>
                  <p dangerouslySetInnerHTML={{ __html: point.text }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Corporate governance */}
        <section className="board-governance section-pad">
          <div className="container">
            <div className="board-section-label reveal">
              <span>03</span>
              <i />
              <span>Corporate governance and values</span>
            </div>
            <div className="board-governance-inner">
              <div className="board-governance-copy reveal">
                <h2>
                  Values that
                  <br />
                  <em>run across the board.</em>
                </h2>
                <p className="large-copy">
                  SM Pal Group's board operates according to the same five values
                  that guide every business under the group: people first, integrity,
                  a customer-centric approach, excellence, and commitment.
                </p>
                <p>
                  These values are not limited to one department or one director —
                  they run across the entire board's approach to leading the group.
                  You can read more about how these values are defined on our <a href="/about/the-pal-group">SM Pal Group</a> page.
                </p>
                <a className="button button-brass" href="/about/the-pal-group">
                  Explore our values <ArrowRight size={17} />
                </a>
              </div>
              <div className="board-values-list reveal">
                {[
                  "People first",
                  "Integrity",
                  "Customer-centric approach",
                  "Excellence",
                  "Commitment",
                ].map((value) => (
                  <div className="board-value-item" key={value}>
                    <span />
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="board-faq section-pad">
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
              {boardFaqs.map(([question, answer]) => (
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
        <section className="board-explore section-pad">
          <div className="container">
            <div className="board-section-label reveal">
              <span>04</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="board-explore-intro reveal">
              <h2>
                See the fuller
                <br />
                <em>picture of the group.</em>
              </h2>
              <p className="large-copy">
                Visit our <a href="/about/ownership">Owner-Chairman</a> page for Suresh Pal's full story, or <a href="/contact">contact our team</a>. You can also explore <a href="/about/the-pal-group">The Pal Group</a> to see the full family of businesses this board leads, or read our full story on the <a href="/about">About SM Pal Group</a> page.
              </p>
            </div>
            <div className="board-explore-links reveal">
              {exploreMore.map((item) => (
                <a key={item.href} className="button button-outline" href={item.href}>
                  {item.label} <ArrowRight size={17} />
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


export default BoardPage;
