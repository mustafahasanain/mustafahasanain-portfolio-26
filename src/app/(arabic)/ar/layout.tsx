import type { Metadata } from "next";
import { LocaleDocument, getLocaleMetadata } from "@/components/locale-document";
import "../../globals.css";

export const metadata: Metadata = getLocaleMetadata("ar");

export default function ArabicRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <LocaleDocument locale="ar">{children}</LocaleDocument>;
}
