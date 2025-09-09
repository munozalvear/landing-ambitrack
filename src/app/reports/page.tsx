import type { Metadata } from "next";

import Herologo from "@/app/reports/heromap";
import Reports from "@/app/reports/reports";

export const metadata: Metadata = {
  title: "AmbiTrarck | Reportes",
};
export default function Home() {
  return (
    <div>
      <section className="flex flex-col max-w-4xl dark: mx-auto py-36">
        <Herologo />
      </section>
      <Reports />
    </div>
  );
}
