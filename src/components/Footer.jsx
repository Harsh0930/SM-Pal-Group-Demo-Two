import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { routeGroups } from '../data/navigation.js';

const quickLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'The Pal Group', href: '/about/the-pal-group' },
  { label: 'Owner-Chairman', href: '/about/ownership' },
  { label: 'Contact', href: '/contact' }
];

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.98h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29ZM5.32 7.41a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14Zm1.78 13.04H3.54V8.98H7.1v11.47ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0Z" />
  </svg>
);

const YouTubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.4.6A3 3 0 0 0 .5 6.2C0 8.05 0 12 0 12s0 3.95.5 5.8a3 3 0 0 0 2.1 2.1c1.85.6 9.4.6 9.4.6s7.55 0 9.4-.6a3 3 0 0 0 2.1-2.1C24 15.95 24 12 24 12s0-3.95-.5-5.8ZM9.6 15.6V8.4l6.25 3.6-6.25 3.6Z" />
  </svg>
);

const socialLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/smpalgroup', Icon: LinkedInIcon },
  { label: 'YouTube', href: 'https://youtube.com/@smpalgroup', Icon: YouTubeIcon }
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-year-mark" aria-hidden="true">40</div>
      <div className="container footer-shell">
        <div className="footer-brand">
          <a className="footer-logo" href="/" aria-label="SM Pal Group home">
            <img src="/assets/smpal-group-logo-white.png" alt="" className="footer-logo-mark" />
            <img src="/assets/wordmark-smpalgroup-logo.png" alt="SM Pal Group" className="footer-logo-wordmark" />
          </a>
          <p>A group of companies based in Haldwani, Uttarakhand, nurtured since 1982. Leading across stone materials, real estate, frozen foods and automobile dealerships.</p>
          <div className="footer-socials" aria-label="Social links">
            {socialLinks.map((item) => (
              <a href={item.href} key={item.label} aria-label={item.label} target="_blank" rel="noopener noreferrer">
                <item.Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer-nav" aria-label="Our verticals">
          <span>Our verticals</span>
          {routeGroups.industries.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <nav className="footer-nav" aria-label="Quick links">
          <span>Quick links</span>
          {quickLinks.map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </nav>

        <div className="footer-address-card">
          <span>Corporate address</span>
          <p><MapPin size={17} />Palam City, Devalchaur, Opp. Pal Ford, Rampur Road, Haldwani - 263139</p>
          <a href="tel:+919045599277"><Phone size={17} />+91 9045599277</a>
          <a href="mailto:hello@smpalgroup.com"><Mail size={17} />marketing@smpalgroup.com</a>
          <a className="footer-contact-cta" href="/contact">Start a conversation <ArrowUpRight size={15} /></a>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>&copy; {currentYear} SM Pal Group. All rights reserved.</span>
        <span>Nurtured Since 1982 <b>&bull;</b> Haldwani, Uttarakhand</span>
      </div>
    </footer>
  );
};

export default Footer;
