import { createFileRoute, notFound } from "@tanstack/react-router";

type LegalContent = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const PAGES: Record<string, LegalContent> = {
  refund: {
    title: "Refund Policy",
    intro:
      "All sales at Nørva Store (Jevani Enterprises) are carefully curated in limited batches. Please review our policy carefully before placing your order.",
    sections: [
      {
        heading: "Returns",
        body: "Unworn and unused accessory items in original packaging may be returned within 14 days of delivery. Return shipping is the customer's responsibility unless the item is defective or incorrect.",
      },
      {
        heading: "Refunds",
        body: "Once your return is received and inspected, we will notify you of the status. Approved refunds are processed within 5–10 business days to your original payment method.",
      },
      {
        heading: "Exchanges",
        body: "We replace items if they are defective or damaged upon arrival. Contact us via WhatsApp at 09971303047 or email norvastorex@gmail.com within 48 hours of delivery.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "By visiting Nørva Store and placing an order, you agree to be bound by the following terms and conditions of Jevani Enterprises.",
    sections: [
      {
        heading: "Use of Site",
        body: "All content, logos, imagery, and product designs on this site are the property of Nørva Store / Jevani Enterprises and may not be reproduced without written permission.",
      },
      {
        heading: "Orders",
        body: "We reserve the right to refuse or cancel any order at our discretion. Prices and availability are subject to change without prior notice.",
      },
      {
        heading: "Limitation of Liability",
        body: "Nørva Store is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "Your privacy is essential to us. This policy outlines how Nørva Store collects and safeguards your personal data.",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect your name, email, phone number, shipping address, and payment information solely to fulfill orders and provide customer support.",
      },
      {
        heading: "How We Use It",
        body: "Your information is never sold or shared with third parties for marketing purposes. Data is shared exclusively with fulfillment and payment processors as required to complete your order.",
      },
      {
        heading: "Cookies",
        body: "We use cookies to maintain your shopping cart and analyze website performance. You can disable cookies in your browser settings at any time.",
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    intro:
      "The information provided on Nørva Store is for general informational and retail purposes only.",
    sections: [
      {
        heading: "Product Imagery",
        body: "Product images are styled to represent texture and color as accurately as possible. Slight variations in tone or metal finish may occur due to screen calibration and lighting.",
      },
      {
        heading: "External Links",
        body: "Our site may contain links to social media or third-party platforms. We are not responsible for the content or privacy practices of those external sites.",
      },
      {
        heading: "Policy Updates",
        body: "We reserve the right to update or modify any of our policies at any time without prior notice. Continued use of the site constitutes acceptance of updated terms.",
      },
    ],
  },
};

export const Route = createFileRoute("/legal/$page")({
  head: ({ params }) => {
    const c = PAGES[params.page];
    return {
      meta: [
        { title: `${c?.title ?? "Legal"} — Nørva Store` },
        { name: "description", content: c?.intro ?? "Legal information for Nørva Store (Jevani Enterprises)." },
      ],
    };
  },
  loader: ({ params }) => {
    const c = PAGES[params.page];
    if (!c) throw notFound();
    return c;
  },
  component: LegalPage,
});

function LegalPage() {
  const c = Route.useLoaderData() as LegalContent;

  return (
    <section className="bg-[#09090b] pt-40 text-white md:pt-48 min-h-screen">
      <article className="mx-auto max-w-3xl px-4 pb-24 md:px-8 md:pb-32">
        <p className="font-display text-[11px] uppercase tracking-brand-wide text-zinc-400">
          Legal Policy
        </p>
        <h1 className="mt-3 font-display text-4xl uppercase tracking-tight sm:text-6xl text-white">
          {c.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-zinc-300">{c.intro}</p>
        <div className="mt-12 space-y-10 border-t border-white/15 pt-10">
          {c.sections.map((s: { heading: string; body: string }) => (
            <section key={s.heading}>
              <h2 className="font-display text-sm uppercase tracking-brand-wide text-white">{s.heading}</h2>
              <p className="mt-3 leading-relaxed text-zinc-300">{s.body}</p>
            </section>
          ))}
        </div>
        <p className="mt-16 text-xs uppercase tracking-brand text-zinc-500">
          Nørva Store (Jevani Enterprises) · Contact: norvastorex@gmail.com
        </p>
      </article>
    </section>
  );
}
