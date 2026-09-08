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

const chairmanImage = "/assets/hero-gradient-images/chairman-banner-gradient.webp";
const siteUrl = "https://smpalgroup.com";
const aboutSeo = {
  title: "About SM Pal Group | Haldwani Business Group Since 1982",
  description:
    "Learn about SM Pal Group, a Haldwani-based business group founded in 1982 with interests in stone, real estate, automotive, frozen foods and agriculture.",
  canonicalPath: "/about",
  image:
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  imageAlt: "Modern business architecture representing SM Pal Group",
};
const aboutFaqSchema = [
  [
    "Who founded SM Pal Group?",
    "SM Pal Group was founded in 1982 by Shri Suresh Pal, who remains at the forefront of the business today.",
  ],
  [
    "Where is SM Pal Group based?",
    "SM Pal Group is headquartered in Haldwani, Uttarakhand, and serves customers across the Kumaon region and beyond.",
  ],
  [
    "Who leads SM Pal Group today?",
    "SM Pal Group is led by Shri Suresh Pal, Mrs. Meera Pal, and Mr. Prateek Pal, who guide the group growth across all its business verticals.",
  ],
  [
    "What does the SM Pal Group Foundation do?",
    "The SM Pal Group Foundation supports more than 10,000 people every year and runs two educational institutes that offer merit-based education, including to underprivileged students.",
  ],
  [
    "What industries does SM Pal Group operate in?",
    "SM Pal Group operates across stone and construction materials, real estate, frozen foods, agriculture, and car dealerships through its group businesses and brands.",
  ],
];

