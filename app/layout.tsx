import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Press_Start_2P } from "next/font/google";
import localFont from "next/font/local";
import { CookieBanner } from "./components/CookieBanner";
import { LOADER_SCRIPT, LoadingScreen } from "./components/LoadingScreen";
import "./globals.css";

const figtree = localFont({
  src: [
    {
      path: "../public/Font/figtree/static/Figtree-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/Font/figtree/static/Figtree-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-figtree",
  display: "swap",
});

const fragmentMono = localFont({
  src: [
    {
      path: "../public/Font/fragment-mono/FragmentMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Font/fragment-mono/FragmentMono-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-fragment",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  // Only the service cards use it, well below the fold.
  preload: false,
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
});

const DESCRIPTION =
  "Piermont Studios is a creative agency for branding, website design, UI/UX, performance marketing and video editing, serving clients from the USA and UK.";

export const metadata: Metadata = {
  metadataBase: new URL("https://piermontstudios.com"),
  title: {
    default: "Piermont Studios | Branding, Web Design and Marketing Agency",
    template: "%s | Piermont Studios",
  },
  description: DESCRIPTION,
  applicationName: "Piermont Studios",
  keywords: [
    "Piermont Studios",
    "brand identity",
    "brand strategy",
    "web design",
    "website development",
    "UI/UX design",
    "AI systems",
    "SEO",
    "creative agency",
    "digital marketing agency",
    "video editing",
  ],
  authors: [{ name: "Piermont Studios", url: "https://piermontstudios.com" }],
  creator: "Piermont Studios",
  publisher: "Piermont Studios",
  formatDetection: { telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://piermontstudios.com",
    siteName: "Piermont Studios",
    title: "Piermont Studios | Branding, Web Design and Marketing Agency",
    description: DESCRIPTION,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Piermont Studios, We Strategize Build and Promote",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Piermont Studios | Branding, Web Design and Marketing Agency",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${fragmentMono.variable} ${cormorant.variable} ${pressStart.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LOADER_SCRIPT }} />
      </head>
      <body className="min-h-dvh font-sans">
        <LoadingScreen />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
