"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { FiMail, FiPhone, FiMapPin, FiClock, FiCheckCircle, FiCopy } from "react-icons/fi";

type ContactMethod = {
  type: "email" | "phone" | "social";
  label: string;
  value: string;
  icon: IconType;
  href: string;
  className?: string;
  copyable?: boolean;
};


const Contact = () => {
  const controls = useAnimation();
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.1 }
    });
  }, [controls]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(type);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const CONTACT_CONFIG = {
    section: {
      id: "contact",
      title: "Let's Work Together",
      description: "Ready to transform your business? Let's discuss your project and create something amazing together.",
      availability: "Typically respond within 24 hours • Available Mon-Fri 9am-5pm EST",
      location: "Goldsboro, NC • Available for remote projects worldwide"
    },
    methods: [
      {
        type: "email" as const,
        label: "Ske1th@proton.me",
        value: "Ske1th@proton.me",
        href: "mailto:Ske1th@proton.me",
        icon: FiMail,
        className: "hover:text-blue-300",
        copyable: true,
      },
      {
        type: "phone" as const,
        label: "(252) 351-7076",
        value: "+12523517076",
        href: "tel:+12523517076",
        icon: FiPhone,
        className: "hover:text-green-300",
        copyable: true,
      },
    ],
    socialLinks: [], // Remove socials for now
  };

  const ContactCard = ({ 
    title, 
    children, 
    icon: Icon 
  }: { 
    title: string; 
    children: React.ReactNode; 
    icon?: IconType;
  }) => (
    <motion.div 
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="flex items-center gap-3 mb-4">
        {Icon && <Icon className="h-5 w-5 text-blue-400" />}
        <h3 className="font-medium text-lg text-white">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  const ContactMethodItem = ({ method }: { method: ContactMethod }) => {
    const Icon = method.icon;
    const isCopied = copiedItem === method.type;
    
    return (
      <div className="flex items-center gap-2">
        <motion.a
          href={method.href}
          className={`flex items-center gap-3 transition-all duration-200 text-gray-300 py-2 px-3 rounded-lg hover:bg-gray-700/50 flex-1 ${method.className}`}
          initial={{ opacity: 0, x: -10 }}
          animate={controls}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.98 }}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm">{method.label}</span>
        </motion.a>
        
        {method.copyable && (
          <motion.button
            onClick={() => copyToClipboard(method.value, method.type)}
            className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={`Copy ${method.type}`}
          >
            {isCopied ? (
              <FiCheckCircle className="h-3 w-3 text-green-400" />
            ) : (
              <FiCopy className="h-3 w-3 text-gray-400" />
            )}
          </motion.button>
        )}
      </div>
    );
  };



  const CallToActionButton = ({ 
    text, 
    href,
    className,
    icon: Icon
  }: { 
    text: string; 
    href: string;
    className: string;
    icon?: IconType;
  }) => (
    <motion.a
      href={href}
      className={`inline-flex items-center gap-2 rounded-lg text-white font-medium px-6 py-3 text-sm transition-all duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={controls}
      whileHover={{ 
        y: -2,
        scale: 1.05,
        boxShadow: "0 8px 25px rgba(59, 130, 246, 0.3)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {text}
    </motion.a>
  );

  return (
    <motion.section
      id={CONTACT_CONFIG.section.id}
      className="my-16 rounded-2xl p-8 text-white bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 border border-gray-700/50 max-w-4xl mx-auto text-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            {CONTACT_CONFIG.section.title}
          </h2>
          <p className="max-w-lg mx-auto text-gray-300 text-lg mb-4">
            {CONTACT_CONFIG.section.description}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <FiMapPin className="h-4 w-4" />
              <span>Goldsboro, NC</span>
            </div>
            <div className="flex items-center gap-1">
              <FiClock className="h-4 w-4" />
              <span>Mon-Fri 9am-5pm EST</span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 mb-10">
          <div className="max-w-md mx-auto w-full">
            <ContactCard title="Get In Touch" icon={FiMail}>
              <div className="space-y-3">
                {CONTACT_CONFIG.methods.map((method) => (
                  <ContactMethodItem 
                    key={method.type} 
                    method={method} 
                  />
                ))}
              </div>
            </ContactCard>
          </div>
        </div>

        <motion.div 
          className="flex flex-col sm:flex-row justify-center gap-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <CallToActionButton 
            text="Send Email" 
            href="mailto:Ske1th@proton.me" 
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg" 
            icon={FiMail}
          />
          <CallToActionButton 
            text="Call Now" 
            href="tel:+12523517076" 
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-lg" 
            icon={FiPhone}
          />
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-400 text-sm mb-2">
            {CONTACT_CONFIG.section.availability}
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-medium">Available for new projects</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;