import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { AgentChat } from "~/components/blocks/AgentChat";
import { PROFILE, SITE_DESCRIPTION } from "~/lib/profile";
import { getSiteUrl } from "~/lib/site-url";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  alternates: { canonical: "/" },
  title: {
    default: `${PROFILE.name} | ${PROFILE.jobTitle}`,
    template: `%s | ${PROFILE.shortName}`,
  },
  description: SITE_DESCRIPTION,
  authors: [{ name: PROFILE.name, url: PROFILE.github }],
  openGraph: {
    title: `${PROFILE.name} | ${PROFILE.jobTitle}`,
    description: SITE_DESCRIPTION,
    type: "profile",
    locale: "en_GB",
  },
  icons: [{ rel: "icon", url: "/icon.svg", type: "image/svg+xml" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} dark scroll-smooth`}>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <AgentChat />
      </body>
    </html>
  );
}