function setHeadMeta(attribute, name, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function AboutSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${aboutSeo.canonicalPath}`;
    document.title = aboutSeo.title;
    setHeadMeta("name", "description", aboutSeo.description);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", aboutSeo.title);
    setHeadMeta("property", "og:description", aboutSeo.description);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", aboutSeo.image);
    setHeadMeta("property", "og:image:alt", aboutSeo.imageAlt);
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", aboutSeo.title);
    setHeadMeta("name", "twitter:description", aboutSeo.description);
    setHeadMeta("name", "twitter:image", aboutSeo.image);
    setHeadMeta("name", "twitter:image:alt", aboutSeo.imageAlt);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "SM Pal Group",
          url: `${siteUrl}/`,
          logo: `${siteUrl}/assets/sm-pal-group-logo.webp`,
          foundingDate: "1982",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Haldwani",
            addressRegion: "Uttarakhand",
            addressCountry: "IN",
          },
        },
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          name: "SM Pal Group",
          url: `${siteUrl}/`,
          publisher: { "@id": `${siteUrl}/#organization` },
        },
        {
          "@type": "AboutPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: "About SM Pal Group: Transforming Lives for a Better Future",
          description: aboutSeo.description,
          isPartOf: { "@id": `${siteUrl}/#website` },
          about: { "@id": `${siteUrl}/#organization` },
          breadcrumb: { "@id": `${canonicalUrl}#breadcrumb` },
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${canonicalUrl}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: `${siteUrl}/`,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "About Us",
              item: canonicalUrl,
            },
          ],
        },
        {
          "@type": "FAQPage",
          mainEntity: aboutFaqSchema.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    };
    const oldSchema = document.head.querySelector('script[data-seo="about"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "about";
    schema.text = JSON.stringify(structuredData);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalGroupSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/about/the-pal-group`;
    const pageTitle = "SM Pal Group | A Multi-Industry Legacy Since 1982";
    const pageDescription = "SM Pal Group is a diversified conglomerate spanning real estate, healthcare, education, infrastructure, food and car dealerships. Explore our family of businesses.";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", aboutSeo.image);
    setHeadMeta("property", "og:image:alt", "Modern business architecture representing SM Pal Group's growth");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", aboutSeo.image);
    setHeadMeta("name", "twitter:image:alt", "Modern business architecture representing SM Pal Group's growth");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Is The Pal Group the same as SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The Pal Group and SM Pal Group refer to the same founding family enterprise, established in 1982 by Shri Suresh Pal in Haldwani. SM Pal Group is the name used across this website and our customer facing businesses, while The Pal Group refers to the same group in its broader, original form."
          }
        },
        {
          "@type": "Question",
          "name": "How many businesses are part of SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM Pal Group's core businesses include Pal Stone Industries, Pal Colonisers, Pal Frozen Foods, and its car dealerships. The wider Pal Group family also includes more than a dozen additional brands across healthcare, education, infrastructure, consulting, manufacturing, media, retail, and pharmaceuticals."
          }
        },
        {
          "@type": "Question",
          "name": "What is Brij Lal Hospital's connection to SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Brij Lal Hospital and Research Centre, along with Kaya Hospital, is part of the wider Pal Group family of businesses, reflecting the group's expansion into healthcare alongside its founding industries."
          }
        },
        {
          "@type": "Question",
          "name": "Who leads SM Pal Group and The Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shri Suresh Pal founded the group in 1982 and continues to lead it today, with over 45+ years of business experience guiding its growth across every industry it now operates in."
          }
        },
        {
          "@type": "Question",
          "name": "Where is SM Pal Group headquartered?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM Pal Group and The Pal Group are both headquartered in Haldwani, Uttarakhand, the city where the group's first business began."
          }
        }
      ]
    };
    const oldSchema = document.head.querySelector('script[data-seo="pal-group"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "pal-group";
    schema.text = JSON.stringify(structuredData);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function OwnershipSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/about/ownership`;
    const pageTitle =
      "Shri Suresh Pal | Owner and Chairman of SM Pal Group";
    const pageDescription =
      "Meet Shri Suresh Pal, founder and chairman of SM Pal Group. Discover the vision, leadership and 45+ years journey behind Haldwani's most trusted business name.";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "profile");
    setHeadMeta("property", "og:image", chairmanImage);
    setHeadMeta("property", "og:image:alt", "Shri Suresh Pal, Founder and Chairman of SM Pal Group");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", chairmanImage);
    setHeadMeta("name", "twitter:image:alt", "Shri Suresh Pal, Founder and Chairman of SM Pal Group");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is the owner of SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shri Suresh Pal is the owner and chairman of SM Pal Group. He founded the company in 1982 and continues to lead it today."
          }
        },
        {
          "@type": "Question",
          "name": "When did Shri Suresh Pal found SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, starting with a stone supply business that later grew into a group spanning real estate, car dealerships, and frozen foods."
          }
        },
        {
          "@type": "Question",
          "name": "What businesses has Shri Suresh Pal built under SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shri Suresh Pal has built Pal Stone Industries, Pal Colonisers, a network of car dealerships, and Pal Frozen Foods, each reflecting a different stage of his entrepreneurial journey since 1982."
          }
        },
        {
          "@type": "Question",
          "name": "What is Shri Suresh Pal's vision for SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Shri Suresh Pal's guiding vision is transforming lives for a better future, a philosophy that shapes SM Pal Group's culture of collaboration, trust, and community focused growth."
          }
        }
      ]
    };
    const oldSchema = document.head.querySelector('script[data-seo="ownership"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "ownership";
    schema.text = JSON.stringify(structuredData);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function BoardSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/about/board-of-directors`;
    const pageTitle = "SM Pal Group | Meet Our Board of Directors";
    const pageDescription =
      "Meet the board of directors at SM Pal Group, led by Chairman Shri Suresh Pal alongside Meera Pal, Prateek Pal and Tushika Pal. Discover our leadership team today.";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", chairmanImage);
    setHeadMeta("property", "og:image:alt", "Board of Directors of SM Pal Group");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", chairmanImage);
    setHeadMeta("name", "twitter:image:alt", "Board of Directors of SM Pal Group");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who is on the board of directors at SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "SM Pal Group's board includes Chairman Suresh Pal, along with directors Meera Pal, Prateek Pal, and Tushika Pal."
          }
        },
        {
          "@type": "Question",
          "name": "Who is the chairman of SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Suresh Pal is the chairman of SM Pal Group. He founded the company in 1982 and continues to lead it today."
          }
        },
        {
          "@type": "Question",
          "name": "How can I get in touch with SM Pal Group's leadership?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You can reach SM Pal Group's leadership team through our Contact Us page."
          }
        }
      ]
    };
    const oldSchema = document.head.querySelector('script[data-seo="board"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "board";
    schema.text = JSON.stringify(structuredData);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PrateekSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/about/prateek-pal`;
    const pageTitle = "Prateek Pal | Leading SM Pal Group's Growth";
    const pageDescription =
      "Meet Prateek Pal, director at SM Pal Group. Discover how he expanded Pal Fresh, Frozzo and Pal Colonisers into new markets while carrying his father's legacy.";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "profile");
    setHeadMeta("property", "og:image", `${siteUrl}/assets/prateek-pal-images/prateek-pal-banner.webp`);
    setHeadMeta("property", "og:image:alt", "Prateek Pal, Director at SM Pal Group");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", `${siteUrl}/assets/prateek-pal-images/prateek-pal-banner.webp`);
    setHeadMeta("name", "twitter:image:alt", "Prateek Pal, Director at SM Pal Group");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const structuredData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Prateek Pal's role at SM Pal Group?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prateek Pal is a director at SM Pal Group, where he has led the expansion of Pal Frozen Foods into the Pal Fresh and Frozzo brands, and guided Pal Colonisers into apartment construction for the first time."
          }
        },
        {
          "@type": "Question",
          "name": "What inspired Prateek Pal's work with Pal Frozen Foods?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Prateek Pal's move to expand Pal Frozen Foods came from time spent studying in Europe, where he saw rising demand for convenience food and brought that insight back to grow the business beyond frozen peas."
          }
        },
        {
          "@type": "Question",
          "name": "Has Prateek Pal expanded SM Pal Group internationally?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Under his leadership, SM Pal Group's frozen food business moved into international markets, work that continues through Pal Fresh Global Trading LLC."
          }
        }
      ]
    };
    const oldSchema = document.head.querySelector('script[data-seo="prateek"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "prateek";
    schema.text = JSON.stringify(structuredData);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalFreshSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/industries/pal-frozen-foods/pal-fresh`;
    const pageTitle = "Pal Fresh - Premium Frozen Vegetables | Pal Frozen Foods";
    const pageDescription =
      "Pal Fresh by Pal Frozen Foods offers premium IQF frozen vegetables grown on Uttarakhand farms since 2013. Explore our range for retail, HoReCa and export today.";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=1600&q=85");
    setHeadMeta("property", "og:image:alt", "Pal Fresh premium IQF frozen vegetables from Uttarakhand");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=1600&q=85");
    setHeadMeta("name", "twitter:image:alt", "Pal Fresh premium IQF frozen vegetables from Uttarakhand");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is Pal Fresh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Fresh is a frozen vegetable brand under Pal Frozen Foods, launched in 2013, offering IQF frozen vegetables grown through direct farmer partnerships in Uttarakhand."
        }
      }, {
        "@type": "Question",
        "name": "What does IQF mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "IQF stands for Individually Quick Frozen, a freezing method that freezes each piece of vegetable separately and rapidly to preserve its taste, texture, and nutrition."
        }
      }, {
        "@type": "Question",
        "name": "What products does Pal Fresh offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Fresh offers seven frozen vegetable products: frozen green peas, frozen mix veg, frozen soya chaap, frozen cauliflower, frozen cut beans, frozen broccoli, and frozen sweet corn."
        }
      }, {
        "@type": "Question",
        "name": "Is Pal Fresh available for both home and business use?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pal Fresh serves both retail customers looking for everyday convenience and HoReCa businesses, including hotels, restaurants, and catering services, that need consistent quality at scale."
        }
      }]
    };
    const oldSchema = document.head.querySelector('script[data-seo="pal-fresh"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "pal-fresh";
    schema.text = JSON.stringify(faqSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalFreshGlobalSeo() {
  useEffect(() => {
    const pageTitle = "Pal Fresh Global Trading LLC | Dubai, UAE";
    const pageDescription = "Pal Fresh Global Trading LLC is SM Pal Group's Dubai based venture, bringing Pal Fresh quality to UAE and global markets. Discover Pal Fresh Global today.";
    const canonicalUrl = `${siteUrl}/industries/pal-fresh-global-trading`;
    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta("name", "robots", "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1");
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", "/assets/pal-frozen.webp");
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);
    return () => {};
  }, []);
  return null;
}

function FrozzoSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/industries/pal-frozen-foods/frozzo`;
    const pageTitle = "Frozzo | From Our Farms to Your Freezer";
    const pageDescription =
      "Frozzo brings premium RTF/RTE frozen snacks made with authentic Indian spices and veggies, frozen fresh with IQF technology. Discover Frozzo's range today.";
    const heroImage = "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", heroImage);
    setHeadMeta("property", "og:image:alt", "Frozzo premium RTF and RTE frozen snacks");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", heroImage);
    setHeadMeta("name", "twitter:image:alt", "Frozzo premium RTF and RTE frozen snacks");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is Frozzo?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Frozzo is a premium frozen snack brand launched in 2021 under Pal Frozen Foods, offering ready to fry and ready to eat snacks made with Indian spices and vegetables."
        }
      }, {
        "@type": "Question",
        "name": "What does RTF and RTE mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RTF stands for ready to fry and RTE stands for ready to eat, meaning Frozzo's snacks are prepared in advance so you can cook or eat them with minimal extra effort."
        }
      }, {
        "@type": "Question",
        "name": "How are Frozzo snacks made?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Frozzo snacks are made using vegetables sourced through contract farming and frozen using IQF technology, which freezes each piece quickly to preserve flavor and texture."
        }
      }, {
        "@type": "Question",
        "name": "Is Frozzo related to Pal Fresh?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Frozzo and Pal Fresh are sister brands under Pal Frozen Foods, with Pal Fresh focused on frozen vegetables and Frozzo focused on frozen snacks."
        }
      }]
    };
    const oldSchema = document.head.querySelector('script[data-seo="frozzo"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "frozzo";
    schema.text = JSON.stringify(faqSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalSkodaSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/industries/car-dealerships/pal-skoda-haldwani`;
    const pageTitle = "Pal Skoda Haldwani | Performance Meets Luxury";
    const pageDescription =
      "Pal Skoda Haldwani, established in 2023, brings the latest Skoda models to Uttarakhand. Visit Pal Skoda for expert sales, financing and service today.";
    const heroImage = "/assets/hero-gradient-images/pal-skoda-gradient.jpeg";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", heroImage);
    setHeadMeta("property", "og:image:alt", "Pal Skoda Haldwani showroom and latest Skoda models");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", heroImage);
    setHeadMeta("name", "twitter:image:alt", "Pal Skoda Haldwani showroom and latest Skoda models");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What Skoda models does Pal Skoda Haldwani offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Skoda Haldwani offers a range of Skoda models, including the Kushaq, Kylaq, Kodiaq, and Slavia, giving buyers in Haldwani a genuine choice across performance and price points."
        }
      }, {
        "@type": "Question",
        "name": "When was Pal Skoda Haldwani established?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Skoda Haldwani was established in 2023 under Pal Prateek Automobiles LLP, making it the newest of SM Pal Group's car dealerships."
        }
      }, {
        "@type": "Question",
        "name": "Does Pal Skoda Haldwani offer financing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pal Skoda Haldwani supports customers through the financing process as part of its sales experience, alongside after-sales service and genuine spare parts."
        }
      }, {
        "@type": "Question",
        "name": "Where is Pal Skoda Haldwani located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Skoda Haldwani is located at Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139."
        }
      }]
    };
    const oldSchema = document.head.querySelector('script[data-seo="pal-skoda"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "pal-skoda";
    schema.text = JSON.stringify(faqSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalNissanSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/industries/car-dealerships/pal-nissan-haldwani`;
    const pageTitle = "Pal Nissan Haldwani | Innovation, Performance and Trust";
    const pageDescription =
      "Pal Nissan Haldwani, trusted since 2011, offers the latest Nissan car models with expert sales, service and genuine parts. Visit Pal Nissan for a seamless experience.";
    const heroImage = "/assets/pal-nissan.webp";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", heroImage);
    setHeadMeta("property", "og:image:alt", "Pal Nissan Haldwani showroom and latest Nissan models");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", heroImage);
    setHeadMeta("name", "twitter:image:alt", "Pal Nissan Haldwani showroom and latest Nissan models");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What Nissan models does Pal Nissan Haldwani offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Nissan Haldwani offers a range of Nissan models, including the Tekton, Gravite, and Magnite, giving buyers in Haldwani a genuine choice across performance and price points."
        }
      }, {
        "@type": "Question",
        "name": "When was Pal Nissan Haldwani established?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Nissan Haldwani was established in 2011 as part of SM Pal Group's expansion into car dealerships, and has grown into one of the most trusted Nissan dealerships in Uttarakhand since then."
        }
      }, {
        "@type": "Question",
        "name": "Does Pal Nissan Haldwani offer financing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pal Nissan Haldwani supports customers through the financing process as part of its sales experience, alongside after-sales service and genuine spare parts."
        }
      }, {
        "@type": "Question",
        "name": "Where is Pal Nissan Haldwani located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Nissan Haldwani is located at Palam City, Devalchaur, Opposite Pal Ford, Rampur Road, Haldwani, 263139."
        }
      }]
    };
    const oldSchema = document.head.querySelector('script[data-seo="pal-nissan"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "pal-nissan";
    schema.text = JSON.stringify(faqSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalFordSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/industries/car-dealerships/pal-ford-haldwani`;
    const pageTitle = "Pal Ford Haldwani | Power, Performance and Trust";
    const pageDescription =
      "Pal Ford Haldwani, trusted since 2009, offers expert Ford servicing, genuine parts and reliable repairs. Visit Pal Ford for professional care you can count on.";
    const heroImage = "/assets/journeywall-images/pal-ford-opening-haldwani-ceremony.webp";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", heroImage);
    setHeadMeta("property", "og:image:alt", "Pal Ford Haldwani service center and Ford vehicles");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", heroImage);
    setHeadMeta("name", "twitter:image:alt", "Pal Ford Haldwani service center and Ford vehicles");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "When was Pal Ford Haldwani established?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Ford Haldwani was established in 2009, making it the first of SM Pal Group's car dealerships."
        }
      }, {
        "@type": "Question",
        "name": "Does Pal Ford Haldwani offer car servicing?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pal Ford Haldwani is built primarily around expert Ford servicing and maintenance, using genuine parts and technicians trained specifically on Ford models."
        }
      }, {
        "@type": "Question",
        "name": "Can I buy a new car at Pal Ford Haldwani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Alongside its service center, Pal Ford Haldwani also supports new car sales and delivery."
        }
      }, {
        "@type": "Question",
        "name": "Does Pal Ford serve areas outside Haldwani?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pal Ford's presence extends into the wider Kumaon region, including Almora, alongside its main Haldwani location."
        }
      }]
    };
    const oldSchema = document.head.querySelector('script[data-seo="pal-ford"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "pal-ford";
    schema.text = JSON.stringify(faqSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

function PalStoneSeo() {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}/industries/pal-stone-industries`;
    const pageTitle = "Pal Stone Industries | Premium Stone & Grit Since 1982";
    const pageDescription =
      "Pal Stone Industries has supplied premium stone and grit since 1982, from Indian Railways to the Gokul Dam project. Explore our sustainable materials today.";
    const heroImage = "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=85";

    document.title = pageTitle;
    setHeadMeta("name", "description", pageDescription);
    setHeadMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setHeadMeta("property", "og:title", pageTitle);
    setHeadMeta("property", "og:description", pageDescription);
    setHeadMeta("property", "og:url", canonicalUrl);
    setHeadMeta("property", "og:type", "website");
    setHeadMeta("property", "og:image", heroImage);
    setHeadMeta("property", "og:image:alt", "Pal Stone Industries premium stone and grit quarry");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", heroImage);
    setHeadMeta("name", "twitter:image:alt", "Pal Stone Industries premium stone and grit quarry");

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", canonicalUrl);

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "What is Pal Stone Industries?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Stone Industries is SM Pal Group's founding business, established in 1982, supplying natural and crushed stone, grit, and sand for construction and infrastructure projects."
        }
      }, {
        "@type": "Question",
        "name": "What materials does Pal Stone Industries supply?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Stone Industries supplies natural materials in 8 mm, 10 mm, and 20 mm sizes along with pea gravel, as well as crushed stone in 10 mm, 20 mm, 40 mm, and 65 mm sizes and crushed sand."
        }
      }, {
        "@type": "Question",
        "name": "What major projects has Pal Stone Industries worked on?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pal Stone Industries has supplied stone and grit to Indian Railways and carried out civil works for the Gokul Dam Project, two of the milestones that shaped the business's growth."
        }
      }, {
        "@type": "Question",
        "name": "Does Pal Stone Industries offer sustainable materials?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Pal Stone Industries has expanded into eco-friendly and sustainable stone solutions to meet growing demand for environmentally conscious construction practices."
        }
      }]
    };
    const oldSchema = document.head.querySelector('script[data-seo="pal-stone"]');
    if (oldSchema) oldSchema.remove();
    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.dataset.seo = "pal-stone";
    schema.text = JSON.stringify(faqSchema);
    document.head.appendChild(schema);

    return () => schema.remove();
  }, []);

  return null;
}

// Data constants (insights, legacyMoments, journeyStages) are imported from
// ../data/aboutContent.js.


export { setHeadMeta, AboutSeo, PalGroupSeo, OwnershipSeo, BoardSeo, PrateekSeo, PalFreshSeo, PalFreshGlobalSeo, FrozzoSeo, PalSkodaSeo, PalNissanSeo, PalFordSeo, PalStoneSeo };
