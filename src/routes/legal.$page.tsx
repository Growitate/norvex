import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";

type LegalContent = {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

const PAGES: Record<string, LegalContent> = {
  refund: {
    title: "Refund Policy",
    intro:
      "All sales at Norva Store (Jevani Enterprises) are carefully curated in limited batches. Please review our policy carefully before placing your order.",
    sections: [
      {
        heading: "Returns",
        body: "Return requests can only be raised after 2 days from the shipping date. Items must be unworn, unused, and in original packaging. Return shipping is the customer's responsibility unless the item is defective or incorrect.",
      },
      {
        heading: "Refunds",
        body: "Refunds are only applicable if the product is received damaged. Once your return is received and inspected, we will notify you of the status. Approved refunds are processed within 5–10 business days to your original payment method.",
      },
      {
        heading: "Exchanges",
        body: "We replace items if they are defective or damaged upon arrival. Contact us via Instagram DM @norvaxstore or email norvastorex@gmail.com within 48 hours of delivery.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "By visiting Norva Store and placing an order, you agree to be bound by the following terms and conditions of Jevani Enterprises.",
    sections: [
      {
        heading: "Use of Site",
        body: "All content, logos, imagery, and product designs on this site are the property of Norva Store / Jevani Enterprises and may not be reproduced without written permission.",
      },
      {
        heading: "Orders",
        body: "We reserve the right to refuse or cancel any order at our discretion. Prices and availability are subject to change without prior notice.",
      },
      {
        heading: "Limitation of Liability",
        body: "Norva Store is not liable for any indirect, incidental, or consequential damages arising from the use of our products or website.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "Your privacy is essential to us. This policy outlines how Norva Store collects and safeguards your personal data.",
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
      "The information provided on Norva Store is for general informational and retail purposes only.",
    sections: [
      {
        heading: "Product Imagery",
        body: "Product images are styled to represent texture and color as accurately as possible. Slight variations in tone or metal finish may occur due to screen calibration and lighting.",
      },
      {
        heading: "External Links",
        body: "Our site may contain links to social media or third-party platforms. We are not responsible for the content or privacy practices of those external sites.",
      },
    ],
  },
};

export const Route = createFileRoute("/legal/$page")({
  head: ({ params }) => {
    const pageKey = params.page ?? "terms";
    const c = PAGES[pageKey];
    return {
      meta: [
        { title: `${c?.title ?? "Legal"} — Norva Store` },
        {
          name: "description",
          content: c?.intro ?? "Legal information for Norva Store (Jevani Enterprises).",
        },
      ],
    };
  },
  component: LegalPage,
});

function LegalPage() {
  const { page } = Route.useParams();
  const content = PAGES[page] ?? PAGES.terms;

  return (
    <section className="bg-white pt-24 sm:pt-32 pb-20 text-zinc-900 min-h-screen select-none">
      <article className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 font-sans text-xs uppercase tracking-brand text-zinc-500 hover:text-black transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" /> Return to Home
        </Link>

        <div className="flex items-center gap-2 text-xs uppercase tracking-brand font-semibold text-zinc-700 mb-2">
          <ShieldCheck className="h-4 w-4" /> Official Brand Policy
        </div>

        <h1 className="font-display text-3xl sm:text-5xl font-bold uppercase tracking-tight text-zinc-950 mb-4">
          {content.title}
        </h1>

        <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed pb-8 border-b border-black/[0.08] mb-8">
          {content.intro}
        </p>

        <div className="space-y-8 font-sans text-sm text-zinc-600 leading-relaxed">
          {content.sections.map((sec, idx) => (
            <div key={idx} className="space-y-2">
              <h2 className="font-sans font-bold text-zinc-950 text-base uppercase tracking-wider">
                {sec.heading}
              </h2>
              <p>{sec.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-16 text-xs uppercase tracking-brand text-zinc-500 font-semibold">
          Norva Store (Jevani Enterprises) · Contact: norvastorex@gmail.com
        </p>
      </article>
    </section>
  );
}
