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

function PalFreshPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".pal-fresh-page .reveal");
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

  const products = [
    {
      name: "Frozen Green Peas",
      image: "/assets/pal-fresh-products/green-peas.png",
      text: "A pantry staple that works in everything from curries to fried rice, frozen at peak sweetness so you get consistent quality no matter the season.",
    },
    {
      name: "Frozen Mix Veg",
      image: "/assets/pal-fresh-products/mix-veg.png",
      text: "A ready-to-cook blend for quick meals, sabzis, and stir-fries, saving the chopping and prep work without giving up freshness.",
    },
    {
      name: "Frozen Soya Chaap",
      image: "/assets/pal-fresh-products/soya-chaap.png",
      text: "A protein-rich option that has become a popular base for both home cooking and restaurant menus, frozen to stay ready whenever you need it.",
    },
    {
      name: "Frozen Cauliflower",
      image: "/assets/pal-fresh-products/cauliflower.png",
      text: "Cut and frozen for easy use in curries, stir-fries, or roasted dishes, without the trimming and cleaning fresh cauliflower usually demands.",
    },
    {
      name: "Frozen Cut Beans",
      image: "/assets/pal-fresh-products/cut-beans.png",
      text: "Pre-cut and ready to cook, useful for everything from simple side dishes to larger batch cooking in commercial kitchens.",
    },
    {
      name: "Frozen Broccoli",
      image: "/assets/pal-fresh-products/broccoli.png",
      text: "A versatile option for salads, stir-fries, and healthier meal planning, frozen to hold onto its texture and nutrition.",
    },
    {
      name: "Frozen Sweet Corn",
      image: "/assets/pal-fresh-products/sweet-corn.png",
      text: "A ready-to-use ingredient for salads, soups, and snacks, sweet and consistent whether you buy it in January or June.",
    },
  ];

  const whyChoose = [
    {
      title: "Grown close to home.",
      text: "Direct farmer partnerships in Uttarakhand mean quality control starts at the source, not at the factory door.",
    },
    {
      title: "Frozen at its best.",
      text: "IQF technology locks in freshness at the moment of harvest, not days later.",
    },
    {
      title: "Built for both kitchens.",
      text: "From home cooking to commercial HoReCa use, Pal Fresh is made to work at any scale.",
    },
    {
      title: "Backed by a trusted group.",
      text: "Pal Fresh is part of Pal Frozen Foods, one of the founding businesses of SM Pal Group.",
    },
  ];

  const faqs = [
    [
      "What is Pal Fresh?",
      "Pal Fresh is a frozen vegetable brand under Pal Frozen Foods, launched in 2013, offering IQF frozen vegetables grown through direct farmer partnerships in Uttarakhand.",
    ],
    [
      "What does IQF mean?",
      "IQF stands for Individually Quick Frozen, a freezing method that freezes each piece of vegetable separately and rapidly to preserve its taste, texture, and nutrition.",
    ],
    [
      "What products does Pal Fresh offer?",
      "Pal Fresh offers seven frozen vegetable products: frozen green peas, frozen mix veg, frozen soya chaap, frozen cauliflower, frozen cut beans, frozen broccoli, and frozen sweet corn.",
    ],
    [
      "Is Pal Fresh available for both home and business use?",
      "Yes. Pal Fresh serves both retail customers looking for everyday convenience and HoReCa businesses, including hotels, restaurants, and catering services, that need consistent quality at scale.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Brand", label: "Frozzo", href: "/industries/pal-frozen-foods/frozzo" },
    { eyebrow: "Vertical", label: "Pal Frozen Foods", href: "/about/the-pal-group" },
    { eyebrow: "Vertical", label: "Pal Farms", href: "/industries/pal-farms" },
    { eyebrow: "Trading", label: "Pal Fresh Global", href: "/industries/pal-fresh-global-trading" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  return (
    <div className="route-page industry-brand pal-fresh-page">
      <PalFreshSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="pf-hero mobile-photo-hero">
          <ResponsiveImage
            src="/assets/hero-gradient-images/palfresh-banner-gradient.webp"
            alt="Pal Fresh IQF frozen vegetables grown on partner farms in Uttarakhand"
          />
          <div className="pf-hero-shade" />
          <div className="container pf-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Pal Fresh frozen vegetables,
              <br />
              <em>grown and frozen with care</em>
            </h1>
            <p className="pf-hero-intro">
              Pal Fresh frozen vegetables start on real farms in Uttarakhand, not in a warehouse. Since 2013, Pal Fresh has worked directly with local farmers to grow, freeze, and deliver vegetables that hold onto their taste and nutrition, whether you are cooking at home or running a commercial kitchen.
            </p>
            <div className="pf-hero-actions">
              <a className="button button-brass" href="#pf-products">
                Explore our products <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="pf-hero-mark">
            <strong>
              2013
            </strong>
            <p>IQF frozen vegetables from Uttarakhand</p>
          </div>
        </section>

        {/* About Pal Fresh */}
        <section className="pf-about section-pad" id="pf-about">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>01</span>
              <i />
              <span>About Pal Fresh</span>
            </div>
            <div className="pf-about-grid reveal">
              <div className="pf-about-copy">
                <h2>
                  If you control the
                  <br />
                  <em>growing, you control the quality.</em>
                </h2>
                <p className="large-copy">
                  Pal Fresh came into existence in 2013 under Pal Frozen Foods, built around a simple idea: if you control the growing, you control the quality. That is why Pal Fresh works directly with farmers across Uttarakhand, growing much of its own produce rather than sourcing it at a distance.
                </p>
                <p>
                  Over more than a decade, that approach has taken Pal Fresh from a local operation into a brand that now reaches both retail and HoReCa (hotel, restaurant, and catering) customers, expanding from Uttarakhand into markets well beyond it. You can read more about the group&apos;s farming roots on our <a className="inline-link" href="/industries/pal-farms">Pal Farms page</a>.
                </p>
                <a className="text-link" href="/industries/pal-farms">
                  Explore Pal Farms <ArrowRight size={17} />
                </a>
              </div>
              <aside className="pf-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">Pal Frozen Foods</a>
                <p>One of the founding businesses of SM Pal Group, headquartered in Haldwani, Uttarakhand.</p>
                <div className="pf-about-line" />
                <small>Part of the <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a> family of businesses.</small>
              </aside>
            </div>
          </div>
        </section>

        {/* How vegetables are grown and frozen */}
        <section className="pf-iqf section-pad" id="pf-iqf">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>02</span>
              <i />
              <span>How Pal Fresh vegetables are grown and frozen</span>
            </div>
            <div className="pf-iqf-grid reveal">
              <div className="pf-iqf-copy">
                <p className="eyebrow eyebrow-dark">The IQF approach</p>
                <h2>
                  Grown on partner farms,
                  <br />
                  <em>frozen at peak quality.</em>
                </h2>
                <p className="large-copy">
                  Every Pal Fresh vegetable follows the same basic journey, grown on partner farms in Uttarakhand, then processed using IQF technology.
                </p>
              </div>
              <div className="pf-iqf-detail">
                <p>
                  <strong>IQF stands for Individually Quick Frozen,</strong> a method that freezes each piece of vegetable separately and rapidly, rather than freezing everything together in a block. That matters because it locks in flavor and texture closer to the moment of harvest, and it means you can pour out exactly the amount you need without breaking apart a frozen clump.
                </p>
                <p>
                  It is the same freezing standard used by frozen food brands globally, and it is the standard Pal Fresh has built its entire product range around.
                </p>
              </div>
            </div>
            <div className="pf-iqf-pillars">
              <div className="pf-iqf-pillar reveal">
                <span>01</span>
                <h3>Source</h3>
                <p>Partner farms across Uttarakhand grow the produce that becomes Pal Fresh.</p>
              </div>
              <div className="pf-iqf-pillar reveal">
                <span>02</span>
                <h3>Freeze</h3>
                <p>IQF technology locks in flavor and texture closer to the moment of harvest.</p>
              </div>
              <div className="pf-iqf-pillar reveal">
                <span>03</span>
                <h3>Pack</h3>
                <p>Each piece frozen separately, so you use exactly the amount you need.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product range */}
        <section className="pf-products section-pad" id="pf-products" aria-labelledby="pf-products-title">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>03</span>
              <i />
              <span>Our Pal Fresh product range</span>
            </div>
            <div className="pf-section-intro reveal">
              <h2 id="pf-products-title">
                Seven frozen vegetables,
                <br />
                <em>one shared standard.</em>
              </h2>
              <p className="large-copy">
                Pal Fresh currently offers seven frozen vegetable products, each processed and frozen using the same IQF approach.
              </p>
            </div>
            <div className="pf-packet-grid">
              {products.map((product, index) => (
                <article
                  className="pf-packet-card"
                  key={product.name}
                >
                  <div className="pf-packet-image">
                    <ResponsiveImage
                      src={product.image}
                      alt={`Pal Fresh ${product.name.replace(/^Frozen /, "")} packet`}
                      width={1080}
                      height={1080}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pf-packet-copy">
                    <div className="pf-packet-label"><span>Pal Fresh</span><span aria-hidden="true">0{index + 1}</span></div>
                    <h3>{product.name}</h3>
                    <p>{product.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Retail and HoReCa */}
        <section className="pf-audience section-pad" id="pf-audience">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>04</span>
              <i />
              <span>Pal Fresh for retail and HoReCa</span>
            </div>
            <div className="pf-audience-grid">
              <div className="pf-audience-card reveal">
                <span>Retail</span>
                <h3>Convenience without compromise.</h3>
                <p>
                  For retail customers, Pal Fresh means convenience without compromise, vegetables that are ready when you are, without sacrificing the taste of fresh produce.
                </p>
                <a className="pf-audience-link" href="/contact">
                  Where to buy <ArrowUpRight size={15} />
                </a>
              </div>
              <div className="pf-audience-card pf-audience-card-dark reveal">
                <span>HoReCa</span>
                <h3>Consistency at scale.</h3>
                <p>
                  For HoReCa customers, hotels, restaurants, and catering businesses, Pal Fresh means consistency at scale. A commercial kitchen cannot afford ingredients that vary from batch to batch, and IQF freezing is built specifically to solve that problem.
                </p>
                <a className="pf-audience-link" href="/contact">
                  Enquire for HoReCa <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Behind the scenes — bento image tiles */}
        <section className="pf-bento section-pad" id="pf-bento">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>05</span>
              <i />
              <span>Pal Fresh, behind the scenes</span>
            </div>
            <div className="pf-bento-intro reveal">
              <h2>
                From Uttarakhand
                <br />
                <em>to your kitchen.</em>
              </h2>
              <p className="large-copy">
                A glimpse of how Pal Fresh gets from our partner farms in Uttarakhand to kitchens and homes across the country.
              </p>
            </div>
            <div className="pf-bento-grid reveal">
              <figure className="pf-bento-tile pf-bento-tile-1">
                <ResponsiveImage
                  src="/assets/pal-fresh-images/broccoli-image.webp"
                  alt="Uttarakhand farmland where Pal Fresh vegetables are grown"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-2">
                <ResponsiveImage
                  src="/assets/pal-fresh-images/farmersowing-image.webp?auto=format&fit=crop&w=900&q=85"
                  alt="Fresh vegetables sorted and washed for processing"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-3">
                <ResponsiveImage
                  src="/assets/pal-fresh-images/greenpeas-image.webp?auto=format&fit=crop&w=900&q=85"
                  alt="Vegetables frozen with IQF technology"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-4">
                <ResponsiveImage
                  src="/assets/pal-fresh-images/mixveg-image.webp?auto=format&fit=crop&w=900&q=85"
                  alt="Pal Fresh retail packs ready for distribution"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-5">
                <ResponsiveImage
                  src="https://images.unsplash.com/photo-1607301406259-dfb186e15de8?auto=format&fit=crop&w=1400&q=85"
                  alt="Pal Fresh vegetables prepared in a restaurant kitchen"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-6">
                <ResponsiveImage
                  src="/assets/pal-fresh-images/processing-line-image.webp?auto=format&fit=crop&w=900&q=85"
                  alt="Fresh vegetables being prepared for cooking"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-7">
                <ResponsiveImage
                  src="/assets/pal-fresh-images/processingline-image.webp?auto=format&fit=crop&w=900&q=85"
                  alt="Pal Fresh vegetable products on display"
                  loading="lazy"
                />
              </figure>
            </div>
          </div>
        </section>

        {/* From Uttarakhand to the world */}
        <section className="pf-reach section-pad" id="pf-reach">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>06</span>
              <i />
              <span>From Uttarakhand to the world</span>
            </div>
            <div className="pf-reach-grid reveal">
              <div>
                <p className="eyebrow eyebrow-dark">The journey beyond</p>
                <h2>
                  Started on a handful
                  <br />
                  <em>of farms in Uttarakhand.</em>
                </h2>
              </div>
              <div className="pf-reach-copy">
                <p className="large-copy">
                  Pal Fresh&apos;s story started with a handful of farms in Uttarakhand, but it has not stayed there. Over the past decade, the brand has grown from a local supplier into one that reaches both domestic and international markets, a journey that continues today through <a className="inline-link" href="/industries/pal-fresh-global-trading">Pal Fresh Global Trading LLC</a>, the group&apos;s dedicated arm for international trade.
                </p>
                <a className="text-link" href="/industries/pal-fresh-global-trading">
                  Explore Pal Fresh Global Trading LLC <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Pal Fresh */}
        <section className="pf-why section-pad" id="pf-why">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>07</span>
              <i />
              <span>Why choose Pal Fresh</span>
            </div>
            <div className="pf-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Pal Fresh apart.</em>
              </h2>
            </div>
            <div className="pf-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="pf-why-card reveal"
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
        <section className="pf-faq section-pad" id="pf-faq">
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

        {/* Explore more from Pal Frozen Foods */}
        <section className="pf-explore section-pad">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>08</span>
              <i />
              <span>Explore more from Pal Frozen Foods</span>
            </div>
            <div className="pf-explore-intro reveal">
              <p className="large-copy">
                To see the rest of the Pal Frozen Foods lineup, check out <a className="inline-link" href="/industries/pal-frozen-foods/frozzo">Frozzo</a> for frozen snacks, or visit the <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a> page for the full story behind both brands. You can also learn more about where the produce comes from on our <a className="inline-link" href="/industries/pal-farms">Pal Farms page</a>, or explore <a className="inline-link" href="/industries/pal-fresh-global-trading">Pal Fresh Global Trading LLC</a> for our international reach.
              </p>
            </div>
            <div className="pf-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="pf-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="pf-explore-card-top">
                    <span className="pf-explore-eyebrow">{item.eyebrow}</span>
                    <span className="pf-explore-label">{item.label}</span>
                  </div>
                  <span className="pf-explore-arrow" aria-hidden="true">
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


export default PalFreshPage;
