export const BEAR_BASE_PRICE = 42;
export const ADDON_PRICE = 5;

export type AddonCategory = "hat" | "shirt" | "pants" | "shoes" | "accessory";

export type Addon = {
  id: string;
  name: string;
  category: AddonCategory;
  emoji: string;
  description: string;
};

export const ADDONS: Addon[] = [
  // Hats
  { id: "beanie-cream", name: "Cozy Cream Beanie", category: "hat", emoji: "🧢", description: "Knit beanie for chilly dorm rooms." },
  { id: "graduation-cap", name: "Tiny Graduation Cap", category: "hat", emoji: "🎓", description: "Celebrate every milestone." },
  { id: "sun-hat", name: "Soft Sun Hat", category: "hat", emoji: "👒", description: "Sunny, breezy, summery vibes." },
  { id: "bow-lavender", name: "Lavender Bow", category: "hat", emoji: "🎀", description: "A delicate bow for the head." },

  // Shirts
  { id: "tee-sage", name: "Sage Tee", category: "shirt", emoji: "👕", description: "Soft cotton tee in calming sage." },
  { id: "hoodie-mist", name: "Mist Blue Hoodie", category: "shirt", emoji: "🧥", description: "A tiny hoodie for snuggle time." },
  { id: "sweater-cream", name: "Cream Cable Sweater", category: "shirt", emoji: "🧶", description: "Hand-knit cable pattern." },
  { id: "tank-lavender", name: "Lavender Tank", category: "shirt", emoji: "🎽", description: "Lightweight and gentle." },

  // Pants
  { id: "shorts-denim", name: "Denim Shorts", category: "pants", emoji: "🩳", description: "Casual everyday shorts." },
  { id: "joggers-grey", name: "Soft Grey Joggers", category: "pants", emoji: "👖", description: "Lounge-ready joggers." },
  { id: "skirt-floral", name: "Floral Skirt", category: "pants", emoji: "👗", description: "Sweet floral pattern." },

  // Shoes
  { id: "sneakers-white", name: "Tiny White Sneakers", category: "shoes", emoji: "👟", description: "Classic and cute." },
  { id: "boots-cozy", name: "Cozy Knit Boots", category: "shoes", emoji: "🥾", description: "Warm and squishy." },
  { id: "slippers-pink", name: "Pink Slippers", category: "shoes", emoji: "🩰", description: "For staying in bed all day." },

  // Accessories
  { id: "scarf-sage", name: "Sage Scarf", category: "accessory", emoji: "🧣", description: "A soft chunky-knit scarf." },
  { id: "glasses-round", name: "Round Glasses", category: "accessory", emoji: "👓", description: "For the studious bear." },
  { id: "backpack-mini", name: "Mini Backpack", category: "accessory", emoji: "🎒", description: "Tiny backpack with star charm." },
  { id: "heart-pin", name: "Heart Pin", category: "accessory", emoji: "💗", description: "Pin it anywhere — a little reminder of love." },
];

export const ADDON_CATEGORIES: { id: AddonCategory; label: string }[] = [
  { id: "hat", label: "Hats" },
  { id: "shirt", label: "Shirts" },
  { id: "pants", label: "Pants" },
  { id: "shoes", label: "Shoes" },
  { id: "accessory", label: "Accessories" },
];

export function getAddon(id: string): Addon | undefined {
  return ADDONS.find((a) => a.id === id);
}
