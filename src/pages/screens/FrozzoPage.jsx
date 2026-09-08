import FrozzoIceHero from '../../components/FrozzoIceHero.jsx';
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

function FrozzoPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".frozzo-page .reveal");
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

  const snacks = [
    {
      name: "Crunchy Veggie Stix",
      image: "/assets/frozzo-products/crunchy-veggie-stix.webp",
      text: "Crispy vegetable sticks for sharing plates, after-school snacks, and easy entertaining.",
    },
    {
      name: "Crispy Aloo Tikki",
      image: "/assets/frozzo-products/crispy-aloo-tikki.webp",
      text: "A familiar potato favourite for snack plates, chaat, and evenings around the family table.",
    },
    {
      name: "Cheese Corn Nuggets",
      image: "/assets/frozzo-products/cheese-corn-nuggets.webp",
      text: "Cheese and corn in a bite-sized snack, ready for movie nights and shared platters.",
    },
    {
      name: "Zingy Veggie Patty",
      image: "/assets/frozzo-products/zingy-veggie-patty.webp",
      text: "A vegetable patty for building burgers or serving alongside your favourite dips.",
    },
    {
      name: "Chilli Garlic Nuggets",
      image: "/assets/frozzo-products/chilli-garlic-nuggets.webp",
      text: "Chilli and garlic flavours in a convenient nugget for a lively addition to your snack spread.",
    },
    {
      name: "Hara Bhara Kebab",
      image: "/assets/frozzo-products/hara-bhara-kebab.webp",
      text: "A vegetable kebab for starters, sharing plates, and everyday family snacking.",
    },
  ];

  const whyChoose = [
    {
      title: "Real ingredients, real farmers.",
      text: "Frozzo's contract farming model means quality control starts before the vegetables ever reach the freezer.",
    },
    {
      title: "Frozen at its best.",
      text: "IQF technology preserves flavor and texture instead of dulling it, the difference between a snack that tastes frozen and one that does not.",
    },
    {
      title: "Genuinely convenient.",
      text: "The RTF and RTE format means less prep time without a real trade-off in taste.",
    },
    {
      title: "Available year-round.",
      text: "Frozzo's snacks are not seasonal, so the flavors you like are there whenever you want them.",
    },
  ];

  const faqs = [
    [
      "What is Frozzo?",
      "Frozzo is a premium frozen snack brand launched in 2021 under Pal Frozen Foods, offering ready to fry and ready to eat snacks made with Indian spices and vegetables.",
    ],
    [
      "What does RTF and RTE mean?",
      "RTF stands for ready to fry and RTE stands for ready to eat, meaning Frozzo's snacks are prepared in advance so you can cook or eat them with minimal extra effort.",
    ],
    [
      "How are Frozzo snacks made?",
      "Frozzo snacks are made using vegetables sourced through contract farming and frozen using IQF technology, which freezes each piece quickly to preserve flavor and texture.",
    ],
    [
      "Is Frozzo related to Pal Fresh?",
      "Yes. Frozzo and Pal Fresh are sister brands under Pal Frozen Foods, with Pal Fresh focused on frozen vegetables and Frozzo focused on frozen snacks.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Brand", label: "Pal Fresh", href: "/industries/pal-frozen-foods/pal-fresh" },
    { eyebrow: "Vertical", label: "Pal Frozen Foods", href: "/about/the-pal-group" },
    { eyebrow: "Vertical", label: "Pal Farms", href: "/industries/pal-farms" },
    { eyebrow: "Trading", label: "Pal Fresh Global", href: "/industries/pal-fresh-global-trading" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  return (
    <div className="route-page industry-brand frozzo-page ui-styling">
      <FrozzoSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <FrozzoIceHero eyebrow={page.eyebrow} />

        {/* About Frozzo */}
        <section className="fz-about section-pad" id="fz-about">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>01</span>
              <i />
              <span>About Frozzo</span>
            </div>
            <div className="fz-about-grid reveal">
              <div className="fz-about-copy">
                <h2>
                  Where the taste
                  <br />
                  <em>starts before the freezer.</em>
                </h2>
                <p className="large-copy">
                  Frozzo launched in 2021 as a division of Pal Frozen Foods, building on the same farm-to-freezer approach behind its sister brand, <a className="inline-link" href="/industries/pal-frozen-foods/pal-fresh">Pal Fresh</a>. Where Pal Fresh focuses on frozen vegetables, Frozzo takes that same foundation and turns it into a range of premium frozen snacks, blending Indian spices with vegetables for a genuinely different kind of frozen food.
                </p>
              </div>
              <aside className="fz-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">Pal Frozen Foods</a>
                <p>The food processing division of SM Pal Group, pioneering Uttarakhand's frozen food segment since 2013.</p>
                <div className="fz-about-line" />
                <small>Sister brand to <a className="inline-link" href="/industries/pal-frozen-foods/pal-fresh">Pal Fresh</a>.</small>
              </aside>
            </div>
          </div>
        </section>

        {/* What makes Frozzo different */}
        <section className="fz-iqf section-pad" id="fz-iqf">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>02</span>
              <i />
              <span>What makes Frozzo different</span>
            </div>
            <div className="fz-iqf-grid reveal">
              <div className="fz-iqf-copy">
                <p className="eyebrow eyebrow-dark">The RTF and RTE approach</p>
                <h2>
                  Prep work done.
                  <br />
                  <em>Flavor kept intact.</em>
                </h2>
                <p className="large-copy">
                  Frozzo's range sits in the RTF and RTE category, which stands for ready to fry and ready to eat. In plain terms, that means the prep work is already done for you, snacks that go straight from the freezer to the pan or plate, without sacrificing the taste of something made from scratch.
                </p>
              </div>
              <div className="fz-iqf-detail">
                <p>
                  That taste starts with <strong>real ingredients.</strong> Frozzo works through contract farming, partnering directly with local farmers rather than sourcing at a distance, then uses IQF technology to freeze everything at its freshest. If you want the fuller explanation of how IQF freezing works, our <a className="inline-link" href="/industries/pal-frozen-foods/pal-fresh">Pal Fresh</a> page covers it in detail.
                </p>
              </div>
            </div>
            <div className="fz-iqf-pillars">
              <div className="fz-iqf-pillar reveal">
                <span>01</span>
                <h3>Source</h3>
                <p>Contract farming partnerships put real vegetables at the heart of every Frozzo snack.</p>
              </div>
              <div className="fz-iqf-pillar reveal">
                <span>02</span>
                <h3>Spice</h3>
                <p>Authentic Indian spice blends are mixed in before freezing, so the flavor is built in, not added on.</p>
              </div>
              <div className="fz-iqf-pillar reveal">
                <span>03</span>
                <h3>Freeze</h3>
                <p>IQF technology locks in taste and texture, ready to fry or eat whenever you are.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Frozzo snack range */}
        <section className="fz-products section-pad" id="fz-products" aria-labelledby="fz-products-title">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>03</span>
              <i />
              <span>Our Frozzo snack range</span>
            </div>
            <div className="fz-section-intro reveal">
              <h2 id="fz-products-title">
                Vegetables and authentic
                <br />
                <em>Indian spices, ready to go.</em>
              </h2>
              <p className="large-copy">
                Frozzo's snacks are built around the same idea across the range, vegetables and authentic Indian spices, frozen and ready whenever you are. From quick weeknight snacking to feeding a crowd, the range is designed to make flavorful food genuinely convenient.
              </p>
            </div>
            <div className="fz-packet-grid">
              {snacks.map((snack, index) => (
                <article
                  className="fz-packet-card"
                  key={snack.name}
                >
                  <div className="fz-packet-image">
                    <ResponsiveImage
                      src={snack.image}
                      alt={`Frozzo ${snack.name} packet`}
                      width={1200}
                      height={900}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="fz-packet-copy">
                    <div className="fz-packet-label"><span>Frozzo</span><span aria-hidden="true">0{index + 1}</span></div>
                    <h3>{snack.name}</h3>
                    <p>{snack.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Retail and HoReCa */}
        <section className="fz-audience section-pad" id="fz-audience">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>04</span>
              <i />
              <span>Frozzo for retail and HoReCa</span>
            </div>
            <div className="fz-audience-grid">
              <div className="fz-audience-card reveal">
                <span>Retail</span>
                <h3>Snacks that fit around real life.</h3>
                <p>
                  For retail customers, Frozzo is the answer to a familiar question, what do I serve when there's no time to cook. The RTF and RTE format fits weeknight dinners, last-minute guests, and weekend cravings without compromise.
                </p>
                <a className="fz-audience-link" href="/contact">
                  Where to buy <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="fz-audience-card fz-audience-card-dark reveal">
                <span>HoReCa</span>
                <h3>Consistency for every service.</h3>
                <p>
                  For HoReCa customers, hotels, restaurants, and catering businesses, Frozzo delivers consistent flavor and quick prep at scale. IQF-frozen snacks hold their quality batch after batch, so service runs smoothly even on the busiest nights.
                </p>
                <a className="fz-audience-link" href="/contact">
                  Enquire for HoReCa <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the scenes bento */}
        <section className="fz-bento section-pad" id="fz-bento">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>05</span>
              <i />
              <span>Frozzo, behind the scenes</span>
            </div>
            <div className="fz-bento-intro reveal">
              <h2>
                Spiced, frozen,
                <br />
                <em>ready to serve.</em>
              </h2>
              <p className="large-copy">
                A glimpse of how Frozzo gets from partner farms and authentic Indian kitchens to plates and snack tables everywhere.
              </p>
            </div>
            <div className="fz-bento-grid reveal">
              <figure className="fz-bento-tile fz-bento-tile-1">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=85"
                  alt="Authentic Indian spices used in Frozzo snacks"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-2">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo frozen snacks ready to fry"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-3">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo snacks being prepared in a traditional kitchen"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-4">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo snack served on a plate"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-5">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo retail packs ready for distribution"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-6">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85"
                  alt="Indian snack platter with Frozzo products"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-7">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?auto=format&fit=crop&w=1400&q=85"
                  alt="Frozzo snacks shared at a family table"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* From Uttarakhand to snack tables */}
        <section className="fz-reach section-pad" id="fz-reach">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>06</span>
              <i />
              <span>From Uttarakhand to snack tables everywhere</span>
            </div>
            <div className="fz-reach-grid reveal">
              <div>
                <p className="eyebrow eyebrow-dark">The journey beyond</p>
                <h2>
                  Built on the same
                  <br />
                  <em>foundation as Pal Fresh.</em>
                </h2>
              </div>
              <div className="fz-reach-copy">
                <p className="large-copy">
                  Frozzo's story runs alongside Pal Fresh's, sharing the same farm-to-freezer backbone that comes from being part of <a className="inline-link" href="/about/the-pal-group">Pal Frozen Foods</a> and SM Pal Group. What started with a handful of farms in Uttarakhand now reaches homes, restaurants, and snack tables across the country, with international reach continuing through <a className="inline-link" href="/industries/pal-fresh-global-trading">Pal Fresh Global Trading LLC</a>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Frozzo */}
        <section className="fz-why section-pad" id="fz-why">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>07</span>
              <i />
              <span>Why choose Frozzo</span>
            </div>
            <div className="fz-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Frozzo apart.</em>
              </h2>
            </div>
            <div className="fz-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="fz-why-card reveal"
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

        {/* Backing by Pal Frozen Foods */}
        <section className="fz-backing section-pad" id="fz-backing">
          <div className="container">
            <div className="fz-backing-card reveal">
              <div className="fz-section-label">
                <span>08</span>
                <i />
                <span>Backed by Pal Frozen Foods</span>
              </div>
              <div className="fz-backing-content">
                <h2>
                  The same quality standard
                  <br />
                  <em>across both brands.</em>
                </h2>
                <p>
                  Frozzo is part of <a className="inline-link" href="/about/the-pal-group">Pal Frozen Foods</a>, the food processing division of SM Pal Group, known for pioneering Uttarakhand's frozen food segment. That backing means Frozzo carries the same quality standard as its sister brand, <a className="inline-link" href="/industries/pal-frozen-foods/pal-fresh">Pal Fresh</a>, even though the two serve very different parts of your freezer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="fz-faq section-pad" id="fz-faq">
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

        {/* Explore more */}
        <section className="fz-explore section-pad">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>09</span>
              <i />
              <span>Explore more from Pal Frozen Foods</span>
            </div>
            <div className="fz-explore-intro reveal">
              <p className="large-copy">
                To see the rest of the Pal Frozen Foods lineup, explore <a className="inline-link" href="/industries/pal-frozen-foods/pal-fresh">Pal Fresh</a> for frozen vegetables, or visit the <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a> page for the full story behind both brands. You can also learn more about the group's farming roots on our <a className="inline-link" href="/industries/pal-farms">Pal Farms page</a>.
              </p>
            </div>
            <div className="fz-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="fz-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="fz-explore-card-top">
                    <span className="fz-explore-eyebrow">{item.eyebrow}</span>
                    <span className="fz-explore-label">{item.label}</span>
                  </div>
                  <span className="fz-explore-arrow" aria-hidden="true">
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


export default FrozzoPage;
