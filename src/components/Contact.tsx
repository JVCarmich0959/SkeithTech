"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import type { IconType } from "react-icons";
import { FiMail, FiPhone, FiLinkedin, FiTwitter } from "react-icons/fi";

type ContactMethod = {
  type: "email" | "phone" | "social";
  label: string;
  value: string;
  icon: IconType;
  href: string;
  className?: string;
};

type SocialLink = {
  platform: string;
  href: string;
  icon: IconType;
  ariaLabel: string;
  className?: string;
};

const Contact = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    });
  }, [controls]);

  const CONTACT_CONFIG = {
    section: {
      id: "contact",
      title: "Let&apos;s Work Together",
      description: "Get in touch to discuss how we can solve your specific business challenges",
      availability: "Typically respond within 24 hours • Available Mon-Fri 9am-5pm EST",
    },
    methods: [
      {
        type: "email" as const,
        label: "Ske1th@proton.me",
        value: "mailto:Ske1th@proton.me",
        href: "mailto:Ske1th@proton.me",
        icon: FiMail,
        className: "hover:text-blue-300",
      },
      {
        type: "phone" as const,
        label: "(252) 351-7076",
        value: "tel:+12523517076",
        href: "tel:+12523517076",
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
        className: "hover:bg-blue-600/90",
      },
      {
        platform: "Twitter",
        href: "https://twitter.com/yourhandle",
        icon: FiTwitter,
        ariaLabel: "Twitter",
        className: "hover:bg-blue-400/90",
      },
    ],
  };

  const ContactCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div 
      className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ y: -3 }}
    >
      <h3 className="font-medium mb-4 text-lg text-white">{title}</h3>
      {children}
    </motion.div>
  );

  const ContactMethodItem = ({ method }: { method: ContactMethod }) => {
    const Icon = method.icon;
    return (
      <motion.a
        href={method.href}
        className={`flex items-center justify-center gap-3 transition-colors text-gray-300 hover:text-blue-300 py-2 px-3 rounded-lg hover:bg-gray-700/50 ${method.className}`}
        initial={{ opacity: 0, x: -10 }}
        animate={controls}
        whileHover={{ x: 3 }}
        whileTap={{ scale: 0.98 }}
      >
        <Icon className="h-4 w-4 flex-shrink-0" />
        <span className="text-sm">{method.label}</span>
      </motion.a>
    );
  };

  const SocialLinkButton = ({ link }: { link: SocialLink }) => {
    const Icon = link.icon;
    return (
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`p-3 rounded-full bg-gray-700 transition-colors ${link.className}`}
        aria-label={link.ariaLabel}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={controls}
        whileHover={{ 
          scale: 1.1,
          rotate: 5
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Icon className="h-4 w-4" />
      </motion.a>
    );
  };

  const CallToActionButton = ({ 
    text, 
    href,
    className 
  }: { 
    text: string; 
    href: string;
    className: string; 
  }) => (
    <motion.a
      href={href}
      className={`inline-block rounded-lg text-white font-medium px-6 py-3 text-sm ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      whileHover={{ 
        y: -2,
        boxShadow: "0 4px 14px rgba(59, 130, 246, 0.25)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {text}
    </motion.a>
  );

  return (
    <motion.section
      id={CONTACT_CONFIG.section.id}
      className="my-16 rounded-xl p-8 text-white bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 max-w-3xl mx-auto text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-medium mb-4">{CONTACT_CONFIG.section.title}</h2>
        <p className="max-w-md mx-auto text-gray-300">{CONTACT_CONFIG.section.description}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <ContactCard title="Direct Contact">
          <div className="space-y-2">
            {CONTACT_CONFIG.methods.map((method) => (
              <ContactMethodItem 
                key={method.type} 
                method={{
                  ...method,
                  type: method.type as "email" | "phone" | "social"
                }} 
              />
            ))}
          </div>
        </ContactCard>

        <ContactCard title="Follow Along">
          <div className="flex justify-center gap-4">
            {CONTACT_CONFIG.socialLinks.map((link) => (
              <SocialLinkButton key={link.platform} link={link} />
            ))}
          </div>
        </ContactCard>
      </div>

      <motion.div 
        className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <CallToActionButton 
          text="Email Me" 
          href="mailto:Ske1th@proton.me" 
          className="bg-blue-600 hover:bg-blue-700" 
        />
        <CallToActionButton 
          text="Call Now" 
          href="tel:+12523517076" 
          className="bg-gray-700 hover:bg-gray-600" 
        />
      </motion.div>

      <motion.p 
        className="text-gray-400 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {CONTACT_CONFIG.section.availability}
      </motion.p>
    </motion.section>
  );
};

export default Contact;