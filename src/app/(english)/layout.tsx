import type { Metadata } from "next";
import { LocaleDocument, getLocaleMetadata } from "@/components/locale-document";
import "../globals.css";

export const metadata: Metadata = getLocaleMetadata("en");

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LocaleDocument locale="en">{children}</LocaleDocument>;
}
