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

function PalNissanPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".pal-nissan-page .reveal");
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

  const models = [
    {
      name: "Tekton",
      tagline: "Power and precision.",
      description: "The Tekton embodies Nissan's commitment to engineering excellence, delivering robust performance and advanced technology for the roads of Uttarakhand.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Gravite",
      tagline: "Elegant efficiency.",
      description: "Gravite blends sophisticated design with class-leading efficiency, offering a refined driving experience that combines style with sustainability.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Magnite",
      tagline: "Bold inside and out.",
      description: "A compact SUV with bold styling, a comfortable cabin, and practical features, designed to bring confidence and convenience to everyday journeys.",
      // Official model imagery: https://www.nissan.in/vehicles/new/nissan-magnite.html
      image: "/assets/nissan-magnite.jpg",
    },
  ];

  const services = [
    {
      title: "Choosing your Nissan",
      text: "The team helps you compare models and trims so you land on the right fit, not just the nearest one.",
    },
    {
      title: "Financing your purchase",
      text: "Pal Nissan Haldwani offers support through the financing process, helping make ownership more accessible.",
    },
    {
      title: "After-sales and service",
      text: "Once you own your Nissan, the dealership's dedicated service center handles maintenance using genuine Nissan parts, so your car stays in top condition.",
    },
  ];

  const whyChoose = [
    {
      title: "Genuine Nissan experience",
      text: "Every model at Pal Nissan Haldwani is chosen to give you a real blend of performance, comfort, and safety, the same combination Nissan is known for globally.",
    },
    {
      title: "Personal approach",
      text: "What sets the experience apart is how personal it stays. The team works with you directly, from picking the right model through to the ownership experience that follows.",
    },
    {
      title: "Backed by SM Pal Group",
      text: "Pal Nissan Haldwani operates as part of SM Pal Group, a business built on trust since 1982, holding itself to the same standard of customer care found across every SM Pal Group business.",
    },
    {
      title: "Dedicated service team",
      text: "From the sales team helping you find the right model to the service staff keeping your car running well after purchase, everyone is focused on making sure your experience feels genuinely taken care of.",
    },
  ];

  const faqs = [
    [
      "What Nissan models does Pal Nissan Haldwani offer?",
      "Pal Nissan Haldwani offers a range of Nissan models, including the Tekton, Gravite, and Magnite, giving buyers in Haldwani a genuine choice across performance and price points.",
    ],
    [
      "When was Pal Nissan Haldwani established?",
      "Pal Nissan Haldwani was established in 2011, marking SM Pal Group's expansion into the Nissan franchise and bringing over a decade of customer service to Uttarakhand.",
    ],
    [
      "Does Pal Nissan Haldwani offer financing?",
      "Yes. Pal Nissan Haldwani supports customers through the financing process as part of its sales experience, alongside after-sales service and genuine Nissan spare parts.",
    ],
    [
      "Where is Pal Nissan Haldwani located?",
      "Pal Nissan Haldwani is located at Palam City, Devalchaur, Opp. Pal Ford, Rampur Road, Haldwani - 263139.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Dealership", label: "Pal Skoda Haldwani", href: "/industries/car-dealerships/pal-skoda-haldwani" },
    { eyebrow: "Dealership", label: "Pal Ford Haldwani", href: "/industries/car-dealerships/pal-ford-haldwani" },
    { eyebrow: "Group", label: "SM Pal Group", href: "/about/the-pal-group" },
    { eyebrow: "Leadership", label: "Prateek Pal", href: "/about/prateek-pal" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  return (
    <div className="route-page industry-brand pal-nissan-page">
      <PalNissanSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="nissan-hero mobile-photo-hero">
          <ResponsiveImage
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1920&q=85"
            alt="Pal Nissan Haldwani showroom featuring latest Nissan models"
          />
          <div className="nissan-hero-grid" aria-hidden="true">
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
          <div className="nissan-hero-shade" />
          <div className="container nissan-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Pal Nissan Haldwani,
              <br />
              <em>innovation, performance and trust.</em>
            </h1>
            <p className="nissan-hero-intro">
              Pal Nissan Haldwani brings Nissan's blend of innovation, performance, and reliability to Uttarakhand, backed by a modern showroom and a dedicated service team. Whether you are choosing your first Nissan or your next one, Pal Nissan Haldwani is built to make the entire journey feel personal, not transactional.
            </p>
            <div className="nissan-hero-actions">
              <a className="button button-brass" href="#nissan-models">
                Explore our models <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="nissan-hero-mark">
            <strong>Since 2011</strong>
            <p>Over a decade of trust</p>
          </div>
        </section>

        {/* About Pal Nissan Haldwani */}
        <section className="nissan-about section-pad" id="nissan-about">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>01</span>
              <i />
              <span>About Pal Nissan Haldwani</span>
            </div>
            <div className="nissan-about-grid reveal">
              <div className="nissan-about-copy">
                <h2>
                  A new chapter
                  <br />
                  <em>in a long story of trust.</em>
                </h2>
                <p className="large-copy">
                  Pal Nissan Haldwani was established in 2011, marking SM Pal Group's expansion into the Nissan franchise and bringing over a decade of customer service to Uttarakhand. Since then, Pal Nissan Haldwani has grown to become one of the most trusted Nissan dealerships in the region, committed to delivering exceptional vehicle ownership experiences backed by the reputation of SM Pal Group, nurtured since 1982.
                </p>
                <p>
                  The Nissan experience at Pal Nissan Haldwani is built around one simple idea: every model is chosen to give you a genuine blend of performance, comfort, and safety — the same combination Nissan is known for globally. What sets the experience apart is how personal it stays. The team at Pal Nissan Haldwani works with you directly, from picking the right model for your needs, through financing, and into the ownership experience that follows.
                </p>
              </div>
              <aside className="nissan-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a>
                <p>Pal Nissan Haldwani operates as part of SM Pal Group, a business built on trust since 1982.</p>
                <div className="nissan-about-line" />
                <small>Established <strong>2011</strong>, SM Pal Group franchise</small>
              </aside>
            </div>
          </div>
        </section>

        {/* Nissan Models */}
        <section className="nissan-models section-pad" id="nissan-models">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>02</span>
              <i />
              <span>The Nissan experience</span>
            </div>
            <div className="nissan-section-intro reveal">
              <h2>
                Performance,
                <br />
                <em>elegance and innovation.</em>
              </h2>
              <p className="large-copy">
                Every model at Pal Nissan Haldwani has been chosen to give you a genuine blend of performance, comfort, and safety. The Tekton and Gravite represent Nissan's latest advancements in automotive engineering, designed for the roads of Uttarakhand.
              </p>
            </div>
            <div className="nissan-models-grid">
              {models.map((model, index) => (
                <article
                  className="nissan-model-card reveal"
                  key={model.name}
                  style={{ "--delay": `${index * 100}ms` }}
                >
                  <div className="nissan-model-image">
                    <ResponsiveImage src={model.image} alt={`Nissan ${model.name}`} loading="lazy" />
                  </div>
                  <div className="nissan-model-copy">
                    <span className="nissan-model-tagline">{model.tagline}</span>
                    <h3>Nissan {model.name}</h3>
                    <p>{model.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sales, Financing, After-sales */}
        <section className="nissan-services section-pad" id="nissan-services">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>03</span>
              <i />
              <span>Sales, financing and after-sales support</span>
            </div>
            <div className="nissan-section-intro reveal">
              <h2>
                Buying a car is
                <br />
                <em>rarely just one decision.</em>
              </h2>
              <p className="large-copy">
                Pal Nissan Haldwani is set up to support you through each stage of it, from choosing your Nissan to keeping it running well after purchase.
              </p>
            </div>
            <div className="nissan-services-grid">
              {services.map((service, index) => (
                <div
                  className="nissan-service-card reveal"
                  key={service.title}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span className="nissan-service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="nissan-team section-pad" id="nissan-team">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>04</span>
              <i />
              <span>Meet the Pal Nissan team</span>
            </div>
            <div className="nissan-team-grid reveal">
              <div className="nissan-team-copy">
                <h2>
                  The people who
                  <br />
                  <em>make it work.</em>
                </h2>
                <p className="large-copy">
                  The people at Pal Nissan Haldwani are what make the showroom experience work. From the sales team helping you find the right model, to the service staff keeping your car running well after purchase, everyone here is focused on one thing — making sure your experience with Pal Nissan Haldwani feels genuinely taken care of.
                </p>
              </div>
              <div className="nissan-team-visual">
                <div className="nissan-team-card">
                  <ResponsiveImage
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85"
                    alt="Pal Nissan Haldwani sales team"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our promise */}
        <section className="nissan-promise section-pad" id="nissan-promise">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>05</span>
              <i />
              <span>Our promise to every Pal Nissan customer</span>
            </div>
            <div className="nissan-promise-grid reveal">
              <div className="nissan-promise-copy">
                <p className="eyebrow eyebrow-dark">Built on trust</p>
                <h2>
                  Customer satisfaction is not something you claim,
                  <br />
                  <em>it is something you earn.</em>
                </h2>
                <p className="large-copy">
                  That belief shapes how Pal Nissan Haldwani approaches every sale and every service appointment, with the aim of turning first-time buyers into long-term customers.
                </p>
                <p>
                  Visit after visit, the team at Pal Nissan Haldwani works to earn that trust — because a car is a big decision, and you deserve the kind of support that makes the whole process feel right.
                </p>
              </div>
              <div className="nissan-promise-stats">
                <div className="nissan-promise-stat reveal">
                  <strong>
                    Since <span>2011</span>
                  </strong>
                  <p>Selling and serving Nissan vehicles in Haldwani</p>
                </div>
                <div className="nissan-promise-stat reveal">
                  <strong>
                    Part of <span>SM Pal Group</span>
                  </strong>
                  <p>Trust built since 1982 across multiple industries</p>
                </div>
                <div className="nissan-promise-stat reveal">
                  <strong>
                    Pal Nissan <span>Haldwani</span>
                  </strong>
                  <p>The trusted Nissan franchise in Uttarakhand</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Pal Nissan */}
        <section className="nissan-why section-pad" id="nissan-why">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>06</span>
              <i />
              <span>Why choose Pal Nissan Haldwani</span>
            </div>
            <div className="nissan-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Pal Nissan apart.</em>
              </h2>
            </div>
            <div className="nissan-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="nissan-why-card reveal"
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
        <section className="nissan-faq section-pad" id="nissan-faq">
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
        <section className="nissan-visit section-pad" id="nissan-visit">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>07</span>
              <i />
              <span>Visit Pal Nissan Haldwani</span>
            </div>
            <div className="nissan-visit-grid reveal">
              <aside className="nissan-visit-facts">
                <div className="nissan-visit-fact">
                  <span>01</span>
                  <strong>Address</strong>
                  <p>Palam City, Devalchaur<br />Opposite Pal Ford, Rampur Road<br />Haldwani, 263139</p>
                </div>
                <div className="nissan-visit-fact">
                  <span>02</span>
                  <strong>Phone</strong>
                  <a href="tel:+919045599277">+91 90455 99277</a>
                </div>
                <div className="nissan-visit-fact">
                  <span>03</span>
                  <strong>Email</strong>
                  <a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a>
                </div>
              </aside>
              <div className="nissan-visit-copy">
                <p className="eyebrow eyebrow-dark">Get in touch</p>
                <h2>
                  Ready to find
                  <br />
                  <em>your Nissan?</em>
                </h2>
                <p className="large-copy">
                  Whether you are ready to visit the showroom or want to speak with the team first, Pal Nissan Haldwani is here to help you find the right vehicle for your needs.
                </p>
                <a className="button button-brass nissan-visit-cta" href="/contact">
                  Start a conversation <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="nissan-explore section-pad">
          <div className="container">
            <div className="nissan-section-label reveal">
              <span>08</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="nissan-explore-intro reveal">
              <p className="large-copy">
                To see the full picture of SM Pal Group's automotive presence, visit our <a className="inline-link" href="/industries/car-dealerships/pal-skoda-haldwani">Pal Skoda Haldwani</a> and <a className="inline-link" href="/industries/car-dealerships/pal-ford-haldwani">Pal Ford Haldwani</a> pages, or explore the wider group story on our <a className="inline-link" href="/about/the-pal-group">SM Pal Group page</a>.
              </p>
            </div>
            <div className="nissan-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="nissan-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="nissan-explore-card-top">
                    <span className="nissan-explore-eyebrow">{item.eyebrow}</span>
                    <span className="nissan-explore-label">{item.label}</span>
                  </div>
                  <span className="nissan-explore-arrow" aria-hidden="true">
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


export default PalNissanPage;
