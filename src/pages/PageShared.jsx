import ResponsiveImage from '../components/ResponsiveImage.jsx';
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
import Footer from "../components/Footer.jsx";
import CursorGrid from "../components/CursorGrid.jsx";
import { routeGroups } from "../data/navigation.js";
import { heroImages, stories, awards, news } from "../data/homeContent.js";
import { businesses } from "../data/businesses.js";
import { insights, legacyMoments, journeyStages } from "../data/aboutContent.js";
import { usePageSeo, buildFaqSchema } from "../hooks/usePageSeo.js";

import { businessRoutes } from '../data/routes.js';
function Logo({ light = false }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href="/"
      aria-label="SM Pal Group home"
    >
      <ResponsiveImage src="/assets/smpal-group-logo-white.png" loading="eager" sizes="166px" alt="SM Pal Group" />
    </a>
  );
}

function RouteHeader({ showLanguageToggle = false, language, onLanguageChange }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openIndustrySubmenu, setOpenIndustrySubmenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1001px)");
    const resetNavigation = () => {
      setDrawerOpen(false);
      setOpenMenu(null);
      setOpenIndustrySubmenu(null);
    };
    desktop.addEventListener("change", resetNavigation);
    return () => desktop.removeEventListener("change", resetNavigation);
  }, []);
  const industrySubmenus = {
    "Pal Frozen Foods": [
      { label: "Pal Fresh", href: "/industries/pal-frozen-foods/pal-fresh" },
      { label: "Frozzo", href: "/industries/pal-frozen-foods/frozzo" },
      {
        label: "Pal Frozen Farms",
        href: "/industries/pal-frozen-farms",
      },
    ],
    "Pal Colonisers": routeGroups.colonisers,
    "Car Dealerships": routeGroups.dealerships,
  };
  useEffect(() => {
    if (!drawerOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const closeNavigation = () => {
    setOpenMenu(null);
    setOpenIndustrySubmenu(null);
    setDrawerOpen(false);
  };

  return (
    <header className="route-header">
      <div className="container route-nav">
        <Logo />
        <nav className="route-desktop-nav" aria-label="Primary navigation">
          <a href="/">Home</a>
          <div className="route-nav-group">
            <button
              type="button"
              onClick={() =>
                (() => {
                  setOpenIndustrySubmenu(null);
                  setOpenMenu(openMenu === "industries" ? null : "industries");
                })()
              }
            >
              Industries <ChevronDown size={15} />
            </button>
            {openMenu === "industries" && (
              <div className="route-menu">
                {routeGroups.industries.map((item) => (
                  industrySubmenus[item.label] ? (
                    <div className="route-menu-nested" key={item.href}>
                      <button
                        type="button"
                        aria-expanded={openIndustrySubmenu === item.label}
                        onClick={() =>
                          setOpenIndustrySubmenu(
                            openIndustrySubmenu === item.label ? null : item.label,
                          )
                        }
                      >
                        {item.label} <ChevronRight size={15} />
                      </button>
                      {openIndustrySubmenu === item.label && (
                        <div className="route-menu-nested-links">
                          {industrySubmenus[item.label].map((subItem) => (
                            <a href={subItem.href} key={subItem.href}>
                              {subItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <a href={item.href} key={item.href}>
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            )}
          </div>
          <div className="route-nav-group">
            <button
              type="button"
              onClick={() => setOpenMenu(openMenu === "about" ? null : "about")}
            >
              About Us <ChevronDown size={15} />
            </button>
            {openMenu === "about" && (
              <div className="route-menu">
                <a href="/about">Our story</a>
                <a href="/about/the-pal-group">The Pal Group</a>
                <a href="/about/ownership">Owner-Chairman</a>
                <a href="/about/prateek-pal">Prateek Pal</a>
                <a href="/about/board-of-directors">Board of directors</a>
              </div>
            )}
          </div>
          <a href="/contact" className="nav-cta">
            Contact Us <ArrowUpRight size={16} />
          </a>
          {showLanguageToggle && (
            <button
              className="route-language-toggle"
              type="button"
              aria-label={language === "ar" ? "Switch to English" : "Switch to Arabic"}
              onClick={() => onLanguageChange(language === "ar" ? "en" : "ar")}
            >
              <Languages size={16} /> {language === "ar" ? "EN" : "عربي"}
            </button>
          )}
        </nav>
        <button
          className="route-menu-toggle"
          type="button"
          aria-expanded={drawerOpen}
          aria-controls="mobile-navigation-drawer"
          aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          {drawerOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {drawerOpen && (
        <>
          <button
            className="route-drawer-backdrop"
            type="button"
            aria-label="Close navigation menu"
            onClick={closeNavigation}
          />
          <aside className="route-drawer" id="mobile-navigation-drawer" aria-label="Mobile navigation">
            <div className="route-drawer-head">
              <span>Explore SM Pal Group</span>
              <button type="button" onClick={closeNavigation} aria-label="Close navigation menu">
                <X size={20} />
              </button>
            </div>
            {showLanguageToggle && (
              <button
                className="route-language-toggle route-drawer-language"
                type="button"
                onClick={() => onLanguageChange(language === "ar" ? "en" : "ar")}
              >
                <Languages size={16} /> {language === "ar" ? "English" : "العربية"}
              </button>
            )}
            <nav className="route-drawer-links">
              <a href="/" onClick={closeNavigation}>Home</a>
              <button
                type="button"
                className="route-drawer-trigger"
                aria-expanded={openMenu === "industries"}
                onClick={() => setOpenMenu(openMenu === "industries" ? null : "industries")}
              >
                Industries <ChevronDown size={17} />
              </button>
              {openMenu === "industries" && (
                <div className="route-drawer-submenu">
                  {routeGroups.industries.map((item) => (
                    industrySubmenus[item.label] ? (
                      <div key={item.href}>
                        <button
                          type="button"
                          className="route-drawer-subtrigger"
                          aria-expanded={openIndustrySubmenu === item.label}
                          onClick={() => setOpenIndustrySubmenu(openIndustrySubmenu === item.label ? null : item.label)}
                        >
                          {item.label} <ChevronRight size={15} />
                        </button>
                        {openIndustrySubmenu === item.label && (
                          <div className="route-drawer-nested-links">
                            {industrySubmenus[item.label].map((subItem) => (
                              <a href={subItem.href} key={subItem.href} onClick={closeNavigation}>{subItem.label}</a>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <a href={item.href} key={item.href} onClick={closeNavigation}>{item.label}</a>
                    )
                  ))}
                </div>
              )}
              <button
                type="button"
                className="route-drawer-trigger"
                aria-expanded={openMenu === "about"}
                onClick={() => setOpenMenu(openMenu === "about" ? null : "about")}
              >
                About Us <ChevronDown size={17} />
              </button>
              {openMenu === "about" && (
                <div className="route-drawer-submenu">
                  <a href="/about" onClick={closeNavigation}>Our story</a>
                  <a href="/about/the-pal-group" onClick={closeNavigation}>The Pal Group</a>
                  <a href="/about/ownership" onClick={closeNavigation}>Owner-Chairman</a>
                  <a href="/about/prateek-pal" onClick={closeNavigation}>Prateek Pal</a>
                  <a href="/about/board-of-directors" onClick={closeNavigation}>Board of directors</a>
                </div>
              )}
              <a href="/contact" className="route-drawer-cta" onClick={closeNavigation}>
                Contact Us <ArrowUpRight size={17} />
              </a>
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}

function LegacyWall({ values }) {
  return (
    <section className="legacy-wall section-pad" id="legacy" aria-labelledby="legacy-heading">
      <div className="container">
        <div className="legacy-heading">
          <p className="eyebrow eyebrow-dark">Our journey wall</p>
          <h2 id="legacy-heading">A shared legacy.<br /><em>Moments that shaped us.</em></h2>
        </div>
        <div className="legacy-layout">
          <aside className="legacy-panel legacy-foundation reveal">
            <p className="eyebrow eyebrow-dark">The foundation</p>
            <h3>
              Pal Stone Industries <span>1982</span>
            </h3>
            <p>
              The first chapter began at Halduchaur, where dependable materials
              and a disciplined way of working laid the foundation for
              everything that followed.
            </p>
            <blockquote>
              "Progress matters more than recognition. Keep growing, keep
              working hard, and the results will follow."
            </blockquote>
            <p className="legacy-attribution">
              <strong>Suresh Pal Ji</strong>
              <span>Founder and Chairman, SM Pal Group</span>
            </p>
          </aside>
          <div
            className="legacy-mosaic"
            aria-label="SM Pal Group legacy moments"
          >
            {legacyMoments.map((moment) => (
              <figure
                className={`legacy-tile ${moment.shape || ""}`}
                key={moment.title}
                style={{ "--tile-area": moment.area, "--image-position": moment.position || "50% 50%" }}
              >
                <ResponsiveImage src={moment.image} alt={moment.alt} loading="lazy" decoding="async" />
                <figcaption>{moment.title}</figcaption>
              </figure>
            ))}
            <div className="legacy-center-mark">
              <ResponsiveImage
                src="/assets/sm-pal-group-logo.webp"
                alt="SM Pal Group, nurtured since 1982"
              />
            </div>
          </div>
          <aside className="legacy-panel legacy-purpose reveal">
            <p className="eyebrow eyebrow-dark">Our legacy</p>
            <h3>Our values</h3>
            <div className="legacy-values">
              {values.map(([title, text], index) => (
                <div key={title}>
                  <b>0{index + 1}</b>
                  <p>
                    <strong>{title}</strong>
                    <span>{text}</span>
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [sent, setSent] = useState(false);
  return (
    <section className="contact section-pad" id="contact">
      <div className="container contact-grid">
        <div className="contact-copy reveal">
          <p className="eyebrow">Let’s connect</p>
          <h2>
            Good things
            <br />
            <em>start here.</em>
          </h2>
          <p>
            Whether you are looking to work with us, join us or simply learn
            more, we would love to hear from you.
          </p>
          <div className="contact-detail">
            <span>General enquiries</span>
            <a href="mailto:hello@smpalgroup.com">hello@smpalgroup.com</a>
          </div>
        </div>
        <form
          className="contact-form reveal"
          onSubmit={(event) => {
            event.preventDefault();
            setSent(true);
          }}
        >
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" required />
          <label htmlFor="email">Email address</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="message">How can we help?</label>
          <textarea id="message" name="message" rows="4" required />
          <button className="button button-brass" type="submit">
            {sent ? "Message sent" : "Send enquiry"} <ArrowUpRight size={17} />
          </button>
          {sent && (
            <p className="form-success" role="status">
              Thank you. Our team will be in touch shortly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}


export { RouteHeader, LegacyWall, ContactSection };
