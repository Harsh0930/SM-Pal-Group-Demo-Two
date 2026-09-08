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

function RoutePage({ page }) {
  const [sent, setSent] = useState(false);
  const isContact = page.type === "contact";
  const related =
    page.type === "project"
      ? routeGroups.colonisers
      : page.type === "dealer"
        ? routeGroups.dealerships
        : routeGroups.industries;
  return (
    <div className={`route-page${page.type === "industry" || page.type === "project" ? " industry-overview" : ""}${isContact ? " contact-page" : ""}`}>
      <RouteHeader />
      <main>
        <section className="route-hero mobile-photo-hero">
          <ResponsiveImage src={page.image} alt="" fetchPriority="high" />
          <div className="route-hero-shade" />
          <div className="container route-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              {page.title.split("\n").map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 && <br />}
                  <em
                    className={
                      index === page.title.split("\n").length - 1
                        ? "route-accent"
                        : ""
                    }
                  >
                    {line}
                  </em>
                </React.Fragment>
              ))}
            </h1>
            <p>{page.intro}</p>
          </div>
        </section>
        <section className="route-content section-pad">
          <div className="container route-content-grid">
            <aside className="route-facts">
              {page.facts.map((fact, index) => (
                <div key={fact}>
                  <span>0{index + 1}</span>
                  <strong>{fact}</strong>
                </div>
              ))}
            </aside>
            <div className="route-copy">
              <p className="eyebrow eyebrow-dark">
                {isContact
                    ? "Start a conversation"
                    : page.type === "leadership"
                      ? "Our people"
                      : page.type === "group"
                        ? "Our foundation"
                      : "A closer look"}
              </p>
              <h2>
                {isContact
                    ? "Connect with the right team."
                    : page.type === "group"
                      ? "Built to move people forward."
                    : "Built with purpose."}
              </h2>
              <p className="large-copy">{page.body}</p>
              {isContact ? (
                <form
                  className="route-form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setSent(true);
                  }}
                >
                  <label htmlFor="route-name">Your name</label>
                  <input id="route-name" required />
                  <label htmlFor="route-email">Email address</label>
                  <input id="route-email" type="email" required />
                  <label htmlFor="route-message">How can we help?</label>
                  <textarea id="route-message" rows="4" required />
                  <button className="button button-brass" type="submit">
                    {sent ? "Message sent" : "Send enquiry"}{" "}
                    <ArrowUpRight size={17} />
                  </button>
                  {sent && (
                    <p className="form-success" role="status">
                      Thank you. Our team will be in touch shortly.
                    </p>
                  )}
                </form>
              ) : (
                <a
                  className="button button-brass route-action"
                  href={
                    page.type === "group"
                        ? "/about#business-verticals"
                        : "/contact"
                  }
                >
                  {page.type === "group"
                      ? "Explore our verticals"
                      : "Talk to our team"}{" "}
                  <ArrowRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>
        {!isContact && (
          <section className="route-related section-pad">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow eyebrow-dark">Explore more</p>
                  <h2>
                    More from
                    <br />
                    <em>the group.</em>
                  </h2>
                </div>
              </div>
              <div className="route-related-grid">
                {related.slice(0, 4).map((item) => (
                  <a
                    className="route-related-card"
                    href={item.href}
                    key={item.href}
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight size={19} />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}


export default RoutePage;
