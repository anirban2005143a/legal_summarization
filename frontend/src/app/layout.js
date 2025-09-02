import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/utils/ScrollToTop";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "India's Premier Legal Document Service",
  description:
    "InLegalLaySum (Indian Legal Layman Summarization) dataset is a legal document summarization dataset focusing on simplified summaries of legal documents suitable for laypersons (who do not have formal legal training, i.e., layman in the perspective of Law)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Load PDF.js via CDN */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.js"
          strategy="beforeInteractive" // ensures script loads before your code runs
          integrity="sha512-XGwSXxlyrtsg9EH1Hw2lkOTEqqX1gK1nMtaeEw+8VHFBaohxZmrQzu4aXzCOkfXz/oPrhFNoL6BskapCeNRVxw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScrollToTop>{children}</ScrollToTop>
      </body>
    </html>
  );
}
