import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { getProduct, type Product } from "@/lib/products";
import { BagProductDetail } from "@/components/BagProductDetail";
import { UniversalProductDetail } from "@/components/UniversalProductDetail";
import { AccessoryProductDetail } from "@/components/AccessoryProductDetail";

export const Route = createFileRoute("/product/$id")({
  head: ({ params }) => {
    const p = getProduct(params.id);
    return {
      meta: [
        { title: `${p?.name ?? "Product"} — Nørva Store` },
        {
          name: "description",
          content:
            p?.shortDescription ||
            p?.description ||
            "Nørva Store product. Premium Y2K, gothic statement bags, apparel and accessories.",
        },
        { property: "og:title", content: `${p?.name ?? "Product"} — Nørva Store` },
        { property: "og:description", content: p?.shortDescription || p?.description || "" },
        ...(p ? [{ property: "og:image", content: p.image }] : []),
      ],
    };
  },
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return product;
  },
  component: ProductRouteComponent,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-white text-zinc-900 px-4">
      <div className="text-center">
        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight font-bold text-zinc-950">
          Product Not Found
        </h1>
        <p className="mt-3 text-xs uppercase tracking-brand font-semibold text-zinc-500">
          The requested statement piece is unavailable or has ended its drop.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex px-8 py-3.5 bg-black text-white font-display text-xs uppercase tracking-brand font-bold hover:bg-zinc-800 transition-colors"
        >
          Explore Catalog
        </Link>
      </div>
    </div>
  ),
});

function ProductRouteComponent() {
  const product = Route.useLoaderData() as Product;

  // 1. Bag products use the Liebeskind Berlin styled bag template
  if (product.isBag) {
    return <BagProductDetail product={product} />;
  }

  // 2. Phone cases and accessories use the customized accessory template (Image 2 reference)
  if (product.isPhoneCase || product.category === "Accessories") {
    return <AccessoryProductDetail product={product} />;
  }

  // 3. All other products use the universal Bluorng-styled template
  return <UniversalProductDetail product={product} />;
}
