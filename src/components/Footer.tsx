"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiLinkedin, FiGithub, FiMail, FiArrowUp } from "react-icons/fi";

type FooterLink = {
  href: string;
  label: string;
  className?: string;
};

type FooterSection = {
  title: string;
  items: (FooterLink | SocialLink)[];
  alignment: "left" | "center" | "right";
};

type SocialLink = {
  type: "social";
  platform: string;
  href: string;
  icon: IconType;
  ariaLabel: string;
};


const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300 } as const // Framer expects type to be literal union :/
  }
};

const socialItemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring" } as const
  }
};

const Footer = () => {
  const FOOTER_CONFIG: {
  sections: FooterSection[];
  copyright: {
    text: string;
    additionalText: string;
  };
} = {
  sections: [
    {
      title: "Services",
      alignment: "left",
      items: [
        { href: "#ai-solutions", label: "AI Solutions" },
        { href: "#automation", label: "Process Automation" },
        { href: "#consulting", label: "Tech Consulting" },
      ],
    },
    {
      title: "Connect",
      alignment: "center",
      items: [
        {
          type: "social",
          platform: "LinkedIn",
          href: "https://www.linkedin.com/in/jacquelyn-carmichael-950341345",
          icon: FiLinkedin,
          ariaLabel: "LinkedIn",
        },
        {
          type: "social",
          platform: "GitHub",
          href: "https://github.com/JVCarmich0959",
          icon: FiGithub,
          ariaLabel: "GitHub",
        },
        {
          type: "social",
          platform: "Email",
          href: "mailto:Ske1th@proton.me",
          icon: FiMail,
          ariaLabel: "Email",
        },
      ],
    },
    {
      title: "Location",
      alignment: "right",
      items: [
        { href: "#", label: "Goldsboro, NC" },
        { href: "#", label: "Serving clients nationwide" },
      ],
    },
  ],
  copyright: {
    text: `© ${new Date().getFullYear()} Skeith Technologies. All rights reserved.`,
    additionalText: "Bringing enterprise-grade solutions to growing businesses.",
  },
};

  
  const FooterLinkItem = ({ href, label }: FooterLink) => (
    <motion.li
      variants={itemVariants}
      whileHover={{ x: 3 }}
      transition={{ type: "spring", stiffness: 300 } as const}
    >
      <a
        href={href}
        className="text-gray-400 hover:text-blue-300 transition-colors duration-200"
      >
        {label}
      </a>
    </motion.li>
  );

  const SocialLinkItem = ({ href, icon: Icon, ariaLabel }: SocialLink) => (
    <motion.a
      href={href}
      aria-label={ariaLabel}
      className="text-gray-400 hover:text-blue-300 transition-colors duration-200"
      variants={socialItemVariants}
      whileHover={{ scale: 1.2, color: "#93c5fd" }}
      whileTap={{ scale: 0.9 }}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </motion.a>
  );

  const FooterSection = ({ title, items, alignment }: FooterSection) => {
    const alignmentClass = {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }[alignment];

    return (
      <div className={alignmentClass}>
        <motion.h3
          className="text-white font-medium mb-4 text-lg"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
        {title === "Connect" ? (
          <motion.div
            className="flex justify-center space-x-6"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {items.map((item, index) =>
              "type" in item && item.type === "social" ? (
                <SocialLinkItem
                  key={`${item.platform}-${item.href}-${index}`} // added the &apos;index&apos; here
                  {...item}
                />
              ) : null
            )}
          </motion.div>
        ) : (
          <motion.ul
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {items.map((item, index) =>
              !("type" in item) ? (
                <FooterLinkItem
                  key={`${item.label}-${item.href}-${index}`} // added the &apos;index&apos; here  
                  {...item}
                />
              ) : null
            )}
          </motion.ul>
        )}
      </div>
    );
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 rounded-t-xl mt-20 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {FOOTER_CONFIG.sections.map((section) => (
            <FooterSection key={section.title} {...section} />
          ))}
        </motion.div>

        <motion.div
          className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            {FOOTER_CONFIG.copyright.text}
            <span className="block md:inline mt-1 md:mt-0 md:ml-2">
              {FOOTER_CONFIG.copyright.additionalText}
            </span>
          </p>

          <motion.a
            href="#top"
            className="flex items-center text-sm text-gray-400 hover:text-blue-300 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
            <FiArrowUp className="ml-1" aria-hidden="true" />
          </motion.a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
