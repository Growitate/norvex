import bagShoulderChain from "@/assets/bag_shoulder_chain_1786114752412.png";
import bagCrossbodyPatent from "@/assets/bag_crossbody_patent_1786114770311.png";
import bagHarnessTote from "@/assets/bag_harness_tote_1786114785960.png";
import bagMiniSatchel from "@/assets/bag_mini_satchel_1786114801666.png";
import modelSilverTote from "@/assets/model_banner_bag_3_1786114733990.png";
import modelShoulderBag from "@/assets/model_banner_bag_1_1786114703183.png";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: "Shoulder Bags" | "Crossbody" | "Totes & Backpacks" | "Mini Bags" | "Accessories";
  isNew?: boolean;
  description: string;
  sizes: string[];
};

export const products: Product[] = [
  {
    id: "cybergoth-chain-shoulder",
    name: "Cybergoth Metal Chain Shoulder Bag",
    price: 1499,
    image: bagShoulderChain,
    category: "Shoulder Bags",
    isNew: true,
    description:
      "Crafted from premium black leather with heavy silver chrome chains, metallic buckle hardware, and industrial studs. A signature Y2K statement piece designed for bold self-expression.",
    sizes: ["One Size"],
  },
  {
    id: "y2k-patent-crossbody",
    name: "Y2K Patent Leather Crossbody Bag",
    price: 1299,
    image: bagCrossbodyPatent,
    category: "Crossbody",
    isNew: true,
    description:
      "High-gloss black patent leather shoulder bag featuring silver grommet belt straps, polished metal buckles, and a sleek dark aesthetic profile.",
    sizes: ["One Size"],
  },
  {
    id: "gothic-harness-tote",
    name: "Gothic Buckle Harness Tote",
    price: 1899,
    image: bagHarnessTote,
    category: "Totes & Backpacks",
    isNew: true,
    description:
      "Heavyweight black canvas and leather tote engineered with industrial harness webbing, metallic D-rings, and heavy zipper compartments.",
    sizes: ["One Size"],
  },
  {
    id: "vintage-distressed-satchel",
    name: "Vintage Distressed Leather Mini Satchel",
    price: 1199,
    image: bagMiniSatchel,
    category: "Mini Bags",
    isNew: true,
    description:
      "Hand-finished distressed dark leather mini satchel with double chrome buckles and a heavy silver curb chain shoulder strap.",
    sizes: ["One Size"],
  },
  {
    id: "chrome-statement-tote",
    name: "Metallic Chrome Gothic Mini Tote",
    price: 1699,
    image: modelSilverTote,
    category: "Mini Bags",
    description:
      "Limited edition metallic silver handbag studded with gothic hardware, cross charms, and a detachable curb chain.",
    sizes: ["One Size"],
  },
  {
    id: "gothic-harness-shoulder",
    name: "Dark Aesthetic Ring Shoulder Bag",
    price: 1599,
    image: modelShoulderBag,
    category: "Shoulder Bags",
    description:
      "Textured black leather bag with double shoulder straps, silver O-ring harness detail, and multi-chain drop accents.",
    sizes: ["One Size"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
