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

function PalFordPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".pal-ford-page .reveal");
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

  const keyStrengths = [
    {
      title: "Genuine Ford parts",
      text: "Every service visit uses genuine Ford parts and accessories, so you are not choosing between convenience and quality.",
    },
    {
      title: "Ford-trained technicians",
      text: "Staffed by technicians trained specifically on Ford models, the service center is equipped with the latest diagnostic tools.",
    },
    {
      title: "Complete after-sales care",
      text: "From routine servicing to more complex repairs, Pal Ford Haldwani is where Ford owners in the region come back to, visit after visit.",
    },
  ];

  const services = [
    {
      title: "Routine maintenance",
      text: "Regular servicing keeps your Ford running at its best. Pal Ford Haldwani handles everything from oil changes to full inspections.",
    },
    {
      title: "Complex repairs",
      text: "The team is set up to handle more involved repair work with precision, backed by Ford's diagnostic systems and genuine parts.",
    },
    {
      title: "New car sales",
      text: "Alongside its service work, Pal Ford Haldwani also supports new car sales and delivery, getting you into your new Ford with the same attention to detail.",
    },
  ];

  const whyChoose = [
    {
      title: "15+ years of trust",
      text: "Established in 2009, Pal Ford Haldwani has spent over 15 years earning the loyalty of Ford owners across the Kumaon region.",
    },
    {
      title: "Expert Ford service",
      text: "Technicians trained specifically on Ford models and equipped with the latest diagnostic tools handle every job with precision.",
    },
    {
      title: "Genuine parts only",
      text: "Every service visit uses genuine Ford parts and accessories. No shortcuts, no compromises — just the quality your Ford deserves.",
    },
    {
      title: "Backed by SM Pal Group",
      text: "Pal Ford Haldwani operates as part of SM Pal Group, a business built on trust since 1982, holding itself to the same standard of customer care across every business.",
    },
  ];

  const faqs = [
    [
      "When was Pal Ford Haldwani established?",
      "Pal Ford Haldwani was established in 2009, making it the first of SM Pal Group's car dealerships.",
    ],
    [
      "Does Pal Ford Haldwani offer car servicing?",
      "Yes. Pal Ford Haldwani is built primarily around expert Ford servicing and maintenance, using genuine parts and technicians trained specifically on Ford models.",
    ],
    [
      "Can I buy a new car at Pal Ford Haldwani?",
      "Yes. Alongside its service center, Pal Ford Haldwani also supports new car sales and delivery.",
    ],
    [
      "Does Pal Ford serve areas outside Haldwani?",
      "Yes. Pal Ford's presence extends into the wider Kumaon region, including Almora, alongside its main Haldwani location.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Dealership", label: "Pal Skoda Haldwani", href: "/industries/car-dealerships/pal-skoda-haldwani" },
    { eyebrow: "Dealership", label: "Pal Nissan Haldwani", href: "/industries/car-dealerships/pal-nissan-haldwani" },
    { eyebrow: "Group", label: "SM Pal Group", href: "/about/the-pal-group" },
    { eyebrow: "Leadership", label: "Prateek Pal", href: "/about/prateek-pal" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  return (
    <div className="route-page industry-brand pal-ford-page">
      <PalFordSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="ford-hero mobile-photo-hero">
          <ResponsiveImage
                  src="/assets/journeywall-images/pal-ford-opening-haldwani-ceremony.webp"
            alt="Pal Ford Haldwani service center and dealership"
          />
          <div className="ford-hero-grid" aria-hidden="true">
            <CursorGrid
              cellSize={70}
              color="#D9B204"
              radius={150}
              falloff="smooth"
              holdTime={350}
              fadeDuration={900}
              lineWidth={1.1}
              maxOpacity={0.95}
              fillOpacity={0}
              gridOpacity={0}
              cellRadius={0}
              clickPulse
              pulseSpeed={650}
            />
          </div>
          <div className="ford-hero-shade" />
          <div className="container ford-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Pal Ford Haldwani,
              <br />
              <em>power, performance and trust.</em>
            </h1>
            <p className="ford-hero-intro">
              Pal Ford Haldwani has been keeping Fords on the road across Kumaon since 2009, built around one focus: genuine after-sales care you can actually depend on. From routine servicing to more complex repairs, Pal Ford Haldwani is where Ford owners in the region come back to, visit after visit.
            </p>
            <div className="ford-hero-actions">
              <a className="button button-brass" href="#ford-service">
                Expert Ford service <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="ford-hero-mark">
            <strong>Since 2009</strong>
            <p>First SM Pal Group dealership</p>
          </div>
        </section>

        {/* About Pal Ford Haldwani */}
        <section className="ford-about section-pad" id="ford-about">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>01</span>
              <i />
              <span>About Pal Ford Haldwani</span>
            </div>
            <div className="ford-about-grid reveal">
              <div className="ford-about-copy">
                <h2>
                  The first of SM Pal Group&apos;s
                  <br />
                  <em>car dealerships.</em>
                </h2>
                <p className="large-copy">
                  Pal Ford Haldwani was established in 2009 as the first of SM Pal Group&apos;s car dealerships, and it has grown into one of the most trusted names for Ford service in the Kumaon region. While it also supports new car sales, its reputation has been built primarily on the strength of its after-sales support, something that shows clearly in how the business describes itself.
                </p>
                <p>
                  The dealership has spent over 15 years earning the loyalty of Ford owners across Haldwani and the wider Kumaon region. That kind of trust is not built in a day — it is earned, visit after visit, through consistent quality of service and a genuine commitment to getting every repair right.
                </p>
              </div>
              <aside className="ford-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a>
                <p>Pal Ford Haldwani operates as part of SM Pal Group, a business built on trust since 1982.</p>
                <div className="ford-about-line" />
                <small>Established <strong>2009</strong>, SM Pal Group franchise</small>
              </aside>
            </div>
          </div>
        </section>

        {/* Expert Ford Service */}
        <section className="ford-service section-pad" id="ford-service">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>02</span>
              <i />
              <span>Expert Ford service and maintenance</span>
            </div>
            <div className="ford-section-intro reveal">
              <h2>
                Expert Ford service,
                <br />
                <em>built around your vehicle.</em>
              </h2>
              <p className="large-copy">
                At the heart of Pal Ford Haldwani is a state-of-the-art service center, equipped with the latest diagnostic tools and staffed by technicians trained specifically on Ford models. Whether you need routine maintenance or a more complex repair, the team is set up to handle it with precision.
              </p>
            </div>
            <div className="ford-service-grid">
              {services.map((service, index) => (
                <div
                  className="ford-service-card reveal"
                  key={service.title}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span className="ford-service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              ))}
            </div>
            <div className="ford-key-strengths reveal">
              {keyStrengths.map((strength) => (
                <div className="ford-key-strength" key={strength.title}>
                  <div className="ford-key-strength-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <strong>{strength.title}</strong>
                    <p>{strength.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Car Sales */}
        <section className="ford-sales section-pad" id="ford-sales">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>03</span>
              <i />
              <span>New car sales at Pal Ford</span>
            </div>
            <div className="ford-sales-grid reveal">
              <div className="ford-sales-copy">
                <h2>
                  New car sales
                  <br />
                  <em>alongside expert service.</em>
                </h2>
                <p className="large-copy">
                  Alongside its service work, Pal Ford Haldwani also supports new car sales and delivery. If you are looking to buy rather than service, the team can walk you through Ford&apos;s current lineup and get you into your new car with the same attention to detail the dealership is known for on the service side.
                </p>
                <p>
                  You can see the group&apos;s full automotive lineup on our <a className="inline-link" href="/industries/car-dealerships/pal-skoda-haldwani">car dealerships page</a>.
                </p>
              </div>
              <div className="ford-sales-image">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=85"
                  alt="Ford vehicles at Pal Ford Haldwani dealership"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Serving Haldwani and Beyond */}
        <section className="ford-regional section-pad" id="ford-regional">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>04</span>
              <i />
              <span>Serving Haldwani and beyond</span>
            </div>
            <div className="ford-regional-grid reveal">
              <div className="ford-regional-copy">
                <h2>
                  Serving Haldwani
                  <br />
                  <em>and beyond.</em>
                </h2>
                <p className="large-copy">
                  While Pal Ford Haldwani is based in Haldwani, the dealership&apos;s reach extends further into the Kumaon region, including a presence in Almora. If you are outside Haldwani itself, it is worth checking whether your nearest Pal Ford location can support you directly, rather than assuming Haldwani is your only option.
                </p>
              </div>
              <div className="ford-regional-stats">
                <div className="ford-regional-stat reveal">
                  <strong>
                    Kumaon <span>Region</span>
                  </strong>
                  <p>Haldwani, Almora and surrounding areas</p>
                </div>
                <div className="ford-regional-stat reveal">
                  <strong>
                    Since <span>2009</span>
                  </strong>
                  <p>Over 15 years serving Ford owners</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section className="ford-leadership section-pad" id="ford-leadership">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>05</span>
              <i />
              <span>Leadership at Pal Ford and Pal Nissan</span>
            </div>
            <div className="ford-leadership-grid reveal">
              <div className="ford-leadership-copy">
                <h2>
                  The people who
                  <br />
                  <em>make it work.</em>
                </h2>
                <p className="large-copy">
                  Pal Ford and Pal Nissan&apos;s automotive operations are led by Girish Newalia, whose relationship with Ford India&apos;s leadership reflects the kind of direct manufacturer partnership that keeps a dealership like this one accountable to real brand standards, not just local expectations.
                </p>
                <p>
                  Pal Ford Haldwani has also hosted brand events for the local community over the years, reflecting a dealership that shows up for its customers beyond the sales floor and service bay.
                </p>
              </div>
              <div className="ford-leadership-image">
                <div className="ford-leadership-card">
                  <ResponsiveImage
                    src="/assets/ceo-pal-ford-nissan-girish-newalia-ford-india-md-01.webp"
                    alt="Girish Newalia with Ford India leadership at Pal Ford Haldwani"
                    loading="lazy"
                  />
                  <div className="ford-leadership-caption">
                    <strong>Girish Newalia</strong>
                    <span>Head, Pal Ford and Pal Nissan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Promise */}
        <section className="ford-promise section-pad" id="ford-promise">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>06</span>
              <i />
              <span>Our promise to every Pal Ford customer</span>
            </div>
            <div className="ford-promise-grid reveal">
              <div className="ford-promise-copy">
                <p className="eyebrow eyebrow-dark">Built on trust</p>
                <h2>
                  Customer satisfaction is not something you claim,
                  <br />
                  <em>it is something you earn.</em>
                </h2>
                <p className="large-copy">
                  That belief shapes how Pal Ford Haldwani approaches every service appointment, with the goal of keeping customers for years, not just for one transaction.
                </p>
                <p>
                  We believe in earning your trust, visit after visit. That is what has kept Pal Ford Haldwani&apos;s customers coming back for over 15 years.
                </p>
              </div>
              <div className="ford-promise-stats">
                <div className="ford-promise-stat reveal">
                  <strong>
                    Since <span>2009</span>
                  </strong>
                  <p>Serving Ford vehicles in Haldwani</p>
                </div>
                <div className="ford-promise-stat reveal">
                  <strong>
                    Part of <span>SM Pal Group</span>
                  </strong>
                  <p>Trust built since 1982 across multiple industries</p>
                </div>
                <div className="ford-promise-stat reveal">
                  <strong>
                    Pal Ford <span>Haldwani</span>
                  </strong>
                  <p>First SM Pal Group car dealership</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Pal Ford */}
        <section className="ford-why section-pad" id="ford-why">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>07</span>
              <i />
              <span>Why choose Pal Ford Haldwani</span>
            </div>
            <div className="ford-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Pal Ford apart.</em>
              </h2>
            </div>
            <div className="ford-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="ford-why-card reveal"
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
        <section className="ford-faq section-pad" id="ford-faq">
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

        {/* Visit/Contact */}
        <section className="ford-visit section-pad" id="ford-visit">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>08</span>
              <i />
              <span>Visit Pal Ford Haldwani</span>
            </div>
            <div className="ford-visit-grid reveal">
              <aside className="ford-visit-facts">
                <div className="ford-visit-fact">
                  <span>01</span>
                  <strong>Address</strong>
                  <p>Pal Prateek Motors Pvt Ltd<br />Rampur Road, near Palam City<br />Rampur, Nainital<br />Haldwani, Uttarakhand 263139</p>
                </div>
                <div className="ford-visit-fact">
                  <span>02</span>
                  <strong>Phone</strong>
                  <a href="tel:+919045599277">+91 90455 99277</a>
                </div>
                <div className="ford-visit-fact">
                  <span>03</span>
                  <strong>Email</strong>
                  <a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a>
                </div>
              </aside>
              <div className="ford-visit-copy">
                <p className="eyebrow eyebrow-dark">Get in touch</p>
                <h2>
                  Ready to keep
                  <br />
                  <em>your Ford on the road?</em>
                </h2>
                <p className="large-copy">
                  Whether you need routine servicing, a complex repair, or are looking to buy a new Ford, Pal Ford Haldwani is here to help. Reach out to the team or visit the dealership to get started.
                </p>
                <a className="button button-brass ford-visit-cta" href="/contact">
                  Start a conversation <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="ford-explore section-pad">
          <div className="container">
            <div className="ford-section-label reveal">
              <span>09</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="ford-explore-intro reveal">
              <p className="large-copy">
                To see the full picture of SM Pal Group&apos;s automotive presence, visit our <a className="inline-link" href="/industries/car-dealerships/pal-skoda-haldwani">Pal Skoda Haldwani</a> and <a className="inline-link" href="/industries/car-dealerships/pal-nissan-haldwani">Pal Nissan Haldwani</a> pages, or explore the wider group story on our <a className="inline-link" href="/about/the-pal-group">SM Pal Group page</a>.
              </p>
            </div>
            <div className="ford-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="ford-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="ford-explore-card-top">
                    <span className="ford-explore-eyebrow">{item.eyebrow}</span>
                    <span className="ford-explore-label">{item.label}</span>
                  </div>
                  <span className="ford-explore-arrow" aria-hidden="true">
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


export default PalFordPage;
