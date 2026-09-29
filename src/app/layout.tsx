import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { AgentChat } from "~/components/blocks/AgentChat";
import { PROFILE, SITE_DESCRIPTION } from "~/lib/profile";
import { getSiteUrl } from "~/lib/site-url";
import { ThemeToggle } from "~/components/blocks/ThemeToggle";
import { THEME_INIT_SCRIPT } from "~/lib/theme";

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
    // The theme is written onto <html> by the pre-paint script below, so the
    // server markup deliberately does not match what the client ends up with.
    <html
      lang="en"
      data-theme="dark"
      className={`${geist.variable} dark scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="bg-neutral-950 text-neutral-100 antialiased">
        <div className="pointer-events-none fixed top-4 right-4 z-50 md:top-6 md:right-6">
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <AgentChat />
      </body>
    </html>
  );
}
