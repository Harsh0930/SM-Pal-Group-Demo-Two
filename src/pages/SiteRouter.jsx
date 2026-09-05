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
import PalamViewPage from "./PalamViewPage.jsx";

// Data constants (businesses, heroImages, stories, awards, news, videos) are
// imported from ../data/homeContent.js.
const chairmanImage = "/assets/Chairman.webp";
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
    setHeadMeta("property", "og:image", chairmanImage);
    setHeadMeta("property", "og:image:alt", "Prateek Pal, Director at SM Pal Group");
    setHeadMeta("name", "twitter:card", "summary_large_image");
    setHeadMeta("name", "twitter:title", pageTitle);
    setHeadMeta("name", "twitter:description", pageDescription);
    setHeadMeta("name", "twitter:image", chairmanImage);
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
    const heroImage = "/assets/pal-skoda-gradient.jpeg";

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
          "text": "Pal Skoda Haldwani offers a range of Skoda models, including the Kushaq, Kylaq, and Kodiaq, giving buyers in Haldwani a genuine choice across performance and price points."
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
          "text": "Pal Nissan Haldwani offers a range of Nissan models, including the Tekton and the Gravite, giving buyers in Haldwani genuine choice across performance and price points."
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
    const heroImage = "/assets/ford-opening-in-haldwani.webp";

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

const routePages = {
  "/about": {
    type: "about",
    eyebrow: "About SM Pal Group",
    title: "About SM Pal Group: Transforming Lives for a Better Future",
    intro:
      "When people in Haldwani talk about a business built on trust, SM Pal Group usually comes up first. Founded in 1982 by Shri Suresh Pal, the group has grown from a single stone supply business into a name that touches real estate, car dealerships, frozen foods, and community life across Uttarakhand. Here is the story behind that growth, the people who lead it, and the values that hold it all together.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Established in 1982",
      "Headquartered in Haldwani",
      "Serving the Kumaon region",
    ],
    body: "SM Pal Group operates across several industries, each carrying the same standard of quality and trust the group was built on in 1982. Our industries include Pal Stone Industries, Pal Colonisers, Pal Frozen Foods, Pal Farms, and Car Dealerships (Pal Skoda, Pal Nissan, Pal Ford).",
  },
  "/about/the-pal-group": {
    type: "pal-group",
    eyebrow: "The Pal Group",
    title: "SM Pal Group: A Multi-Industry Legacy Since 1982",
    intro:
      "SM Pal Group began in 1982 with a single stone supply business in Haldwani. More than four decades later, it has grown into a wide family of companies spanning real estate, car dealerships, frozen foods, healthcare, education, infrastructure, media, and more. This page brings that full picture together in one place.",
    image: "/assets/Palam City -1.jpg.webp",
    facts: [
      "Established 1982",
      "Headquartered in Haldwani",
      "45+ years of trust",
    ],
    body: "SM Pal Group began in 1982 with a single stone supply business in Haldwani. More than four decades later, it has grown into a wide family of companies spanning real estate, car dealerships, frozen foods, healthcare, education, infrastructure, media, and more.",
  },
  "/about/ownership": {
    type: "ownership",
    eyebrow: "Owner-Chairman",
    title: "Shri Suresh Pal, owner and chairman of SM Pal Group",
    intro:
      "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, and he still leads it today as owner and chairman. Over more than four decades, he has grown a single stone supply business into a group spanning real estate, automobiles, and frozen foods. Here is a closer look at his journey and the businesses he has built along the way.",
    image: chairmanImage,
    facts: [
      "Shri Suresh Pal",
      "Founder, Owner and Chairman",
      "SM Pal Group, since 1982",
    ],
    body: "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, and he still leads it today as owner and chairman. Over more than four decades, he has grown a single stone supply business into a group spanning real estate, automobiles, and frozen foods.",
  },
  "/about/board-of-directors": {
    type: "board",
    eyebrow: "Leadership",
    title: "Board of directors at SM Pal Group",
    intro:
      "SM Pal Group is guided by a board of directors rooted in the same family that founded the company in 1982. Below, meet the people who lead SM Pal Group's growth across real estate, automobiles, frozen foods, and stone supply today.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Family-led board",
      "Continuity since 1982",
      "Values-driven leadership",
    ],
    body: "SM Pal Group's board brings together four directors, each connected to the legacy Suresh Pal built in 1982.",
  },
  "/about/prateek-pal": {
    type: "prateek",
    eyebrow: "Director",
    title: "Prateek Pal, director at SM Pal Group",
    intro:
      "Prateek Pal serves as a director at SM Pal Group, where he has spent the last several years expanding the businesses his father built into new products and new markets.",
    image: chairmanImage,
    facts: [
      "Prateek Pal",
      "Director, SM Pal Group",
      "Next generation leadership",
    ],
    body: "Prateek Pal is a director at SM Pal Group, part of the family that has led the group since Suresh Pal founded it in 1982. He has said his approach is shaped directly by his father's people first philosophy.",
  },
  "/industries/pal-fresh-global-trading": {
    type: "pal-fresh-global",
    eyebrow: "Industry 01 · Trading",
    title: "Pal Fresh Global\nTrading LLC.",
    intro:
      "Connecting quality products with dependable distribution and a growing network of customers.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Fresh produce and trading",
      "Kumaon-rooted operations",
      "Reliable supply partnerships",
    ],
    body: "Pal Fresh Global Trading LLC extends the group’s commitment to quality into sourcing, trading and distribution. Every relationship is built around consistency, transparency and care.",
  },
  "/industries/pal-frozen-foods/pal-fresh": {
    type: "pal-fresh",
    eyebrow: "Pal Frozen Foods · Brand",
    title: "Pal Fresh.",
    intro:
      "Frozen vegetables that bring dependable quality and everyday convenience to the kitchen.",
    image:
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Seven IQF products",
      "Uttarakhand-grown",
      "Retail and HoReCa",
    ],
    body: "Pal Fresh makes it easier to keep good ingredients close at hand. The brand focuses on convenient frozen vegetables with the quality and reliability customers expect from SM Pal Group.",
  },
  "/industries/pal-frozen-foods/frozzo": {
    type: "frozzo",
    eyebrow: "Pal Frozen Foods · Brand",
    title: "Frozzo.",
    intro:
      "Convenient frozen snacks made for quick moments, shared tables and busy days.",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Frozen snacks",
      "Convenience without compromise",
      "For every shared table",
    ],
    body: "Frozzo brings playful convenience to the frozen foods category. From preparation to packaging, the brand is shaped around taste, ease and the small moments that bring people together.",
  },
  "/industries/pal-farms": {
    type: "industry",
    eyebrow: "Industry 02 · Agriculture",
    title: "Pal Farms.",
    intro:
      "Growing a more connected relationship with land, food and responsible enterprise.",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Responsible cultivation",
      "Closer to the source",
      "Long-term stewardship",
    ],
    body: "Pal Farms represents the group’s interest in responsible, connected growth. It is an evolving part of the portfolio, grounded in respect for the land and the people who work with it.",
  },
  "/industries/pal-stone-industries": {
    type: "pal-stone",
    eyebrow: "Industry 03 · Materials",
    title: "Pal Stone Industries",
    intro:
      "The original foundation of SM Pal Group, supplying quality stone and grit for the region’s infrastructure.",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Founded in 1982",
      "Stone and grit supply",
      "Projects across Kumaon",
    ],
    body: "From its crushing unit at Halduchaur, Haldwani, Pal Stone Industries has built a reputation for reliable materials and delivery. Its work has supported notable projects including the Gokul Dam Project and Indian Railways.",
  },
  "/industries/pal-colonisers/pal-sumeera-residency": {
    type: "project",
    eyebrow: "Pal Colonisers · Residential",
    title: "Pal Sumeera\nResidency.",
    intro:
      "A considered residential address designed around everyday comfort and a sense of belonging.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Residential development",
      "Kichha",
      "Thoughtful community planning",
    ],
    body: "Pal Sumeera Residency brings the Pal Colonisers approach to life: create places that feel dependable, welcoming and designed for the way people want to live.",
  },
  "/industries/pal-colonisers/palam-city": {
    type: "project",
    eyebrow: "Pal Colonisers · Residential",
    title: "Palam City.",
    intro:
      "A growing community in Haldwani, shaped with space for life, connection and the future.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
    facts: ["Residential community", "Haldwani", "Built around shared life"],
    body: "Palam City is a long-term real estate vision rooted in the region. Its homes, spaces and community moments are planned to support the lives that grow there.",
  },
  "/industries/pal-colonisers/palam-view": {
    type: "palam-view",
    eyebrow: "Pal Colonisers · Residential",
    title: "Palam View.",
    intro:
      "Haldwani's most prestigious residential address — where premium living meets breathtaking views and world-class amenities.",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075",
    facts: ["Premium residential", "Haldwani", "World-class amenities"],
    body: "Palam View represents the next chapter of Pal Colonisers' vision: a premium residential destination crafted with modern architecture, sustainable design, and thoughtful amenities for an elevated lifestyle.",
  },
  "/industries/pal-colonisers/pallazio": {
    type: "project",
    eyebrow: "Pal Colonisers · Commercial",
    title: "Pallazio.",
    intro:
      "A contemporary commercial destination for business, retail and everyday discovery.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Commercial development",
      "Purposeful planning",
      "A place to connect",
    ],
    body: "Pallazio extends Pal Colonisers’ focus from homes to commercial spaces. It is conceived as an address where businesses and people can meet, grow and move forward.",
  },
  "/industries/pal-colonisers/eco-town": {
    type: "project",
    eyebrow: "Pal Colonisers · Community",
    title: "Eco Town.",
    intro:
      "A forward-looking community that brings a lighter footprint and better everyday living together.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Community development",
      "Responsible design",
      "Future-focused living",
    ],
    body: "Eco Town reflects the belief that growth and responsibility can share the same address. The project is shaped around practical comfort, connected spaces and a more considered future.",
  },
  "/industries/pal-colonisers/paloma-greens": {
    type: "project",
    eyebrow: "Pal Colonisers · Residential",
    title: "Paloma Greens.",
    intro:
      "A greener residential setting made for calm, connection and a fuller sense of home.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Residential development",
      "Green open spaces",
      "Designed for belonging",
    ],
    body: "Paloma Greens brings nature closer to daily life. The project pairs practical homes with a calmer setting and the dependable service that defines Pal Colonisers.",
  },
  "/industries/pal-colonisers/ram-ji-vihar": {
    type: "project",
    eyebrow: "Pal Colonisers · Residential",
    title: "Ram Ji Vihar.",
    intro:
      "A neighbourhood shaped by trust, familiarity and the simple value of a place to call home.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Residential community",
      "A trusted local address",
      "Built for everyday life",
    ],
    body: "Ram Ji Vihar carries the local, people-first spirit of Pal Colonisers. It is a place planned with care for the routines, relationships and memories that make a neighbourhood matter.",
  },
  "/industries/car-dealerships/pal-skoda-haldwani": {
    type: "pal-skoda",
    eyebrow: "Car Dealerships · Skoda",
    title: "Pal Skoda\nHaldwani.",
    intro:
      "Pal Skoda Haldwani brings Skoda's blend of performance, luxury, and safety to Uttarakhand, backed by a modern showroom and a dedicated service team. Whether you are choosing your first Skoda or your next one, Pal Skoda Haldwani is built to make the entire journey feel personal, not transactional.",
    image: "/assets/pal-skoda-gradient.jpeg",
    facts: ["Skoda sales and service", "Haldwani", "Established in 2023"],
    body: "Pal Skoda Haldwani was established in 2023 under Pal Prateek Automobiles LLP, becoming the newest addition to SM Pal Group's car dealerships. We bring Skoda's blend of performance, luxury, and safety to Uttarakhand with a modern showroom and a dedicated service team.",
  },
  "/industries/car-dealerships/pal-nissan-haldwani": {
    type: "nissan",
    eyebrow: "Car Dealerships · Nissan",
    title: "Pal Nissan\nHaldwani.",
    intro:
      "A trusted Nissan showroom experience, with straightforward advice and support that stays close.",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Nissan sales and service",
      "Haldwani",
      "A complete ownership journey",
    ],
    body: "Pal Nissan combines the confidence of the Nissan range with a local team committed to clear guidance, dependable service and a relationship that lasts beyond the showroom.",
  },
  "/industries/car-dealerships/pal-ford-haldwani": {
    type: "pal-ford",
    eyebrow: "Car Dealerships · Ford",
    title: "Pal Ford\nHaldwani.",
    intro:
      "Power, performance and trust: Pal Ford Haldwani has been keeping Fords on the road across Kumaon since 2009.",
    image: "/assets/ford-opening-in-haldwani.webp",
    facts: ["Ford sales and service", "Haldwani", "First SM Pal Group dealership"],
    body: "Pal Ford Haldwani was established in 2009 as the first of SM Pal Group's car dealerships, and it has grown into one of the most trusted names for Ford service in the Kumaon region.",
  },
  "/media": {
    type: "media",
    eyebrow: "Media room",
    title: "Stories worth\nsharing.",
    intro:
      "News, recognition and stories from the people, places and businesses moving SM Pal Group forward.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
    facts: ["Latest news", "Video stories", "Group updates"],
    body: "Explore the latest announcements, project milestones, launches and community moments from across SM Pal Group.",
  },
  "/contact": {
    type: "contact",
    eyebrow: "Let’s connect",
    title: "Good things\nstart here.",
    intro:
      "Whether you are looking to work with us, join us or simply learn more, we would love to hear from you.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
    facts: [
      "Haldwani, Uttarakhand",
      "hello@smpalgroup.com",
      "Serving the Kumaon region",
    ],
    body: "Reach out to the SM Pal Group team and we will help connect your enquiry with the right business.",
  },
};

const businessRoutes = [
  "/industries/pal-stone-industries",
  "/industries/pal-colonisers/pal-sumeera-residency",
  "/industries/pal-frozen-foods/pal-fresh",
  "/industries/car-dealerships/pal-skoda-haldwani",
];

