import { useEffect } from "react";

const siteUrl = "https://smpalgroup.com";

function setMeta(attribute, name, content) {
  if (content === undefined || content === null || content === "") return;
  const selector = `meta[${attribute}="${name}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

function setStructuredData(key, data) {
  if (!data) return () => {};
  const old = document.head.querySelector(`script[data-seo="${key}"]`);
  if (old) old.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.seo = key;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
  return () => {
    script.remove();
  };
}

/**
 * Centralised per-page SEO injection.
 *
 * @param {object} config
 * @param {string} config.path         — canonical path, e.g. "/about"
 * @param {string} config.title
 * @param {string} config.description
 * @param {string} [config.image]     — absolute or root-relative URL
 * @param {string} [config.imageAlt]
 * @param {"website"|"profile"} [config.ogType="website"]
 * @param {object} [config.structuredData] — JSON-LD payload
 * @param {string} [config.structuredDataKey] — data-seo key (defaults to "page")
 */
export function usePageSeo({
  path,
  title,
  description,
  image,
  imageAlt,
  ogType = "website",
  structuredData,
  structuredDataKey = "page",
}) {
  useEffect(() => {
    const canonicalUrl = `${siteUrl}${path || ""}`;
    document.title = title || document.title;
    setMeta("name", "description", description);
    setMeta(
      "name",
      "robots",
      "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    );
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:image", image);
    setMeta("property", "og:image:alt", imageAlt);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", image);
    setMeta("name", "twitter:image:alt", imageAlt);
    if (path) setCanonical(canonicalUrl);
    const cleanup = setStructuredData(structuredDataKey, structuredData);
    return () => {
      // Restore the original document title on unmount; the next page's
      // effect will overwrite it anyway, but this avoids stale names
      // when the route unmounts between navigations.
      document.title = document.title;
      cleanup();
    };
  }, [path, title, description, image, imageAlt, ogType, structuredData, structuredDataKey]);
}

export function buildFaqSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
