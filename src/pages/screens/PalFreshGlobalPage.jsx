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

function PalFreshGlobalPage() {
  const [language, setLanguage] = useState("en");
  const isArabic = language === "ar";
  const content = isArabic
    ? {
        eyebrow: "بال فريش جلوبال · دبي، الإمارات",
        title: "بال فريش جلوبال،",
        titleAccent: "من مزارعنا إلى مُجمّدك",
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
        explore: "لمعرفة المزيد عن مصادر مكوناتنا، تفضلوا بزيارة بال أجريكلتشر، أو تعرفوا على مجلس الإدارة.",
        cta: "تواصل معنا",
      }
    : {
        eyebrow: "Pal Fresh Global · Dubai, UAE",
        title: "Pal Fresh Global,",
        titleAccent: "from our farms to your freezer",
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
        explore: "To learn more about our ingredients, visit Pal Agriculture, or meet our Board of Directors to learn about the people guiding the group.",
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
  const sectionLabel = (number, text) => (
    <div className="pfg-section-label">
      <span aria-hidden="true">{number}</span><i aria-hidden="true" /><span>{text}</span>
    </div>
  );
  return (
    <div className={`route-page industry-brand pfg-page ${isArabic ? "pfg-page-ar" : ""}`}>
      <a className="skip-link" href="#pfg-main">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>
      <RouteHeader showLanguageToggle language={language} onLanguageChange={setLanguage} />
      <PalFreshGlobalSeo />
      <main id="pfg-main" lang={isArabic ? "ar" : "en"} dir={isArabic ? "rtl" : "ltr"}>
        <section className="pfg-hero mobile-photo-hero">
          <ResponsiveImage src="/assets/pal-frozen.webp" alt="PalFresh Global frozen vegetables" fetchPriority="high" />
          <div className="pfg-hero-shade" />
          <div className="container pfg-hero-copy">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1>{content.title} <em>{content.titleAccent}</em></h1>
            <p>{content.intro}</p>
            <div className="pfg-hero-actions">
              <a className="button button-brass" href="#pfg-products">{content.productsTitle} <ArrowDownRight size={17} /></a>
              <a className="button button-outline" href="#pfg-contact">{content.cta} <ArrowUpRight size={17} /></a>
            </div>
          </div>
          <div className="pfg-hero-mark"><strong>{isArabic ? "الإمارات" : "UAE"}</strong><span>{isArabic ? "صادرات عالمية" : "Global exports"}</span></div>
        </section>
        <section className="pfg-intro section-pad">
          <div className="container">
            {sectionLabel("01", isArabic ? "من نحن" : "About the business")}
            <div className="pfg-two-col">
              <h2>{content.aboutTitle}</h2>
              <div className="pfg-body-copy">
                <p>{content.about}</p>
                <h3>{content.rootsTitle}</h3>
                <p>{content.roots}</p>
                <div className="pfg-inline-links">
                  <a href="/about">{isArabic ? "من نحن" : "About Us"} <ArrowUpRight size={14} /></a>
                  <a href="/industries/pal-frozen-foods/pal-fresh">{isArabic ? "بال فروزن فودز (الهند)" : "Pal Frozen Foods (India)"} <ArrowUpRight size={14} /></a>
                  <a href="/about/the-pal-group">SM Pal Group <ArrowUpRight size={14} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pfg-products section-pad" id="pfg-products">
          <div className="container">
            {sectionLabel("02", isArabic ? "منتجاتنا" : "Our products")}
            <div className="pfg-section-heading">
              <h2>{content.productsTitle}</h2><p>{content.productsIntro}</p>
            </div>
            <div className="pfg-product-grid">
              {products.map((product, index) => (
                <a className="pfg-product-card" href={product.href} key={product.label}>
                  <span>0{index + 1}</span><h3>{product.label}</h3><ArrowUpRight size={18} />
                </a>
              ))}
            </div>
            <a className="pfg-product-card pfg-product-card-featured" href="#pfg-contact">
              <span>{isArabic ? "خيارات التعبئة" : "Packaging options"}</span>
              <h3>{isArabic ? "عبوة التجزئة والفنادق والمطاعم" : "Retail / HoReca Pack"}</h3>
              <ArrowUpRight size={18} />
            </a>
          </div>
        </section>
        <section className="pfg-reasons section-pad">
          <div className="container">
            {sectionLabel("03", isArabic ? "الجودة والثقة" : "Quality and trust")}
            <div className="pfg-two-col">
              <h2>{content.whyTitle}</h2>
              <div className="pfg-reason-list">
                {reasons.map((reason, index) => <div key={reason}><span>0{index + 1}</span><p>{reason}</p></div>)}
              </div>
            </div>
          </div>
        </section>
        <section className="pfg-reach section-pad">
          <div className="container">
            {sectionLabel("04", isArabic ? "حضورنا العالمي" : "Our global reach")}
            <div className="pfg-two-col"><h2>{content.reachTitle}</h2><p>{content.reach}</p></div>
          </div>
        </section>
        <section className="pfg-contact section-pad" id="pfg-contact">
          <div className="container">
            {sectionLabel("05", isArabic ? "تواصل معنا" : "Start a conversation")}
            <div className="pfg-contact-grid">
              <div className="pfg-body-copy">
                <h2>{content.contactTitle}</h2>
                <p>{isArabic ? "للحصول على كتيبات المنتجات أو للاستفسارات الخاصة، تفضلوا بزيارة فريقنا." : "For product brochures or specific inquiries, get in touch with our team."}</p>
              </div>
              <address>
                <div><span>{content.addressLabel}</span><strong>{content.address}</strong></div>
                <div><span>{content.phoneLabel}</span><a href="tel:+971505738300">+971 50 573 8300</a></div>
                <div><span>{content.hoursLabel}</span><strong>{content.hours}</strong></div>
                <a className="button button-brass" href="/contact">{content.cta} <ArrowUpRight size={17} /></a>
              </address>
            </div>
          </div>
        </section>
        <section className="pfg-faq section-pad">
          <div className="container">
            {sectionLabel("06", isArabic ? "معلومات مفيدة" : "Good to know")}
            <div className="pfg-two-col">
              <h2>{content.faqTitle}</h2>
              <div className="faq-list">
                {faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}<ArrowDownRight size={18} /></summary><p>{answer}</p></details>)}
              </div>
            </div>
          </div>
        </section>
        <section className="pfg-explore section-pad">
          <div className="container">
            {sectionLabel("07", isArabic ? "مجموعة إس إم بال" : "Across SM Pal Group")}
            <div className="pfg-two-col">
              <h2>{content.exploreTitle}</h2>
              <div className="pfg-body-copy">
                <p>{content.explore}</p>
                <div className="pfg-inline-links">
                  <a href="/industries/pal-farms">{isArabic ? "بال أجريكلتشر" : "Pal Agriculture"} <ArrowUpRight size={14} /></a>
                  <a href="/about/board-of-directors">{isArabic ? "مجلس الإدارة" : "Board of Directors"} <ArrowUpRight size={14} /></a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


export default PalFreshGlobalPage;
