import type { IconType } from "react-icons";
import { FiMail, FiPhone, FiLinkedin, FiTwitter } from "react-icons/fi";

// 🏗 Type definitions
type ContactMethod = {
  type: "email" | "phone" | "social";
  label: string;
  value: string;
  icon: IconType;
  href: string;
  className?: string;
};

type ContactSection = {
  title: string;
  description: string;
  methods: ContactMethod[];
};

type SocialLink = {
  platform: string;
  href: string;
  icon: IconType;
  ariaLabel: string;
  className?: string;
};

// 🎛️ Configuration
const CONTACT_CONFIG = {
  section: {
    id: "contact",
    title: "Let's Work Together",
    description: "Get in touch to discuss how we can solve your specific business challenges",
    availability: "Typically respond within 24 hours • Available Mon-Fri 9am-5pm EST",
  },
  methods: [
    {
      type: "email",
      label: "Ske1th@proton.me",
      value: "mailto:Ske1th@proton.me",
      icon: FiMail,
      className: "hover:text-blue-300",
    },
    {
      type: "phone",
      label: "(252) 351-7076",
      value: "tel:+12523517076",
      icon: FiPhone,
      className: "hover:text-blue-300",
    },
  ],
  socialLinks: [
    {
      platform: "LinkedIn",
      href: "https://linkedin.com/in/yourprofile",
      icon: FiLinkedin,
      ariaLabel: "LinkedIn",
      className: "hover:bg-blue-600",
    },
    {
      platform: "Twitter",
      href: "https://twitter.com/yourhandle",
      icon: FiTwitter,
      ariaLabel: "Twitter",
      className: "hover:bg-blue-600",
    },
  ],
  callToAction: {
    email: {
      text: "Email Me",
      className: "bg-blue-600 hover:bg-blue-700",
    },
    phone: {
      text: "Call Now",
      className: "bg-gray-700 hover:bg-gray-600",
    },
  },
};

// 🧩 UI Components
const ContactCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-gray-800/50 rounded-lg p-5 border border-gray-700">
    <h3 className="font-medium mb-3 text-lg">{title}</h3>
    {children}
  </div>
);

const ContactMethodItem = ({ method }: { method: ContactMethod }) => {
  const Icon = method.icon;
  return (
    <a
      href={method.href || method.value}
      className={`flex items-center justify-center gap-2 transition-colors text-sm ${method.className}`}
    >
      <Icon className="h-4 w-4" />
      {method.label}
    </a>
  );
};

const SocialLinkButton = ({ link }: { link: SocialLink }) => {
  const Icon = link.icon;
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`p-2 rounded-full bg-gray-700 transition-colors ${link.className}`}
      aria-label={link.ariaLabel}
    >
      <Icon className="h-4 w-4" />
    </a>
  );
};

const CallToActionButton = ({ action }: { action: typeof CONTACT_CONFIG.callToAction[keyof typeof CONTACT_CONFIG.callToAction] }) => (
  <a
    href={action === CONTACT_CONFIG.callToAction.email ? "mailto:Ske1th@proton.me" : "tel:+12523517076"}
    className={`inline-block rounded-lg text-white font-medium px-6 py-3 transition-colors text-sm ${action.className}`}
  >
    {action.text}
  </a>
);

// 🚀 Main Component
export default function Contact() {
  return (
    <section
      id={CONTACT_CONFIG.section.id}
      className="my-12 rounded-xl p-6 md:p-8 text-white bg-gray-900 border border-gray-700 max-w-3xl mx-auto text-center"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-medium mb-3">{CONTACT_CONFIG.section.title}</h2>
        <p className="max-w-md mx-auto text-gray-300">{CONTACT_CONFIG.section.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <ContactCard title="Direct Contact">
          <div className="space-y-3">
            {CONTACT_CONFIG.methods.map((method) => (
              <ContactMethodItem key={method.type} method={method} />
            ))}
          </div>
        </ContactCard>

        <ContactCard title="Follow Along">
          <div className="flex justify-center gap-3">
            {CONTACT_CONFIG.socialLinks.map((link) => (
              <SocialLinkButton key={link.platform} link={link} />
            ))}
          </div>
        </ContactCard>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <CallToActionButton action={CONTACT_CONFIG.callToAction.email} />
        <CallToActionButton action={CONTACT_CONFIG.callToAction.phone} />
      </div>

      <p className="mt-6 text-gray-400 text-xs">{CONTACT_CONFIG.section.availability}</p>
    </section>
  );
}