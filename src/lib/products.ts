import bagShoulderChain from "@/assets/bag_shoulder_chain_1786114752412.png";
import bagCrossbodyPatent from "@/assets/bag_crossbody_patent_1786114770311.png";
import bagHarnessTote from "@/assets/bag_harness_tote_1786114785960.png";
import bagMiniSatchel from "@/assets/bag_mini_satchel_1786114801666.png";
import bagGothicSilverCrossbody from "@/assets/bag_gothic_silver_crossbody.jpg";
import modelSilverTote from "@/assets/model_banner_bag_3_1786114733990.png";
import modelShoulderBag from "@/assets/model_banner_bag_1_1786114703183.png";
import modelBag2 from "@/assets/model_banner_bag_2_1786114716814.png";
import productCap from "@/assets/product-cap.jpg";
import caseGothicClaw from "@/assets/case_gothic_claw.jpg";

// New High-Fashion Clothing Assets
import maleHoodieDrop from "@/assets/male_hoodie_drop.jpg";
import maleTeeDrop from "@/assets/male_tee_drop.jpg";
import maleCargoDrop from "@/assets/male_cargo_drop.jpg";
import femaleTopDrop from "@/assets/female_top_drop.jpg";
import femaleHoodieDrop from "@/assets/female_hoodie_drop.jpg";
import femaleSkirtDrop from "@/assets/female_skirt_drop.jpg";

// Multi-Angle Streetwear Images
import teeBackModel from "@/assets/tee_back_model.jpg";
import teeCloseupBack from "@/assets/tee_closeup_back.jpg";
import teeFrontModel from "@/assets/tee_front_model.jpg";
import teeCloseupFront from "@/assets/tee_closeup_front.jpg";
import teeFlatlayBack from "@/assets/tee_flatlay_back.jpg";
import teeFlatlayFront from "@/assets/tee_flatlay_front.jpg";

import hoodieAngleChest from "@/assets/hoodie_angle_chest.jpg";
import hoodieAngleMacro from "@/assets/hoodie_angle_macro.jpg";
import hoodieAngleHood from "@/assets/hoodie_angle_hood.jpg";
import hoodieAnglePocket from "@/assets/hoodie_angle_pocket.jpg";
import hoodieAngleFit from "@/assets/hoodie_angle_fit.jpg";

import cargoAngleWaist from "@/assets/cargo_angle_waist.jpg";
import cargoAnglePocket from "@/assets/cargo_angle_pocket.jpg";
import cargoAngleDring from "@/assets/cargo_angle_dring.jpg";
import cargoAngleKnee from "@/assets/cargo_angle_knee.jpg";
import cargoAngleHem from "@/assets/cargo_angle_hem.jpg";

import femaleTeeAngleChest from "@/assets/female_tee_angle_chest.jpg";
import femaleTeeAngleMacro from "@/assets/female_tee_angle_macro.jpg";
import femaleTeeAngleCollar from "@/assets/female_tee_angle_collar.jpg";
import femaleTeeAngleSleeve from "@/assets/female_tee_angle_sleeve.jpg";
import femaleTeeAngleFit from "@/assets/female_tee_angle_fit.jpg";

import femaleHoodieAngleChest from "@/assets/female_hoodie_angle_chest.jpg";
import femaleHoodieAngleMacro from "@/assets/female_hoodie_angle_macro.jpg";
import femaleHoodieAngleHood from "@/assets/female_hoodie_angle_hood.jpg";
import femaleHoodieAnglePocket from "@/assets/female_hoodie_angle_pocket.jpg";
import femaleHoodieAngleFit from "@/assets/female_hoodie_angle_fit.jpg";

import femaleSkirtAngleWaist from "@/assets/female_skirt_angle_waist.jpg";
import femaleSkirtAnglePocket from "@/assets/female_skirt_angle_pocket.jpg";
import femaleSkirtAngleChain from "@/assets/female_skirt_angle_chain.jpg";
import femaleSkirtAnglePleats from "@/assets/female_skirt_angle_pleats.jpg";
import femaleSkirtAngleFit from "@/assets/female_skirt_angle_fit.jpg";

export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

export type WhatFitsItem = {
  name: string;
  iconName: "phone" | "wallet" | "keys" | "headphones" | "cosmetics" | "bottle" | "tablet" | "glasses" | "notebook";
  fits: boolean;
  note: string;
};

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  gallery?: string[];
  category: "Shoulder Bags" | "Crossbody" | "Totes & Backpacks" | "Mini Bags" | "Apparel" | "Accessories";
  department?: "female" | "male" | "unisex";
  isBag: boolean;
  isAccessory?: boolean;
  isPhoneCase?: boolean;
  isNew?: boolean;
  sku?: string;
  shortDescription?: string;
  description: string;
  storyTitle?: string;
  storyDescription?: string;
  dimensions?: {
    height: string;
    width: string;
    depth: string;
    strapDrop?: string;
    volume?: string;
  };
  details?: string[];
  materialCare?: string[];
  washcare?: string[];
  shippingInfo?: string[];
  whatFits?: WhatFitsItem[];
  sizes: string[];
  soldOutSizes?: string[];
  colors: ProductColor[];
};

