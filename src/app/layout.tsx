import type { Metadata } from "next";
import "./globals.css";

import Header from "@/app/header";
import Footer from "@/app/footer";

export const metadata: Metadata = {
  title: "AmbiTrarck",
  description: "AmbiTrack | sistema de reportes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <div className="fixed inset-0 dark:hidden -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="fixed top-0 z-[-2] hidden dark:block h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <Header />
        <main className="px-4" >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
