import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";


// Font initialization with optimized loading
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

// Enhanced Metadata with engagement optimizations
export const metadata: Metadata = {
  metadataBase: new URL("https://skeithtech.netlify.app"),
  title: {
    default: "Professional AI Solutions | Goldsboro",
    template: "%s | YourCompany"
  },
  description: "Enterprise-grade AI solutions scaled for small businesses. Save 5-15 hours weekly with our automation tools.",
  keywords: ["AI", "business automation", "Goldsboro tech"],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" }
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "AI Solutions That Work For Your Business",
    description: "Practical automation tools for Goldsboro businesses",
    url: "https://skeithtech.netlify.app",
    siteName: "SkeithTech",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Solutions That Work For Your Business",
    description: "Practical automation tools for Goldsboro businesses",
    images: ["/twitter-image.jpg"],
  },
};

// Dynamic viewport for theme switching
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "light dark",
};

// Root Layout with Hypnotic enhancements
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={`
        antialiased min-h-screen 
        bg-background text-foreground
        transition-colors duration-300
        font-sans
      `}>
        <main className="relative overflow-hidden">
          {children}
          
          {/* Subtle background elements for visual interest */}
          <div className="fixed inset-0 -z-10 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-accent/20 blur-3xl animate-float-slow" />
            <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-accent/20 blur-3xl animate-float-delay" />
          </div>
        </main>
      </body>
    </html>
  );
}