export const products: Product[] = [
  // ==================== ACCESSORIES / PHONE CASES ====================
  {
    id: "gothic-monster-claw-case",
    name: "Gothic Monster Claw Embossed Soft Silicone Case",
    price: 249,
    image: caseGothicClaw,
    gallery: [
      caseGothicClaw,
    ],
    category: "Accessories",
    department: "unisex",
    isBag: false,
    isAccessory: true,
    isPhoneCase: true,
    isNew: true,
    sku: "NV-2026-MC01",
    shortDescription: "Precision laser-cut shockproof silicone case with high-density UV embossed gothic monster claw & tribal calligraphy artwork.",
    description:
      "Crafted with premium shock-absorbing clear TPU bumpers and a matte anti-fingerprint backplate. Features ultra-fine 3D UV embossed gothic monster claw art, dragon typography, and thorny barbed wire borders. Engineered with raised 1.5mm lips for screen and camera lens protection.",
    details: [
      "Thin & Soft Shockproof Silicone Rubber case",
      "Half edge smooth matte finish with precision camera bezel",
      "Photo-realistic high-density UV embossed print quality",
      "Anti-yellowing German Bayer TPU bumper edge",
      "Responsive tactile button covers & precise speaker port cutouts",
      "Wireless charging & MagSafe compatible",
    ],
    washcare: [
      "Wipe clean with a soft microfiber cloth",
      "Safe to clean with mild disinfectant wipes",
      "Avoid sharp abrasive metallic friction",
    ],
    shippingInfo: [
      "Express courier dispatch within 24 hours",
      "Delivered in 3–5 working days across India",
      "Hassle-free replacement guarantee on fitting issues",
      "Free shipping on orders above ₹399",
    ],
    sizes: ["Apple", "Samsung", "Oneplus", "Google", "Nothing", "Xiaomi"],
    soldOutSizes: [],
    colors: [
      { name: "Vintage Parchment", hex: "#f4ede4" },
      { name: "Obsidian Smoke", hex: "#18181b" },
    ],
  },
  {
    id: "gothic-metal-eyelet-cap",
    name: "Silver Eyelet Distressed Dad Cap",
    price: 899,
    image: productCap,
    gallery: [
      productCap,
    ],
    category: "Accessories",
    department: "unisex",
    isBag: false,
    isNew: false,
    sku: "NV-2026-CP04",
    shortDescription: "Washed vintage cotton twill with silver metal eyelet grommets and embroidered gothic cross.",
    description:
      "Vintage-washed unstructured 6-panel dad cap adorned with silver metal piercing grommets across the curved brim and 3D gothic cross embroidery on the crown.",
    details: [
      "100% enzyme-washed heavy cotton twill with vintage abraded finish",
      "Silver metal eyelet grommet hardware on visor",
      "3D raised gothic cross tonal embroidery on front crown",
      "Adjustable fabric back strap with custom embossed silver metal buckle",
      "Moisture-wicking internal cotton sweatband",
      "One size fits all (adjustable 54cm–62cm circumference)",
    ],
    washcare: [
      "Hand wash or spot clean only with cold water and mild soap",
      "Do not machine wash or submerge hardware in water for long periods",
      "Air dry flat on a shaped surface away from direct heat",
    ],
    shippingInfo: [
      "Dispatches within 24 hours in a rigid protective box",
      "Free standard shipping across India",
      "Delivered in 2–4 days",
    ],
    sizes: ["One Size"],
    soldOutSizes: [],
    colors: [
      { name: "Washed Black", hex: "#27272a" },
      { name: "Faded Olive", hex: "#525246" },
    ],
  },

  // ==================== FEMALE CLOTHES (Women's Edit) ====================
  {
    id: "female-gothic-cyber-baby-tee",
    name: "Cyber Gothic Chrome Tribal Baby Tee",
    price: 1299,
    image: femaleTopDrop,
    gallery: [
      femaleTopDrop,
      femaleTeeAngleChest,
      femaleTeeAngleMacro,
      femaleTeeAngleCollar,
      femaleTeeAngleSleeve,
      femaleTeeAngleFit,
    ],
    category: "Apparel",
    department: "female",
    isBag: false,
    isNew: true,
    sku: "NV-2026-FT01",
    shortDescription: "240 GSM bio-washed ribbed cotton with reflective metallic chrome tribal artwork and cropped silhouette.",
    description:
      "Engineered from premium 240 GSM stretch cotton rib with a fitted baby tee crop cut. Finished with a liquid chrome tribal chest motif and double-needle contrast stitching. Looks effortless styled with low-rise cargo pants or pleated hardware skirts.",
    details: [
      "240 GSM 95% combed cotton, 5% elastane for sculpted stretch fit",
      "High-shine silver metallic chrome screenprint",
      "Cropped torso length with classic crew neckline",
      "Reinforced collar tape to prevent stretching",
      "Ethically tailored in limited small-batch quantities",
    ],
    washcare: [
      "Reverse machine wash cold on delicate cycle",
      "Do not iron directly over metallic chrome print",
      "Line dry flat in shade",
      "Do not bleach or tumble dry",
    ],
    shippingInfo: [
      "Dispatched within 24–48 hours in luxury dust pouch",
      "Free express delivery across India in 2–4 business days",
      "7-day easy size exchange guarantee",
    ],
    sizes: ["XS", "S", "M", "L"],
    soldOutSizes: [],
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Chalk White", hex: "#fafafa" },
    ],
  },
  {
    id: "female-oversized-zip-hoodie",
    name: "Washed Charcoal Cyber Punk Oversized Zip Hoodie",
    price: 2699,
    image: femaleHoodieDrop,
    gallery: [
      femaleHoodieDrop,
      femaleHoodieAngleChest,
      femaleHoodieAngleMacro,
      femaleHoodieAngleHood,
      femaleHoodieAnglePocket,
      femaleHoodieAngleFit,
    ],
    category: "Apparel",
    department: "female",
    isBag: false,
    isNew: true,
    sku: "NV-2026-FH02",
    shortDescription: "480 GSM French terry cotton with mineral fade patina, custom cross zipper pull, and tonal embroidery.",
    description:
      "Cut in an exaggerated slouchy drape from ultra-plush 480 GSM French terry. Features hand-abraded distressed seams, subtle tonal gothic chest embroidery, and a solid steel custom cross zipper slider. Built for cozy streetwear layering.",
    details: [
      "480 GSM ultra-heavyweight combed 100% French terry cotton",
      "Two-way heavy silver chrome zipper with custom gothic pull",
      "Hand-finished mineral stone-wash vintage effect",
      "Dual deep kangaroo pouch pockets with reinforced stress points",
      "Slouchy drop-shoulder oversized streetwear fit",
    ],
    washcare: [
      "Machine wash reverse cold (30°C)",
      "Zip up fully before placing in wash",
      "Line dry in shade; cool iron on reverse",
    ],
    shippingInfo: [
      "Ready to dispatch: Ships within 24 hours",
      "Free express shipping pan-India",
      "7-day hassle-free exchange & return window",
    ],
    sizes: ["S", "M", "L", "XL"],
    soldOutSizes: ["XL"],
    colors: [
      { name: "Mineral Charcoal", hex: "#27272a" },
      { name: "Faded Bone", hex: "#e4e4e7" },
    ],
  },
  {
    id: "female-cargo-pleated-mini-skirt",
    name: "Y2K Dual Grommet Hardware Pleated Cargo Skirt",
    price: 1899,
    image: femaleSkirtDrop,
    gallery: [
      femaleSkirtDrop,
      femaleSkirtAngleWaist,
      femaleSkirtAnglePocket,
      femaleSkirtAngleChain,
      femaleSkirtAnglePleats,
      femaleSkirtAngleFit,
    ],
    category: "Apparel",
    department: "female",
    isBag: false,
    isNew: true,
    sku: "NV-2026-FS03",
    shortDescription: "Structured cotton twill with modular bellows cargo pockets, double grommet belt, and detachable curb chain.",
    description:
      "The definitive Y2K subculture statement skirt. Crafted from heavyweight structured black cotton twill with knife pleats, snap cargo pockets, and an integrated double eyelet grommet belt featuring detachable silver chains and skull charms.",
    details: [
      "Heavyweight 100% cotton structure twill",
      "Knife pleat skirt architecture with built-in modesty safety shorts",
      "Integrated double-hole metal grommet eyelet belt",
      "Detachable multi-tier silver curb chain with gothic charm",
      "Dual side bellows cargo utility pockets with metal snaps",
    ],
    washcare: [
      "Remove chain attachment before washing",
      "Machine wash cold inside-out",
      "Iron pleats on low setting if needed",
    ],
    shippingInfo: [
      "Dispatches in 24 hours",
      "Standard delivery in 2–4 days",
      "Easy 7-day returns & exchanges",
    ],
    sizes: ["XS", "S", "M", "L"],
    soldOutSizes: [],
    colors: [
      { name: "Pitch Black", hex: "#18181b" },
      { name: "Distressed Olive", hex: "#424236" },
    ],
  },

  // ==================== MALE CLOTHES (Men's Streetwear) ====================
  {
    id: "norva-heavy-oversized-hoodie",
    name: "Distressed Acid-Wash Heavyweight Hoodie",
    price: 2499,
    image: maleHoodieDrop,
    gallery: [
      maleHoodieDrop,
      hoodieAngleMacro,
      hoodieAngleChest,
      hoodieAngleHood,
      hoodieAnglePocket,
      hoodieAngleFit,
    ],
    category: "Apparel",
    department: "male",
    isBag: false,
    isNew: true,
    sku: "NV-2026-HD01",
    shortDescription: "500 GSM French terry cotton with hand-distressed seams, gothic chest typography, and oversized boxy drape.",
    description:
      "Engineered from ultra-heavy 500 GSM 100% French terry cotton, featuring custom mineral acid-wash treatments and distressed edge grinding. Cut with an exaggerated drop-shoulder and wide boxy torso for maximum streetwear aesthetic silhouette.",
    details: [
      "500 GSM ultra-heavyweight 100% combed cotton French terry",
      "Hand-applied acid wash with subtle vintage fade patina",
      "Gothic tonal high-density chest typography & back art",
      "Custom double-layered heavyweight hood (no drawstrings)",
      "Ribbed 2x2 cotton elastane cuffs and hem band",
      "Pre-shrunk fabric to retain structure wash after wash",
      "Relaxed oversized boxy fit (take normal size for intended fit)",
    ],
    washcare: [
      "Machine wash reverse / inside-out with cold water (30°C)",
      "Wash with similar dark colors only",
      "Do not iron directly over high-density prints or embroidery",
      "Line dry in shade to preserve color depth",
      "Do not tumble dry or bleach",
    ],
    shippingInfo: [
      "Dispatched within 24–48 hours from our Mumbai studio",
      "Free express shipping on all domestic prepaid orders",
      "Standard delivery in 2–4 business days across India",
      "7-day easy exchange for size & returns on unworn items with tags intact",
      "Cash on delivery & all major UPI / Cards supported",
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOutSizes: ["XXL"],
    colors: [
      { name: "Washed Charcoal", hex: "#27272a" },
      { name: "Faded Bone", hex: "#e4e4e7" },
    ],
  },
  {
    id: "gothic-raw-edge-tee",
    name: "Black Tiger Bonsai T-Shirt",
    price: 8900,
    image: teeBackModel,
    gallery: [
      teeBackModel,
      teeCloseupBack,
      teeFrontModel,
      teeCloseupFront,
      teeFlatlayBack,
      teeFlatlayFront,
    ],
    category: "Apparel",
    department: "male",
    isBag: false,
    isNew: true,
    sku: "NV-2026-TE02",
    shortDescription: "330 GSM heavy terrycotton with 8,00,000 stitches back embroidery tiger bonsai artwork.",
    description:
      "Over eight lakh stitches. a tiger descending through a bonsai, cranes overhead, clouds rolling across the shoulders — the full back built entirely in machine embroidery, thread by thread, in oranges, greens and golds against black. this isn't a print. every line you see is stitched.\n\nCut from 100% terry cotton at a substantial 330gsm — a heavyweight base with the structure to carry embroidery this dense and hold its drape through the day.\n\nThe fit runs oversized and sits larger than a standard tee, so refer to the size chart before ordering. pairs clean with denims, cargos or relaxed trousers.\n\nmodel measurement - is 6\" and wears a size s.",
    details: [
      "100% terrycotton",
      "Weight - 330 gsm",
      "8,00,000 embroidery stitches",
      "Oversize fit",
    ],
    washcare: [
      "Dry clean only or cold hand wash",
      "Do not bleach or tumble dry",
      "Steam iron inside out on low heat setting",
      "Store folded to retain shoulder structure",
    ],
    shippingInfo: [
      "Dispatches within 24-48 hours",
      "Free express shipping pan-India",
      "7-day easy exchange and return policy",
    ],
    sizes: ["XXXS", "XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
    soldOutSizes: [],
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
    ],
  },
  {
    id: "tactical-multi-pocket-cargo",
    name: "Tactical Parachute Wide Cargo Pants",
    price: 2899,
    image: maleCargoDrop,
    gallery: [
      maleCargoDrop,
      cargoAngleWaist,
      cargoAnglePocket,
      cargoAngleDring,
      cargoAngleKnee,
      cargoAngleHem,
    ],
    category: "Apparel",
    department: "male",
    isBag: false,
    isNew: false,
    sku: "NV-2026-CG03",
    shortDescription: "Water-repellent ripstop parachute nylon with 8 modular pockets, silver D-rings, and toggle bungee hems.",
    description:
      "Engineered for tactical versatility and dramatic drape. Crafted from matte lightweight ripstop nylon featuring 8 modular bellows pockets, chrome D-ring loops, and adjustable ankle bungee cinches to toggle between wide-leg and tapered balloon silhouettes.",
    details: [
      "Water-repellent high-density ripstop nylon parachute weave",
      "8 functional tactical utility pockets with snap flaps & concealed zippers",
      "Elasticated waistband with built-in webbing belt and buckle",
      "Metallic silver D-ring key clip attachment at front hip",
      "Ankle bungee cord adjusters with spring toggles for custom stacking",
      "Articulated knee darts for enhanced ergonomic movement",
    ],
    washcare: [
      "Machine wash cold (30°C) with similar colors",
      "Close all zippers and buckles before washing",
      "Cool iron on reverse if necessary (low setting)",
      "Do not tumble dry or use harsh fabric softeners",
    ],
    shippingInfo: [
      "Dispatched within 24–48 hours in luxury branded packaging",
      "Free express courier delivery in 2–4 business days",
      "7-day easy size exchange guarantee",
      "Cash on delivery available",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    soldOutSizes: ["36"],
    colors: [
      { name: "Pitch Black", hex: "#18181b" },
      { name: "Olive Drab", hex: "#3f3f34" },
    ],
  },

  // ==================== BAG PRODUCTS (Liebeskind Berlin Template) ====================
  {
    id: "cybergoth-chain-shoulder",
    name: "Cybergoth Metal Chain Shoulder Bag",
    price: 1499,
    image: bagShoulderChain,
    gallery: [
      bagShoulderChain,
    ],
    category: "Shoulder Bags",
    department: "female",
    isBag: true,
    isNew: true,
    sku: "NV-2026-CS01",
    shortDescription: "Silky, metallic sheen distressed black leather with heavy silver curb chains & cyber hardware.",
    description:
      "Crafted from premium black leather with heavy silver chrome chains, metallic buckle hardware, and industrial studs. A signature Y2K statement piece designed for bold self-expression.",
    storyTitle: "Sculpted Cyber Aesthetics | The Metal Chain Drop",
    storyDescription:
      "Engineered for individuals who command attention. The Cybergoth Shoulder Bag merges brutalist industrial hardware with buttery soft leather craft. Featuring detachable heavy-gauge curb chains and reinforced grommet eyelets, this silhouette transitions effortlessly from daytime streetwear to late-night club statements.",
    dimensions: {
      height: "17 cm",
      width: "28 cm",
      depth: "8.5 cm",
      strapDrop: "28 cm – 52 cm",
      volume: "3.2 Liters",
    },
    details: [
      "Silky distressed full-grain cowhide leather with matte finish",
      "Signature heavy silver chrome curb chain shoulder strap",
      "Main compartment with dual polished silver zip fastening",
      "Interior zip safety pocket and slip card compartment",
      "Detachable & adjustable leather crossbody strap included",
      "Reinforced base with metal protective studs",
      "Lining: 100% durable cotton twill",
    ],
    materialCare: [
      "Outer material: 100% premium cowhide leather",
      "Hardware: Polished silver-tone zinc alloy (rust-resistant)",
      "Lining: 100% cotton twill with water-repellent coating",
      "Care: Clean with a soft, slightly damp cloth. Use dedicated leather balm every 3 months. Avoid prolonged direct moisture.",
    ],
    whatFits: [
      { name: "iPhone 16 Pro Max / Plus", iconName: "phone", fits: true, note: "Fits comfortably with case" },
      { name: "Cardholder / Slim Wallet", iconName: "wallet", fits: true, note: "Fits easily in main or slip pocket" },
      { name: "Key Fob & House Keys", iconName: "keys", fits: true, note: "Quick access with interior key loop" },
      { name: "AirPods Pro / Wireless Earbuds", iconName: "headphones", fits: true, note: "Fits inside slip pocket" },
      { name: "Lip Gloss, Perfume & Compact", iconName: "cosmetics", fits: true, note: "Fits in zip security pocket" },
      { name: "Sunglasses in Hard Case", iconName: "glasses", fits: true, note: "Fits horizontally with ease" },
      { name: "500ml Slim Water Bottle", iconName: "bottle", fits: false, note: "Too tall for zipped closure" },
      { name: "iPad Mini / 8-inch Reader", iconName: "tablet", fits: false, note: "Exceeds bag width" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Obsidian Black", hex: "#18181b" },
      { name: "Charcoal Silver", hex: "#52525b" },
      { name: "Washed Espresso", hex: "#4a3525" },
    ],
  },
  {
    id: "y2k-patent-crossbody",
    name: "Y2K Patent Leather Crossbody Bag",
    price: 1299,
    image: bagCrossbodyPatent,
    gallery: [
      bagCrossbodyPatent,
    ],
    category: "Crossbody",
    department: "female",
    isBag: true,
    isNew: true,
    sku: "NV-2026-PC02",
    shortDescription: "High-gloss mirror patent leather with polished grommet belt strap and sleek dark silhouette.",
    description:
      "High-gloss black patent leather shoulder bag featuring silver grommet belt straps, polished metal buckles, and a sleek dark aesthetic profile.",
    storyTitle: "High-Gloss Nostalgia | Y2K Mirror Patent",
    storyDescription:
      "A tribute to late-90s underground club aesthetic. Cut from reflective mirror patent leather, this crossbody delivers an undeniable visual punch. The grommet belt strap allows you to adjust the drop from tight underarm baguette styling to a relaxed crossbody fit.",
    dimensions: {
      height: "15 cm",
      width: "26 cm",
      depth: "7 cm",
      strapDrop: "25 cm – 56 cm",
      volume: "2.5 Liters",
    },
    details: [
      "Ultra high-gloss liquid patent finish with scratch-resistant coat",
      "Silver grommet punched eyelet belt strap with roller buckle",
      "Concealed magnetic snap flap and top zip closure",
      "Interior zip compartment with embossed logo patch",
      "Lightweight ergonomic silhouette for all-day wear",
      "Lining: Custom jacquard gothic monogram fabric",
    ],
    materialCare: [
      "Outer material: 100% high-grade coated patent leather",
      "Hardware: High-shine polished chrome",
      "Lining: 100% recycled polyester jacquard",
      "Care: Wipe clean with microfiber cloth. Keep away from direct high heat sources.",
    ],
    whatFits: [
      { name: "iPhone 16 Pro Max", iconName: "phone", fits: true, note: "Slides smoothly into main compartment" },
      { name: "Compact Wallet & Cards", iconName: "wallet", fits: true, note: "Fits inside inner slip pocket" },
      { name: "Keys & Car Fob", iconName: "keys", fits: true, note: "Fits easily" },
      { name: "AirPods / Earbuds", iconName: "headphones", fits: true, note: "Fits easily" },
      { name: "Lipsticks & Pocket Mirror", iconName: "cosmetics", fits: true, note: "Fits in inner zip pocket" },
      { name: "Sunglasses (Soft Pouch)", iconName: "glasses", fits: true, note: "Fits with soft pouch" },
      { name: "500ml Water Bottle", iconName: "bottle", fits: false, note: "Exceeds bag capacity" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Gloss Black", hex: "#09090b" },
      { name: "Metallic Gunmetal", hex: "#3f3f46" },
      { name: "Blood Red", hex: "#7f1d1d" },
    ],
  },
  {
    id: "gothic-harness-tote",
    name: "Gothic Buckle Harness Tote",
    price: 1899,
    image: bagHarnessTote,
    gallery: [
      bagHarnessTote,
    ],
    category: "Totes & Backpacks",
    department: "unisex",
    isBag: true,
    isNew: true,
    sku: "NV-2026-HT03",
    shortDescription: "Heavyweight structured canvas & leather tote with tactical harness straps and dual utility pockets.",
    description:
      "Heavyweight black canvas and leather tote engineered with industrial harness webbing, metallic D-rings, and heavy zipper compartments.",
    storyTitle: "Tactical Brutalism | Heavy Harness Carry",
    storyDescription:
      "Architectural utility meets gothic luxury. Engineered with reinforced heavyweight 20oz canvas and thick saddle leather trims, the Harness Tote is built for expansive daily carry. Custom oversized D-rings and quick-release buckles provide endless modular attachment possibilities.",
    dimensions: {
      height: "34 cm",
      width: "42 cm",
      depth: "14 cm",
      strapDrop: "26 cm (shoulder) + 50 cm (crossbody)",
      volume: "18.5 Liters",
    },
    details: [
      "Heavyweight 20oz storm-proof cotton canvas & full-grain leather trims",
      "Tactical nylon webbing harness with heavy-duty silver D-rings",
      "Padded internal laptop compartment (fits up to 15.6\" devices)",
      "Dual exterior quick-stash cargo pockets with snap buckles",
      "Heavy gauge dual two-way metal YKK-style zippers",
      "Reinforced leather dual top handles and detachable padded crossbody strap",
    ],
    materialCare: [
      "Outer material: Heavyweight storm canvas & full-grain leather",
      "Hardware: Matte & polished silver steel alloy",
      "Lining: Heavy duty water-resistant ripstop nylon",
      "Care: Spot clean with damp cloth. Air dry away from direct sunlight.",
    ],
    whatFits: [
      { name: "15\" MacBook Pro / Laptop", iconName: "tablet", fits: true, note: "Padded sleeve fits laptops up to 15.6\"" },
      { name: "iPad Pro & Sketchbooks", iconName: "notebook", fits: true, note: "Fits multiple books & tablets" },
      { name: "1L Water Bottle / Thermos", iconName: "bottle", fits: true, note: "Fits upright in dedicated bottle sleeve" },
      { name: "Large Wallet & Organizers", iconName: "wallet", fits: true, note: "Fits easily" },
      { name: "Full Size Headphones Case", iconName: "headphones", fits: true, note: "Fits over-ear headphones case" },
      { name: "iPhone 16 Pro Max", iconName: "phone", fits: true, note: "Quick access in exterior pocket" },
      { name: "Cosmetics Pouch & Daily Kit", iconName: "cosmetics", fits: true, note: "Plenty of extra volume" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Tactical Khaki", hex: "#4d4a3e" },
      { name: "Sand Beige", hex: "#d6c7b2" },
    ],
  },
  {
    id: "vintage-distressed-satchel",
    name: "Vintage Distressed Leather Mini Satchel",
    price: 1199,
    image: bagMiniSatchel,
    gallery: [
      bagMiniSatchel,
    ],
    category: "Mini Bags",
    department: "female",
    isBag: true,
    isNew: true,
    sku: "NV-2026-MS04",
    shortDescription: "Hand-finished oiled distressed leather with twin front buckles and chunky curb chain strap.",
    description:
      "Hand-finished distressed dark leather mini satchel with double chrome buckles and a heavy silver curb chain shoulder strap.",
    storyTitle: "Raw Heritage | Hand-Finished Distressed Satchel",
    storyDescription:
      "Every piece bears a unique patina. Each Mini Satchel is individually hand-abraded and treated with rich natural oils to achieve a genuine vintage grunge finish. Compact yet surprisingly spacious for daily essentials.",
    dimensions: {
      height: "14 cm",
      width: "22 cm",
      depth: "6.5 cm",
      strapDrop: "32 cm – 54 cm",
      volume: "1.9 Liters",
    },
    details: [
      "Hand-finished pull-up distressed leather with rich oil patina",
      "Twin polished chrome roller buckles on front flap",
      "Detachable heavyweight silver curb chain strap",
      "Secure magnetic quick-release snap behind front buckles",
      "Interior card organizer slots and zipped pocket",
    ],
    materialCare: [
      "Outer material: 100% distressed oil-tanned leather",
      "Hardware: Antique silver finish alloy",
      "Lining: 100% woven cotton twill",
      "Care: Use leather wax/conditioner to nourish the patina. Avoid soaking.",
    ],
    whatFits: [
      { name: "iPhone 16 Pro / Smartphone", iconName: "phone", fits: true, note: "Fits horizontally" },
      { name: "Cardholder & Cash", iconName: "wallet", fits: true, note: "Fits in card slots" },
      { name: "Keys & Keychain", iconName: "keys", fits: true, note: "Fits comfortably" },
      { name: "AirPods / Earbuds", iconName: "headphones", fits: true, note: "Fits inside" },
      { name: "Lip Balm & Eyedrops", iconName: "cosmetics", fits: true, note: "Fits easily" },
      { name: "Slim Sunglasses", iconName: "glasses", fits: true, note: "Fits in soft pouch" },
      { name: "Water Bottle", iconName: "bottle", fits: false, note: "Exceeds mini satchel capacity" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Distressed Brown", hex: "#4a3525" },
      { name: "Washed Matte Black", hex: "#27272a" },
      { name: "Cognac Tan", hex: "#8c532b" },
    ],
  },
  {
    id: "gothic-silver-cyber-crossbody",
    name: "Metallic Chrome & Leather Cyber Crossbody",
    price: 1599,
    image: bagGothicSilverCrossbody,
    gallery: [
      bagGothicSilverCrossbody,
    ],
    category: "Crossbody",
    department: "unisex",
    isBag: true,
    isNew: true,
    sku: "NV-2026-GC05",
    shortDescription: "Reflective metallic silver leather paneling, sculpted skull charms, and dual chrome link straps.",
    description:
      "Luxury gothic cyber aesthetic crossbody bag crafted with metallic silver trims, heavy chrome buckles, skull charms, and dual curb chain straps.",
    storyTitle: "Cybernetic Alchemy | The Silver Drop",
    storyDescription:
      "A futuristic collision of silver leaf metallic leather and gothic hardware. Designed with dual multi-gauge chains and heavy sculpted buckles, the Cyber Crossbody catches ambient light from every angle, establishing a bold focal point for any monochrome fit.",
    dimensions: {
      height: "16 cm",
      width: "27 cm",
      depth: "8 cm",
      strapDrop: "30 cm – 58 cm",
      volume: "3.0 Liters",
    },
    details: [
      "Mirror silver chrome leather composite panels",
      "Custom molded skull and cross gothic hardware charms",
      "Twin detachable chain and leather strap combinations",
      "Full top zipper with oversized metal zipper pull",
      "Interior divider compartment and slip pockets",
    ],
    materialCare: [
      "Outer material: Metallic foil treated cowhide leather",
      "Hardware: Polished silver nickel chrome",
      "Lining: Satin weave gothic printed lining",
      "Care: Wipe gently with a dry microfiber cloth. Avoid abrasive cleaners.",
    ],
    whatFits: [
      { name: "iPhone 16 Pro Max", iconName: "phone", fits: true, note: "Fits with case" },
      { name: "Wallet / Card Case", iconName: "wallet", fits: true, note: "Fits easily" },
      { name: "Car Keys & House Keys", iconName: "keys", fits: true, note: "Fits easily" },
      { name: "AirPods Case", iconName: "headphones", fits: true, note: "Fits easily" },
      { name: "Makeup Essentials", iconName: "cosmetics", fits: true, note: "Fits in divider pocket" },
      { name: "Sunglasses", iconName: "glasses", fits: true, note: "Fits in main space" },
      { name: "500ml Flask", iconName: "bottle", fits: false, note: "Exceeds height" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Metallic Chrome", hex: "#d4d4d8" },
      { name: "Onyx Black", hex: "#18181b" },
      { name: "Liquid Pewter", hex: "#71717a" },
    ],
  },
  {
    id: "chrome-statement-tote",
    name: "Metallic Chrome Gothic Mini Tote",
    price: 1699,
    image: modelSilverTote,
    gallery: [
      modelSilverTote,
    ],
    category: "Mini Bags",
    department: "female",
    isBag: true,
    isNew: false,
    sku: "NV-2026-MT06",
    shortDescription: "Liquid silver structured box tote with cross charms, top grab handles, and crossbody chain.",
    description:
      "Limited edition metallic silver handbag studded with gothic hardware, cross charms, and a detachable curb chain.",
    storyTitle: "Liquid Metal Form | Statement Box Tote",
    storyDescription:
      "Structured geometric precision meets mirror silver gloss. The Mini Tote holds its sharp silhouette whether handheld by the reinforced top arches or worn crossbody with the included heavy curb chain.",
    dimensions: {
      height: "20 cm",
      width: "24 cm",
      depth: "9 cm",
      strapDrop: "12 cm (handles) + 52 cm (strap)",
      volume: "3.8 Liters",
    },
    details: [
      "Rigid box silhouette with reinforced silver leather",
      "Silver cross and dagger hardware drops",
      "Magnetic flap closure with reinforced top bridge",
      "Four protective chrome studs on bottom panel",
    ],
    materialCare: [
      "Outer material: 100% chrome finished leather",
      "Hardware: Polished silver tone alloy",
      "Lining: Black twill cotton",
      "Care: Keep in protective dust bag when not in use.",
    ],
    whatFits: [
      { name: "iPhone 16 Pro Max", iconName: "phone", fits: true, note: "Fits upright or horizontal" },
      { name: "Medium Size Wallet", iconName: "wallet", fits: true, note: "Fits easily" },
      { name: "Keys & Small Essentials", iconName: "keys", fits: true, note: "Fits easily" },
      { name: "AirPods Pro", iconName: "headphones", fits: true, note: "Fits in side pocket" },
      { name: "Cosmetic Pouch", iconName: "cosmetics", fits: true, note: "Fits inside" },
      { name: "Kindle / Small Reader", iconName: "tablet", fits: true, note: "Fits upright" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Chrome Silver", hex: "#e4e4e7" },
      { name: "Metallic Gunmetal", hex: "#52525b" },
    ],
  },
  {
    id: "gothic-harness-shoulder",
    name: "Dark Aesthetic Ring Shoulder Bag",
    price: 1599,
    image: modelShoulderBag,
    gallery: [
      modelShoulderBag,
    ],
    category: "Shoulder Bags",
    department: "female",
    isBag: true,
    isNew: false,
    sku: "NV-2026-RS07",
    shortDescription: "Textured grain leather with double shoulder straps, central O-ring harness, and multi-chain drops.",
    description:
      "Textured black leather bag with double shoulder straps, silver O-ring harness detail, and multi-chain drop accents.",
    storyTitle: "Sensual Hardware | O-Ring Shoulder Drop",
    storyDescription:
      "A tribute to modern subcultural fashion. The prominent central O-ring links dual tension straps, creating a sculpted slouch silhouette that hugs the underarm effortlessly.",
    dimensions: {
      height: "19 cm",
      width: "30 cm",
      depth: "10 cm",
      strapDrop: "29 cm",
      volume: "4.5 Liters",
    },
    details: [
      "Plush pebble grain cowhide leather with soft slouch handfeel",
      "Heavy solid steel 50mm central O-ring harness",
      "Top zipper with extended pull tab",
      "Interior zippered security pocket & dual slip organizers",
    ],
    materialCare: [
      "Outer material: 100% pebble grain cowhide leather",
      "Hardware: Solid steel silver finish",
      "Lining: 100% durable cotton twill",
      "Care: Treat with neutral leather cream.",
    ],
    whatFits: [
      { name: "iPhone 16 Pro Max", iconName: "phone", fits: true, note: "Fits easily" },
      { name: "Full Size Wallet", iconName: "wallet", fits: true, note: "Fits easily" },
      { name: "Keys, Fob & AirPods", iconName: "keys", fits: true, note: "Fits easily" },
      { name: "Sunglasses Case", iconName: "glasses", fits: true, note: "Fits in main cavity" },
      { name: "Full Cosmetic Pouch", iconName: "cosmetics", fits: true, note: "Fits easily" },
      { name: "500ml Water Bottle", iconName: "bottle", fits: true, note: "Fits horizontally" },
      { name: "iPad Mini", iconName: "tablet", fits: true, note: "Fits comfortably" },
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Shadow Black", hex: "#18181b" },
      { name: "Cream Beige", hex: "#f5f5f4" },
      { name: "Chestnut Brown", hex: "#5c4033" },
    ],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
