import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "../globals.css";
import { Hydration } from "@/components/providers/Hydration";

const font = Instrument_Sans({
  subsets: ["latin"],
});

// Export metadata for SEO (if using app router)
export const metadata: Metadata = {
  title: "JeanPay - Send Money Across Africa | Fast, Secure, Affordable",
  description:
    "Send and receive money across Africa with JeanPay. Enjoy the best exchange rates, lowest fees, and lightning-fast transfers. Save up to 7% annually on your USD savings.",
  keywords: [
    "money transfer",
    "Africa remittance",
    "cross-border payments",
    "USD account",
    "virtual card",
    "savings account",
    "Ghana Nigeria Kenya",
    "JeanPay",
  ].join(", "),
  authors: [{ name: "JeanPay" }],
  creator: "JeanPay",
  publisher: "JeanPay",
  openGraph: {
    title: "JeanPay - Send Money Across Africa",
    description:
      "Fast, secure, and affordable money transfers across Africa. Virtual USD cards, high-yield savings, and instant transfers.",
    url: "https://jeanpay.com",
    siteName: "JeanPay",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JeanPay - Money Transfer App",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JeanPay - Send Money Across Africa and the US",
    description:
      "Fast, secure, and affordable money transfers across Africa and the US.",
    images: ["/twitter-image.jpg"],
    creator: "@jeanpay",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <Hydration>{children}</Hydration>
      </body>
    </html>
  );
}