function Logo({ light = false }) {
  return (
    <a
      className={`logo ${light ? "logo-light" : ""}`}
      href="/"
      aria-label="SM Pal Group home"
    >
      <img src="/assets/smpal-group-logo-white.png" alt="SM Pal Group" />
    </a>
  );
}

function RouteHeader({ showLanguageToggle = false, language, onLanguageChange }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [openIndustrySubmenu, setOpenIndustrySubmenu] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
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
          <a href="/media">Media</a>
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
              <a href="/media" onClick={closeNavigation}>Media</a>
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
    <section className="legacy-wall section-pad" id="legacy">
      <div className="container">
        <div className="legacy-layout reveal">
          <aside className="legacy-panel legacy-foundation">
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
              >
                <img src={moment.image} alt={moment.alt} loading="lazy" />
                <figcaption>{moment.title}</figcaption>
              </figure>
            ))}
            <div className="legacy-center-mark">
              <img
                src="/assets/sm-pal-group-logo.webp"
                alt="SM Pal Group, nurtured since 1982"
              />
            </div>
          </div>
          <aside className="legacy-panel legacy-purpose">
            <p className="eyebrow eyebrow-dark">Our legacy</p>
            <h4>Our Values</h4>
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

function AboutPage({ page }) {
  const businessVerticals = [
    {
      name: "Pal Stone Industries",
      category: "Stone & construction materials",
      text: "Our founding business, supplying premium stone and grit for major infrastructure projects.",
      href: "/industries/pal-stone-industries",
      image: "/assets/our-verticals-images/pal stone.png",
    },
    {
      name: "Pal Colonisers",
      category: "Real estate",
      text: "Modern residential projects including Pal Sumeera Residency, Palam City, Pallazio, Eco Town, Paloma Greens and Ram Ji Vihar.",
      href: "/industries/pal-colonisers/pal-sumeera-residency",
      image: "/assets/our-verticals-images/coloniser.png",
    },
    {
      name: "Pal Frozen Foods",
      category: "Food & trading",
      text: "Home to Pal Fresh frozen vegetables and Frozzo frozen snacks, with Pal Fresh Global Trading LLC extending our international reach.",
      href: "/industries/pal-frozen-foods/pal-fresh",
      image: "/assets/our-verticals-images/pal frozen foods.png",
    },
    {
      name: "Car Dealerships",
      category: "Automotive",
      text: "Including Pal Skoda Haldwani, Pal Nissan Haldwani and Pal Ford Haldwani.",
      href: "/industries/car-dealerships/pal-skoda-haldwani",
      image: "/assets/our-verticals-images/skoda.png",
    },
  ];
  const values = [
    [
      "People First",
      "Our strength lies in valuing and empowering people, while building a culture of respect and collaboration.",
    ],
    [
      "Integrity",
      "Honesty, transparency, and ethical practice form the foundation of everything we do.",
    ],
    [
      "Customer-Centric Approach",
      "We put customer needs first, delivering seamless service, real innovation, and consistent quality.",
    ],
    [
      "Excellence",
      "We aim to meet the highest global standards in every product and service we offer.",
    ],
    [
      "Commitment",
      "We hold ourselves to these values with dedication, so that trust and satisfaction follow in everything we do.",
    ],
  ];
  const faqs = [
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
      "SM Pal Group is led by Shri Suresh Pal, Mrs. Meera Pal, and Mr. Prateek Pal, who guide the group’s growth across all its business verticals.",
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
  return (
    <div className="route-page about-page">
      <AboutSeo />
      <RouteHeader />
      <main>
        <section className="about-hero">
          <img
            src={page.image}
            alt="Modern architecture representing SM Pal Group's growth"
          />
          <div className="route-hero-shade" />
          <div className="container about-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Transforming lives for a <em>better future.</em>
            </h1>
            <p>{page.intro}</p>
            <a className="button button-brass" href="#about-story">
              Explore our story <ArrowDownRight size={17} />
            </a>
          </div>
          <div className="about-hero-mark">
            <strong>
              40<span>+</span>
            </strong>
            <p>Years of trust</p>
          </div>
        </section>
        <section className="about-story section-pad" id="about-story">
          <div className="container about-story-grid">
            <div className="about-section-label">
              <span>01</span>
              <i />
            </div>
            <div className="about-story-copy">
              <p className="eyebrow eyebrow-dark">Our story</p>
              <h2>
                One beginning.
                <br />
                <em>Many possibilities.</em>
              </h2>
              <p className="large-copy">
                SM Pal Group's journey started in 1982, when Shri Suresh Pal
                laid the foundation with Pal Stone Industries. More than 42
                years later, that single idea has grown into a group of
                companies working across several industries.
              </p>
              <p>
                From Pal Stone Industries and Pal Prateek automobile dealerships
                to Pal Colonisers and Pal Frozen Foods, every vertical is run
                with the same transparent, customer-first approach that built
                the company. That consistency is a big part of why customers
                keep coming back.
              </p>
              <a className="text-link" href="#business-verticals">
                Explore our business verticals <ArrowRight size={17} />
              </a>
            </div>
            <div className="about-story-note">
              <span>Established in</span>
              <p>1982 — a foundation of trust, built in Haldwani.</p>
            </div>
          </div>
        </section>
        <LegacyWall values={values} />
        <section className="about-leadership section-pad">
          <div className="container about-leadership-grid">
            <img
              src={chairmanImage}
              alt="Suresh Pal Ji, founder and chairman of SM Pal Group"
              loading="lazy"
            />
            <div>
              <p className="eyebrow eyebrow-dark">Meet our leadership</p>
              <h2>
                Rooted locally.
                <br />
                <em>Thinking long term.</em>
              </h2>
              <p className="large-copy">
                SM Pal Group is led by Shri Suresh Pal, Mrs. Meera Pal,
                and Mr. Prateek Pal — three family members who guide the
                business with a shared focus on integrity and long-term thinking.
              </p>
              <p>
                Under their leadership, Pal Group Haldwani has grown into a name
                recognised beyond the region, with a vision that reaches toward
                global standards while staying rooted in local values.
              </p>
              <div className="about-leadership-links">
                <a className="button button-brass" href="/about/ownership">
                  Owner-Chairman <ArrowUpRight size={17} />
                </a>
                <a
                  className="text-link"
                  href="/about/board-of-directors"
                >
                  Meet the board of directors <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="about-community section-pad">
          <div className="container about-community-grid">
            <div className="about-community-copy">
              <p className="eyebrow eyebrow-dark">
                Our commitment to community
              </p>
              <h2>
                Success that
                <br />
                <em>reaches further.</em>
              </h2>
              <p className="large-copy">
                Being a responsible business means more to SM Pal Group than
                good numbers. Every year, the SM Pal Group Foundation reaches
                more than 10,000 people through community programs.
              </p>
              <p>
                It also runs two respected educational institutes that offer
                quality, merit-based education, including to students from
                underprivileged backgrounds. This is a part of the SM Pal Group
                story that goes beyond any single business vertical.
              </p>
            </div>
            <div className="about-community-image">
              <img
                src="/assets/Our commitment to community.jpg"
                alt="Students learning together"
                loading="lazy"
              />
              <div className="about-community-stat">
                <p>People reached every year through community programs</p>
                <i />
                <small>
                  Two educational institutes supporting merit-based education
                </small>
              </div>
            </div>
          </div>
        </section>
        <section className="about-direction section-pad">
          <div className="container">
            <div className="about-direction-heading">
              <p className="eyebrow">Our vision and mission</p>
              <h2>
                Guided by purpose.
                <br />
                <em>Measured by impact.</em>
              </h2>
            </div>
            <div className="about-direction-grid">
              <article>
                <span>Our vision</span>
                <p>
                  To lead with integrity, set the standard for responsible
                  growth, and create lasting value for society and future
                  generations, while inspiring others to hold the same
                  principles in everything they do.
                </p>
              </article>
              <article>
                <span>Our mission</span>
                <p>
                  To build a future where responsibility drives growth,
                  integrity guides every decision, and success is measured by
                  the long-term value we create for people, society, and the
                  generations ahead.
                </p>
              </article>
            </div>
          </div>
        </section>
        <section
          className="about-businesses section-pad"
          id="business-verticals"
        >
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow eyebrow-dark">Our business verticals</p>
                <h2>
                  Different fields.
                  <br />
                  <em>Shared standards.</em>
                </h2>
              </div>
              <p>
                SM Pal Group operates across industries, each carrying the same
                standard of quality and trust the group was built on in 1982.
              </p>
            </div>
            <div className="about-business-grid">
              {businessVerticals.map((business, index) => (
                <a
                  className="about-business-card"
                  href={business.href}
                  key={business.name}
                >
                  <div>
                    <span>0{index + 1}</span>
                    <p>{business.category}</p>
                    <h3>{business.name}</h3>
                    <small>{business.text}</small>
                  </div>
                  <img src={business.image} alt="" loading="lazy" />
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>
        <section className="about-recognition section-pad">
          <div className="container about-recognition-grid">
            <div>
              <p className="eyebrow eyebrow-dark">
                Awards and media recognition
              </p>
              <h2>
                Recognition earned
                <br />
                <em>along the way.</em>
              </h2>
            </div>
            <div>
              <p className="large-copy">
                SM Pal Group's approach to business has earned recognition
                across its industries over the years.
              </p>
              <p>
                Explore the latest honours, coverage and moments from our
                journey in the SM Pal Group media room.
              </p>
              <a className="text-link" href="/media">
                Explore media and recognition <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        <section className="about-faq section-pad">
          <div className="container faq-grid">
            <div>
              <p className="eyebrow eyebrow-dark">Frequently asked questions</p>
              <h2>
                Helpful answers,
                <br />
                <em>at a glance.</em>
              </h2>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details className="faq-item" key={question}>
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
        <section className="about-contact section-pad">
          <div className="container about-contact-grid">
            <div>
              <p className="eyebrow">Get in touch</p>
              <h2>
                Let’s start a<br />
                <em>conversation.</em>
              </h2>
            </div>
            <div>
              <p>
                If you would like to know more about SM Pal Group, explore
                career opportunities, or simply have a question, we would love
                to hear from you. Visit our Contact Us page to reach the team
                directly.
              </p>
              <a className="button button-dark" href="/contact">
                Contact us <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PalGroupPage({ page }) {
  const palGroupFaqs = [
    [
      "Is The Pal Group the same as SM Pal Group?",
      "Yes. The Pal Group and SM Pal Group refer to the same founding family enterprise, established in 1982 by Shri Suresh Pal in Haldwani. SM Pal Group is the name used across this website and our customer facing businesses, while The Pal Group refers to the same group in its broader, original form.",
    ],
    [
      "How many businesses are part of SM Pal Group?",
      "SM Pal Group's core businesses include Pal Stone Industries, Pal Colonisers, Pal Frozen Foods, and its car dealerships. The wider Pal Group family also includes more than a dozen additional brands across healthcare, education, infrastructure, consulting, manufacturing, media, retail, and pharmaceuticals.",
    ],
    [
      "What is Brij Lal Hospital's connection to SM Pal Group?",
      "Brij Lal Hospital and Research Centre, along with Kaya Hospital, is part of the wider Pal Group family of businesses, reflecting the group's expansion into healthcare alongside its founding industries.",
    ],
    [
      "Who leads SM Pal Group and The Pal Group?",
      "Shri Suresh Pal founded the group in 1982 and continues to lead it today, with over 45+ years of business experience guiding its growth across every industry it now operates in.",
    ],
    [
      "Where is SM Pal Group headquartered?",
      "SM Pal Group and The Pal Group are both headquartered in Haldwani, Uttarakhand, the city where the group's first business began.",
    ],
  ];

  const coreBusinesses = [
    {
      name: "Pal Stone Industries",
      category: "Stone & Construction Materials",
      text: "The founding business, supplying premium stone and grit for major infrastructure projects across the region.",
      href: "/industries/pal-stone-industries",
      image: "/assets/our-verticals-images/pal stone.png",
    },
    {
      name: "Pal Colonisers",
      category: "Real Estate Development",
      text: "Developing residential projects including Pal Sumeera Residency, Palam City, Palam View, Pallazio, Eco Town, Paloma Greens, and Ram Ji Vihar.",
      href: "/industries/pal-colonisers/pal-sumeera-residency",
      image: "/assets/our-verticals-images/coloniser.png",
    },
    {
      name: "Pal Frozen Foods",
      category: "Frozen Foods & Trading",
      text: "Home to Pal Fresh frozen vegetables and Frozzo frozen snacks, alongside Pal Fresh Global Trading LLC for international reach.",
      href: "/industries/pal-frozen-foods/pal-fresh",
      image: "/assets/our-verticals-images/pal frozen foods.png",
    },
    {
      name: "Car Dealerships",
      category: "Automotive Retail",
      text: "Including Pal Skoda Haldwani, Pal Nissan Haldwani, and Pal Ford Haldwani.",
      href: "/industries/car-dealerships/pal-skoda-haldwani",
      image: "/assets/our-verticals-images/skoda.png",
    },
  ];

  const widerFamily = [
    {
      name: "Brij Lal Hospital and Research Centre",
      category: "Healthcare",
      text: "Together with Kaya Hospital, offers advanced medical infrastructure and dedicated healthcare professionals, focused on affordable, accessible, and high-quality care for all.",
    },
    {
      name: "Pal College of Nursing and Medical Sciences",
      category: "Education",
      text: "Supports the group's healthcare mission by training the next generation of skilled healthcare providers.",
    },
    {
      name: "Pal College of Technology and Management",
      category: "Education",
      text: "Focused on academic excellence and real-world skills, aiming to produce socially responsible professionals who contribute meaningfully to society and industry.",
    },
    {
      name: "Pal Infra Solutions",
      category: "Infrastructure",
      text: "Shapes the region's infrastructure through construction and structural project work, offering end-to-end solutions for both public and private sector clients.",
    },
    {
      name: "Panorama India Consulting Group & Digital Quest",
      category: "Consulting & Marketing",
      text: "Helps other companies grow through innovative marketing, data-driven solutions, and strategic consulting, working with everyone from startups to established enterprises.",
    },
    {
      name: "Quanta Cables & Pal Alloy and Steel Casting",
      category: "Manufacturing",
      text: "Produces high performance components and materials that meet national and international standards, supporting industries from infrastructure to energy.",
    },
    {
      name: "JJN News",
      category: "Media & Communication",
      text: "Connects the region with timely, accurate reporting, built on a commitment to journalistic integrity and regional relevance.",
    },
    {
      name: "Tanishq & Titan Eyeplus",
      category: "Retail",
      text: "Through partnerships with two of India's most trusted retail brands, offers retail experiences built on trust, variety, and affordability.",
    },
    {
      name: "GN Pal Speciality Molecules LLP",
      category: "Pharmaceuticals",
      text: "Dedicated to the research, development, and distribution of high-quality specialty pharmaceutical products, aiming to improve patient outcomes and bridge gaps in healthcare.",
    },
  ];

  const diversificationReasons = [
    {
      title: "One set of values",
      text: "Across every business, from stone supply to healthcare and media.",
    },
    {
      title: "Local roots, growing reach",
      text: "Still headquartered in Haldwani while serving customers well beyond Uttarakhand.",
    },
    {
      title: "People-first philosophy",
      text: "Shapes how every business in the family treats its customers, patients, students, and readers.",
    },
    {
      title: "Decades of proven execution",
      text: "Over 45+ years of experience guiding decisions across every industry the group enters.",
    },
  ];

  const exploreMore = [
    { label: "Our full story", href: "/about" },
    { label: "Owner-Chairman", href: "/about/ownership" },
    { label: "Board of Directors", href: "/about/board-of-directors" },
    { label: "Media & Awards", href: "/media" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <div className="route-page pal-group-page">
      <PalGroupSeo />
      <RouteHeader />
      <main>
        <section className="pg-hero">
          <img
            src={page.image}
            alt="SM Pal Group's diverse business portfolio"
          />
          <div className="pg-hero-shade" />
          <div className="container pg-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="pg-hero-intro">{page.intro}</p>
          </div>
          <div className="pg-hero-mark">
            <strong>
              40<span>+</span>
            </strong>
            <p>Years of trust</p>
          </div>
        </section>

        <section className="pg-story section-pad" id="our-story">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>01</span>
              <i />
              <span>Our Story</span>
            </div>
            <div className="pg-story-grid">
              <div className="pg-story-copy reveal">
                <h2>
                  One founder.
                  <br />
                  <em>One city.</em>
                </h2>
                <p className="large-copy">
                  Every business under this roof traces back to one founder and one city. Shri Suresh Pal established the group in 1982 in Haldwani, often called the gateway to Uttarakhand's Kumaon region, starting with a small stone supply venture.
                </p>
                <p>
                  With over 45+ years of business experience behind him, his leadership has carried the group from that single idea into a name recognised across many industries today.
                </p>
                <p>
                  What has carried through every stage of that growth is a simple approach: <strong>Quality first, transparency always,</strong> and a genuine focus on the people the group serves.
                </p>
                <div className="pg-story-links">
                  <a className="text-link" href="/about/ownership">
                    Read about our founder <ArrowRight size={17} />
                  </a>
                  <a className="text-link" href="/about">
                    Explore our full story <ArrowRight size={17} />
                  </a>
                </div>
              </div>
              <aside className="pg-story-note reveal">
                <span>Established in</span>
                <p>1982 — a foundation of trust, built in Haldwani.</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="pg-naming section-pad" id="naming">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>02</span>
              <i />
              <span>SM Pal Group &amp; The Pal Group</span>
            </div>
            <div className="pg-naming-grid reveal">
              <div>
                <h2>
                  Two names.
                  <br />
                  <em>One enterprise.</em>
                </h2>
              </div>
              <div className="pg-naming-copy">
                <p className="large-copy">
                  You may notice this page refers to both SM Pal Group and The Pal Group. Here is the simple version:
                </p>
                <p>
                  <strong>SM Pal Group</strong> is the name used across our website and daily business, the brand you see on this site and across our dealerships, projects, and products.
                </p>
                <p>
                  <strong>The Pal Group</strong> is the same founding family enterprise, referred to here in its broader, original form as the parent name behind every business in this portfolio.
                </p>
                <p>
                  In short, they describe the same group of companies, built by the same founder, from the same starting point in 1982. Any reference to SM Pal Group or The Pal Group points back to one and the same trusted family enterprise.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="pg-core-businesses section-pad" id="core-businesses">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>03</span>
              <i />
              <span>Our Core Businesses</span>
            </div>
            <div className="pg-section-intro reveal">
              <h2>
                The businesses
                <br />
                <em>closest to our brand.</em>
              </h2>
              <p className="large-copy">
                These are the businesses most closely tied to the SM Pal Group brand, each with its own dedicated page you can explore further.
              </p>
            </div>
            <div className="pg-core-grid">
              {coreBusinesses.map((biz, index) => (
                <a
                  className="pg-core-card reveal"
                  href={biz.href}
                  key={biz.name}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <div>
                    <span>0{index + 1}</span>
                    <p className="pg-core-category">{biz.category}</p>
                    <h3>{biz.name}</h3>
                    <small>{biz.text}</small>
                  </div>
                  <img src={biz.image} alt="" loading="lazy" />
                  <ArrowUpRight size={22} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="pg-wider-family section-pad" id="wider-family">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>04</span>
              <i />
              <span>Beyond SM Pal Group</span>
            </div>
            <div className="pg-section-intro reveal">
              <h2>
                The wider
                <br />
                <em>Pal Group family.</em>
              </h2>
              <p className="large-copy">
                Alongside these core businesses, the wider Pal Group family has grown into several other industries over the years. These ventures reflect the same founding values, even though they sit outside the four core businesses listed above.
              </p>
            </div>
            <div className="pg-wider-grid">
              {widerFamily.map((biz, index) => (
                <div
                  className="pg-wider-card reveal"
                  key={biz.name}
                  style={{ "--delay": `${index * 50}ms` }}
                >
                  <span className="pg-wider-category">{biz.category}</span>
                  <h3>{biz.name}</h3>
                  <p>{biz.text}</p>
                </div>
              ))}
            </div>
            <div className="pg-wider-cta reveal">
              <p>
                Every venture in the wider Pal Group family reflects the same founding values and the same long-term thinking.
              </p>
              <a className="text-link" href="/about/ownership">
                Meet Shri Suresh Pal, the founder behind it all <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>

        <section className="pg-diversified section-pad" id="why-it-works">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>05</span>
              <i />
              <span>Why This Diversified Approach Works</span>
            </div>
            <div className="pg-diversified-intro reveal">
              <h2>
                One foundation.
                <br />
                <em>Many industries.</em>
              </h2>
              <p className="large-copy">
                SM Pal Group has grown into so many industries for one reason: every new venture is built on the same foundation the group started with in 1982.
              </p>
            </div>
            <div className="pg-diversified-grid">
              {diversificationReasons.map((reason, index) => (
                <div
                  className="pg-diversified-card reveal"
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

        <section className="pg-faq section-pad">
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
              {palGroupFaqs.map(([question, answer]) => (
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

        <section className="pg-explore section-pad">
          <div className="container">
            <div className="pg-section-label reveal">
              <span>06</span>
              <i />
              <span>Explore More</span>
            </div>
            <div className="pg-explore-intro reveal">
              <h2>
                Want to know more
                <br />
                <em>about the people and story?</em>
              </h2>
            </div>
            <div className="pg-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="pg-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={20} />
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

function OwnershipPage({ page }) {
  const ownershipFaqs = [
    [
      "Who is the owner of SM Pal Group?",
      "Shri Suresh Pal is the owner and chairman of SM Pal Group. He founded the company in 1982 and continues to lead it today.",
    ],
    [
      "When did Shri Suresh Pal found SM Pal Group?",
      "Shri Suresh Pal founded SM Pal Group in 1982 in Haldwani, starting with a stone supply business that later grew into a group spanning real estate, automobiles, and frozen foods.",
    ],
    [
      "What businesses has Shri Suresh Pal built under SM Pal Group?",
      "Shri Suresh Pal has built Pal Stone Industries, Pal Colonisers, a network of car dealerships, and Pal Frozen Foods, each reflecting a different stage of his entrepreneurial journey since 1982.",
    ],
    [
      "What is Shri Suresh Pal's vision for SM Pal Group?",
      "Shri Suresh Pal's guiding vision is transforming lives for a better future, a philosophy that shapes SM Pal Group's culture of collaboration, trust, and community focused growth.",
    ],
  ];

  const journeyChapters = [
    {
      name: "Pal Stone Industries",
      sub: "Where it all began",
      text: "Pal Stone Industries was Shri Suresh Pal's first venture, founded in 1982 as a supplier of stone and grit from a crushing unit in Haldwani. It grew to serve major clients, including Indian Railways and the Gokul Dam Project, and it remains the foundation that the rest of the group was built on.",
    },
    {
      name: "Pal Colonisers",
      sub: "Bringing organized living to Kumaon",
      text: "As Haldwani grew, Shri Suresh Pal saw a need for well planned, modern housing in the region. That led to Pal Colonisers, which has since delivered residential projects including Pal Sumeera Residency and Palam City, built around the idea that people deserve organized, dependable living spaces, not just buildings.",
    },
    {
      name: "Car Dealerships",
      sub: "Bringing trusted brands to Haldwani",
      text: "Shri Suresh Pal later expanded into the automotive sector, building a dealership network under Car Dealerships, including Pal Skoda Haldwani, Pal Nissan Haldwani, and Pal Ford Haldwani. The goal was simple: bring the same trust the group had earned in stone and real estate into car buying and after-sales service.",
    },
    {
      name: "Pal Frozen Foods",
      sub: "Supporting farmers and families",
      text: "With Pal Frozen Foods, Shri Suresh Pal took the group into food, launching Pal Fresh frozen vegetables and Frozzo frozen snacks. This venture carries a community focus as well, supporting local farmers and sustainable agricultural practices so the group's growth benefits the wider region, not just its own bottom line.",
    },
  ];

  const progressAreas = [
    {
      title: "Technology",
      text: "From high tech stone crushing machinery to advanced infrastructure and freezing technologies, we are dedicated to using technology to raise the bar in everything we do.",
    },
    {
      title: "Innovation",
      text: "By encouraging creativity and new ideas across our teams, we have been able to sharpen our operations and deliver a better experience for every customer.",
    },
    {
      title: "Our people",
      text: "Our employees are at the heart of our success. Prioritizing their growth through training and continuous learning strengthens our team and lifts morale across the group.",
    },
    {
      title: "Expansion",
      text: "We have refined our real estate strategies, grown our automotive dealership network with globally renowned brands like Skoda, Nissan, and Ford, and expanded our frozen food offerings to meet the needs of a modern generation.",
    },
  ];

  const exploreMore = [
    { label: "Our full story", href: "/about" },
    { label: "The Pal Group", href: "/about/the-pal-group" },
    { label: "Board of Directors", href: "/about/board-of-directors" },
    { label: "Meet the team", href: "/contact" },
    { label: "Media & Awards", href: "/media" },
  ];

  // Image tiles mapped to chairman photos in /public/assets/chairman-images/.
  // The 4-col x 3-row grid has 12 cells. With 8 tiles we need exactly
  // four size-2 (TALL or WIDE) and four size-1 (SQUARE) tiles:
  //   1 WIDE landscape + 2 TALL portraits + 1 WIDE quote + 4 SQUARE (2 portraits + 1 landscape + stat)
  // Source order is read left-to-right, top-to-bottom by CSS Grid auto-flow
  // and produces this layout:
  //   Row 1: [WIDE founder     ][TALL office ][TALL award            ]
  //   Row 2: [                 ][            ][         ][SQ stat      ]
  //   Row 3: [WIDE quote       ][SQ portrait][SQ portrait             ]
  const ownerMoments = [
    {
      // 7008x4672 landscape — founder in his office
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen.webp",
      alt: "Shri Suresh Pal seated at his office desk, the founder of SM Pal Group",
      caption: "At the foundation of the group",
      span: "wide",
    },
    {
      // 3008x4512 portrait — at the modern office desk, checkered white shirt
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 4.webp",
      alt: "Shri Suresh Pal at his modern office desk",
      caption: "Where the work still happens",
      span: "tall",
    },
    {
      // 5504x8256 portrait — award ceremony portrait
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen (2).webp",
      alt: "Shri Suresh Pal receiving an award on stage",
      caption: "Recognising industry leadership",
      span: "tall",
    },
    {
      type: "stat",
      span: "square",
      number: "45+ Years of Legacy",
      label: "",
      sub: "",
    },
    {
      // 1200x800 landscape — armchair formal portrait
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 6.webp",
      alt: "Shri Suresh Pal in a formal suit, seated in an armchair",
      caption: "Four decades in the frame",
      span: "square",
    },
    {
      // Founder's quote — given a WIDE cell so the full text fits without overflow
      type: "quote",
      span: "wide",
      text: "I have never believed in building for myself. I have always believed in building for the people around me.",
      cite: "Shri Suresh Pal",
    },
    {
      // 3008x4512 portrait — speaking on stage with microphone
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 5.webp",
      alt: "Shri Suresh Pal addressing an audience on stage",
      caption: "Addressing the people he leads",
      span: "square",
    },
    {
      // 5504x8256 portrait — armchair suit, smiling warmly
      type: "image",
      src: "/assets/chairman-images/suresh pal - owner chairmen 3.webp",
      alt: "Shri Suresh Pal in a suit, smiling in an armchair",
      caption: "With the people behind the work",
      span: "square",
    },
  ];

  return (
    <div className="route-page ownership-page">
      <OwnershipSeo />
      <RouteHeader />
      <main>
        <section className="own-hero">
          <img src={page.image} alt="Shri Suresh Pal, Founder and Chairman of SM Pal Group" fetchpriority="high" />
          <div className="own-hero-shade" />
          <div className="container own-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="own-hero-intro">{page.intro}</p>
          </div>
        </section>

        <section className="own-who section-pad" id="who">
          <div className="container">
            <div className="own-section-label reveal">
              <span>01</span>
              <i />
              <span>Who is Shri Suresh Pal?</span>
            </div>
            <div className="own-who-grid">
              <div className="own-who-copy reveal">
                <h2>
                  A founder who
                  <br />
                  <em>still shows up.</em>
                </h2>
                <p className="large-copy">
                  Shri Suresh Pal is the founder, owner, and chairman of SM Pal Group, based in Haldwani, Uttarakhand. He started the group in 1982 with a single stone supply venture and has since guided it into several industries, always with the same hands on, people first approach he started with.
                </p>
                <p>
                  His leadership style has stayed consistent even as the group has grown. He is known for staying closely involved in each business under SM Pal Group, rather than stepping back once a venture finds its footing. That involvement is a big part of why the group's businesses share such a consistent standard of quality, even across very different industries.
                </p>
              </div>
              <aside className="own-who-note reveal">
                <span className="legacy-number">45+</span>
                <span className="legacy-label">Years of Legacy</span>
                <p>at SM Pal Group, from the same founding city of Haldwani.</p>
                <div className="own-who-line" />
                <small>Founder, Owner, and Chairman, SM Pal Group</small>
              </aside>
            </div>
          </div>
        </section>

        <section className="own-journey section-pad" id="journey">
          <div className="container">
            <div className="own-section-label reveal">
              <span>02</span>
              <i />
              <span>Shri Suresh Pal's journey through SM Pal Group's businesses</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                Each business, a
                <br />
                <em>chapter of the journey.</em>
              </h2>
              <p className="large-copy">
                Each business under SM Pal Group reflects a different chapter of Shri Suresh Pal's entrepreneurial journey. Here is how that journey unfolded.
              </p>
            </div>
            <div className="own-journey-grid">
              {journeyChapters.map((chapter, index) => (
                <article
                  className="own-journey-card reveal"
                  key={chapter.name}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <p className="own-journey-sub">{chapter.sub}</p>
                  <h3>{chapter.name}</h3>
                  <p className="own-journey-text">{chapter.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="own-vision section-pad" id="vision">
          <div className="container">
            <div className="own-section-label reveal">
              <span>03</span>
              <i />
              <span>His vision</span>
            </div>
            <div className="own-vision-grid reveal">
              <div>
                <p className="eyebrow eyebrow-dark">His guiding philosophy</p>
                <h2>
                  Transforming lives
                  <br />
                  <em>for a better future.</em>
                </h2>
              </div>
              <div className="own-vision-copy">
                <p className="large-copy">
                  Shri Suresh Pal describes his guiding philosophy in five words: <em>transforming lives for a better future</em>. That vision shows up in how he runs every business under SM Pal Group, not just in how the company talks about itself.
                </p>
                <p>
                  Under his leadership, SM Pal Group has built a culture centered on collaboration, trust, and participation. You can read more about the values that guide this culture, including people first thinking and a strong customer centric approach, on our <a href="/about/the-pal-group">SM Pal Group</a> page.
                </p>
                <a className="text-link" href="/about/the-pal-group">
                  See the wider Pal Group family <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 04 — Owner moments and milestones (image tile) */}
        <section className="own-moments section-pad" id="moments">
          <div className="container">
            <div className="own-section-label reveal">
              <span>04</span>
              <i />
              <span>Owner moments and milestones</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                Four decades
                <br />
                <em>in the frame.</em>
              </h2>
              <p className="large-copy">
                A look at some of the moments, meetings, and milestones that have shaped Shri Suresh Pal&apos;s journey and SM Pal Group&apos;s story along the way.
              </p>
            </div>
            <div className="own-moments-grid">
              {ownerMoments.map((moment, index) => {
                if (moment.type === "image") {
                  return (
                    <figure
                      className={`own-moment-tile own-moment-${moment.span} reveal`}
                      key={moment.caption}
                      style={{ "--delay": `${index * 60}ms` }}
                    >
                      <img src={moment.src} alt={moment.alt} loading="lazy" />
                    </figure>
                  );
                }
                if (moment.type === "stat") {
                  return (
                    <div
                      className={`own-moment-tile own-moment-stat own-moment-${moment.span} reveal`}
                      key={`stat-${moment.number}`}
                      style={{ "--delay": `${index * 60}ms` }}
                    >
                      <span className="own-moment-stat-number">{moment.number}</span>
                      {moment.label ? (
                        <span className="own-moment-stat-label">{moment.label}</span>
                      ) : null}
                      {moment.sub ? (
                        <p className="own-moment-stat-sub">{moment.sub}</p>
                      ) : null}
                    </div>
                  );
                }
                return (
                  <blockquote
                    className={`own-moment-tile own-moment-quote own-moment-${moment.span} reveal`}
                    key={`quote-${moment.cite}`}
                    style={{ "--delay": `${index * 60}ms` }}
                  >
                    <span className="own-moment-quote-mark" aria-hidden="true">"</span>
                    <p>{moment.text}</p>
                    <cite>— {moment.cite}</cite>
                  </blockquote>
                );
              })}
            </div>
          </div>
        </section>

        <section className="own-next-gen section-pad" id="next-generation">
          <div className="container">
            <div className="own-section-label reveal">
              <span>05</span>
              <i />
              <span>A message from the next generation of SM Pal Group</span>
            </div>
            <div className="own-next-gen-card reveal">
              <div className="own-next-gen-mark" aria-hidden="true">"</div>
              <p>
                For over four decades, SM Pal Group has stood as a pillar of trust and excellence, a legacy initiated by my father, Shri Suresh Pal, in 1982. I am honored to carry on his people-first vision and build on the solid foundation he laid, and I am committed to leading SM Pal Group to continued success.
              </p>
              <p>
                Every day, I feel the weight and the warmth of the legacy my father built. Our journey from the stone industry to diverse ventures in real estate, frozen foods, and automobiles is a reflection of our commitment to values and innovation. But beyond the milestones and the expansion, it is the impact we make on people's lives that truly matters to me. That thought is what pushes me to build a workplace that is supportive, inclusive, and ethical, where every team member feels valued and empowered. Maintaining this legacy is both a privilege and a responsibility, a chance to shape a better future and take our group to new heights.
              </p>
              <p>
                Our evolution is more than growth. It is a reflection of our commitment to staying connected with our values while we embrace the future. Here are four things driving that progress across all four of our verticals today.
              </p>
              <div className="own-progress-grid">
                {progressAreas.map((area, index) => (
                  <div className="own-progress-card" key={area.title}>
                    <span>0{index + 1}</span>
                    <h4>{area.title}</h4>
                    <p>{area.text}</p>
                  </div>
                ))}
              </div>
              <p>
                Success, to me, is about more than milestones. It is about honoring the journey, the challenges, the triumphs, and most importantly, the people who make it all possible. Together, we are building a future that reflects our shared values and our shared aspirations.
              </p>
            </div>
            <div className="own-next-gen-cta reveal">
              <p>
                Interested in the broader story of the group?{' '}
                <a href="/about/the-pal-group">Explore the Pal Group family</a>
                {' '}or{' '}
                <a href="/about">learn more about the group</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="own-faq section-pad">
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
              {ownershipFaqs.map(([question, answer]) => (
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

        <section className="own-explore section-pad">
          <div className="container">
            <div className="own-section-label reveal">
              <span>06</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="own-explore-intro reveal">
              <h2>
                See the fuller
                <br />
                <em>picture of the group.</em>
              </h2>
            </div>
            <div className="own-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="own-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={20} />
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
    { label: "SM Pal Group", href: "/about/the-pal-group" },
    { label: "Our Team", href: "/contact" },
  ];

  return (
    <div className="board-page">
      <BoardSeo />
      <RouteHeader />
      <main>
        <section className="board-hero">
          <img src={page.image} alt="" fetchpriority="high" />
          <div className="board-hero-shade" />
          <div className="container board-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="board-hero-intro">{page.intro}</p>
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
                Visit our <a href="/about/ownership">Owner-Chairman</a> page for Suresh Pal's full story, or meet the wider team on <a href="/contact">Our Team</a>. You can also explore <a href="/about/the-pal-group">The Pal Group</a> to see the full family of businesses this board leads, or read our full story on the <a href="/about/the-pal-group">SM Pal Group</a> page.
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

function PrateekPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".prateek-page .reveal");
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

  const prateekFaqs = [
    [
      "What is Prateek Pal's role at SM Pal Group?",
      "Prateek Pal is a director at SM Pal Group, where he has led the expansion of Pal Frozen Foods into the Pal Fresh and Frozzo brands, and guided Pal Colonisers into apartment construction for the first time.",
    ],
    [
      "What inspired Prateek Pal's work with Pal Frozen Foods?",
      "Prateek Pal's move to expand Pal Frozen Foods came from time spent studying in Europe, where he saw rising demand for convenience food and brought that insight back to grow the business beyond frozen peas.",
    ],
    [
      "Has Prateek Pal expanded SM Pal Group internationally?",
      "Yes. Under his leadership, SM Pal Group's frozen food business moved into international markets, work that continues through Pal Fresh Global Trading LLC.",
    ],
  ];

  const prateekContributions = [
    {
      sub: "Frozen foods",
      name: "Pal Fresh and Frozzo",
      text: "Expanded Pal Frozen Foods from a single frozen peas product into two brands covering frozen vegetables and snacks, sold domestically and internationally.",
      href: "/industries/pal-frozen-foods/pal-fresh",
    },
    {
      sub: "International trade",
      name: "Pal Fresh Global Trading LLC",
      text: "Led the frozen foods business into international markets under the Pal Fresh Global Trading LLC banner.",
      href: "/industries/pal-fresh-global-trading",
    },
    {
      sub: "Real estate",
      name: "Pal Colonisers — apartment living",
      text: "Expanded Pal Colonisers into apartment buildings for the first time, bringing a new housing option to the region.",
      href: "/industries/pal-colonisers/pal-sumeera-residency",
    },
    {
      sub: "Operations",
      name: "Group-wide modernisation",
      text: "Invested in advanced food processing machinery, upgraded project amenities, and introduced automated data systems across operations.",
      href: "/about/the-pal-group",
    },
  ];

  const prateekExploreMore = [
    { label: "Owner-Chairman", href: "/about/ownership" },
    { label: "Board of Directors", href: "/about/board-of-directors" },
    { label: "SM Pal Group", href: "/about/the-pal-group" },
    { label: "Our Team", href: "/contact" },
  ];

  const prateekMilestones = [
    {
      year: "2008",
      title: "First steps into the business",
      text: "Joined SM Pal Group while still studying in Europe, beginning to apply what he was learning abroad to the family business back home.",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=85",
      align: "left",
    },
    {
      year: "2012",
      title: "Convenience food, reimagined",
      text: "Studied the European food and beverage sector closely, then brought back the insight that became the foundation for Pal Fresh and Frozzo.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
      align: "right",
    },
    {
      year: "2017",
      title: "Pal Colonisers goes vertical",
      text: "Led the move into apartment construction for the first time, opening a new kind of housing for buyers in the region.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=900&q=85",
      align: "left",
    },
    {
      year: "2022",
      title: "Crossing borders",
      text: "Took the frozen foods business international through Pal Fresh Global Trading LLC, expanding reach well beyond the home market.",
      image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=900&q=85",
      align: "right",
    },
  ];

  return (
    <div className="route-page prateek-page">
      <PrateekSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="own-hero">
          <img src={page.image} alt="Prateek Pal, Director at SM Pal Group" fetchpriority="high" />
          <div className="own-hero-shade" />
          <div className="container own-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>{page.title}</h1>
            <p className="own-hero-intro">{page.intro}</p>
          </div>
        </section>

        {/* 01 — Who is Prateek Pal */}
        <section className="own-who section-pad" id="who">
          <div className="container">
            <div className="own-section-label reveal">
              <span>01</span>
              <i />
              <span>Who is Prateek Pal?</span>
            </div>
            <div className="own-who-grid">
              <div className="own-who-copy reveal">
                <h2>
                  Leading the next
                  <br />
                  <em>chapter of growth.</em>
                </h2>
                <p className="large-copy">{page.body}</p>
                <p>
                  You can read more about the family&apos;s wider leadership on our{" "}
                  <a href="/about/ownership">Owner-Chairman</a> and{" "}
                  <a href="/about/board-of-directors">Board of Directors</a> pages.
                </p>
              </div>
              <aside className="own-who-note reveal">
                <span>Next Generation</span>
                <p>Carrying forward the family&apos;s vision for growth and innovation.</p>
                <div className="own-who-line" />
                <small>Director, SM Pal Group</small>
              </aside>
            </div>
          </div>
        </section>

        {/* 02 — A vision shaped in Europe */}
        <section className="own-vision section-pad" id="vision">
          <div className="container">
            <div className="own-section-label reveal">
              <span>02</span>
              <i />
              <span>A vision shaped in Europe</span>
            </div>
            <div className="own-vision-grid reveal">
              <div>
                <p className="eyebrow eyebrow-dark">Where it started</p>
                <h2>
                  One observation,
                  <br />
                  <em>many possibilities.</em>
                </h2>
              </div>
              <div className="own-vision-copy">
                <p className="large-copy">
                  One of the more interesting parts of Prateek Pal&apos;s story is where it started. While studying in Europe, he noticed how much demand was building for convenience food, especially in the food and beverage sector.
                </p>
                <p>
                  That observation stuck with him, and it became the starting point for a real shift in how SM Pal Group approached frozen food back home.
                </p>
                <a className="text-link" href="/industries/pal-frozen-foods/pal-fresh">
                  Explore Pal Frozen Foods <ArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 03 — Key contributions */}
        <section className="own-journey section-pad" id="contributions">
          <div className="container">
            <div className="own-section-label reveal">
              <span>03</span>
              <i />
              <span>Prateek Pal&apos;s key contributions to SM Pal Group</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                From frozen peas
                <br />
                <em>to new markets entirely.</em>
              </h2>
              <p className="large-copy">
                Pal Frozen Foods was mostly known for one product: frozen peas. Prateek Pal pushed the business well beyond that, and extended the group&apos;s reach into real estate and international trade. Here is a closer look at what that involved.
              </p>
            </div>
            <div className="own-journey-grid">
              {prateekContributions.map((item, index) => (
                <a
                  className="own-journey-card reveal"
                  href={item.href}
                  key={item.name}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <span>0{index + 1}</span>
                  <p className="own-journey-sub">{item.sub}</p>
                  <h3>{item.name}</h3>
                  <p className="own-journey-text">{item.text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 04 — A connected journey (interconnected image tile) */}
        <section className="prateek-timeline section-pad" id="timeline">
          <div className="container">
            <div className="own-section-label reveal">
              <span>04</span>
              <i />
              <span>A connected journey</span>
            </div>
            <div className="own-section-intro reveal">
              <h2>
                The thread that
                <br />
                <em>runs through it all.</em>
              </h2>
              <p className="large-copy">
                A look at the moments that shaped Prateek Pal&apos;s path at SM Pal Group, from his first steps into the business to taking it international. Each one is a different kind of image, but they all point to the same people first approach.
              </p>
            </div>
            <div className="prateek-timeline-track">
              {prateekMilestones.map((moment, index) => (
                <article
                  className={`prateek-timeline-row prateek-timeline-${moment.align} reveal`}
                  key={moment.year}
                  style={{ "--delay": `${index * 80}ms` }}
                >
                  <div className="prateek-timeline-image">
                    <img src={moment.image} alt={moment.title} loading="lazy" />
                    <span className="prateek-timeline-year">{moment.year}</span>
                  </div>
                  <div className="prateek-timeline-copy">
                    <h3>{moment.title}</h3>
                    <p>{moment.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 05 — Recognition and quote */}
        <section className="own-next-gen section-pad" id="recognition">
          <div className="container">
            <div className="own-section-label reveal">
              <span>05</span>
              <i />
              <span>Recognition</span>
            </div>
            <div className="own-next-gen-card reveal">
              <div className="own-next-gen-mark" aria-hidden="true">"</div>
              <p>
                As a community, we agree to grow together. Our team is an illustration of what we can accomplish when a group of people united by a common goal works together.
              </p>
              <p>
                Prateek Pal&apos;s work has extended into SM Pal Group&apos;s car dealerships, where his leadership has been recognised through industry awards tied to the group&apos;s automotive performance — accolades that overlap with the{" "}
                <a href="/about/ownership">Nissan Global Award and Ford President&apos;s Award of Excellence</a>.
              </p>
              <p>
                That same people first approach he inherited from his father has shaped how he runs every project, every partnership, and every team under his care. It is the thread that runs through all of it.
              </p>
            </div>
            <div className="own-next-gen-cta reveal">
              <p>
                Interested in the group&apos;s broader story?{' '}
                <a href="/about/the-pal-group">Explore the Pal Group family</a>
                {' '}or{' '}
                <a href="/about/ownership">read Suresh Pal&apos;s story</a>.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="own-faq section-pad">
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
              {prateekFaqs.map(([question, answer]) => (
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
        <section className="own-explore section-pad">
          <div className="container">
            <div className="own-section-label reveal">
              <span>06</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="own-explore-intro reveal">
              <h2>
                See the fuller
                <br />
                <em>picture of the group.</em>
              </h2>
            </div>
            <div className="own-explore-grid">
              {prateekExploreMore.map((item, index) => (
                <a
                  className="own-explore-card reveal"
                  href={item.href}
                  key={item.href}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={20} />
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

function PalFreshGlobalPage() {
  const [language, setLanguage] = useState("en");
  const isArabic = language === "ar";
  const content = isArabic
    ? {
        eyebrow: "بال فريش جلوبال · دبي، الإمارات",
        title: "بال فريش جلوبال، من مزارعنا إلى مُجمّدك",
        intro: "تقدم شركة بال فريش جلوبال للتجارة ذ.م.م الخضروات المجمدة الهندية للمنازل والشركات في الإمارات وخارجها، مدعومة بسلسلة توريد تبدأ من مزارع حقيقية وتنتهي في مُجمّدك.",
        aboutTitle: "عن شركة بال فريش جلوبال للتجارة",
        about: "بال فريش جلوبال هي الكيان الدولي المخصص لشركة بال فروزن فودز، ومقرها دبي، وقد تأسست لإدارة عمليات التصدير إلى أسواق الإمارات والأسواق العالمية. تحمل الشركة نفس الالتزام بالجودة والمذاق والابتكار على مستوى عالمي.",
        rootsTitle: "جذورنا في بال فروزن فودز",
        roots: "تعود قصة بال فريش جلوبال إلى بال فروزن فودز، التي تأسست عام 2013 في أوتاراخند بالهند كقسم تصنيع الأغذية التابع لمجموعة إس إم بال جروب. ومن مبادرة إقليمية نشأت علامة تخدم المنازل وسلاسل الضيافة ومزودي خدمات الأغذية.",
        productsTitle: "مجموعة الخضروات المجمدة لدينا",
        productsIntro: "تضم تشكيلة بال فريش جلوبال تسعة أنواع من الخضروات المجمدة، تتم معالجتها للحفاظ على الطعم واللون والقيمة الغذائية من الحصاد وحتى التجميد.",
        whyTitle: "لماذا تختار بال فريش جلوبال؟",
        reachTitle: "إلى أين تصل منتجاتنا؟",
        reach: "تُصدّر بال فريش جلوبال الخضروات المجمدة والوجبات الخفيفة الجاهزة للأكل إلى الشرق الأوسط وأمريكا الشمالية وآسيا، لتوسع نطاق بال فروزن فودز إلى ما هو أبعد من الهند.",
        contactTitle: "تواصل مع بال فريش جلوبال أو زورونا",
        addressLabel: "العنوان",
        address: "M-22، مول بن شبيب، شارع بغداد، القصيص، دبي، الإمارات العربية المتحدة",
        phoneLabel: "الهاتف",
        hoursLabel: "ساعات العمل",
        hours: "من الإثنين إلى السبت، 9:00 صباحًا حتى 6:00 مساءً",
        faqTitle: "الأسئلة الشائعة",
        exploreTitle: "لمزيد من الاستكشاف",
        explore: "لمعرفة المزيد عن مصادر مكوناتنا، تفضلوا بزيارة بال أجريكلتشر، أو تعرفوا على مشاركاتنا في المعارض، أو تابعوا آخر أخبارنا عبر المدونة.",
        cta: "تواصل معنا",
      }
    : {
        eyebrow: "Pal Fresh Global · Dubai, UAE",
        title: "PalFresh Global, from our farms to your freezer",
        intro: "PalFresh Global Trading LLC brings India's frozen vegetables to households and businesses across the UAE and beyond, backed by a supply chain that starts on real farms and ends in your freezer.",
        aboutTitle: "About PalFresh Global Trading LLC",
        about: "PalFresh Global Trading LLC is the dedicated international entity for Pal Frozen Foods, based in Dubai, UAE, and built to manage export operations for the UAE and global markets. It carries forward the same promise of quality, taste, and innovation on a global scale.",
        rootsTitle: "Our roots in Pal Frozen Foods",
        roots: "PalFresh Global's story begins with Pal Frozen Foods, established in 2013 in Uttarakhand, India, as the food processing division of SM Pal Group. What started as a regional initiative grew into a brand serving households, hospitality chains, and food service providers.",
        productsTitle: "Our frozen vegetable range",
        productsIntro: "PalFresh Global's range covers nine frozen vegetables, each processed to preserve taste, color, and nutrition from harvest to freezer.",
        whyTitle: "Why choose PalFresh Global",
        reachTitle: "Where PalFresh Global reaches",
        reach: "PalFresh Global exports frozen vegetables and ready-to-eat snacks across the Middle East, North America, and Asia, extending Pal Frozen Foods well beyond its original base in India.",
        contactTitle: "Visit or contact PalFresh Global",
        addressLabel: "Address",
        address: "M-22, Bin Shabib Mall, Baghdad Street, Al Qusais, Dubai, UAE",
        phoneLabel: "Phone",
        hoursLabel: "Hours",
        hours: "Monday to Saturday, 9:00 am to 6:00 pm",
        faqTitle: "Frequently asked questions",
        exploreTitle: "Explore more",
        explore: "To learn more about our ingredients, visit Pal Agriculture, see our latest Exhibitions, meet our Board of Directors, or read the latest Blog updates.",
        cta: "Get in touch",
      };
  const products = (isArabic
    ? ["البازلاء الخضراء المجمدة", "الذرة الحلوة المجمدة", "خليط الخضروات المجمدة - 3 أنواع", "خليط الخضروات المجمدة - 4 أنواع", "البامية المجمدة", "البروكلي المجمد", "السبانخ المجمد", "الفاصوليا الخضراء المقطعة المجمدة", "القرع المر المجمد"]
    : ["Frozen Green Peas", "Frozen Sweet Corn", "Frozen Mix Veg, 3 way", "Frozen Mix Veg, 4 way", "Frozen Okra", "Frozen Broccoli", "Frozen Spinach", "Frozen Cut Green Beans", "Frozen Bitter Gourd"]
  ).map((label) => ({ label, href: "/industries/pal-frozen-foods/pal-fresh" }));
  const reasons = isArabic
    ? ["تقنية تجميد متطورة تحفظ الطعم واللون والقيمة الغذائية.", "خدمة المنازل وقطاع الفنادق والمطاعم بنفس مستوى الجودة.", "معايير سلامة غذائية عالمية وسلسلة توريد متكاملة.", "توصيل موثوق وإمداد ثابت، وليس شحنات لمرة واحدة."]
    : ["Advanced freezing technology locks in taste, color, and nutrition at the point of freezing.", "Built for households and the HORECA sector with the same product standard.", "International food safety standards backed by an integrated farm-to-export supply chain.", "Reliable delivery that businesses and households can depend on."];
  const faqs = isArabic
    ? [["ما هي شركة بال فريش جلوبال؟", "هي الذراع الدولية لشركة بال فروزن فودز، ومقرها دبي، ومتخصصة في تصدير الخضروات المجمدة والوجبات الجاهزة."], ["أين يقع مقر بال فريش جلوبال؟", "تقع في مول بن شبيب على شارع بغداد في منطقة القصيص، دبي."], ["ما المنتجات التي تقدمها؟", "تقدم الخضروات المجمدة وعبوات التجزئة والفنادق والمطاعم للمشترين التجاريين."], ["ما الأسواق التي تخدمها؟", "تُصدّر إلى أسواق الشرق الأوسط وأمريكا الشمالية وآسيا."]]
    : [["What is PalFresh Global Trading LLC?", "PalFresh Global is the international arm of Pal Frozen Foods, based in Dubai and dedicated to exporting frozen vegetables and ready-to-eat snacks."], ["Where is PalFresh Global based?", "PalFresh Global is based at Bin Shabib Mall on Baghdad Street in Al Qusais, Dubai, UAE."], ["What products does PalFresh Global offer?", "It offers frozen vegetables and a dedicated Retail/HoReca pack for business buyers."], ["Which markets does PalFresh Global serve?", "It exports across the Middle East, North America, and Asia."]];
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    return () => {
      document.documentElement.lang = "en";
      document.documentElement.dir = "ltr";
    };
  }, [isArabic, language]);
  return (
    <div className={`route-page pfg-page ${isArabic ? "pfg-page-ar" : ""}`}>
      <RouteHeader showLanguageToggle language={language} onLanguageChange={setLanguage} />
      <PalFreshGlobalSeo />
      <main>
        <section className="pfg-hero">
          <img src="/assets/pal-frozen.webp" alt="PalFresh Global frozen vegetables" fetchpriority="high" />
          <div className="pfg-hero-shade" />
          <div className="container pfg-hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title}</h1>
            <p>{content.intro}</p>
            <a className="button button-brass" href="#pfg-products">{content.productsTitle} <ArrowDownRight size={17} /></a>
          </div>
          <div className="pfg-hero-mark"><strong>UAE</strong><span>GLOBAL EXPORTS</span></div>
        </section>
        <section className="pfg-intro section-pad"><div className="container pfg-two-col"><div><p className="eyebrow eyebrow-dark">01 · {content.aboutTitle}</p><h2>{content.aboutTitle}</h2></div><div><p className="large-copy">{content.about}</p><p>{content.roots}</p><div className="pfg-inline-links"><a href="/about">{isArabic ? "من نحن" : "About Us"} <ArrowUpRight size={14} /></a><a href="/industries/pal-frozen-foods/pal-fresh">{isArabic ? "بال فروزن فودز (الهند)" : "Pal Frozen Foods (India)"} <ArrowUpRight size={14} /></a><a href="/about/the-pal-group">SM Pal Group <ArrowUpRight size={14} /></a></div></div></div></section>
        <section className="pfg-products section-pad" id="pfg-products"><div className="container"><div className="pfg-section-heading"><p className="eyebrow eyebrow-dark">02 · {content.productsTitle}</p><h2>{content.productsTitle}</h2><p>{content.productsIntro}</p></div><div className="pfg-product-grid">{products.map((product, index) => <a className="pfg-product-card" href={product.href} key={product.label}><span>0{index + 1}</span><h3>{product.label}</h3><ArrowUpRight size={18} /></a>)}<a className="pfg-product-card pfg-product-card-featured" href="#pfg-contact"><span>10</span><h3>{isArabic ? "عبوة التجزئة والفنادق والمطاعم" : "Retail / HoReca Pack"}</h3><ArrowUpRight size={18} /></a></div></div></section>
        <section className="pfg-reasons section-pad"><div className="container pfg-two-col"><div><p className="eyebrow">03 · {content.whyTitle}</p><h2>{content.whyTitle}</h2></div><div className="pfg-reason-list">{reasons.map((reason, index) => <div key={reason}><span>0{index + 1}</span><p>{reason}</p></div>)}</div></div></section>
        <section className="pfg-reach section-pad"><div className="container pfg-two-col"><div><p className="eyebrow eyebrow-dark">04 · {content.reachTitle}</p><h2>{content.reachTitle}</h2></div><p className="large-copy">{content.reach}</p></div></section>
        <section className="pfg-contact section-pad" id="pfg-contact"><div className="container pfg-contact-grid"><div><p className="eyebrow">05 · {content.contactTitle}</p><h2>{content.contactTitle}</h2><p>{isArabic ? "للحصول على كتيبات المنتجات أو للاستفسارات الخاصة، تفضلوا بزيارة فريقنا." : "For product brochures or specific inquiries, get in touch with our team."}</p></div><address><div><span>{content.addressLabel}</span><strong>{content.address}</strong></div><div><span>{content.phoneLabel}</span><a href="tel:+971505738300">+971 50 573 8300</a></div><div><span>{content.hoursLabel}</span><strong>{content.hours}</strong></div><a className="button button-brass" href="/contact">{content.cta} <ArrowUpRight size={17} /></a></address></div></section>
        <section className="pfg-faq section-pad"><div className="container pfg-two-col"><div><p className="eyebrow eyebrow-dark">06 · {content.faqTitle}</p><h2>{content.faqTitle}</h2></div><div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<ArrowDownRight size={18} /></summary><p>{answer}</p></details>)}</div></div></section>
        <section className="pfg-explore section-pad"><div className="container pfg-two-col"><div><p className="eyebrow">07 · {content.exploreTitle}</p><h2>{content.exploreTitle}</h2></div><div><p className="large-copy">{content.explore}</p><div className="pfg-inline-links"><a href="/industries/pal-farms">{isArabic ? "بال أجريكلتشر" : "Pal Agriculture"} <ArrowUpRight size={14} /></a><a href="/media">{isArabic ? "المعارض" : "Exhibitions"} <ArrowUpRight size={14} /></a><a href="/about/board-of-directors">{isArabic ? "مجلس الإدارة" : "Board of Directors"} <ArrowUpRight size={14} /></a><a href="/media">{isArabic ? "المدونة" : "Blog"} <ArrowUpRight size={14} /></a></div></div></div></section>
      </main>
      <Footer />
    </div>
  );
}

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
      text: "A pantry staple that works in everything from curries to fried rice, frozen at peak sweetness so you get consistent quality no matter the season.",
    },
    {
      name: "Frozen Mix Veg",
      text: "A ready-to-cook blend for quick meals, sabzis, and stir-fries, saving the chopping and prep work without giving up freshness.",
    },
    {
      name: "Frozen Soya Chaap",
      text: "A protein-rich option that has become a popular base for both home cooking and restaurant menus, frozen to stay ready whenever you need it.",
    },
    {
      name: "Frozen Cauliflower",
      text: "Cut and frozen for easy use in curries, stir-fries, or roasted dishes, without the trimming and cleaning fresh cauliflower usually demands.",
    },
    {
      name: "Frozen Cut Beans",
      text: "Pre-cut and ready to cook, useful for everything from simple side dishes to larger batch cooking in commercial kitchens.",
    },
    {
      name: "Frozen Broccoli",
      text: "A versatile option for salads, stir-fries, and healthier meal planning, frozen to hold onto its texture and nutrition.",
    },
    {
      name: "Frozen Sweet Corn",
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

  const productImages = [
    { label: "Peas", alt: "Frozen green peas" },
    { label: "Mix Veg", alt: "Assorted frozen vegetables" },
    { label: "Soya Chaap", alt: "Fresh edamame soybeans" },
    { label: "Cauliflower", alt: "Fresh cauliflower" },
    { label: "Cut Beans", alt: "Fresh green beans" },
    { label: "Broccoli", alt: "Fresh broccoli" },
    { label: "Sweet Corn", alt: "Sweet corn kernels" },
  ];

  const productSvgs = [
    // Peas
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="22" cy="48" r="11" fill="#7CB342" />
        <circle cx="40" cy="38" r="11" fill="#9CCC65" />
        <circle cx="58" cy="48" r="11" fill="#7CB342" />
        <circle cx="30" cy="58" r="10" fill="#8BC34A" />
        <circle cx="50" cy="58" r="10" fill="#9CCC65" />
        <path d="M18 28 Q40 12 62 28" stroke="#558B2F" strokeWidth="2" fill="none" strokeLinecap="round" />
        <ellipse cx="40" cy="22" rx="6" ry="3" fill="#7CB342" />
      </svg>
    ),
    // Mix Veg
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="24" cy="32" r="10" fill="#E53935" />
        <circle cx="56" cy="32" r="10" fill="#7CB342" />
        <circle cx="40" cy="50" r="10" fill="#FBC02D" />
        <path d="M16 18 L24 12 M56 18 L56 12 M40 38 L40 32" stroke="#558B2F" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="24" cy="14" rx="4" ry="2" fill="#7CB342" />
        <ellipse cx="56" cy="14" rx="4" ry="2" fill="#558B2F" />
      </svg>
    ),
    // Soya Chaap
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="18" y="24" width="44" height="14" rx="3" fill="#C8A165" />
        <rect x="22" y="38" width="36" height="12" rx="3" fill="#B58A50" />
        <rect x="20" y="50" width="40" height="14" rx="3" fill="#D4B27A" />
        <circle cx="28" cy="31" r="1.5" fill="#8B5A2B" />
        <circle cx="40" cy="31" r="1.5" fill="#8B5A2B" />
        <circle cx="52" cy="31" r="1.5" fill="#8B5A2B" />
        <circle cx="32" cy="44" r="1.5" fill="#8B5A2B" />
        <circle cx="48" cy="44" r="1.5" fill="#8B5A2B" />
        <circle cx="28" cy="57" r="1.5" fill="#8B5A2B" />
        <circle cx="40" cy="57" r="1.5" fill="#8B5A2B" />
        <circle cx="52" cy="57" r="1.5" fill="#8B5A2B" />
      </svg>
    ),
    // Cauliflower
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M14 38 Q40 14 66 38 Q60 56 40 60 Q20 56 14 38 Z" fill="#F5F5F0" />
        <circle cx="28" cy="36" r="5" fill="#FFFFFF" />
        <circle cx="40" cy="30" r="5" fill="#FFFFFF" />
        <circle cx="52" cy="36" r="5" fill="#FFFFFF" />
        <circle cx="34" cy="44" r="4.5" fill="#FFFFFF" />
        <circle cx="46" cy="44" r="4.5" fill="#FFFFFF" />
        <circle cx="40" cy="50" r="4" fill="#FFFFFF" />
        <path d="M20 60 L18 70 L62 70 L60 60" fill="#8BC34A" />
        <path d="M20 62 L18 70 M60 62 L62 70" stroke="#558B2F" strokeWidth="1" />
      </svg>
    ),
    // Cut Beans
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M14 36 Q22 22 40 28 Q58 22 66 36" stroke="#7CB342" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M14 50 Q22 36 40 42 Q58 36 66 50" stroke="#558B2F" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="22" cy="40" rx="5" ry="4" fill="#9CCC65" transform="rotate(-25 22 40)" />
        <ellipse cx="40" cy="34" rx="5" ry="4" fill="#9CCC65" />
        <ellipse cx="58" cy="40" rx="5" ry="4" fill="#9CCC65" transform="rotate(25 58 40)" />
        <ellipse cx="22" cy="54" rx="5" ry="4" fill="#7CB342" transform="rotate(-25 22 54)" />
        <ellipse cx="40" cy="48" rx="5" ry="4" fill="#7CB342" />
        <ellipse cx="58" cy="54" rx="5" ry="4" fill="#7CB342" transform="rotate(25 58 54)" />
      </svg>
    ),
    // Broccoli
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <circle cx="28" cy="30" r="9" fill="#2E7D32" />
        <circle cx="42" cy="24" r="9" fill="#388E3C" />
        <circle cx="56" cy="30" r="9" fill="#2E7D32" />
        <circle cx="35" cy="40" r="8" fill="#43A047" />
        <circle cx="49" cy="40" r="8" fill="#388E3C" />
        <circle cx="42" cy="34" r="8" fill="#4CAF50" />
        <path d="M36 50 L36 64 M44 50 L44 64" stroke="#F5F5F0" strokeWidth="6" strokeLinecap="round" />
        <path d="M32 60 L48 60 L46 70 L34 70 Z" fill="#8BC34A" />
      </svg>
    ),
    // Sweet Corn
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M30 12 Q50 12 50 32 L50 64 Q50 76 40 76 Q30 76 30 64 L30 32 Q30 12 50 12" fill="#FBC02D" />
        <circle cx="36" cy="24" r="3" fill="#F9A825" />
        <circle cx="44" cy="24" r="3" fill="#F9A825" />
        <circle cx="40" cy="30" r="3" fill="#FBC02D" />
        <circle cx="36" cy="36" r="3" fill="#F9A825" />
        <circle cx="44" cy="36" r="3" fill="#F9A825" />
        <circle cx="40" cy="42" r="3" fill="#FBC02D" />
        <circle cx="36" cy="48" r="3" fill="#F9A825" />
        <circle cx="44" cy="48" r="3" fill="#F9A825" />
        <circle cx="40" cy="54" r="3" fill="#FBC02D" />
        <circle cx="36" cy="60" r="3" fill="#F9A825" />
        <circle cx="44" cy="60" r="3" fill="#F9A825" />
        <circle cx="40" cy="66" r="3" fill="#FBC02D" />
        <path d="M30 12 Q18 18 16 36 Q22 30 30 28" fill="#7CB342" />
        <path d="M50 12 Q62 18 64 36 Q58 30 50 28" fill="#558B2F" />
      </svg>
    ),
  ];

  return (
    <div className="route-page pal-fresh-page">
      <PalFreshSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="pf-hero">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=2200&q=85"
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
        <section className="pf-products section-pad" id="pf-products">
          <div className="container">
            <div className="pf-section-label reveal">
              <span>03</span>
              <i />
              <span>Our Pal Fresh product range</span>
            </div>
            <div className="pf-section-intro reveal">
              <h2>
                Seven frozen vegetables,
                <br />
                <em>one shared standard.</em>
              </h2>
              <p className="large-copy">
                Pal Fresh currently offers seven frozen vegetable products, each processed and frozen using the same IQF approach.
              </p>
            </div>
            <div className="pf-product-grid">
              {products.map((product, index) => (
                <article
                  className="pf-product-card reveal"
                  key={product.name}
                  style={{ "--delay": `${index * 70}ms` }}
                >
                  <div className="pf-product-icon" aria-hidden="true">
                    {productSvgs[index]}
                  </div>
                  <span>0{index + 1}</span>
                  <h3>{product.name}</h3>
                  <p>{product.text}</p>
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
                <img
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=85"
                  alt="Uttarakhand farmland where Pal Fresh vegetables are grown"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-2">
                <img
                  src="https://images.unsplash.com/photo-1573246123716-6b1782bfc499?auto=format&fit=crop&w=900&q=85"
                  alt="Fresh vegetables sorted and washed for processing"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-3">
                <img
                  src="https://images.unsplash.com/photo-1601001815853-3835274403b3?auto=format&fit=crop&w=900&q=85"
                  alt="Vegetables frozen with IQF technology"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-4">
                <img
                  src="https://images.unsplash.com/photo-1605478371310-a9f1e96b4ff4?auto=format&fit=crop&w=900&q=85"
                  alt="Pal Fresh retail packs ready for distribution"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-5">
                <img
                  src="https://images.unsplash.com/photo-1607301406259-dfb186e15de8?auto=format&fit=crop&w=1400&q=85"
                  alt="Pal Fresh vegetables prepared in a restaurant kitchen"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-6">
                <img
                  src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=900&q=85"
                  alt="Fresh vegetables being prepared for cooking"
                  loading="lazy"
                />
              </figure>
              <figure className="pf-bento-tile pf-bento-tile-7">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85"
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
      name: "Frozen Veggie Sticks",
      text: "Crispy coated vegetable sticks, ready to fry and built for share plates, after-school snacks, and quick entertaining.",
    },
    {
      name: "Frozen Samosa",
      text: "Hand-folded samosas filled with spiced potatoes and peas, frozen so the crisp flakiness and authentic filling come through every time.",
    },
    {
      name: "Frozen Spring Rolls",
      text: "Vegetable and spice filled rolls with a light golden crust, ready to fry for the table in minutes.",
    },
    {
      name: "Frozen Tikki",
      text: "Spiced potato and vegetable cutlets, ready to pan-fry or shallow-fry for chatpata evenings at home.",
    },
    {
      name: "Frozen Snack Platter",
      text: "A mixed assortment of Frozzo favorites, designed for gatherings, gifting, and weekend snacking without the prep work.",
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

  const productSvgs = [
    // Veggie Sticks
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="14" y="30" width="10" height="40" rx="3" fill="#F4A93C" />
        <rect x="28" y="22" width="10" height="48" rx="3" fill="#E89226" />
        <rect x="42" y="32" width="10" height="38" rx="3" fill="#F4A93C" />
        <rect x="56" y="26" width="10" height="44" rx="3" fill="#E89226" />
        <path d="M14 28 L66 28" stroke="#9CCC65" strokeWidth="2" strokeLinecap="round" />
        <path d="M28 20 L28 22 M42 30 L42 32 M56 24 L56 26" stroke="#7CB342" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // Samosa
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M22 58 L40 18 L58 58 Z" fill="#D9A04A" />
        <path d="M28 50 L40 28 L52 50" fill="#B57A2E" />
        <circle cx="36" cy="44" r="2" fill="#7CB342" />
        <circle cx="44" cy="44" r="2" fill="#7CB342" />
        <circle cx="40" cy="48" r="2" fill="#9CCC65" />
        <circle cx="40" cy="40" r="2" fill="#E53935" />
        <path d="M22 58 L58 58" stroke="#9C6A1F" strokeWidth="2" />
      </svg>
    ),
    // Spring Roll
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="10" y="32" width="60" height="20" rx="3" fill="#E8B872" transform="rotate(-12 40 42)" />
        <rect x="14" y="34" width="52" height="16" rx="2" fill="#D9A04A" transform="rotate(-12 40 42)" />
        <path d="M14 38 L66 38" stroke="#B57A2E" strokeWidth="1" transform="rotate(-12 40 42)" />
        <path d="M14 46 L66 46" stroke="#B57A2E" strokeWidth="1" transform="rotate(-12 40 42)" />
        <circle cx="22" cy="50" r="1.5" fill="#7CB342" />
        <circle cx="34" cy="48" r="1.5" fill="#9CCC65" />
        <circle cx="46" cy="50" r="1.5" fill="#7CB342" />
        <circle cx="58" cy="48" r="1.5" fill="#9CCC65" />
      </svg>
    ),
    // Tikki
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="48" rx="28" ry="14" fill="#D9A04A" />
        <ellipse cx="40" cy="46" rx="22" ry="10" fill="#E89226" />
        <circle cx="32" cy="44" r="2" fill="#7CB342" />
        <circle cx="44" cy="44" r="2" fill="#7CB342" />
        <circle cx="38" cy="48" r="1.5" fill="#E53935" />
        <circle cx="48" cy="46" r="1.5" fill="#FBC02D" />
        <path d="M16 56 L24 64 M64 56 L56 64" stroke="#E89226" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    // Snack Platter
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="52" rx="32" ry="10" fill="#F5F5F0" />
        <ellipse cx="40" cy="50" rx="30" ry="8" fill="#FFFFFF" />
        <path d="M22 48 L28 36 L34 48 Z" fill="#D9A04A" />
        <rect x="38" y="32" width="14" height="14" rx="2" fill="#E89226" transform="rotate(15 45 39)" />
        <ellipse cx="56" cy="46" rx="8" ry="4" fill="#E89226" />
        <circle cx="26" cy="50" r="1" fill="#7CB342" />
        <circle cx="48" cy="48" r="1" fill="#7CB342" />
        <circle cx="58" cy="44" r="1" fill="#7CB342" />
      </svg>
    ),
  ];

  return (
    <div className="route-page frozzo-page ui-styling">
      <FrozzoSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="fz-hero">
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=2200&q=85"
            alt="Frozzo premium RTF and RTE frozen snacks"
          />
          <div className="fz-hero-shade" />
          <div className="container fz-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Frozzo, from our farms
              <br />
              <em>to your freezer.</em>
            </h1>
            <p className="fz-hero-intro">
              Frozzo brings the taste of authentic Indian spices to frozen snacking, made with vegetables grown through direct farming partnerships and frozen using IQF technology. Since 2021, Frozzo has been Pal Frozen Foods' answer to a simple question, why should convenience mean giving up on real flavor.
            </p>
            <div className="fz-hero-actions">
              <a className="button button-brass" href="#fz-products">
                Explore our snacks <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="fz-hero-mark">
            <strong>2021</strong>
            <p>RTF &amp; RTE frozen snacks</p>
          </div>
        </section>

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
        <section className="fz-products section-pad" id="fz-products">
          <div className="container">
            <div className="fz-section-label reveal">
              <span>03</span>
              <i />
              <span>Our Frozzo snack range</span>
            </div>
            <div className="fz-section-intro reveal">
              <h2>
                Vegetables and authentic
                <br />
                <em>Indian spices, ready to go.</em>
              </h2>
              <p className="large-copy">
                Frozzo's snacks are built around the same idea across the range, vegetables and authentic Indian spices, frozen and ready whenever you are. From quick weeknight snacking to feeding a crowd, the range is designed to make flavorful food genuinely convenient.
              </p>
            </div>
            <div className="fz-product-grid">
              {snacks.map((snack, index) => (
                <article
                  className="fz-product-card reveal"
                  key={snack.name}
                  style={{ "--delay": `${index * 70}ms` }}
                >
                  <div className="fz-product-icon" aria-hidden="true">
                    {productSvgs[index]}
                  </div>
                  <span>0{index + 1}</span>
                  <h3>{snack.name}</h3>
                  <p>{snack.text}</p>
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
                <img
                  src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=1200&q=85"
                  alt="Authentic Indian spices used in Frozzo snacks"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-2">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo frozen snacks ready to fry"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-3">
                <img
                  src="https://images.unsplash.com/photo-1567337710282-00832b415979?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo snacks being prepared in a traditional kitchen"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-4">
                <img
                  src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo snack served on a plate"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-5">
                <img
                  src="https://images.unsplash.com/photo-1505935428862-770b6f24f629?auto=format&fit=crop&w=900&q=85"
                  alt="Frozzo retail packs ready for distribution"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-6">
                <img
                  src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=900&q=85"
                  alt="Indian snack platter with Frozzo products"
                  loading="lazy"
                />
              </figure>
              <figure className="fz-bento-tile fz-bento-tile-7">
                <img
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

function PalStoneIndustriesPage({ page }) {
  useEffect(() => {
    const nodes = document.querySelectorAll(".pal-stone-page .reveal");
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

  const materials = {
    natural: [
      { size: "8 mm" },
      { size: "10 mm" },
      { size: "20 mm" },
      { size: "Pea gravel" },
    ],
    crushed: [
      { size: "10 mm" },
      { size: "20 mm" },
      { size: "40 mm" },
      { size: "65 mm" },
      { size: "Crushed sand" },
    ],
  };

  const whyChoose = [
    {
      title: "Track record since 1982",
      text: "Decades of experience including work with major clients like Indian Railways.",
    },
    {
      title: "Full material range",
      text: "From natural aggregate to crushed stone and sand, all sourced from one supplier.",
    },
    {
      title: "Genuine sustainability commitment",
      text: "Not an afterthought bolted onto an existing product line, but built into our approach.",
    },
    {
      title: "Backed by SM Pal Group",
      text: "A diversified group with over four decades of operating history across multiple verticals.",
    },
  ];

  const faqs = [
    [
      "What is Pal Stone Industries?",
      "Pal Stone Industries is SM Pal Group's founding business, established in 1982, supplying natural and crushed stone, grit, and sand for construction and infrastructure projects.",
    ],
    [
      "What materials does Pal Stone Industries supply?",
      "Pal Stone Industries supplies natural materials in 8 mm, 10 mm, and 20 mm sizes along with pea gravel, as well as crushed stone in 10 mm, 20 mm, 40 mm, and 65 mm sizes and crushed sand.",
    ],
    [
      "What major projects has Pal Stone Industries worked on?",
      "Pal Stone Industries has supplied stone and grit to Indian Railways and carried out civil works for the Gokul Dam Project, two of the milestones that shaped the business's growth.",
    ],
    [
      "Does Pal Stone Industries offer sustainable materials?",
      "Yes. Pal Stone Industries has expanded into eco-friendly and sustainable stone solutions to meet growing demand for environmentally conscious construction practices.",
    ],
  ];

  const exploreMore = [
    { eyebrow: "Vertical", label: "SM Pal Group", href: "/about/the-pal-group" },
    { eyebrow: "Vertical", label: "Pal Frozen Foods", href: "/about/the-pal-group" },
    { eyebrow: "Vertical", label: "Pal Farms", href: "/industries/pal-farms" },
    { eyebrow: "Real Estate", label: "Pal Colonisers", href: "/industries/pal-colonisers/pal-sumeera-residency" },
    { eyebrow: "Get in touch", label: "Contact our team", href: "/contact" },
  ];

  const materialSvgs = [
    // Natural stone
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M12 68 L18 32 L62 28 L72 68 Z" fill="#9E9E9E" />
        <path d="M18 32 L28 40 L58 38 L62 28" fill="#757575" />
        <path d="M28 40 L38 48 L54 46 L58 38" fill="#BDBDBD" />
        <ellipse cx="40" cy="30" rx="8" ry="4" fill="#616161" />
        <path d="M32 32 Q40 22 48 32" stroke="#424242" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    // Crushed stone
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <path d="M14 66 L22 34 L58 30 L70 66 Z" fill="#8D6E63" />
        <path d="M22 34 L32 44 L54 40 L58 30" fill="#6D4C41" />
        <circle cx="30" cy="42" r="3" fill="#5D4037" />
        <circle cx="42" cy="38" r="2.5" fill="#6D4C41" />
        <circle cx="50" cy="44" r="2" fill="#8D6E63" />
        <path d="M26 48 L34 48 M38 52 L46 52" stroke="#4E342E" strokeWidth="1.5" />
      </svg>
    ),
    // Crushed sand
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <ellipse cx="40" cy="58" rx="28" ry="14" fill="#BCAAA4" />
        <ellipse cx="40" cy="56" rx="24" ry="10" fill="#A1887F" />
        <circle cx="30" cy="52" r="1.5" fill="#8D6E63" />
        <circle cx="44" cy="50" r="1" fill="#8D6E63" />
        <circle cx="54" cy="54" r="1.5" fill="#6D4C41" />
        <circle cx="36" cy="48" r="1" fill="#8D6E63" />
        <circle cx="48" cy="46" r="1" fill="#6D4C41" />
        <circle cx="52" cy="58" r="1" fill="#8D6E63" />
      </svg>
    ),
    // Stone processing
    (
      <svg viewBox="0 0 80 80" fill="none" aria-hidden="true">
        <rect x="16" y="28" width="48" height="36" rx="4" fill="#78909C" />
        <rect x="22" y="34" width="36" height="24" rx="2" fill="#546E7A" />
        <rect x="26" y="38" width="28" height="16" rx="1" fill="#90A4AE" />
        <circle cx="40" cy="46" r="4" fill="#455A64" />
        <path d="M32 50 L32 60 M40 50 L40 60 M48 50 L48 60" stroke="#455A64" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  ];

  return (
    <div className="route-page pal-stone-page">
      <PalStoneSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="ps-hero">
          <img
            src="https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=85"
            alt="Pal Stone Industries premium stone and grit quarry"
          />
          <div className="ps-hero-shade" />
          <div className="container ps-hero-copy">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1>
              Pal Stone Industries,
              <br />
              <em>premium stone and grit since 1982.</em>
            </h1>
            <p className="ps-hero-intro">
              Pal Stone Industries has been supplying quality stone and grit since 1982, the founding business behind what eventually grew into SM Pal Group. From a single stone crushing operation, it has grown into a trusted supplier for some of the region's largest infrastructure projects, without losing sight of the material quality that built its reputation in the first place.
            </p>
            <div className="ps-hero-actions">
              <a className="button button-brass" href="#ps-materials">
                Explore materials <ArrowDownRight size={17} />
              </a>
              <a className="button button-outline" href="/contact">
                Talk to our team <ArrowUpRight size={17} />
              </a>
            </div>
          </div>
          <div className="ps-hero-mark">
            <strong>1982</strong>
            <p>Founding business of SM Pal Group</p>
          </div>
        </section>

        {/* About Pal Stone Industries */}
        <section className="ps-about section-pad" id="ps-about">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>01</span>
              <i />
              <span>About Pal Stone Industries</span>
            </div>
            <div className="ps-about-grid reveal">
              <div className="ps-about-copy">
                <h2>
                  From a single quarry
                  <br />
                  <em>to major infrastructure.</em>
                </h2>
                <p className="large-copy">
                  Pal Stone Industries was established in 1982 as the first venture of what would become SM Pal Group, starting with a focus on supplying stone and grit. You can read the fuller story behind the group's founding on our <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a> and <a className="inline-link" href="/about/ownership">Owner-Chairman</a> pages. Here, we will focus on what Pal Stone Industries actually does today, the materials it supplies and the projects it supports.
                </p>
                <p>
                  Pal Stone Industries' growth turned a corner when it secured a contract to supply stone and grit to <strong>Indian Railways</strong>, a project that proved the business could meet the demands of large-scale, high-standard infrastructure work. That success opened the door to further diversification, including civil works for the <strong>Gokul Dam Project</strong>, one of the region's significant infrastructure undertakings.
                </p>
                <p>
                  In the years since, Pal Stone Industries has steadily expanded its operations and capacity, building the kind of track record that comes only from consistently delivering on large projects, not just winning them.
                </p>
              </div>
              <aside className="ps-about-note reveal">
                <a className="inline-link" href="/about/the-pal-group">SM Pal Group</a>
                <p>The diversified group behind Pal Stone Industries, with over four decades of operating history across stone, frozen foods, real estate, and automobile dealerships.</p>
                <div className="ps-about-line" />
                <small>Founding business since <strong>1982</strong>.</small>
              </aside>
            </div>
          </div>
        </section>

        {/* Our stone and grit materials */}
        <section className="ps-materials section-pad" id="ps-materials">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>02</span>
              <i />
              <span>Our stone and grit materials</span>
            </div>
            <div className="ps-section-intro reveal">
              <h2>
                Natural and crushed options
                <br />
                <em>under one supplier.</em>
              </h2>
              <p className="large-copy">
                Pal Stone Industries supplies both natural and crushed materials, giving construction and infrastructure clients the range they need for different project requirements.
              </p>
            </div>
            <div className="ps-materials-grid">
              <article className="ps-material-card reveal">
                <div className="ps-material-icon" aria-hidden="true">
                  {materialSvgs[0]}
                </div>
                <h3>Natural materials</h3>
                <ul className="ps-material-list">
                  {materials.natural.map((item, index) => (
                    <li key={index}>{item.size}</li>
                  ))}
                </ul>
              </article>
              <article className="ps-material-card reveal">
                <div className="ps-material-icon" aria-hidden="true">
                  {materialSvgs[1]}
                </div>
                <h3>Crushed materials</h3>
                <ul className="ps-material-list">
                  {materials.crushed.slice(0, 4).map((item, index) => (
                    <li key={index}>{item.size}</li>
                  ))}
                </ul>
              </article>
              <article className="ps-material-card reveal">
                <div className="ps-material-icon" aria-hidden="true">
                  {materialSvgs[2]}
                </div>
                <h3>Crushed sand</h3>
                <ul className="ps-material-list">
                  <li>{materials.crushed[4].size}</li>
                </ul>
              </article>
            </div>
            <p className="ps-materials-note">
              Having both natural and crushed options under one supplier means clients working across multiple project requirements, from fine aggregate to larger stone, can source consistently from Pal Stone Industries rather than juggling multiple vendors.
            </p>
          </div>
        </section>

        {/* Sustainable stone solutions */}
        <section className="ps-sustainable section-pad" id="ps-sustainable">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>03</span>
              <i />
              <span>Committed to sustainable stone solutions</span>
            </div>
            <div className="ps-sustainable-grid reveal">
              <div className="ps-sustainable-copy">
                <h2>
                  Construction moves forward.
                  <br />
                  <em>Our materials move with it.</em>
                </h2>
                <p className="large-copy">
                  As construction increasingly moves toward environmentally conscious practices, Pal Stone Industries has expanded into eco-friendly and sustainable stone solutions to meet that demand.
                </p>
                <p>
                  Backed by advanced technology and a dedicated team, the business continues investing in ways to supply quality materials without ignoring the environmental cost of getting there.
                </p>
              </div>
              <div className="ps-sustainable-visual" aria-hidden="true">
                {materialSvgs[3]}
              </div>
            </div>
          </div>
        </section>

        {/* Built for large-scale infrastructure */}
        <section className="ps-infrastructure section-pad" id="ps-infrastructure">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>04</span>
              <i />
              <span>Built for large-scale infrastructure</span>
            </div>
            <div className="ps-infrastructure-grid reveal">
              <div className="ps-infrastructure-copy">
                <h2>
                  The same standard
                  <br />
                  <em>for every project.</em>
                </h2>
                <p className="large-copy">
                  Pal Stone Industries' work with Indian Railways and the Gokul Dam Project reflects the kind of standard the business is built around, consistent quality at a scale that matters for national infrastructure, not just local construction.
                </p>
                <p>
                  That same standard carries through to every client the business works with today, regardless of project size.
                </p>
              </div>
              <div className="ps-infrastructure-highlights">
                <div className="ps-highlight reveal">
                  <span className="ps-highlight-label">Indian Railways</span>
                  <p className="ps-highlight-text">Stone and grit supply for railway infrastructure</p>
                </div>
                <div className="ps-highlight reveal">
                  <span className="ps-highlight-label">Gokul Dam Project</span>
                  <p className="ps-highlight-text">Civil works for major regional infrastructure</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why choose Pal Stone Industries */}
        <section className="ps-why section-pad" id="ps-why">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>05</span>
              <i />
              <span>Why choose Pal Stone Industries</span>
            </div>
            <div className="ps-section-intro reveal">
              <h2>
                What sets
                <br />
                <em>Pal Stone apart.</em>
              </h2>
            </div>
            <div className="ps-why-grid">
              {whyChoose.map((reason, index) => (
                <div
                  className="ps-why-card reveal"
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
        <section className="ps-faq section-pad" id="ps-faq">
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

        {/* Contact/Visit */}
        <section className="ps-contact section-pad" id="ps-contact">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>06</span>
              <i />
              <span>Visit or contact Pal Stone Industries</span>
            </div>
            <div className="ps-contact-grid reveal">
              <aside className="ps-contact-facts">
                <div className="ps-contact-fact">
                  <span>01</span>
                  <strong>Address</strong>
                  <p>Palam City, Devalchaur<br />Opposite Pal Ford, Rampur Road<br />Haldwani, 263139</p>
                </div>
                <div className="ps-contact-fact">
                  <span>02</span>
                  <strong>Phone</strong>
                  <a href="tel:+919045599277">+91 90455 99277</a>
                </div>
                <div className="ps-contact-fact">
                  <span>03</span>
                  <strong>Email</strong>
                  <a href="mailto:marketing@smpalgroup.com">marketing@smpalgroup.com</a>
                </div>
              </aside>
              <div className="ps-contact-copy">
                <p className="eyebrow eyebrow-dark">Reach out</p>
                <h2>
                  to our
                  <br />
                  <em>team.</em>
                </h2>
                <p className="large-copy">
                  Reach out to Pal Stone Industries directly using the details above, or start a conversation with our team to discuss your project requirements.
                </p>
                <a className="button button-brass ps-contact-cta" href="/contact">
                  Start a conversation <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Explore more */}
        <section className="ps-explore section-pad">
          <div className="container">
            <div className="ps-section-label reveal">
              <span>07</span>
              <i />
              <span>Explore more about SM Pal Group</span>
            </div>
            <div className="ps-explore-intro reveal">
              <p className="large-copy">
                To see where Pal Stone Industries fits into the wider group, visit our <a className="inline-link" href="/about/the-pal-group">SM Pal Group page</a>, or explore <a className="inline-link" href="/industries/pal-colonisers/pal-sumeera-residency">Pal Colonisers</a> to see how the group's real estate projects draw on the same construction expertise. You can also read the founder's story on our <a className="inline-link" href="/about/ownership">Owner-Chairman page</a>.
              </p>
            </div>
            <div className="ps-explore-grid">
              {exploreMore.map((item, index) => (
                <a
                  className="ps-explore-card reveal"
                  href={item.href}
                  key={item.label}
                  style={{ "--delay": `${index * 60}ms` }}
                >
                  <div className="ps-explore-card-top">
                    <span className="ps-explore-eyebrow">{item.eyebrow}</span>
                    <span className="ps-explore-label">{item.label}</span>
                  </div>
                  <span className="ps-explore-arrow" aria-hidden="true">
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
      "Pal Skoda Haldwani offers a range of Skoda models, including the Kushaq, Kylaq, and Kodiaq, giving buyers in Haldwani a genuine choice across performance and price points.",
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
    <div className="route-page pal-skoda-page">
      <PalSkodaSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="skoda-hero">
          <img
            src="/assets/pal-skoda-gradient.jpeg"
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
                    <img src={model.image} alt={`Skoda ${model.name}`} loading="lazy" />
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
                  <img
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
      "Pal Nissan Haldwani offers a range of Nissan models, including the Tekton and Gravite, giving buyers in Haldwani a genuine choice across performance and price points.",
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
    <div className="route-page pal-nissan-page">
      <PalNissanSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="nissan-hero">
          <img
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
                    <img src={model.image} alt={`Nissan ${model.name}`} loading="lazy" />
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
                  <img
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
    <div className="route-page pal-ford-page">
      <PalFordSeo />
      <RouteHeader />
      <main>
        {/* Hero */}
        <section className="ford-hero">
          <img
            src="/assets/ford-opening-in-haldwani.webp"
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
                <img
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
                  <img
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

function RoutePage({ page }) {
  const [sent, setSent] = useState(false);
  const isMedia = page.type === "media";
  const isContact = page.type === "contact";
  const related =
    page.type === "project"
      ? routeGroups.colonisers
      : page.type === "dealer"
        ? routeGroups.dealerships
        : routeGroups.industries;
  return (
    <div className="route-page">
      <RouteHeader />
      <main>
        <section className="route-hero">
          <img src={page.image} alt="" fetchpriority="high" />
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
                {isMedia
                  ? "Stay close"
                  : isContact
                    ? "Start a conversation"
                    : page.type === "leadership"
                      ? "Our people"
                      : page.type === "group"
                        ? "Our foundation"
                      : "A closer look"}
              </p>
              <h2>
                {isMedia
                  ? "What’s moving forward."
                  : isContact
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
                    isMedia
                      ? "/#media"
                      : page.type === "group"
                        ? "/about#business-verticals"
                        : "/contact"
                  }
                >
                  {isMedia
                    ? "Watch group stories"
                    : page.type === "group"
                      ? "Explore our verticals"
                      : "Talk to our team"}{" "}
                  <ArrowRight size={17} />
                </a>
              )}
            </div>
          </div>
        </section>
        {isMedia && (
          <section className="route-list section-pad">
            <div className="container">
              <div className="section-heading">
                <div>
                  <p className="eyebrow eyebrow-dark">Latest at SM Pal Group</p>
                  <h2>
                    News and
                    <br />
                    <em>recognition.</em>
                  </h2>
                </div>
              </div>
              <div className="news-list">
                {news.map((item, index) => (
                  <a
                    className={`news-item${index === 0 ? " news-item--latest" : ""}`}
                    href="/contact"
                    key={item}
                  >
                    <span>0{index + 1}</span>
                    <h3>
                      {item}
                      {index === 0 && <span className="news-latest-badge">Latest</span>}
                    </h3>
                    <ArrowUpRight size={19} />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}
        {!isMedia && !isContact && (
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

function SiteRouter() {
  const [path, setPath] = useState(
    window.location.pathname.replace(/\/$/, "") || "/",
  );
  const [storyIndex, setStoryIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [activeJourney, setActiveJourney] = useState(0);
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const onPopState = () =>
      setPath(window.location.pathname.replace(/\/$/, "") || "/");
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll(".reveal");
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

  useEffect(() => {
    const interval = window.setInterval(
      () => setActiveHeroImage((current) => (current + 1) % heroImages.length),
      6000,
    );
    return () => window.clearInterval(interval);
  }, []);

  if (path !== "/" && routePages[path]) {
    const page = routePages[path];
    if (page.type === "about") return <AboutPage page={page} />;
    if (page.type === "pal-group") return <PalGroupPage page={page} />;
    if (page.type === "ownership") return <OwnershipPage page={page} />;
    if (page.type === "board") return <BoardPage page={page} />;
    if (page.type === "prateek") return <PrateekPage page={page} />;
    if (page.type === "pal-fresh-global") return <PalFreshGlobalPage />;
    if (page.type === "pal-fresh") return <PalFreshPage page={page} />;
    if (page.type === "frozzo") return <FrozzoPage page={page} />;
    if (page.type === "pal-stone") return <PalStoneIndustriesPage page={page} />;
    if (page.type === "pal-skoda") return <PalSkodaPage page={page} />;
    if (page.type === "nissan") return <PalNissanPage page={page} />;
    if (page.type === "pal-ford") return <PalFordPage page={page} />;
    if (page.type === "palam-view") {
      return (
        <div className="route-page palam-view-page">
          <RouteHeader />
          <PalamViewPage />
        </div>
      );
    }
    return <RoutePage page={page} />;
  }

  const story = stories[storyIndex];
  const journeyStage = journeyStages[activeJourney];
  const nextStory = () =>
    setStoryIndex((current) => (current + 1) % stories.length);
  const previousStory = () =>
    setStoryIndex((current) => (current - 1 + stories.length) % stories.length);

  return (
    <div id="top">
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
              <div
                className={`hero-image ${activeHeroImage === index ? "is-active" : ""}`}
                key={image}
                style={{ backgroundImage: `url('${image}')` }}
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
                <a className="button button-outline" href="#contact">
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
            {journeyStages.map((stage, index) => <button className={`journey-card ${activeJourney === index ? 'is-active' : ''}`} type="button" key={stage.title} onClick={() => setActiveJourney(index)} aria-pressed={activeJourney === index} style={{ '--offset': `${index % 2 === 0 ? 0 : 38}px`, '--delay': `${index * 70}ms` }}><span className="journey-card-number">0{index + 1}</span><img src={stage.image} alt={stage.alt} loading="lazy" /><span className="journey-card-overlay" /><span className="journey-card-copy"><strong>{stage.label}</strong><small>{stage.title}</small></span></button>)}
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
                      <img
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
              <img
                src={chairmanImage}
                alt="Chairman and founder of SM Pal Group"
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
            </div>
          </div>
        </section>

        <section className="awards section-pad">
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
              <a className="text-link" href="#contact">
                View all news <ArrowRight size={17} />
              </a>
            </div>
            <div className="news-list">
              {news.map((item, index) => (
                <a
                  className={`news-item${index === 0 ? " news-item--latest" : ""}`}
                  href="#contact"
                  key={item}
                >
                  <span>0{index + 1}</span>
                  <h3>
                    {item}
                    {index === 0 && <span className="news-latest-badge">Latest</span>}
                  </h3>
                  <ArrowUpRight size={19} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="community section-pad">
          <div className="container community-grid">
            <div className="community-image reveal">
              <img
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
              <a className="text-link" href="#contact">
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

        {/* <section className="insights section-pad" id="insights"><div className="container"><div className="section-heading reveal"><div><p className="eyebrow eyebrow-dark">The latest</p><h2>Ideas worth<br /><em>sharing.</em></h2></div><a className="text-link" href="#contact">View all insights <ArrowRight size={17} /></a></div><div className="insight-grid">{insights.map((insight, index) => <article className="insight-card reveal" style={{ '--delay': `${index * 80}ms` }} key={insight.title}><div className="insight-image"><img src={insight.image} alt="" loading="lazy" /></div><div className="insight-meta"><span>{insight.date}</span><span>{insight.category}</span></div><h3>{insight.title}</h3><a href="#contact" aria-label={`Read ${insight.title}`}><ArrowUpRight size={18} /></a></article>)}</div></div></section> */}

        {/* <section className="visit section-pad"><div className="container visit-grid"><div className="reveal"><p className="eyebrow eyebrow-dark">Visit SM Pal Group</p><h2>Visit SM Pal Group</h2></div><div className="visit-copy reveal"><p className="large-copy">SM Pal Group is based in Haldwani, Uttarakhand, and serves customers across the Kumaon region through its real estate projects, dealership showrooms, and distribution network for Pal Fresh and Frozzo.</p><p className="intro-detail">To get in touch with a specific vertical, real estate, car dealerships, frozen foods, or stone supply, visit the relevant business page or contact the team directly.</p><div className="hero-actions"><a className="button button-brass" href="#businesses">Explore All Businesses <ArrowRight size={17} /></a><a className="text-link" href="#contact">Contact Us <ArrowRight size={17} /></a></div></div></div></section> */}
      </main>

      <Footer />
    </div>
  );
}

export default SiteRouter;
