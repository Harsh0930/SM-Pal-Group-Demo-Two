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

function PalSkodaPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".pal-skoda-page .reveal");
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
      name: "Kushaq",
      tagline: "Built for the bold.",
      description: "A midsize SUV crafted for Indian roads, combining confident design with practical space and advanced safety features.",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Kylaq",
      tagline: "Compact, capable.",
      description: "Skoda's compact SUV brings the brand's signature quality to a new segment, built for buyers who want practicality without compromise.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Kodiaq",
      tagline: "Space for every journey.",
      description: "A seven-seater SUV built for families who want Skoda's comfort and capability at scale, ready for highways and beyond.",
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=85",
    },
    {
      name: "Slavia",
      tagline: "Elegance in every drive.",
      description: "A midsize sedan that pairs distinctive styling with turbocharged performance and a comfortable cabin, bringing everyday ease to every journey.",
      // Official model imagery: https://www.skoda-auto.co.in/models/slavia/slavia
      image: "/assets/skoda-slavia.webp",
    },
  ];

  const services = [
    {
      title: "Choosing your Skoda",
      text: "The team helps you compare models and trims so you land on the right fit, not just the nearest one.",
    },
    {
      title: "Financing your purchase",
      text: "Pal Skoda Haldwani offers support through the financing process, helping make ownership more accessible.",
    },
    {
      title: "After-sales and service",
      text: "Once you own your Skoda, the dealership's dedicated service center handles maintenance using genuine spare parts, so your car stays in top condition.",
    },
  ];

  const whyChoose = [
    {
      title: "Genuine Skoda experience",
      text: "Every model at Pal Skoda Haldwani is chosen to give you a real blend of performance, comfort, and safety, the same combination Skoda is known for globally.",
    },
    {
      title: "Personal approach",
      text: "What sets the experience apart is how personal it stays. The team works with you directly, from picking the right model through to the ownership experience that follows.",
    },
    {
      title: "Backed by SM Pal Group",
      text: "Pal Skoda Haldwani operates as part of SM Pal Group, a business built on trust since 1982, holding itself to the same standard of customer care found across every SM Pal Group business.",
    },
    {
      title: "Dedicated service team",
      text: "From the sales team helping you find the right model to the service staff keeping your car running well after purchase, everyone is focused on making sure your experience feels genuinely taken care of.",
    },
  ];

  const faqs = [
    [
      "What Skoda models does Pal Skoda Haldwani offer?",
      "Pal Skoda Haldwani offers a range of Skoda models, including the Kushaq, Kylaq, Kodiaq, and Slavia, giving buyers in Haldwani a genuine choice across performance and price points.",
    ],
    [
      "When was Pal Skoda Haldwani established?",
      "Pal Skoda Haldwani was established in 2023 under Pal Prateek Automobiles LLP, making it the newest of SM Pal Group's car dealerships.",
    ],
    [
      "Does Pal Skoda Haldwani offer financing?",
      "Yes. Pal Skoda Haldwani supports customers through the financing process as part of its sales experience, alongside after-sales service and genuine spare parts.",
    ],
    [
      "Where is Pal Skoda Haldwani located?",
      "Pal Skoda Haldwani is located at Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Dealership", label: "Pal Nissan Haldwani", href: "/industries/car-dealerships/pal-nissan-haldwani" },
    { eyebrow: "Dealership", label: "Pal Ford Haldwani", href: "/industries/car-dealerships/pal-ford-haldwani" },
    { eyebrow: "Group", label: "SM Pal Group", href: "/about/the-pal-group" },
    { eyebrow: "Leadership", label: "Prateek Pal", href: "/about/prateek-pal" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  return (
    <div className="route-page industry-brand pal-skoda-page">
      <PalSkodaSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="skoda-hero mobile-photo-hero">
          <ResponsiveImage
            src="/assets/hero-gradient-images/pal-skoda-gradient.jpeg"
            alt="Pal Skoda Haldwani showroom featuring latest Skoda models"
          />
          <div className="skoda-hero-grid" aria-hidden="true">
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
          <div className="skoda-hero-shade" />
          <div className="container skoda-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Pal Skoda Haldwani,
              <br />
              <em>where performance meets luxury.</em>
            </h1>
            <p className="skoda-hero-intro">
              Pal Skoda Haldwani brings Skoda&apos;s blend of performance, luxury, and safety to Uttarakhand, backed by a modern showroom and a dedicated service team. Whether you are choosing your first Skoda or your next one, Pal Skoda Haldwani is built to make the entire journey feel personal, not transactional.
            </p>
            <div className="skoda-hero-actions">
              <a className="button button-brass" href="#skoda-models">
                Explore our models <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="skoda-hero-mark">
            <strong>2023</strong>
            <p>Newest SM Pal Group dealership</p>
          </div>
        </section>

        {/* About Pal Skoda Haldwani */}
        <section className="skoda-about section-pad" id="skoda-about">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>01</span>
              <i />
              <span>About Pal Skoda Haldwani</span>
            </div>
            <div className="skoda-about-grid reveal">
              <div className="skoda-about-copy">
                <h2>
                  A new chapter
                  <br />
                  <em>in a long story of trust.</em>
                </h2>
                <p className="large-copy">
                  Pal Skoda Haldwani was established in 2023 under Pal Prateek Automobiles LLP, becoming the newest addition to SM Pal Group&apos;s car dealerships. You can read more about the leadership behind this venture on our <a className="inline-link" href="/about/prateek-pal">Prateek Pal page</a>.
                </p>
                <p>
                  The Skoda experience at Pal Skoda Haldwani is built around one simple idea: every model is chosen to give you a genuine blend of performance, comfort, and safety — the same combination Skoda is known for globally.
                </p>
                <p>
                  What sets the experience apart is how personal it stays. The team at Pal Skoda Haldwani works with you directly, from picking the right model for your needs, through financing, and into the ownership experience that follows.
                </p>
              </div>
              <aside className="skoda-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a>
                <p>Pal Skoda Haldwani operates as part of SM Pal Group, a business built on trust since 1982.</p>
                <div className="skoda-about-line" />
                <small>Established under <strong>Pal Prateek Automobiles LLP</strong>, 2023.</small>
              </aside>
            </div>
          </div>
        </section>

        {/* Skoda Models */}
        <section className="skoda-models section-pad" id="skoda-models">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>02</span>
              <i />
              <span>Our Skoda models</span>
            </div>
            <div className="skoda-section-intro reveal">
              <h2>
                Performance,
                <br />
                <em>luxury and safety.</em>
              </h2>
              <p className="large-copy">
                Every model at Pal Skoda Haldwani has been chosen to give you a genuine blend of performance, comfort, and safety. Over time, that lineup has included the following models, giving buyers in Haldwani a real range to choose from.
              </p>
            </div>
            <div className="skoda-models-grid">
              {models.map((model, index) => (
                <article
                  className="skoda-model-card reveal"
                  key={model.name}
                  style={{ "--delay": `${index * 100}ms` }}
                >
                  <div className="skoda-model-image">
                    <ResponsiveImage src={model.image} alt={`Skoda ${model.name}`} loading="lazy" />
                  </div>
                  <div className="skoda-model-copy">
                    <span className="skoda-model-tagline">{model.tagline}</span>
                    <h3>Skoda {model.name}</h3>
                    <p>{model.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Sales, Financing, After-sales */}
        <section className="skoda-services section-pad" id="skoda-services">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>03</span>
              <i />
              <span>Sales, financing and after-sales support</span>
            </div>
            <div className="skoda-section-intro reveal">
              <h2>
                Buying a car is
                <br />
                <em>rarely just one decision.</em>
              </h2>
              <p className="large-copy">
                Pal Skoda Haldwani is set up to support you through each stage of it, from choosing your Skoda to keeping it running well after purchase.
              </p>
            </div>
            <div className="skoda-services-grid">
              {services.map((service, index) => (
                <div
                  className="skoda-service-card reveal"
                  key={service.title}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span className="skoda-service-number">0{index + 1}</span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet the team */}
        <section className="skoda-team section-pad" id="skoda-team">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>04</span>
              <i />
              <span>Meet the Pal Skoda team</span>
            </div>
            <div className="skoda-team-grid reveal">
              <div className="skoda-team-copy">
                <h2>
                  The people who
                  <br />
                  <em>make it work.</em>
                </h2>
                <p className="large-copy">
                  The people at Pal Skoda Haldwani are what make the showroom experience work. From the sales team helping you find the right model, to the service staff keeping your car running well after purchase, everyone here is focused on one thing — making sure your experience with Pal Skoda Haldwani feels genuinely taken care of.
                </p>
              </div>
              <div className="skoda-team-visual">
                <div className="skoda-team-card">
                  <ResponsiveImage
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=85"
                    alt="Pal Skoda Haldwani sales team"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our promise */}
        <section className="skoda-promise section-pad" id="skoda-promise">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>05</span>
              <i />
              <span>Our promise to every Pal Skoda customer</span>
            </div>
            <div className="skoda-promise-grid reveal">
              <div className="skoda-promise-copy">
                <p className="eyebrow eyebrow-dark">Built on trust</p>
                <h2>
                  Customer satisfaction is not something you claim,
                  <br />
                  <em>it is something you earn.</em>
                </h2>
                <p className="large-copy">
                  That belief shapes how Pal Skoda Haldwani approaches every sale and every service appointment, with the aim of turning first-time buyers into long-term customers.
                </p>
                <p>
                  Visit after visit, the team at Pal Skoda Haldwani works to earn that trust — because a car is a big decision, and you deserve the kind of support that makes the whole process feel right.
                </p>
              </div>
              <div className="skoda-promise-stats">
                <div className="skoda-promise-stat reveal">
                  <strong>
                    Since <span>2023</span>
                  </strong>
                  <p>Selling and serving Skoda vehicles in Haldwani</p>
                </div>
                <div className="skoda-promise-stat reveal">
                  <strong>
                    Part of <span>SM Pal Group</span>
                  </strong>
                  <p>Trust built since 1982 across multiple industries</p>
                </div>
                <div className="skoda-promise-stat reveal">
                  <strong>
                    Pal Prateek <span>Automobiles LLP</span>
                  </strong>
                  <p>The entity behind Pal Skoda Haldwani</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Pal Skoda */}
        <section className="skoda-why section-pad" id="skoda-why">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>06</span>
              <i />
              <span>Why choose Pal Skoda Haldwani</span>
            </div>
            <div className="skoda-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Pal Skoda apart.</em>
              </h2>
            </div>
            <div className="skoda-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="skoda-why-card reveal"
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
        <section className="skoda-faq section-pad" id="skoda-faq">
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
        <section className="skoda-visit section-pad" id="skoda-visit">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>07</span>
              <i />
              <span>Visit Pal Skoda Haldwani</span>
            </div>
            <div className="skoda-visit-grid reveal">
              <aside className="skoda-visit-facts">
                <div className="skoda-visit-fact">
                  <span>01</span>
                  <strong>Address</strong>
                  <p>Palam City, Devalchaur<br />Opposite Pal Ford, Rampur Road<br />Haldwani, 263139</p>
                </div>
                <div className="skoda-visit-fact">
                  <span>02</span>
                  <strong>Phone</strong>
                  <a href="tel:+919045599277">+91 90455 99277</a>
                </div>
                <div className="skoda-visit-fact">
                  <span>03</span>
                  <strong>Email</strong>
                  <a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a>
                </div>
              </aside>
              <div className="skoda-visit-copy">
                <p className="eyebrow eyebrow-dark">Get in touch</p>
                <h2>
                  Ready to find
                  <br />
                  <em>your Skoda?</em>
                </h2>
                <p className="large-copy">
                  Whether you are ready to visit the showroom or want to speak with the team first, Pal Skoda Haldwani is here to help you find the right vehicle for your needs.
                </p>
                <a className="button button-brass skoda-visit-cta" href="/contact">
                  Start a conversation <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="skoda-explore section-pad">
          <div className="container">
            <div className="skoda-section-label reveal">
              <span>08</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="skoda-explore-intro reveal">
              <p className="large-copy">
                To see the full picture of SM Pal Group&apos;s automotive presence, visit our <a className="inline-link" href="/industries/car-dealerships/pal-nissan-haldwani">Pal Nissan Haldwani</a> and <a className="inline-link" href="/industries/car-dealerships/pal-ford-haldwani">Pal Ford Haldwani</a> pages, or explore the wider group story on our <a className="inline-link" href="/about/the-pal-group">SM Pal Group page</a>.
              </p>
            </div>
            <div className="skoda-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="skoda-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="skoda-explore-card-top">
                    <span className="skoda-explore-eyebrow">{item.eyebrow}</span>
                    <span className="skoda-explore-label">{item.label}</span>
                  </div>
                  <span className="skoda-explore-arrow" aria-hidden="true">
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


export default PalSkodaPage;
