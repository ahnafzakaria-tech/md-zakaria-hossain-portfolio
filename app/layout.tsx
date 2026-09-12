import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, Sacramento } from "next/font/google";
import "./globals.css";
import { person } from "./data/content";

const inter = Inter({
  subsets:  ["latin"],
  variable: "--font-inter",
  display:  "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets:  ["latin"],
  variable: "--font-jakarta",
  display:  "swap",
  weight:   ["400", "500", "600", "700", "800"],
});

const sacramento = Sacramento({
  subsets:  ["latin"],
  variable: "--font-sacramento",
  display:  "swap",
  weight:   "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://md-zakaria-hossain.vercel.app"
  ),
  title: {
    default:  `${person.nameShort} — Project Document Controller`,
    template: `%s | ${person.nameShort}`,
  },
  description:
    "Project Document Controller specialising in EPC documentation, EDMS/PMIS administration, and construction document compliance. Based in Riyadh, Saudi Arabia.",
  keywords: [
    "Document Controller",
    "EPC Documentation",
    "EDMS",
    "PMIS",
    "Thinkproject",
    "Aconex",
    "Construction Documentation",
    "Document Control Engineer",
    "Saudi Arabia",
    "Power Plant",
    "Wind Project",
    "Samsung C&T",
    "CEEC",
    person.name,
  ],
  authors: [{ name: person.name }],
  creator: person.name,
  openGraph: {
    type:      "website",
    locale:    "en_US",
    title:     `${person.nameShort} — Project Document Controller`,
    description:
      "EPC Document Control specialist with hands-on EDMS/PMIS experience across power generation and renewable energy projects in Saudi Arabia and Bangladesh.",
    siteName:  person.nameShort,
  },
  twitter: {
    card:        "summary_large_image",
    title:       `${person.nameShort} — Project Document Controller`,
    description: "EPC Document Control specialist | Thinkproject · Aconex · S-PMIS",
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true },
  },
};

export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#0B1628",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jakarta.variable} ${sacramento.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
