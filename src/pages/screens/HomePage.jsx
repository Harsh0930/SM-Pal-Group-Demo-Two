import ResponsiveImage from '../../components/ResponsiveImage.jsx';
import { imageUrl } from '../../components/ResponsiveImage.jsx';
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

function HomePage() {
  const [storyIndex, setStoryIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const [loadedSlides, setLoadedSlides] = useState([0]);

  useEffect(() => {
    // Prepare the next slide without competing with the first paint.
    const warmup = window.setTimeout(() => {
      const next = (activeHeroImage + 1) % heroImages.length;
      const image = new Image();
      image.fetchPriority = 'low';
      image.src = imageUrl(heroImages[next], window.innerWidth * Math.min(devicePixelRatio, 2));
      image.onload = () => setLoadedSlides(slides => slides.includes(next) ? slides : [...slides, next]);
    }, 3000);
    return () => window.clearTimeout(warmup);
  }, [activeHeroImage]);

  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveHeroImage((current) => (current + 1) % heroImages.length),
      6000,
    );
    return () => window.clearInterval(interval);
  }, []);

  const story = stories[storyIndex];
  const journeyStage = journeyStages[activeJourney];
  const nextStory = () =>
    setStoryIndex((current) => (current + 1) % stories.length);
  const previousStory = () =>
    setStoryIndex((current) => (current - 1 + stories.length) % stories.length);

  return (
    <div id="top" className="home-page">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <RouteHeader />

      <main id="main">
        <span id="story" className="anchor-target" aria-hidden="true" />
        <section className="hero">
          <div
            className="hero-images"
            role="img"
            aria-label="Images representing SM Pal Group's four business verticals"
          >
            {heroImages.map((image, index) => (
              <ResponsiveImage
                className={`hero-image ${activeHeroImage === index ? "is-active" : ""}`}
                key={image}
                src={loadedSlides.includes(index) ? image : undefined}
                sizes="100vw"
                loading="eager"
                fetchPriority={index === 0 ? "high" : "low"}
                alt=""
                aria-label={`Background image ${index + 1} representing SM Pal Group business`}
              />
            ))}
          </div>
          <div className="hero-overlay" />
          <div className="container hero-content reveal">
            <div className="hero-primary">
              <p className="eyebrow">
                Haldwani, Uttarakhand <span /> Since 1982
              </p>

              <h1>
                SM Pal Group,
                <em className="heading-shimmer">
                  {' '}
                  A legacy of trust across real estate, car dealerships, frozen
                  foods and pal stone industries
                </em>
              </h1>

              <div className="hero-badges" aria-label="SM Pal Group focus areas">
                <span>Infrastructure</span>
                <span>Real Estate</span>
                <span>Frozen Foods</span>
                <span>Automotive</span>
              </div>

              <div className="hero-actions">
                <a className="button button-brass" href="#businesses">
                  Explore Our Industries <ArrowDownRight size={17} />
                </a>
                <a className="button button-outline" href="/contact">
                  Contact SM Pal Group <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>

          <div className="scroll-cue">
            <span /> Scroll to explore
          </div>
        </section>

        <section className="intro section-pad">
          <div className="container intro-grid">
            <div className="section-label reveal">
              <span>01</span>
              <i />
            </div>
            <div className="intro-copy reveal">
              <p className="eyebrow eyebrow-dark">Our story</p>
              <h2>Our story</h2>
              <p className="large-copy">
                SM Pal Group's journey began in 1982 with the founding of Pal
                Stone Industries, a supplier of quality raw materials, stone,
                and grit from its crushing unit. Over
                four decades in the industry, Pal Stone Industries went on to
                complete notable projects for clients including the Gokul Dam
                Project and Indian Railways, building a reputation for
                reliability across the Kumaon region of Uttarakhand.
              </p>
              <p className="intro-detail">
                That foundation of trust became the springboard for
                diversification. Today, SM Pal Group operates across four
                verticals: real estate development, delivering premium
                residential and commercial projects; frozen foods, through its
                Pal Fresh and Frozzo brands; car dealerships, in partnership
                with leading car manufacturers; and continued leadership in
                stone and construction materials for major infrastructure
                projects.
              </p>
              <p className="intro-detail">
                Across every vertical, SM Pal Group remains guided by the same
                principles that built the company in 1982: transparency,
                quality, and a genuinely customer-centric way of doing business.
                You can read the longer version of this journey, including the
                wider Pal Group family of companies, on our{' '}
                <a className="inline-link" href="/about/the-pal-group">
                  SM Pal Group
                </a>{' '}
                page.
              </p>
              <a className="text-link" href="/about/the-pal-group">
                Read our full story <ArrowRight size={17} />
              </a>
            </div>
            <div className="intro-stat reveal">
              <strong>1982</strong>
              <span>
                where the
                <br />
                journey began
              </span>
              <div className="stat-line" />
              <small>
                Serving India
                <br />
                with purpose
              </small>
            </div>
          </div>
        </section>

        {/* <section className="journey section-pad" id="journey">
        <div className="container">
          <div className="journey-heading reveal">
            <div><p className="eyebrow eyebrow-dark">Our journey</p><h2>One legacy.<br /><em>Built in chapters.</em></h2></div>
            <p>Explore the milestones that carried SM Pal Group from a single stone unit to a diversified group serving Kumaon.</p>
          </div>
          <div className="journey-spotlight reveal" aria-live="polite">
            <p>Selected milestone</p><strong>{journeyStage.year}</strong>
            <div><span>{journeyStage.label}</span><h3>{journeyStage.title}</h3><p>{journeyStage.summary}</p></div>
            <ArrowRight size={22} aria-hidden="true" />
          </div>
          <div className="journey-track reveal" aria-label="SM Pal Group milestones">
            {journeyStages.map((stage, index) => <button className={`journey-card ${activeJourney === index ? 'is-active' : ''}`} type="button" key={stage.title} onClick={() => setActiveJourney(index)} aria-pressed={activeJourney === index} style={{ '--offset': `${index % 2 === 0 ? 0 : 38}px`, '--delay': `${index * 70}ms` }}><span className="journey-card-number">0{index + 1}</span><ResponsiveImage src={stage.image} alt={stage.alt} loading="lazy" /><span className="journey-card-overlay" /><span className="journey-card-copy"><strong>{stage.label}</strong><small>{stage.title}</small></span></button>)}
          </div>
        </div>
      </section> */}

        <section className="businesses section-pad" id="businesses">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow eyebrow-dark">Our industries</p>
                <h2>Our industries</h2>
              </div>
              <p>
                SM Pal Group operates across four distinct industries, each with
                its own dedicated brand, team, and track record.
              </p>
            </div>
            <div className="business-grid">
              {businesses.map((business, index) => (
                <article
                  className="business-card reveal"
                  style={{ "--delay": `${index * 80}ms` }}
                  key={business.name}
                >
                  <a
                    className="business-card-link"
                    href={businessRoutes[index]}
                    aria-label={`Explore ${business.name}`}
                  >
                    <div className={`card-image${business.isLogo ? " card-image-logo" : ""}`}>
                      <ResponsiveImage
                        src={business.image}
                        alt={business.name}
                        loading="lazy"
                      />
                      <span>0{index + 1}</span>
                    </div>
                    <div className="card-body">
                      <p className="card-category">{business.category}</p>
                      <h3>{business.name}</h3>
                      <p>{business.text}</p>
                      <span className="card-cta">
                        Explore <ArrowUpRight size={17} />
                      </span>
                    </div>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="story-redundant" aria-hidden="true"></section>

        <section className="chairman section-pad">
          <div className="container chairman-grid">
            <div className="chairman-image reveal">
              <ResponsiveImage
                src="/assets/Chairman.webp"
                alt="Shri Suresh Pal, chairman and founder of SM Pal Group"
                width="5504"
                height="8156"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="chairman-copy reveal">
              <p className="eyebrow eyebrow-dark">
                The person behind the purpose
              </p>
              <h2>
                Leadership with
                <br />
                <em>long-term vision.</em>
              </h2>
              <p className="large-copy">
                The chairman and founder of SM Pal Group began the journey in
                1982 with Pal Stone Industries at Halduchaur, Haldwani. His
                belief in transparent relationships, dependable quality and
                customer-first service continues to guide the group today.
              </p>
              <p className="intro-detail">
                From a single stone-crushing unit to a trusted multi-industry
                business house, the group's growth has been shaped by the
                conviction that enduring businesses are built with patience,
                integrity and care for the communities they serve.
              </p>
              <p className="chairman-signature">
                Chairman & Founder
                <br />
                <strong>SM Pal Group</strong>
              </p>
              <a className="text-link" href="/about/ownership">
                Meet our chairman <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="awards section-pad" id="awards">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow eyebrow-dark">Awards and Recognition</p>
                <h2>Awards and Recognition</h2>
              </div>
              <p>
                SM Pal Group's commitment to quality has been recognized across
                its verticals.
              </p>
            </div>
            <div className="award-list">
              {awards.map((award, index) => (
                <a className="award-item reveal" href={award.href} key={award.vertical}>
                  <span>0{index + 1}</span>
                  <div>
                    <p className="award-vertical">{award.vertical}</p>
                    <h3>{award.title}</h3>
                    <p className="award-detail">{award.detail}</p>
                  </div>
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="news section-pad">
          <div className="container">
            <div className="section-heading reveal">
              <div>
                <p className="eyebrow eyebrow-dark">Latest at SM Pal Group</p>
                <h2>Latest at SM Pal Group</h2>
              </div>
            </div>
            <div className="news-list">
              {news.map((item, index) => (
                <article
                  className={`news-item${index === 0 ? " news-item--latest" : ""}`}
                  key={item}
                >
                  <span>0{index + 1}</span>
                  <h3>
                    {item}
                    {index === 0 && <span className="news-latest-badge">Latest</span>}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="community section-pad">
          <div className="container community-grid">
            <div className="community-image reveal">
              <ResponsiveImage
                src="/assets/meera-pal.jpg"
                alt="Community gathering celebrating together"
                loading="lazy"
              />
            </div>
            <div className="community-copy reveal">
              <p className="eyebrow eyebrow-dark">Community at SM Pal Group</p>
              <h2>Community at SM Pal Group</h2>
              <p className="large-copy">
                SM Pal Group's presence in Haldwani extends beyond business. In
                March, the group marked Women's Day by celebrating the strength,
                dignity, and contribution of the women within its organization
                and community — a moment led by Meera Pal Ji, a reflection of
                the values the group carries into its day-to-day operations.
                From temple inaugurations at Palam City to ceremonies marking new
                project launches, SM Pal Group treats every milestone as a
                shared moment with the community it serves.
              </p>
              <a className="text-link" href="/about">
                See our community work <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="faq section-pad">
          <div className="container faq-grid">
            <div className="reveal">
              <p className="eyebrow eyebrow-dark">Frequently asked questions</p>
              <h2>Frequently asked questions</h2>
            </div>
            <div className="faq-list">
              {[
                [
                  "What is SM Pal Group?",
                  "SM Pal Group is a Haldwani-based business house operating across real estate, car dealerships, frozen foods, and stone & construction materials, serving the Kumaon region of Uttarakhand since 1982.",
                ],
                [
                  "When was SM Pal Group established?",
                  "SM Pal Group traces its origins to 1982, with the founding of Pal Stone Industries as a stone and grit supplier in Halduchaur, Haldwani.",
                ],
                [
                  "What industries does SM Pal Group operate in?",
                  "SM Pal Group operates across four verticals: real estate development (Pal Colonisers), frozen foods (Pal Fresh and Frozzo), car dealerships (Pal Skoda, Pal Nissan, and Pal Ford), and stone & construction materials (Pal Stone Industries).",
                ],
                [
                  "Where is SM Pal Group located?",
                  "SM Pal Group is headquartered in Haldwani, Uttarakhand, and primarily serves the Kumaon region.",
                ],
                [
                  "What car brands does SM Pal Group deal in?",
                  "SM Pal Group's vertical includes car dealerships for Skoda, Nissan, and Ford, offering vehicle sales and after-sales service in Haldwani.",
                ],
                [
                  "What frozen food brands does SM Pal Group own?",
                  "SM Pal Group's frozen foods vertical, Pal Frozen Foods, operates two brands: Pal Fresh (frozen vegetables) and Frozzo (frozen snacks).",
                ],
              ].map(([question, answer]) => (
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

        {/* <section className="insights section-pad" id="insights"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow eyebrow-dark">The latest</p><h2>Ideas worth<br /><em>sharing.</em></h2></div><a className="text-link" href="#contact">View all insights <ArrowRight size={17} /></a></div><div className="insight-grid">{insights.map((insight, index) => <article className="insight-card reveal" style={{ '--delay': `${index * 80}ms` }} key={insight.title}><div className="insight-image"><ResponsiveImage src={insight.image} alt="" loading="lazy" /></div><div className="insight-meta"><span>{insight.date}</span><span>{insight.category}</span></div><h3>{insight.title}</h3><a href="#contact" aria-label={`Read ${insight.title}`}><ArrowUpRight size={18} /></a></article>)}</div></div></section> */}

        {/* <section className="visit section-pad"><div className="container visit-grid"><div className="reveal"><p className="eyebrow eyebrow-dark">Visit SM Pal Group</p><h2>Visit SM Pal Group</h2></div><div className="visit-copy reveal"><p className="large-copy">SM Pal Group is based in Haldwani, Uttarakhand, and serves customers across the Kumaon region through its real estate projects, dealership showrooms, and distribution network for Pal Fresh and Frozzo.</p><p className="intro-detail">To get in touch with a specific vertical, real estate, car dealerships, frozen foods, or stone supply, visit the relevant business page or contact the team directly.</p><div className="hero-actions"><a className="button button-brass" href="#businesses">Explore All Businesses <ArrowRight size={17} /></a><a className="text-link" href="#contact">Contact Us <ArrowRight size={17} /></a></div></div></div></section> */}
      </main>

      <Footer />
    </div>
  );
}


export default HomePage;
