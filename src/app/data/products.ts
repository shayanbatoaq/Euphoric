export type ProductCategory = "Men" | "Women" | "Unisex";

export const productCategories: ProductCategory[] = [
  "Men",
  "Women",
  "Unisex",
];

export function getCategoryShopHref(category: ProductCategory) {
  return `/shop?category=${category.toLowerCase()}`;
}

export function getProductCategoriesFromValues(
  values: readonly string[],
): ProductCategory[] {
  const normalizedValues = new Set(
    values.map((value) => value.trim().toLowerCase()),
  );

  return productCategories.filter((category) =>
    normalizedValues.has(category.toLowerCase()),
  );
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  displayName: string;
  category: ProductCategory;
  price: number;
  sizeMl: number;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  shortDescription: string;
  longDescription: string;
  image: string;
}

export const products: Product[] = [
  {
    "id": "club-de-nuit-armaf-men",
    "name": "Club de Nuit",
    "brand": "Armaf",
    "displayName": "Club de Nuit by Armaf",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lemon",
        "Pineapple",
        "Bergamot",
        "Black Currant",
        "Apple"
      ],
      "heart": [
        "Birch",
        "Jasmine",
        "Rose"
      ],
      "base": [
        "Musk",
        "Ambergris",
        "Patchouli",
        "Vanilla"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Lemon, Pineapple into Birch, Jasmine, finishing with Musk, Ambergris.",
    "longDescription": "Club de Nuit by Armaf is a fresh, floral, warm fragrance with a confident masculine character. It opens with Lemon, Pineapple, Bergamot, Black Currant, creating the first bright and expressive impression. The heart develops through Birch, Jasmine, Rose, adding texture and character as the scent settles. In the dry down, Musk, Ambergris, Patchouli, Vanilla provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "chrome-aqua-azzaro-men",
    "name": "Chrome Aqua",
    "brand": "Azzaro",
    "displayName": "Chrome Aqua by Azzaro",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Green Apple",
        "Violet Leaf"
      ],
      "heart": [
        "Sea Notes",
        "Basil",
        "Mint"
      ],
      "base": [
        "Cypress",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Grapefruit, Green Apple into Sea Notes, Basil, finishing with Cypress, Vetiver.",
    "longDescription": "Chrome Aqua by Azzaro is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Grapefruit, Green Apple, Violet Leaf, creating the first bright and expressive impression. The heart develops through Sea Notes, Basil, Mint, adding texture and character as the scent settles. In the dry down, Cypress, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "chrome-extreme-azzaro-men",
    "name": "Chrome Extreme",
    "brand": "Azzaro",
    "displayName": "Chrome Extreme by Azzaro",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Green Mandarin"
      ],
      "heart": [
        "Sea Notes",
        "Juniper Berries"
      ],
      "base": [
        "Cashmeran",
        "Amber"
      ]
    },
    "shortDescription": "A fresh and aquatic fragrance that develops from Green Mandarin into Sea Notes, Juniper Berries, finishing with Cashmeran, Amber.",
    "longDescription": "Chrome Extreme by Azzaro is a fresh, aquatic fragrance with a confident masculine character. It opens with Green Mandarin, creating the first bright and expressive impression. The heart develops through Sea Notes, Juniper Berries, adding texture and character as the scent settles. In the dry down, Cashmeran, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "chrome-intense-azzaro-men",
    "name": "Chrome Intense",
    "brand": "Azzaro",
    "displayName": "Chrome Intense by Azzaro",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Bergamot",
        "Ginger",
        "Hedione"
      ],
      "heart": [
        "Ozonic Notes",
        "Jasmine",
        "Lichen"
      ],
      "base": [
        "Mate",
        "Woody Notes",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grapefruit, Bergamot into Ozonic Notes, Jasmine, finishing with Mate, Woody Notes.",
    "longDescription": "Chrome Intense by Azzaro is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Grapefruit, Bergamot, Ginger, Hedione, creating the first bright and expressive impression. The heart develops through Ozonic Notes, Jasmine, Lichen, adding texture and character as the scent settles. In the dry down, Mate, Woody Notes, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "silver-black-pour-homme-azzaro-men",
    "name": "Silver Black Pour Homme",
    "brand": "Azzaro",
    "displayName": "Silver Black Pour Homme by Azzaro",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Apple",
        "Lime",
        "Anise",
        "Bergamot"
      ],
      "heart": [
        "Juniper",
        "Coriander",
        "Cardamom"
      ],
      "base": [
        "Patchouli",
        "White Musk",
        "Sandalwood",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Apple, Lime into Juniper, Coriander, finishing with Patchouli, White Musk.",
    "longDescription": "Silver Black Pour Homme by Azzaro is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Apple, Lime, Anise, Bergamot, creating the first bright and expressive impression. The heart develops through Juniper, Coriander, Cardamom, adding texture and character as the scent settles. In the dry down, Patchouli, White Musk, Sandalwood, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "wanted-azzaro-men",
    "name": "Wanted",
    "brand": "Azzaro",
    "displayName": "Wanted by Azzaro",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lemon",
        "Ginger",
        "Lavender",
        "Mint"
      ],
      "heart": [
        "Apple",
        "Cardamom",
        "Juniper",
        "Geranium"
      ],
      "base": [
        "Tonka Bean",
        "Amberwood",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Lemon, Ginger into Apple, Cardamom, finishing with Tonka Bean, Amberwood.",
    "longDescription": "Wanted by Azzaro is a bold woody-spicy fragrance that opens with citrus and spice for an energetic start. Bright lemon, zesty ginger, lavender, and mint kick things off. At the heart, apple, cardamom, juniper, and geranium add fruitiness, aromatic spice, and herbal warmth. The base combines tonka bean, amberwood, and vetiver for a rich, warm, slightly earthy finish.\n\nPerfect for:\n\nEvening wear or nights out\nWhen you want something confident and attention-grabbing\nThose who like spicy citrus woods",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "wanted-by-night-azzaro-men",
    "name": "Wanted By Night",
    "brand": "Azzaro",
    "displayName": "Wanted By Night by Azzaro",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cinnamon",
        "Mandarin Orange",
        "Lavender",
        "Lemon"
      ],
      "heart": [
        "Incense",
        "Red Cedar",
        "Cumin",
        "Fruity Notes"
      ],
      "base": [
        "Tobacco",
        "Vanilla",
        "Leather",
        "Cedar",
        "Benzoin"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Cinnamon, Mandarin Orange into Incense, Red Cedar, finishing with Tobacco, Vanilla.",
    "longDescription": "Wanted By Night by Azzaro is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Cinnamon, Mandarin Orange, Lavender, Lemon, creating the first bright and expressive impression. The heart develops through Incense, Red Cedar, Cumin, Fruity Notes, adding texture and character as the scent settles. In the dry down, Tobacco, Vanilla, Leather, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "hero-burberry-men",
    "name": "Hero",
    "brand": "Burberry",
    "displayName": "Hero by Burberry",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot"
      ],
      "heart": [
        "Juniper",
        "Black Pepper"
      ],
      "base": [
        "Atlas Cedar",
        "Virginia Cedar",
        "Himalayan Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Bergamot into Juniper, Black Pepper, finishing with Atlas Cedar, Virginia Cedar.",
    "longDescription": "Hero by Burberry is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Bergamot, creating the first bright and expressive impression. The heart develops through Juniper, Black Pepper, adding texture and character as the scent settles. In the dry down, Atlas Cedar, Virginia Cedar, Himalayan Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "london-for-men-burberry-men",
    "name": "London For Men",
    "brand": "Burberry",
    "displayName": "London For Men by Burberry",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cinnamon",
        "Lavender",
        "Bergamot"
      ],
      "heart": [
        "Leather",
        "Mimosa"
      ],
      "base": [
        "Tobacco Leaf",
        "Opoponax",
        "Guaiac Wood",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Cinnamon, Lavender into Leather, Mimosa, finishing with Tobacco Leaf, Opoponax.",
    "longDescription": "London For Men by Burberry is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Cinnamon, Lavender, Bergamot, creating the first bright and expressive impression. The heart develops through Leather, Mimosa, adding texture and character as the scent settles. In the dry down, Tobacco Leaf, Opoponax, Guaiac Wood, Oakmoss provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-beat-men-burberry-men",
    "name": "The Beat Men",
    "brand": "Burberry",
    "displayName": "The Beat Men by Burberry",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Pepper",
        "Citron",
        "Violet"
      ],
      "heart": [
        "Geranium",
        "Thyme"
      ],
      "base": [
        "Vetiver",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Black Pepper, Citron into Geranium, Thyme, finishing with Vetiver, Woody Notes.",
    "longDescription": "The Beat Men by Burberry is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Black Pepper, Citron, Violet, creating the first bright and expressive impression. The heart develops through Geranium, Thyme, adding texture and character as the scent settles. In the dry down, Vetiver, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "weekend-men-burberry-men",
    "name": "Weekend Men",
    "brand": "Burberry",
    "displayName": "Weekend Men by Burberry",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lemon",
        "Grapefruit",
        "Bergamot",
        "Mandarin",
        "Pineapple",
        "Melon"
      ],
      "heart": [
        "Ivy",
        "Oakmoss",
        "Sandalwood"
      ],
      "base": [
        "Honey",
        "Amber",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, warm, and woody fragrance that develops from Lemon, Grapefruit into Ivy, Oakmoss, finishing with Honey, Amber.",
    "longDescription": "Weekend Men by Burberry is a fresh, warm, woody fragrance with a confident masculine character. It opens with Lemon, Grapefruit, Bergamot, Mandarin, creating the first bright and expressive impression. The heart develops through Ivy, Oakmoss, Sandalwood, adding texture and character as the scent settles. In the dry down, Honey, Amber, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "weekend-woman-burberry-women",
    "name": "Weekend Woman",
    "brand": "Burberry",
    "displayName": "Weekend Woman by Burberry",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mignonette",
        "Mandarin Orange",
        "Sage"
      ],
      "heart": [
        "Nectarine",
        "Peach Blossom",
        "Rose Hip",
        "Iris",
        "Violet"
      ],
      "base": [
        "Musk",
        "Sandalwood",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Mignonette, Mandarin Orange into Nectarine, Peach Blossom, finishing with Musk, Sandalwood.",
    "longDescription": "Weekend Woman by Burberry is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Mignonette, Mandarin Orange, Sage, creating the first bright and expressive impression. The heart develops through Nectarine, Peach Blossom, Rose Hip, Iris, adding texture and character as the scent settles. In the dry down, Musk, Sandalwood, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "aqva-pour-homme-marine-bvlgari-men",
    "name": "Aqva Pour Homme Marine",
    "brand": "BVLGARI",
    "displayName": "Aqva Pour Homme Marine by BVLGARI",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Neroli",
        "Mandarin",
        "Petitgrain"
      ],
      "heart": [
        "Water Notes",
        "Seaweed",
        "Rosemary"
      ],
      "base": [
        "Virginia Cedar",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Grapefruit, Neroli into Water Notes, Seaweed, finishing with Virginia Cedar, Amber.",
    "longDescription": "Aqva Pour Homme Marine by BVLGARI is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Grapefruit, Neroli, Mandarin, Petitgrain, creating the first bright and expressive impression. The heart develops through Water Notes, Seaweed, Rosemary, adding texture and character as the scent settles. In the dry down, Virginia Cedar, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bvlgari-le-gemme-tygar-bvlgari-men",
    "name": "BVLGARI LE GEMME TYGAR",
    "brand": "Bvlgari",
    "displayName": "BVLGARI LE GEMME TYGAR by Bvlgari",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit"
      ],
      "heart": [
        "Ginger",
        "Ambrette"
      ],
      "base": [
        "Ambroxan",
        "Musk",
        "Patchouli",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Grapefruit into Ginger, Ambrette, finishing with Ambroxan, Musk.",
    "longDescription": "BVLGARI LE GEMME TYGAR by Bvlgari is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Grapefruit, creating the first bright and expressive impression. The heart develops through Ginger, Ambrette, adding texture and character as the scent settles. In the dry down, Ambroxan, Musk, Patchouli, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bvlgari-man-bvlgari-men",
    "name": "BVLGARI MAN",
    "brand": "BVLGARI",
    "displayName": "BVLGARI MAN by BVLGARI",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Violet Leaf",
        "Bergamot",
        "Lotus",
        "White Pear"
      ],
      "heart": [
        "Vetiver",
        "Woody Notes",
        "Sandalwood",
        "Amber",
        "Cashmere Wood"
      ],
      "base": [
        "White Honey",
        "Musk",
        "Benzoin",
        "Tonka Bean"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Violet Leaf, Bergamot into Vetiver, Woody Notes, finishing with White Honey, Musk.",
    "longDescription": "BVLGARI MAN by BVLGARI is a fresh, floral, warm fragrance with a confident masculine character. It opens with Violet Leaf, Bergamot, Lotus, White Pear, creating the first bright and expressive impression. The heart develops through Vetiver, Woody Notes, Sandalwood, Amber, adding texture and character as the scent settles. In the dry down, White Honey, Musk, Benzoin, Tonka Bean provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bvlgari-man-wood-essence-bvlgari-men",
    "name": "Bvlgari MAN - Wood Essence",
    "brand": "Bvlgari",
    "displayName": "Bvlgari MAN - Wood Essence by Bvlgari",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Citrus Notes",
        "Coriander"
      ],
      "heart": [
        "Cypress",
        "Vetiver",
        "Cedar"
      ],
      "base": [
        "Benzoin"
      ]
    },
    "shortDescription": "A fresh, woody, and deep fragrance that develops from Citrus Notes, Coriander into Cypress, Vetiver, finishing with Benzoin.",
    "longDescription": "Bvlgari MAN - Wood Essence by Bvlgari is a fresh, woody, deep fragrance with a confident masculine character. It opens with Citrus Notes, Coriander, creating the first bright and expressive impression. The heart develops through Cypress, Vetiver, Cedar, adding texture and character as the scent settles. In the dry down, Benzoin provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "man-in-black-bvlgari-men",
    "name": "MAN IN BLACK",
    "brand": "BVLGARI",
    "displayName": "MAN IN BLACK by BVLGARI",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Rum",
        "Spices",
        "Tobacco"
      ],
      "heart": [
        "Leather",
        "Iris",
        "Tuberose"
      ],
      "base": [
        "Tonka Bean",
        "Guaiac Wood",
        "Benzoin"
      ]
    },
    "shortDescription": "A spicy, floral, and warm fragrance that develops from Rum, Spices into Leather, Iris, finishing with Tonka Bean, Guaiac Wood.",
    "longDescription": "Man in Black by Bvlgari is a bold and luxurious scent evoking fire and rum-soaked spice. The fragrance opens with warm aromatic spices, rich rum and tobacco. At its heart there’s leather, iris and tuberose adding creamy floral depth with a sensuous edge. The dry down settles into tonka bean, guaiac wood and benzoin—a smoky, resinous finish that lingers with power.\n\nPerfect for:\n\nEvening wear or cooler weather\nWhen you want a scent that’s confident, masculine and distinctive\nAnyone who appreciates rich woods, leather and warm orientals",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "man-in-black-intense-bvlgari-men",
    "name": "MAN IN BLACK INTENSE",
    "brand": "BVLGARI",
    "displayName": "MAN IN BLACK INTENSE by BVLGARI",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Spices",
        "Rum"
      ],
      "heart": [
        "Leather",
        "Tuberose",
        "Iris"
      ],
      "base": [
        "Guaiac Wood",
        "Tonka Bean",
        "Benzoin"
      ]
    },
    "shortDescription": "A spicy, floral, and warm fragrance that develops from Spices, Rum into Leather, Tuberose, finishing with Guaiac Wood, Tonka Bean.",
    "longDescription": "MAN IN BLACK INTENSE by BVLGARI is a spicy, floral, warm fragrance with a confident masculine character. It opens with Spices, Rum, creating the first bright and expressive impression. The heart develops through Leather, Tuberose, Iris, adding texture and character as the scent settles. In the dry down, Guaiac Wood, Tonka Bean, Benzoin provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ck-one-calvin-klien-unisex",
    "name": "CK One",
    "brand": "Calvin Klien",
    "displayName": "CK One by Calvin Klien",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lemon",
        "Bergamot",
        "Mandarin",
        "Pineapple",
        "Papaya",
        "Cardamom"
      ],
      "heart": [
        "Lily-of-the-Valley",
        "Jasmine",
        "Violet",
        "Rose",
        "Nutmeg",
        "Orris Root"
      ],
      "base": [
        "Green Accord",
        "Musk",
        "Cedar",
        "Sandalwood",
        "Oakmoss",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Lemon, Bergamot into Lily-of-the-Valley, Jasmine, finishing with Green Accord, Musk.",
    "longDescription": "CK One is a timeless citrus-aromatic unisex fragrance that blends fresh, clean notes for everyday versatility. It opens with pineapple, bergamot, mandarin, cardamom and papaya, flows into a heart of lily-of-the-valley, jasmine, violet, nutmeg and orris root, and finishes with a base of green accord, musk, cedar, sandalwood, oakmoss and amber.\n\nPerfect for:\n\nDaytime and casual wear, any season especially warm weather\nOffice, errands, social outings or when you want something fresh and easygoing\nAnyone who appreciates fresh citrus + green notes in a unisex fragrance",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ck-one-shock-for-her-calvin-klien-women",
    "name": "CK One Shock For Her",
    "brand": "Calvin Klien",
    "displayName": "CK One Shock For Her by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Passion Flower",
        "Red Poppy",
        "Peony"
      ],
      "heart": [
        "Blackberry",
        "Dark Chocolate",
        "Jasmine",
        "Narcissus"
      ],
      "base": [
        "Vanilla",
        "Musk",
        "Amber",
        "Patchouli"
      ]
    },
    "shortDescription": "A floral, warm, and woody fragrance that develops from Passion Flower, Red Poppy into Blackberry, Dark Chocolate, finishing with Vanilla, Musk.",
    "longDescription": "CK One Shock For Her by Calvin Klien is a floral, warm, woody fragrance with an elegant feminine character. It opens with Passion Flower, Red Poppy, Peony, creating the first bright and expressive impression. The heart develops through Blackberry, Dark Chocolate, Jasmine, Narcissus, adding texture and character as the scent settles. In the dry down, Vanilla, Musk, Amber, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ck-one-shock-for-him-calvin-klien-men",
    "name": "CK One Shock For Him",
    "brand": "Calvin Klien",
    "displayName": "CK One Shock For Him by Calvin Klien",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Clementine",
        "Cucumber"
      ],
      "heart": [
        "Cardamom",
        "Pepper",
        "Osmanthus",
        "Basil"
      ],
      "base": [
        "Tobacco",
        "Amber",
        "Patchouli",
        "Musk",
        "Woody Notes"
      ]
    },
    "shortDescription": "A spicy, woody, and deep fragrance that develops from Lavender, Clementine into Cardamom, Pepper, finishing with Tobacco, Amber.",
    "longDescription": "CK One Shock For Him by Calvin Klien is a spicy, woody, deep fragrance with a confident masculine character. It opens with Lavender, Clementine, Cucumber, creating the first bright and expressive impression. The heart develops through Cardamom, Pepper, Osmanthus, Basil, adding texture and character as the scent settles. In the dry down, Tobacco, Amber, Patchouli, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "deep-euphoria-for-women-calvin-klien-women",
    "name": "Deep Euphoria For Women",
    "brand": "Calvin Klien",
    "displayName": "Deep Euphoria For Women by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cascalone",
        "White Pepper",
        "Mandarin Leaf"
      ],
      "heart": [
        "Black Rose",
        "Peony",
        "Jasmine Sambac",
        "Geranium"
      ],
      "base": [
        "Patchouli",
        "Musk",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Cascalone, White Pepper into Black Rose, Peony, finishing with Patchouli, Musk.",
    "longDescription": "Deep Euphoria For Women by Calvin Klien is a fresh, aquatic, spicy fragrance with an elegant feminine character. It opens with Cascalone, White Pepper, Mandarin Leaf, creating the first bright and expressive impression. The heart develops through Black Rose, Peony, Jasmine Sambac, Geranium, adding texture and character as the scent settles. In the dry down, Patchouli, Musk, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "endless-euphoria-calvin-klien-women",
    "name": "Endless Euphoria",
    "brand": "Calvin Klien",
    "displayName": "Endless Euphoria by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cherry Blossom",
        "Mandarin Orange",
        "Bergamot"
      ],
      "heart": [
        "Rose",
        "Violet",
        "Syringa"
      ],
      "base": [
        "Musk",
        "Bamboo",
        "Sandalwood"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Cherry Blossom, Mandarin Orange into Rose, Violet, finishing with Musk, Bamboo.",
    "longDescription": "Endless Euphoria by Calvin Klien is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Cherry Blossom, Mandarin Orange, Bergamot, creating the first bright and expressive impression. The heart develops through Rose, Violet, Syringa, adding texture and character as the scent settles. In the dry down, Musk, Bamboo, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "eternity-for-men-calvin-klien-men",
    "name": "Eternity For Men",
    "brand": "Calvin Klien",
    "displayName": "Eternity For Men by Calvin Klien",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Lemon",
        "Bergamot",
        "Mandarin Orange"
      ],
      "heart": [
        "Sage",
        "Juniper Berries",
        "Basil",
        "Geranium",
        "Coriander",
        "Jasmine"
      ],
      "base": [
        "Sandalwood",
        "Musk",
        "Vetiver",
        "Brazilian Rosewood",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Lavender, Lemon into Sage, Juniper Berries, finishing with Sandalwood, Musk.",
    "longDescription": "Eternity For Men by Calvin Klien is a fresh, floral, woody fragrance with a confident masculine character. It opens with Lavender, Lemon, Bergamot, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Sage, Juniper Berries, Basil, Geranium, adding texture and character as the scent settles. In the dry down, Sandalwood, Musk, Vetiver, Brazilian Rosewood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "eternity-moment-calvin-klien-women",
    "name": "Eternity Moment",
    "brand": "Calvin Klien",
    "displayName": "Eternity Moment by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Litchi",
        "Raspberry",
        "Melon",
        "Guava"
      ],
      "heart": [
        "Chinese Pink Peony",
        "Jasmine",
        "Water Lily",
        "Passion Flower"
      ],
      "base": [
        "Musk",
        "Brazilian Rosewood",
        "Sandalwood",
        "Cashmere Wood"
      ]
    },
    "shortDescription": "A aquatic, floral, and woody fragrance that develops from Litchi, Raspberry into Chinese Pink Peony, Jasmine, finishing with Musk, Brazilian Rosewood.",
    "longDescription": "Eternity Moment by Calvin Klien is a aquatic, floral, woody fragrance with an elegant feminine character. It opens with Litchi, Raspberry, Melon, Guava, creating the first bright and expressive impression. The heart develops through Chinese Pink Peony, Jasmine, Water Lily, Passion Flower, adding texture and character as the scent settles. In the dry down, Musk, Brazilian Rosewood, Sandalwood, Cashmere Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy aquatic, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "eternity-summer-for-men-calvin-klien-men",
    "name": "ETERNITY SUMMER for Men",
    "brand": "Calvin Klien",
    "displayName": "ETERNITY SUMMER for Men by Calvin Klien",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Lime",
        "Coriander"
      ],
      "heart": [
        "Sea Salt",
        "Sage",
        "Basil"
      ],
      "base": [
        "Cedar",
        "Amber",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, aquatic, and woody fragrance that develops from Bergamot, Lime into Sea Salt, Sage, finishing with Cedar, Amber.",
    "longDescription": "ETERNITY SUMMER for Men by Calvin Klien is a fresh, aquatic, woody fragrance with a confident masculine character. It opens with Bergamot, Lime, Coriander, creating the first bright and expressive impression. The heart develops through Sea Salt, Sage, Basil, adding texture and character as the scent settles. In the dry down, Cedar, Amber, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "euphoria-for-men-calvin-klien-men",
    "name": "Euphoria for Men",
    "brand": "Calvin Klien",
    "displayName": "Euphoria for Men by Calvin Klien",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger",
        "Pepper"
      ],
      "heart": [
        "Black Basil",
        "Sage",
        "Cedar"
      ],
      "base": [
        "Amber",
        "Suede",
        "Patchouli",
        "Brazilian Redwood"
      ]
    },
    "shortDescription": "A spicy and woody fragrance that develops from Ginger, Pepper into Black Basil, Sage, finishing with Amber, Suede.",
    "longDescription": "Euphoria for Men by Calvin Klien is a spicy, woody fragrance with a confident masculine character. It opens with Ginger, Pepper, creating the first bright and expressive impression. The heart develops through Black Basil, Sage, Cedar, adding texture and character as the scent settles. In the dry down, Amber, Suede, Patchouli, Brazilian Redwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "euphoria-for-women-calvin-klien-women",
    "name": "Euphoria for Women",
    "brand": "Calvin Klien",
    "displayName": "Euphoria for Women by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pomegranate",
        "Persimmon",
        "Green Accord"
      ],
      "heart": [
        "Black Orchid",
        "Lotus",
        "Champaca"
      ],
      "base": [
        "Mahogany",
        "Amber",
        "Black Violet",
        "Whipped Cream"
      ]
    },
    "shortDescription": "A floral fragrance that develops from Pomegranate, Persimmon into Black Orchid, Lotus, finishing with Mahogany, Amber.",
    "longDescription": "Euphoria for Women by Calvin Klien is a floral fragrance with an elegant feminine character. It opens with Pomegranate, Persimmon, Green Accord, creating the first bright and expressive impression. The heart develops through Black Orchid, Lotus, Champaca, adding texture and character as the scent settles. In the dry down, Mahogany, Amber, Black Violet, Whipped Cream provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "forbidden-euphoria-for-women-calvin-klien-women",
    "name": "Forbidden Euphoria For Women",
    "brand": "Calvin Klien",
    "displayName": "Forbidden Euphoria For Women by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Raspberry",
        "Mandarin Orange",
        "Peach Blossom"
      ],
      "heart": [
        "Orchid",
        "Peony",
        "Jasmine"
      ],
      "base": [
        "Patchouli",
        "Musk",
        "Cashmere Wood"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Raspberry, Mandarin Orange into Orchid, Peony, finishing with Patchouli, Musk.",
    "longDescription": "Forbidden Euphoria For Women by Calvin Klien is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Raspberry, Mandarin Orange, Peach Blossom, creating the first bright and expressive impression. The heart develops through Orchid, Peony, Jasmine, adding texture and character as the scent settles. In the dry down, Patchouli, Musk, Cashmere Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "obsession-for-men-calvin-klien-men",
    "name": "OBSESSION For Men",
    "brand": "Calvin Klien",
    "displayName": "OBSESSION For Men by Calvin Klien",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cinnamon",
        "Lavender",
        "Coriander",
        "Mandarin",
        "Lime",
        "Bergamot",
        "Grapefruit"
      ],
      "heart": [
        "Myrrh",
        "Nutmeg",
        "Carnation",
        "Brazilian Rosewood",
        "Pine",
        "Sage",
        "Jasmine"
      ],
      "base": [
        "Amber",
        "Vanilla",
        "Sandalwood",
        "Musk",
        "Patchouli",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Cinnamon, Lavender into Myrrh, Nutmeg, finishing with Amber, Vanilla.",
    "longDescription": "OBSESSION For Men by Calvin Klien is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Cinnamon, Lavender, Coriander, Mandarin, creating the first bright and expressive impression. The heart develops through Myrrh, Nutmeg, Carnation, Brazilian Rosewood, adding texture and character as the scent settles. In the dry down, Amber, Vanilla, Sandalwood, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "reveal-for-women-calvin-klien-women",
    "name": "Reveal For Women",
    "brand": "Calvin Klien",
    "displayName": "Reveal For Women by Calvin Klien",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Salt",
        "Pink Pepper",
        "Black Pepper",
        "White Pepper"
      ],
      "heart": [
        "Iris",
        "Ambergris"
      ],
      "base": [
        "Cashmeran",
        "Sandalwood",
        "Musk",
        "Vetiver"
      ]
    },
    "shortDescription": "A aquatic, spicy, and woody fragrance that develops from Salt, Pink Pepper into Iris, Ambergris, finishing with Cashmeran, Sandalwood.",
    "longDescription": "Reveal For Women by Calvin Klien is a aquatic, spicy, woody fragrance with an elegant feminine character. It opens with Salt, Pink Pepper, Black Pepper, White Pepper, creating the first bright and expressive impression. The heart develops through Iris, Ambergris, adding texture and character as the scent settles. In the dry down, Cashmeran, Sandalwood, Musk, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy aquatic, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "reveal-men-calvin-klien-men",
    "name": "Reveal Men",
    "brand": "Calvin Klien",
    "displayName": "Reveal Men by Calvin Klien",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Melon",
        "Brandy",
        "Ginger",
        "Mastic"
      ],
      "heart": [
        "Agave",
        "Suede",
        "Salt",
        "Clary Sage"
      ],
      "base": [
        "Tonka Bean",
        "Amber",
        "Vetiver"
      ]
    },
    "shortDescription": "A aquatic, spicy, and warm fragrance that develops from Melon, Brandy into Agave, Suede, finishing with Tonka Bean, Amber.",
    "longDescription": "Reveal Men by Calvin Klien is a aquatic, spicy, warm fragrance with a confident masculine character. It opens with Melon, Brandy, Ginger, Mastic, creating the first bright and expressive impression. The heart develops through Agave, Suede, Salt, Clary Sage, adding texture and character as the scent settles. In the dry down, Tonka Bean, Amber, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy aquatic, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "212-vip-red-black-carolina-herrera-men",
    "name": "212 VIP Red Black",
    "brand": "Carolina Herrera",
    "displayName": "212 VIP Red Black by Carolina Herrera",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Absinthe",
        "Anise",
        "Fennel"
      ],
      "heart": [
        "Lavender"
      ],
      "base": [
        "Black Vanilla Husk",
        "Musk"
      ]
    },
    "shortDescription": "A warm fragrance that develops from Absinthe, Anise into Lavender, finishing with Black Vanilla Husk, Musk.",
    "longDescription": "212 VIP Red Black by Carolina Herrera is a warm fragrance with a confident masculine character. It opens with Absinthe, Anise, Fennel, creating the first bright and expressive impression. The heart develops through Lavender, adding texture and character as the scent settles. In the dry down, Black Vanilla Husk, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ch-central-park-for-men-carolina-herrera-men",
    "name": "CH Central Park for Men",
    "brand": "Carolina Herrera",
    "displayName": "CH Central Park for Men by Carolina Herrera",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger",
        "Mandarin Orange"
      ],
      "heart": [
        "Cedar",
        "Sage"
      ],
      "base": [
        "Amber",
        "Moss"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Ginger, Mandarin Orange into Cedar, Sage, finishing with Amber, Moss.",
    "longDescription": "CH Central Park for Men by Carolina Herrera is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Ginger, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Cedar, Sage, adding texture and character as the scent settles. In the dry down, Amber, Moss provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ch-central-park-for-women-carolina-herrera-women",
    "name": "CH Central Park for Women",
    "brand": "Carolina Herrera",
    "displayName": "CH Central Park for Women by Carolina Herrera",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Orange Blossom"
      ],
      "heart": [
        "Jasmine",
        "Tuberose"
      ],
      "base": [
        "Patchouli",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Bergamot, Orange Blossom into Jasmine, Tuberose, finishing with Patchouli, Musk.",
    "longDescription": "CH Central Park for Women by Carolina Herrera is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Bergamot, Orange Blossom, creating the first bright and expressive impression. The heart develops through Jasmine, Tuberose, adding texture and character as the scent settles. In the dry down, Patchouli, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ch-kings-carolina-herrera-men",
    "name": "CH Kings",
    "brand": "Carolina Herrera",
    "displayName": "CH Kings by Carolina Herrera",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Pepper",
        "Pink Pepper",
        "Cardamom",
        "Violet Leaf"
      ],
      "heart": [
        "Cacao",
        "Coffee",
        "Pineapple"
      ],
      "base": [
        "Amber",
        "Musk",
        "Tonka Bean"
      ]
    },
    "shortDescription": "A spicy, floral, and warm fragrance that develops from Black Pepper, Pink Pepper into Cacao, Coffee, finishing with Amber, Musk.",
    "longDescription": "CH Kings by Carolina Herrera is a spicy, floral, warm fragrance with a confident masculine character. It opens with Black Pepper, Pink Pepper, Cardamom, Violet Leaf, creating the first bright and expressive impression. The heart develops through Cacao, Coffee, Pineapple, adding texture and character as the scent settles. In the dry down, Amber, Musk, Tonka Bean provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ch-men-carolina-herrera-men",
    "name": "CH Men",
    "brand": "Carolina Herrera",
    "displayName": "CH Men by Carolina Herrera",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grass",
        "Bergamot",
        "Grapefruit"
      ],
      "heart": [
        "Woodsy Notes",
        "Nutmeg",
        "Saffron",
        "Violet",
        "Jasmine"
      ],
      "base": [
        "Sugar",
        "Leather",
        "Vanilla",
        "Suede",
        "Amber",
        "Cashmere Wood",
        "Sandalwood",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grass, Bergamot into Woodsy Notes, Nutmeg, finishing with Sugar, Leather.",
    "longDescription": "CH Men by Carolina Herrera is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Grass, Bergamot, Grapefruit, creating the first bright and expressive impression. The heart develops through Woodsy Notes, Nutmeg, Saffron, Violet, adding texture and character as the scent settles. In the dry down, Sugar, Leather, Vanilla, Suede provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ch-men-prive-carolina-herrera-men",
    "name": "CH Men Prive",
    "brand": "Carolina Herrera",
    "displayName": "CH Men Prive by Carolina Herrera",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Whiskey",
        "Grapefruit",
        "Pomelo"
      ],
      "heart": [
        "Cardamom",
        "Lavender",
        "Sage",
        "Red Thyme"
      ],
      "base": [
        "Leather",
        "Tonka Bean",
        "Benzoin",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Whiskey, Grapefruit into Cardamom, Lavender, finishing with Leather, Tonka Bean.",
    "longDescription": "CH Men Prive by Carolina Herrera is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Whiskey, Grapefruit, Pomelo, creating the first bright and expressive impression. The heart develops through Cardamom, Lavender, Sage, Red Thyme, adding texture and character as the scent settles. In the dry down, Leather, Tonka Bean, Benzoin, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "declaration-cartier-men",
    "name": "Declaration",
    "brand": "Cartier",
    "displayName": "Declaration by Cartier",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bitter Orange",
        "Caraway",
        "Birch",
        "Bergamot",
        "Coriander",
        "Mandarin"
      ],
      "heart": [
        "Cardamom",
        "Pepper",
        "Ginger",
        "Juniper",
        "Cinnamon",
        "Jasmine"
      ],
      "base": [
        "Vetiver",
        "Tea",
        "Cedar",
        "Leather",
        "Oakmoss",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Bitter Orange, Caraway into Cardamom, Pepper, finishing with Vetiver, Tea.",
    "longDescription": "Declaration by Cartier is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Bitter Orange, Caraway, Birch, Bergamot, creating the first bright and expressive impression. The heart develops through Cardamom, Pepper, Ginger, Juniper, adding texture and character as the scent settles. In the dry down, Vetiver, Tea, Cedar, Leather provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "pasha-de-cartier-cartier-men",
    "name": "PASHA DE CARTIER",
    "brand": "Cartier",
    "displayName": "PASHA DE CARTIER by Cartier",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Mint",
        "Caraway",
        "Anise",
        "Mandarin"
      ],
      "heart": [
        "Coriander",
        "Brazilian Rosewood"
      ],
      "base": [
        "Oakmoss",
        "Sandalwood",
        "Patchouli",
        "Labdanum"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Lavender, Mint into Coriander, Brazilian Rosewood, finishing with Oakmoss, Sandalwood.",
    "longDescription": "PASHA DE CARTIER by Cartier is a fresh, floral, woody fragrance with a confident masculine character. It opens with Lavender, Mint, Caraway, Anise, creating the first bright and expressive impression. The heart develops through Coriander, Brazilian Rosewood, adding texture and character as the scent settles. In the dry down, Oakmoss, Sandalwood, Patchouli, Labdanum provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "santos-de-cartier-cartier-men",
    "name": "Santos De Cartier",
    "brand": "Cartier",
    "displayName": "Santos De Cartier by Cartier",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Juniper Berries",
        "Basil",
        "Bergamot",
        "Lemon Verbena"
      ],
      "heart": [
        "Pepper",
        "Nutmeg",
        "Vetiver",
        "Rosemary",
        "Geranium"
      ],
      "base": [
        "Sandalwood",
        "Patchouli",
        "Leather",
        "Cedar",
        "Amber",
        "Coconut"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Lavender, Juniper Berries into Pepper, Nutmeg, finishing with Sandalwood, Patchouli.",
    "longDescription": "Santos De Cartier by Cartier is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Lavender, Juniper Berries, Basil, Bergamot, creating the first bright and expressive impression. The heart develops through Pepper, Nutmeg, Vetiver, Rosemary, adding texture and character as the scent settles. In the dry down, Sandalwood, Patchouli, Leather, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "allure-homme-sport-eau-extreme-chanel-men",
    "name": "Allure Homme Sport Eau Extreme",
    "brand": "Chanel",
    "displayName": "Allure Homme Sport Eau Extreme by Chanel",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mandarin Orange",
        "Mint",
        "Cypress",
        "Sage"
      ],
      "heart": [
        "Pepper"
      ],
      "base": [
        "Tonka Bean",
        "Musk",
        "Sandalwood",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Mandarin Orange, Mint into Pepper, finishing with Tonka Bean, Musk.",
    "longDescription": "Allure Homme Sport Eau Extreme by Chanel is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Mandarin Orange, Mint, Cypress, Sage, creating the first bright and expressive impression. The heart develops through Pepper, adding texture and character as the scent settles. In the dry down, Tonka Bean, Musk, Sandalwood, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "allure-sport-chanel-men",
    "name": "ALLURE SPORT",
    "brand": "Chanel",
    "displayName": "ALLURE SPORT by Chanel",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Orange",
        "Sea Notes",
        "Aldehydes",
        "Blood Mandarin"
      ],
      "heart": [
        "Pepper",
        "Neroli",
        "Cedar"
      ],
      "base": [
        "Tonka Bean",
        "Vanilla",
        "White Musk",
        "Amber",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Orange, Sea Notes into Pepper, Neroli, finishing with Tonka Bean, Vanilla.",
    "longDescription": "ALLURE SPORT by Chanel is a fresh, aquatic, spicy fragrance with a confident masculine character. It opens with Orange, Sea Notes, Aldehydes, Blood Mandarin, creating the first bright and expressive impression. The heart develops through Pepper, Neroli, Cedar, adding texture and character as the scent settles. In the dry down, Tonka Bean, Vanilla, White Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bleu-de-chanel-chanel-men",
    "name": "BLEU DE CHANEL",
    "brand": "Chanel",
    "displayName": "BLEU DE CHANEL by Chanel",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Lemon",
        "Mint",
        "Pink Pepper"
      ],
      "heart": [
        "Ginger",
        "Nutmeg",
        "Jasmine",
        "Iso E Super"
      ],
      "base": [
        "Incense",
        "Vetiver",
        "Cedar",
        "Sandalwood",
        "Patchouli",
        "Labdanum",
        "White Musk"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grapefruit, Lemon into Ginger, Nutmeg, finishing with Incense, Vetiver.",
    "longDescription": "BLEU DE CHANEL by Chanel is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Grapefruit, Lemon, Mint, Pink Pepper, creating the first bright and expressive impression. The heart develops through Ginger, Nutmeg, Jasmine, Iso E Super, adding texture and character as the scent settles. In the dry down, Incense, Vetiver, Cedar, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "coco-eau-de-parfum-chanel-women",
    "name": "Coco Eau de Parfum",
    "brand": "Chanel",
    "displayName": "Coco Eau de Parfum by Chanel",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Coriander",
        "Mandarin Orange",
        "Peach",
        "Jasmine",
        "Bulgarian Rose"
      ],
      "heart": [
        "Cloves",
        "Mimosa",
        "Orange Blossom",
        "Clover",
        "Rose"
      ],
      "base": [
        "Amber",
        "Sandalwood",
        "Tonka Bean",
        "Civet",
        "Opoponax",
        "Vanilla",
        "Labdanum"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Coriander, Mandarin Orange into Cloves, Mimosa, finishing with Amber, Sandalwood.",
    "longDescription": "Coco Eau de Parfum by Chanel is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Coriander, Mandarin Orange, Peach, Jasmine, creating the first bright and expressive impression. The heart develops through Cloves, Mimosa, Orange Blossom, Clover, adding texture and character as the scent settles. In the dry down, Amber, Sandalwood, Tonka Bean, Civet provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "coco-mademoiselle-chanel-women",
    "name": "Coco Mademoiselle",
    "brand": "Chanel",
    "displayName": "Coco Mademoiselle by Chanel",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Orange",
        "Mandarin Orange",
        "Bergamot",
        "Orange Blossom"
      ],
      "heart": [
        "Turkish Rose",
        "Jasmine",
        "Mimosa",
        "Ylang-Ylang"
      ],
      "base": [
        "Patchouli",
        "White Musk",
        "Vanilla",
        "Vetiver",
        "Tonka Bean",
        "Opoponax"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Orange, Mandarin Orange into Turkish Rose, Jasmine, finishing with Patchouli, White Musk.",
    "longDescription": "Coco Mademoiselle by Chanel is a fresh, floral, warm fragrance with an elegant feminine character. It opens with Orange, Mandarin Orange, Bergamot, Orange Blossom, creating the first bright and expressive impression. The heart develops through Turkish Rose, Jasmine, Mimosa, Ylang-Ylang, adding texture and character as the scent settles. In the dry down, Patchouli, White Musk, Vanilla, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "coco-mademoiselle-intense-chanel-women",
    "name": "Coco Mademoiselle Intense",
    "brand": "Chanel",
    "displayName": "Coco Mademoiselle Intense by Chanel",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sicilian Orange",
        "Calabrian Bergamot",
        "Lemon"
      ],
      "heart": [
        "Rose",
        "Fruity Notes",
        "Jasmine"
      ],
      "base": [
        "Madagascar Vanilla",
        "Patchouli",
        "Tonka Bean",
        "White Musk",
        "Labdanum"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Sicilian Orange, Calabrian Bergamot into Rose, Fruity Notes, finishing with Madagascar Vanilla, Patchouli.",
    "longDescription": "Coco Mademoiselle Intense by Chanel is a fresh, floral, warm fragrance with an elegant feminine character. It opens with Sicilian Orange, Calabrian Bergamot, Lemon, creating the first bright and expressive impression. The heart develops through Rose, Fruity Notes, Jasmine, adding texture and character as the scent settles. In the dry down, Madagascar Vanilla, Patchouli, Tonka Bean, White Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "coco-noir-chanel-women",
    "name": "Coco Noir",
    "brand": "Chanel",
    "displayName": "Coco Noir by Chanel",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Bergamot",
        "Orange"
      ],
      "heart": [
        "Rose",
        "Geranium",
        "Jasmine",
        "Narcissus",
        "Peach"
      ],
      "base": [
        "Patchouli",
        "Sandalwood",
        "Olibanum",
        "Tonka Bean",
        "Vanilla",
        "White Musk",
        "Cloves",
        "Benzoin"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grapefruit, Bergamot into Rose, Geranium, finishing with Patchouli, Sandalwood.",
    "longDescription": "Coco Noir by Chanel is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Grapefruit, Bergamot, Orange, creating the first bright and expressive impression. The heart develops through Rose, Geranium, Jasmine, Narcissus, adding texture and character as the scent settles. In the dry down, Patchouli, Sandalwood, Olibanum, Tonka Bean provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "n-5-chanel-women",
    "name": "N°5",
    "brand": "Chanel",
    "displayName": "N°5 by Chanel",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Aldehydes",
        "Ylang-Ylang",
        "Neroli",
        "Bergamot",
        "Lemon"
      ],
      "heart": [
        "Iris",
        "Jasmine",
        "Rose",
        "Orris Root",
        "Lily-of-the-Valley"
      ],
      "base": [
        "Civet",
        "Sandalwood",
        "Amber",
        "Musk",
        "Moss",
        "Vetiver",
        "Vanilla",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Aldehydes, Ylang-Ylang into Iris, Jasmine, finishing with Civet, Sandalwood.",
    "longDescription": "N°5 by Chanel is a fresh, floral, warm fragrance with an elegant feminine character. It opens with Aldehydes, Ylang-Ylang, Neroli, Bergamot, creating the first bright and expressive impression. The heart develops through Iris, Jasmine, Rose, Orris Root, adding texture and character as the scent settles. In the dry down, Civet, Sandalwood, Amber, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "no-19-eau-de-parfum-chanel-women",
    "name": "NO 19 Eau de Parfum",
    "brand": "Chanel",
    "displayName": "NO 19 Eau de Parfum by Chanel",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Galbanum",
        "Bergamot",
        "Neroli"
      ],
      "heart": [
        "Iris",
        "Rose",
        "Narcissus",
        "Lily-of-the-Valley",
        "Ylang-Ylang"
      ],
      "base": [
        "Oakmoss",
        "Vetiver",
        "Leather",
        "Sandalwood",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Galbanum, Bergamot into Iris, Rose, finishing with Oakmoss, Vetiver.",
    "longDescription": "NO 19 Eau de Parfum by Chanel is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Galbanum, Bergamot, Neroli, creating the first bright and expressive impression. The heart develops through Iris, Rose, Narcissus, Lily-of-the-Valley, adding texture and character as the scent settles. In the dry down, Oakmoss, Vetiver, Leather, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "musk-malaki-chopard-unisex",
    "name": "Musk Malaki",
    "brand": "Chopard",
    "displayName": "Musk Malaki by Chopard",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Musk"
      ],
      "heart": [
        "Black Pepper",
        "Cedar"
      ],
      "base": [
        "Leather"
      ]
    },
    "shortDescription": "A spicy, woody, and deep fragrance that develops from Musk into Black Pepper, Cedar, finishing with Leather.",
    "longDescription": "Musk Malaki by Chopard is a spicy, woody, deep fragrance with a versatile, genderless character. It opens with Musk, creating the first bright and expressive impression. The heart develops through Black Pepper, Cedar, adding texture and character as the scent settles. In the dry down, Leather provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ambre-nuit-dior-christian-dior-unisex",
    "name": "Ambre Nuit Dior",
    "brand": "Christian Dior",
    "displayName": "Ambre Nuit Dior by Christian Dior",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Grapefruit"
      ],
      "heart": [
        "Damask Rose",
        "Pink Pepper"
      ],
      "base": [
        "Ambergris",
        "Guaiac Wood",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Bergamot, Grapefruit into Damask Rose, Pink Pepper, finishing with Ambergris, Guaiac Wood.",
    "longDescription": "Ambre Nuit Dior by Christian Dior is a fresh, spicy, floral fragrance with a versatile, genderless character. It opens with Bergamot, Grapefruit, creating the first bright and expressive impression. The heart develops through Damask Rose, Pink Pepper, adding texture and character as the scent settles. In the dry down, Ambergris, Guaiac Wood, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "clinique-happy-clinique-women",
    "name": "Clinique Happy",
    "brand": "Clinique",
    "displayName": "Clinique Happy by Clinique",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Orange",
        "Blood Grapefruit",
        "Indian Mandarin",
        "Bergamot",
        "Apple",
        "Plum"
      ],
      "heart": [
        "Lily-of-the-Valley",
        "Freesia",
        "Orchid",
        "Rose"
      ],
      "base": [
        "Mimosa",
        "Lily",
        "Magnolia",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh and floral fragrance that develops from Orange, Blood Grapefruit into Lily-of-the-Valley, Freesia, finishing with Mimosa, Lily.",
    "longDescription": "Clinique Happy by Clinique is a fresh, floral fragrance with an elegant feminine character. It opens with Orange, Blood Grapefruit, Indian Mandarin, Bergamot, creating the first bright and expressive impression. The heart develops through Lily-of-the-Valley, Freesia, Orchid, Rose, adding texture and character as the scent settles. In the dry down, Mimosa, Lily, Magnolia, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "x-for-men-clive-christian-men",
    "name": "X For Men",
    "brand": "Clive Christian",
    "displayName": "X For Men by Clive Christian",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Rhubarb",
        "Pineapple",
        "Bergamot"
      ],
      "heart": [
        "Iris",
        "Jasmine",
        "Paprika"
      ],
      "base": [
        "Cinnamon",
        "Oakmoss",
        "Amber",
        "Vetiver",
        "Vanilla",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Rhubarb, Pineapple into Iris, Jasmine, finishing with Cinnamon, Oakmoss.",
    "longDescription": "X For Men by Clive Christian is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Rhubarb, Pineapple, Bergamot, creating the first bright and expressive impression. The heart develops through Iris, Jasmine, Paprika, adding texture and character as the scent settles. In the dry down, Cinnamon, Oakmoss, Amber, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "aventus-creed-creed-men",
    "name": "Aventus Creed",
    "brand": "Creed",
    "displayName": "Aventus Creed by Creed",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Black Currant",
        "Apple",
        "Lemon",
        "Pink Pepper"
      ],
      "heart": [
        "Pineapple",
        "Patchouli",
        "Jasmine"
      ],
      "base": [
        "Birch",
        "Musk",
        "Oakmoss",
        "Cedar",
        "Ambroxan"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Bergamot, Black Currant into Pineapple, Patchouli, finishing with Birch, Musk.",
    "longDescription": "Aventus Creed by Creed is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Bergamot, Black Currant, Apple, Lemon, creating the first bright and expressive impression. The heart develops through Pineapple, Patchouli, Jasmine, adding texture and character as the scent settles. In the dry down, Birch, Musk, Oakmoss, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "aventus-for-her-creed-women",
    "name": "Aventus for Her",
    "brand": "Creed",
    "displayName": "Aventus for Her by Creed",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Green Apple",
        "Bergamot",
        "Lemon",
        "Patchouli",
        "Pink Pepper",
        "Violet"
      ],
      "heart": [
        "Musk",
        "Rose",
        "Sandalwood",
        "Styrax"
      ],
      "base": [
        "Black Currant",
        "Peach",
        "Amber",
        "Lilac",
        "Ylang-Ylang"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Green Apple, Bergamot into Musk, Rose, finishing with Black Currant, Peach.",
    "longDescription": "Aventus for Her by Creed is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Green Apple, Bergamot, Lemon, Patchouli, creating the first bright and expressive impression. The heart develops through Musk, Rose, Sandalwood, Styrax, adding texture and character as the scent settles. In the dry down, Black Currant, Peach, Amber, Lilac provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "millesime-imperial-creed-unisex",
    "name": "Millesime Imperial",
    "brand": "Creed",
    "displayName": "Millesime Imperial by Creed",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Salt",
        "Fruity Notes"
      ],
      "heart": [
        "Sicilian Lemon",
        "Bergamot",
        "Mandarin Orange",
        "Iris"
      ],
      "base": [
        "Sea Notes",
        "Musk",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, aquatic, and woody fragrance that develops from Sea Salt, Fruity Notes into Sicilian Lemon, Bergamot, finishing with Sea Notes, Musk.",
    "longDescription": "Millesime Imperial by Creed is a fresh, aquatic, woody fragrance with a versatile, genderless character. It opens with Sea Salt, Fruity Notes, creating the first bright and expressive impression. The heart develops through Sicilian Lemon, Bergamot, Mandarin Orange, Iris, adding texture and character as the scent settles. In the dry down, Sea Notes, Musk, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "silver-mountain-water-creed-unisex",
    "name": "Silver Mountain Water",
    "brand": "Creed",
    "displayName": "Silver Mountain Water by Creed",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Mandarin Orange"
      ],
      "heart": [
        "Green Tea",
        "Black Currant"
      ],
      "base": [
        "Musk",
        "Petitgrain",
        "Sandalwood",
        "Galbanum"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Bergamot, Mandarin Orange into Green Tea, Black Currant, finishing with Musk, Petitgrain.",
    "longDescription": "Silver Mountain Water by Creed is a fresh, woody fragrance with a versatile, genderless character. It opens with Bergamot, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Green Tea, Black Currant, adding texture and character as the scent settles. In the dry down, Musk, Petitgrain, Sandalwood, Galbanum provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "cool-water-davidoff-men",
    "name": "Cool Water",
    "brand": "Davidoff",
    "displayName": "Cool Water by Davidoff",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Water",
        "Lavender",
        "Mint",
        "Green Notes",
        "Rosemary",
        "Calone",
        "Coriander"
      ],
      "heart": [
        "Sandalwood",
        "Neroli",
        "Geranium",
        "Jasmine"
      ],
      "base": [
        "Musk",
        "Tobacco",
        "Oakmoss",
        "Cedar",
        "Amber"
      ]
    },
    "shortDescription": "A aquatic, floral, and woody fragrance that develops from Sea Water, Lavender into Sandalwood, Neroli, finishing with Musk, Tobacco.",
    "longDescription": "Cool Water by Davidoff is a aquatic, floral, woody fragrance with a confident masculine character. It opens with Sea Water, Lavender, Mint, Green Notes, creating the first bright and expressive impression. The heart develops through Sandalwood, Neroli, Geranium, Jasmine, adding texture and character as the scent settles. In the dry down, Musk, Tobacco, Oakmoss, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy aquatic, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "cool-water-davidoff-women",
    "name": "Cool Water",
    "brand": "Davidoff",
    "displayName": "Cool Water by Davidoff",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Melon",
        "Lotus",
        "Lemon",
        "Pineapple",
        "Quince",
        "Calone",
        "Black Currant",
        "Lily"
      ],
      "heart": [
        "Water Lily",
        "Lily-of-the-Valley",
        "Jasmine",
        "Honey",
        "Hawthorn",
        "Rose"
      ],
      "base": [
        "Musk",
        "Vetiver",
        "Raspberry",
        "Blackberry",
        "Violet Root",
        "Peach",
        "Sandalwood",
        "Vanilla"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Melon, Lotus into Water Lily, Lily-of-the-Valley, finishing with Musk, Vetiver.",
    "longDescription": "Cool Water by Davidoff is a fresh, aquatic, floral fragrance with an elegant feminine character. It opens with Melon, Lotus, Lemon, Pineapple, creating the first bright and expressive impression. The heart develops through Water Lily, Lily-of-the-Valley, Jasmine, Honey, adding texture and character as the scent settles. In the dry down, Musk, Vetiver, Raspberry, Blackberry provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "fahrenheit-dior-men",
    "name": "Fahrenheit",
    "brand": "Dior",
    "displayName": "Fahrenheit by Dior",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Nutmeg Flower",
        "Lavender",
        "Cedar",
        "Mandarin",
        "Chamomile",
        "Hawthorn",
        "Bergamot",
        "Lemon"
      ],
      "heart": [
        "Violet Leaf",
        "Nutmeg",
        "Cedar",
        "Sandalwood",
        "Carnation",
        "Honeysuckle",
        "Jasmine",
        "Lily-of-the-Valley"
      ],
      "base": [
        "Leather",
        "Vetiver",
        "Musk",
        "Amber",
        "Patchouli",
        "Tonka Bean"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Nutmeg Flower, Lavender into Violet Leaf, Nutmeg, finishing with Leather, Vetiver.",
    "longDescription": "Fahrenheit by Dior is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Nutmeg Flower, Lavender, Cedar, Mandarin, creating the first bright and expressive impression. The heart develops through Violet Leaf, Nutmeg, Cedar, Sandalwood, adding texture and character as the scent settles. In the dry down, Leather, Vetiver, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "fahrenheit-absolute-dior-men",
    "name": "Fahrenheit Absolute",
    "brand": "Dior",
    "displayName": "Fahrenheit Absolute by Dior",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Myrrh",
        "Incense"
      ],
      "heart": [
        "Violet"
      ],
      "base": [
        "Agarwood",
        "Leather"
      ]
    },
    "shortDescription": "A floral, woody, and deep fragrance that develops from Myrrh, Incense into Violet, finishing with Agarwood, Leather.",
    "longDescription": "Fahrenheit Absolute by Dior is a floral, woody, deep fragrance with a confident masculine character. It opens with Myrrh, Incense, creating the first bright and expressive impression. The heart develops through Violet, adding texture and character as the scent settles. In the dry down, Agarwood, Leather provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "fahrenheit-summer-dior-men",
    "name": "Fahrenheit Summer",
    "brand": "Dior",
    "displayName": "Fahrenheit Summer by Dior",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Mandarin Orange",
        "Grapefruit"
      ],
      "heart": [
        "Violet Leaf",
        "Nutmeg"
      ],
      "base": [
        "Vetiver",
        "Cedar",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Bergamot, Mandarin Orange into Violet Leaf, Nutmeg, finishing with Vetiver, Cedar.",
    "longDescription": "Fahrenheit Summer by Dior is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Bergamot, Mandarin Orange, Grapefruit, creating the first bright and expressive impression. The heart develops through Violet Leaf, Nutmeg, adding texture and character as the scent settles. In the dry down, Vetiver, Cedar, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "j-adore-dior-women",
    "name": "J'adore",
    "brand": "Dior",
    "displayName": "J'adore by Dior",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pear",
        "Melon",
        "Mandarin",
        "Bergamot"
      ],
      "heart": [
        "Jasmine",
        "Lily-of-the-Valley",
        "Tuberose",
        "Rose",
        "Orchid"
      ],
      "base": [
        "Vanilla",
        "Musk",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Pear, Melon into Jasmine, Lily-of-the-Valley, finishing with Vanilla, Musk.",
    "longDescription": "J’adore by Dior is a luminous floral-fruity fragrance that blends modern elegance with classic femininity. It opens with pear, melon, mandarin and bergamot for a fresh shimmering start. The heart blossoms with jasmine, lily-of-the-valley, tuberose, rose and orchid bringing rich floral sensuality. At the base, vanilla, musk, and cedar add warmth and depth, making it a soft yet powerful signature scent.\n\nPerfect for:\n\nDay or evening wear when you want something elegant and feminine\nWeddings, special occasions or elevated everyday style\nThose who love soft florals with fresh fruits and a gentle warm dry-down",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "x-dior-men",
    "name": "X",
    "brand": "Dior",
    "displayName": "X by Dior",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Mandarin Orange"
      ],
      "heart": [
        "Iris",
        "Cedar",
        "Pepper"
      ],
      "base": [
        "Vetiver",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Bergamot, Mandarin Orange into Iris, Cedar, finishing with Vetiver, Musk.",
    "longDescription": "X by Dior is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Bergamot, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Iris, Cedar, Pepper, adding texture and character as the scent settles. In the dry down, Vetiver, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "dolce-and-gabbana-pour-femme-dolce-and-gabbana-men",
    "name": "Dolce & Gabbana Pour Femme",
    "brand": "Dolce & Gabbana",
    "displayName": "Dolce & Gabbana Pour Femme by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Neroli",
        "Raspberry",
        "Mandarin Orange"
      ],
      "heart": [
        "Orange Blossom",
        "Jasmine"
      ],
      "base": [
        "Marshmallow",
        "Vanilla",
        "Sandalwood",
        "Heliotrope"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Neroli, Raspberry into Orange Blossom, Jasmine, finishing with Marshmallow, Vanilla.",
    "longDescription": "Dolce & Gabbana Pour Femme by Dolce & Gabbana is a fresh, floral, warm fragrance with a confident masculine character. It opens with Neroli, Raspberry, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Orange Blossom, Jasmine, adding texture and character as the scent settles. In the dry down, Marshmallow, Vanilla, Sandalwood, Heliotrope provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "dolce-and-gabbana-pour-femme-intense-dolce-and-gabbana-women",
    "name": "Dolce & Gabbana Pour Femme Intense",
    "brand": "Dolce & Gabbana",
    "displayName": "Dolce & Gabbana Pour Femme Intense by Dolce & Gabbana",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Neroli",
        "Green Mandarin"
      ],
      "heart": [
        "Orange Blossom",
        "Tuberose"
      ],
      "base": [
        "Marshmallow",
        "Sandalwood"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Neroli, Green Mandarin into Orange Blossom, Tuberose, finishing with Marshmallow, Sandalwood.",
    "longDescription": "Dolce & Gabbana Pour Femme Intense by Dolce & Gabbana is a fresh, floral, warm fragrance with an elegant feminine character. It opens with Neroli, Green Mandarin, creating the first bright and expressive impression. The heart develops through Orange Blossom, Tuberose, adding texture and character as the scent settles. In the dry down, Marshmallow, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "dolce-and-gabbana-pour-homme-dolce-and-gabbana-men",
    "name": "Dolce & Gabbana Pour Homme",
    "brand": "Dolce & Gabbana",
    "displayName": "Dolce & Gabbana Pour Homme by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Citruses",
        "Bergamot",
        "Neroli",
        "Mandarin Orange"
      ],
      "heart": [
        "Lavender",
        "Sage",
        "Pepper"
      ],
      "base": [
        "Tobacco",
        "Tonka Bean",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Citruses, Bergamot into Lavender, Sage, finishing with Tobacco, Tonka Bean.",
    "longDescription": "Dolce & Gabbana Pour Homme by Dolce & Gabbana is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Citruses, Bergamot, Neroli, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Lavender, Sage, Pepper, adding texture and character as the scent settles. In the dry down, Tobacco, Tonka Bean, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "intenso-dolce-and-gabbana-men",
    "name": "Intenso",
    "brand": "Dolce & Gabbana",
    "displayName": "Intenso by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Water Notes",
        "Basil",
        "Lavender",
        "Geranium",
        "Marigold"
      ],
      "heart": [
        "Tobacco",
        "Hay",
        "Clary Sage",
        "Moepel Accord",
        "Bran"
      ],
      "base": [
        "Sandalwood",
        "Cypress",
        "Musk",
        "Amber",
        "Labdanum"
      ]
    },
    "shortDescription": "A aquatic, woody, and deep fragrance that develops from Water Notes, Basil into Tobacco, Hay, finishing with Sandalwood, Cypress.",
    "longDescription": "Intenso by Dolce & Gabbana is a aquatic, woody, deep fragrance with a confident masculine character. It opens with Water Notes, Basil, Lavender, Geranium, creating the first bright and expressive impression. The heart develops through Tobacco, Hay, Clary Sage, Moepel Accord, adding texture and character as the scent settles. In the dry down, Sandalwood, Cypress, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy aquatic, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "k-by-dolce-and-gabbana-dolce-and-gabbana-men",
    "name": "K By Dolce & Gabbana",
    "brand": "Dolce & Gabbana",
    "displayName": "K By Dolce & Gabbana by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Juniper Berries",
        "Citruses",
        "Blood Orange",
        "Sicilian Lemon"
      ],
      "heart": [
        "Pimento",
        "Lavender",
        "Clary Sage",
        "Geranium"
      ],
      "base": [
        "Vetiver",
        "Cedar",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Juniper Berries, Citruses into Pimento, Lavender, finishing with Vetiver, Cedar.",
    "longDescription": "K By Dolce & Gabbana by Dolce & Gabbana is a fresh, woody fragrance with a confident masculine character. It opens with Juniper Berries, Citruses, Blood Orange, Sicilian Lemon, creating the first bright and expressive impression. The heart develops through Pimento, Lavender, Clary Sage, Geranium, adding texture and character as the scent settles. In the dry down, Vetiver, Cedar, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "light-blue-pour-homme-dolce-and-gabbana-men",
    "name": "Light Blue Pour Homme",
    "brand": "Dolce & Gabbana",
    "displayName": "Light Blue Pour Homme by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Bergamot",
        "Sicilian Mandarin",
        "Juniper"
      ],
      "heart": [
        "Pepper",
        "Rosemary",
        "Brazilian Rosewood"
      ],
      "base": [
        "Musk",
        "Incense",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grapefruit, Bergamot into Pepper, Rosemary, finishing with Musk, Incense.",
    "longDescription": "Light Blue Pour Homme by Dolce & Gabbana is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Grapefruit, Bergamot, Sicilian Mandarin, Juniper, creating the first bright and expressive impression. The heart develops through Pepper, Rosemary, Brazilian Rosewood, adding texture and character as the scent settles. In the dry down, Musk, Incense, Oakmoss provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-one-dolce-and-gabbana-men",
    "name": "The One",
    "brand": "Dolce & Gabbana",
    "displayName": "The One by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Coriander",
        "Basil"
      ],
      "heart": [
        "Ginger",
        "Cardamom",
        "Orange Blossom"
      ],
      "base": [
        "Amber",
        "Tobacco",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grapefruit, Coriander into Ginger, Cardamom, finishing with Amber, Tobacco.",
    "longDescription": "The One by Dolce & Gabbana is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Grapefruit, Coriander, Basil, creating the first bright and expressive impression. The heart develops through Ginger, Cardamom, Orange Blossom, adding texture and character as the scent settles. In the dry down, Amber, Tobacco, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-one-for-men-dolce-and-gabbana-men",
    "name": "The One For Men",
    "brand": "Dolce & Gabbana",
    "displayName": "The One For Men by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Coriander",
        "Basil"
      ],
      "heart": [
        "Ginger",
        "Cardamom",
        "Orange Blossom"
      ],
      "base": [
        "Amber",
        "Tobacco",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Grapefruit, Coriander into Ginger, Cardamom, finishing with Amber, Tobacco.",
    "longDescription": "The One For Men by Dolce & Gabbana is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Grapefruit, Coriander, Basil, creating the first bright and expressive impression. The heart develops through Ginger, Cardamom, Orange Blossom, adding texture and character as the scent settles. In the dry down, Amber, Tobacco, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-one-for-men-intense-dolce-and-gabbana-men",
    "name": "The One For Men Intense",
    "brand": "Dolce & Gabbana",
    "displayName": "The One For Men Intense by Dolce & Gabbana",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cardamom",
        "Neroli",
        "Cypress"
      ],
      "heart": [
        "Cashmeran",
        "Benzoin",
        "Neroli",
        "Clary Sage"
      ],
      "base": [
        "Leather",
        "Neroli",
        "Labdanum",
        "Patchouli"
      ]
    },
    "shortDescription": "A spicy, woody, and deep fragrance that develops from Cardamom, Neroli into Cashmeran, Benzoin, finishing with Leather, Neroli.",
    "longDescription": "The One For Men Intense by Dolce & Gabbana is a spicy, woody, deep fragrance with a confident masculine character. It opens with Cardamom, Neroli, Cypress, creating the first bright and expressive impression. The heart develops through Cashmeran, Benzoin, Neroli, Clary Sage, adding texture and character as the scent settles. In the dry down, Leather, Neroli, Labdanum, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "icon-absolute-dunhill-men",
    "name": "Icon Absolute",
    "brand": "Dunhill",
    "displayName": "Icon Absolute by Dunhill",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sicilian Bergamot",
        "Black Pepper"
      ],
      "heart": [
        "Saffron",
        "Black Rose",
        "Jasmine"
      ],
      "base": [
        "Tobacco Leaf",
        "Tuscan Leather",
        "Agarwood"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Sicilian Bergamot, Black Pepper into Saffron, Black Rose, finishing with Tobacco Leaf, Tuscan Leather.",
    "longDescription": "Icon Absolute by Dunhill is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Sicilian Bergamot, Black Pepper, creating the first bright and expressive impression. The heart develops through Saffron, Black Rose, Jasmine, adding texture and character as the scent settles. In the dry down, Tobacco Leaf, Tuscan Leather, Agarwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "white-diamonds-elizabeth-taylor-women",
    "name": "White Diamonds",
    "brand": "Elizabeth Taylor",
    "displayName": "White Diamonds by Elizabeth Taylor",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Aldehydes",
        "Lily",
        "Neroli",
        "Orange",
        "Bergamot"
      ],
      "heart": [
        "Egyptian Tuberose",
        "Jasmine",
        "Ylang-Ylang",
        "Narcissus",
        "Rose"
      ],
      "base": [
        "Amber",
        "Musk",
        "Sandalwood",
        "Oakmoss",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Aldehydes, Lily into Egyptian Tuberose, Jasmine, finishing with Amber, Musk.",
    "longDescription": "White Diamonds by Elizabeth Taylor is a timeless floral-aldehyde fragrance that evokes the elegance of Hollywood’s golden era. It opens with crisp aldehydes, bergamot, orange and neroli that sparkle like champagne. The heart blooms with lush white florals — lily, Egyptian tuberose, jasmine, ylang-ylang and narcissus — capturing a classic feminine allure. The base settles into warm woods, amber, musk, oakmoss and patchouli for a refined and lasting finish.\n\nPerfect for:\n\nEvenings, formal occasions, or elegant nights out\nWhen you want to feel glamorous and make a statement\nThose who appreciate bold white florals, vintage sophistication, and a fragrance with presence",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "pleasure-intense-estee-lauder-women",
    "name": "Pleasure Intense",
    "brand": "Estee Lauder",
    "displayName": "Pleasure Intense by Estee Lauder",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Green Lily",
        "Peony",
        "Ylang-Ylang",
        "Cassis"
      ],
      "heart": [
        "Lily",
        "Jasmine",
        "Tiare Flower",
        "Moroccan Rose"
      ],
      "base": [
        "Maple",
        "Benzoin",
        "Vanilla",
        "Styrax"
      ]
    },
    "shortDescription": "A floral, warm, and deep fragrance that develops from Green Lily, Peony into Lily, Jasmine, finishing with Maple, Benzoin.",
    "longDescription": "Pleasure Intense by Estee Lauder is a floral, warm, deep fragrance with an elegant feminine character. It opens with Green Lily, Peony, Ylang-Ylang, Cassis, creating the first bright and expressive impression. The heart develops through Lily, Jasmine, Tiare Flower, Moroccan Rose, adding texture and character as the scent settles. In the dry down, Maple, Benzoin, Vanilla, Styrax provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, warm, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "clear-day-etienne-aigner-women",
    "name": "Clear Day",
    "brand": "Etienne Aigner",
    "displayName": "Clear Day by Etienne Aigner",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Aldehydes",
        "Citrus Notes",
        "Green Notes"
      ],
      "heart": [
        "Floral Notes",
        "Lily-of-the-Valley",
        "Jasmine"
      ],
      "base": [
        "Musk",
        "Sandalwood",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Aldehydes, Citrus Notes into Floral Notes, Lily-of-the-Valley, finishing with Musk, Sandalwood.",
    "longDescription": "Clear Day by Etienne Aigner is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Aldehydes, Citrus Notes, Green Notes, creating the first bright and expressive impression. The heart develops through Floral Notes, Lily-of-the-Valley, Jasmine, adding texture and character as the scent settles. In the dry down, Musk, Sandalwood, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "berries-frais-monde-unisex",
    "name": "Berries",
    "brand": "Frais Monde",
    "displayName": "Berries by Frais Monde",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Red Berries",
        "Black Currant",
        "Citrus Notes"
      ],
      "heart": [
        "Raspberry",
        "Rose",
        "Violet"
      ],
      "base": [
        "Musk",
        "Vanilla",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Red Berries, Black Currant into Raspberry, Rose, finishing with Musk, Vanilla.",
    "longDescription": "Berries by Frais Monde is a fresh, floral, warm fragrance with a versatile, genderless character. It opens with Red Berries, Black Currant, Citrus Notes, creating the first bright and expressive impression. The heart develops through Raspberry, Rose, Violet, adding texture and character as the scent settles. In the dry down, Musk, Vanilla, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gio-absolu-giorgio-armani-men",
    "name": "Acqua di Giò Absolu",
    "brand": "Giorgio Armani",
    "displayName": "Acqua di Giò Absolu by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Notes",
        "Pear",
        "Lemon",
        "Bergamot",
        "Grapefruit",
        "Apple"
      ],
      "heart": [
        "Lavender",
        "Geranium",
        "Rosemary"
      ],
      "base": [
        "Amberwood",
        "Patchouli",
        "Labdanum",
        "Tonka Bean"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Sea Notes, Pear into Lavender, Geranium, finishing with Amberwood, Patchouli.",
    "longDescription": "Acqua di Giò Absolu by Giorgio Armani is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Sea Notes, Pear, Lemon, Bergamot, creating the first bright and expressive impression. The heart develops through Lavender, Geranium, Rosemary, adding texture and character as the scent settles. In the dry down, Amberwood, Patchouli, Labdanum, Tonka Bean provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gio-absolu-instinct-giorgio-armani-men",
    "name": "Acqua di Giò Absolu Instinct",
    "brand": "Giorgio Armani",
    "displayName": "Acqua di Giò Absolu Instinct by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Notes",
        "Lemon",
        "Bergamot"
      ],
      "heart": [
        "Seaweed",
        "Patchouli"
      ],
      "base": [
        "Amberwood",
        "Ebony Wood"
      ]
    },
    "shortDescription": "A fresh, aquatic, and woody fragrance that develops from Sea Notes, Lemon into Seaweed, Patchouli, finishing with Amberwood, Ebony Wood.",
    "longDescription": "Acqua di Giò Absolu Instinct by Giorgio Armani is a fresh, aquatic, woody fragrance with a confident masculine character. It opens with Sea Notes, Lemon, Bergamot, creating the first bright and expressive impression. The heart develops through Seaweed, Patchouli, adding texture and character as the scent settles. In the dry down, Amberwood, Ebony Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gio-absolute-instinct-giorgio-armani-men",
    "name": "Acqua di Gio Absolute Instinct",
    "brand": "Giorgio Armani",
    "displayName": "Acqua di Gio Absolute Instinct by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Notes",
        "Lemon",
        "Bergamot"
      ],
      "heart": [
        "Seaweed",
        "Patchouli"
      ],
      "base": [
        "Amberwood",
        "Ebony Wood"
      ]
    },
    "shortDescription": "A fresh, aquatic, and woody fragrance that develops from Sea Notes, Lemon into Seaweed, Patchouli, finishing with Amberwood, Ebony Wood.",
    "longDescription": "Acqua di Gio Absolute Instinct by Giorgio Armani is a fresh, aquatic, woody fragrance with a confident masculine character. It opens with Sea Notes, Lemon, Bergamot, creating the first bright and expressive impression. The heart develops through Seaweed, Patchouli, adding texture and character as the scent settles. In the dry down, Amberwood, Ebony Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gio-profondo-giorgio-armani-men",
    "name": "Acqua Di Gio Profondo",
    "brand": "Giorgio Armani",
    "displayName": "Acqua Di Gio Profondo by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Notes",
        "Aquozone",
        "Bergamot",
        "Green Mandarin"
      ],
      "heart": [
        "Rosemary",
        "Lavender",
        "Cypress",
        "Mastic"
      ],
      "base": [
        "Mineral Notes",
        "Musk",
        "Patchouli",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Sea Notes, Aquozone into Rosemary, Lavender, finishing with Mineral Notes, Musk.",
    "longDescription": "Acqua Di Gio Profondo by Giorgio Armani is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Sea Notes, Aquozone, Bergamot, Green Mandarin, creating the first bright and expressive impression. The heart develops through Rosemary, Lavender, Cypress, Mastic, adding texture and character as the scent settles. In the dry down, Mineral Notes, Musk, Patchouli, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gio-profondo-lights-giorgio-armani-men",
    "name": "Acqua di Giò Profondo Lights",
    "brand": "Giorgio Armani",
    "displayName": "Acqua di Giò Profondo Lights by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Marine Notes",
        "Green Mandarin",
        "Cardamom"
      ],
      "heart": [
        "Lavender",
        "Cypress",
        "Mastic"
      ],
      "base": [
        "Patchouli",
        "Cedar",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Marine Notes, Green Mandarin into Lavender, Cypress, finishing with Patchouli, Cedar.",
    "longDescription": "Acqua di Giò Profondo Lights by Giorgio Armani is a fresh, aquatic, spicy fragrance with a confident masculine character. It opens with Marine Notes, Green Mandarin, Cardamom, creating the first bright and expressive impression. The heart develops through Lavender, Cypress, Mastic, adding texture and character as the scent settles. In the dry down, Patchouli, Cedar, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gio-profumo-giorgio-armani-men",
    "name": "Acqua di Giò Profumo",
    "brand": "Giorgio Armani",
    "displayName": "Acqua di Giò Profumo by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Notes",
        "Bergamot"
      ],
      "heart": [
        "Rosemary",
        "Sage",
        "Geranium"
      ],
      "base": [
        "Incense",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Sea Notes, Bergamot into Rosemary, Sage, finishing with Incense, Patchouli.",
    "longDescription": "Acqua di Giò Profumo by Giorgio Armani is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Sea Notes, Bergamot, creating the first bright and expressive impression. The heart develops through Rosemary, Sage, Geranium, adding texture and character as the scent settles. In the dry down, Incense, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-di-gioia-essenza-giorgio-armani-women",
    "name": "Acqua di Gioia Essenza",
    "brand": "Giorgio Armani",
    "displayName": "Acqua di Gioia Essenza by Giorgio Armani",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mint",
        "Lemon",
        "Pink Pepper"
      ],
      "heart": [
        "Water Jasmine",
        "Peony"
      ],
      "base": [
        "Brown Sugar",
        "Cashmeran",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Mint, Lemon into Water Jasmine, Peony, finishing with Brown Sugar, Cashmeran.",
    "longDescription": "Acqua di Gioia Essenza by Giorgio Armani is a fresh, aquatic, spicy fragrance with an elegant feminine character. It opens with Mint, Lemon, Pink Pepper, creating the first bright and expressive impression. The heart develops through Water Jasmine, Peony, adding texture and character as the scent settles. In the dry down, Brown Sugar, Cashmeran, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "aqua-di-gio-giorgio-armani-men",
    "name": "AQUA DI GIO",
    "brand": "Giorgio Armani",
    "displayName": "AQUA DI GIO by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lime",
        "Lemon",
        "Bergamot",
        "Neroli",
        "Mandarin"
      ],
      "heart": [
        "Marine Notes",
        "Jasmine",
        "Peach",
        "Freesia",
        "Rosemary"
      ],
      "base": [
        "White Musk",
        "Cedar",
        "Oakmoss",
        "Patchouli",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Lime, Lemon into Marine Notes, Jasmine, finishing with White Musk, Cedar.",
    "longDescription": "Acqua di Gio is an aquatic aromatic fragrance that evokes the sea, sun, and a fresh breeze. The opening bursts with citrus notes like lime, lemon, bergamot, neroli, and mandarin mingled with aromatic hints of orange and jasmine. Its heart features watery marine accords, subtle florals, peach, freesia, and herbal rosemary. The dry down settles into white musk, cedar, oakmoss, patchouli, and soft amber for a balanced, breezy, and timeless finish.\n\nPerfect for:\n\nWarm weather, daytime wear, casual outfits\nBeach days, outdoors, travelling\nThose who like clean aquatics with citrus and soft woods",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "armani-eau-pour-homme-giorgio-armani-men",
    "name": "Armani Eau Pour Homme",
    "brand": "Giorgio Armani",
    "displayName": "Armani Eau Pour Homme by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Mandarin Orange",
        "Lemon",
        "Petitgrain"
      ],
      "heart": [
        "Coriander",
        "Carnation",
        "Cinnamon",
        "Jasmine",
        "Lavender",
        "Cyclamen"
      ],
      "base": [
        "Oakmoss",
        "Patchouli",
        "Cedar",
        "Vetiver",
        "Sandalwood"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Bergamot, Mandarin Orange into Coriander, Carnation, finishing with Oakmoss, Patchouli.",
    "longDescription": "Armani Eau Pour Homme by Giorgio Armani is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Bergamot, Mandarin Orange, Lemon, Petitgrain, creating the first bright and expressive impression. The heart develops through Coriander, Carnation, Cinnamon, Jasmine, adding texture and character as the scent settles. In the dry down, Oakmoss, Patchouli, Cedar, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "stronger-with-you-leather-giorgio-armani-men",
    "name": "Stronger With You Leather",
    "brand": "Giorgio Armani",
    "displayName": "Stronger With You Leather by Giorgio Armani",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Chestnut",
        "Spices",
        "Elemi"
      ],
      "heart": [
        "Lavender",
        "Sage"
      ],
      "base": [
        "Leather",
        "Vanilla",
        "Guaiac Wood",
        "Agarwood"
      ]
    },
    "shortDescription": "A spicy, warm, and woody fragrance that develops from Chestnut, Spices into Lavender, Sage, finishing with Leather, Vanilla.",
    "longDescription": "Stronger With You Leather by Giorgio Armani is a spicy, warm, woody fragrance with a confident masculine character. It opens with Chestnut, Spices, Elemi, creating the first bright and expressive impression. The heart develops through Lavender, Sage, adding texture and character as the scent settles. In the dry down, Leather, Vanilla, Guaiac Wood, Agarwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "flora-by-gucci-gucci-women",
    "name": "Flora by Gucci",
    "brand": "Gucci",
    "displayName": "Flora by Gucci by Gucci",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mandarin",
        "Pear",
        "Peony"
      ],
      "heart": [
        "Rose",
        "Osmanthus"
      ],
      "base": [
        "Patchouli",
        "Sandalwood",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Mandarin, Pear into Rose, Osmanthus, finishing with Patchouli, Sandalwood.",
    "longDescription": "Flora by Gucci is a radiant floral fragrance that combines delicate petals, fresh citrus, and soft woods to create a feminine and elegant signature. Its opening sparkles with vibrant citrus and peony, the heart blooms with rose and osmanthus, and the base warms with sandalwood, patchouli, and musk.\n\nPerfect for:\n\nDaytime wear, especially in spring/summer\nRomantic occasions or everyday elegance\nAnyone who loves soft florals with gentle wood undertones",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "gucci-by-gucci-gucci-women",
    "name": "GUCCI BY GUCCI",
    "brand": "Gucci",
    "displayName": "GUCCI BY GUCCI by Gucci",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Guava",
        "Pear"
      ],
      "heart": [
        "Tiare Flower"
      ],
      "base": [
        "Patchouli",
        "Honey",
        "Musk"
      ]
    },
    "shortDescription": "A warm and woody fragrance that develops from Guava, Pear into Tiare Flower, finishing with Patchouli, Honey.",
    "longDescription": "GUCCI BY GUCCI by Gucci is a warm, woody fragrance with an elegant feminine character. It opens with Guava, Pear, creating the first bright and expressive impression. The heart develops through Tiare Flower, adding texture and character as the scent settles. In the dry down, Patchouli, Honey, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "gucci-guilty-black-pour-homme-gucci-men",
    "name": "Gucci Guilty Black Pour Homme",
    "brand": "Gucci",
    "displayName": "Gucci Guilty Black Pour Homme by Gucci",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Green Coriander"
      ],
      "heart": [
        "Green Notes",
        "Orange Blossom",
        "Neroli"
      ],
      "base": [
        "Cedar",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Lavender, Green Coriander into Green Notes, Orange Blossom, finishing with Cedar, Patchouli.",
    "longDescription": "Gucci Guilty Black Pour Homme by Gucci is a fresh, floral, woody fragrance with a confident masculine character. It opens with Lavender, Green Coriander, creating the first bright and expressive impression. The heart develops through Green Notes, Orange Blossom, Neroli, adding texture and character as the scent settles. In the dry down, Cedar, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "gucci-guilty-pour-homme-gucci-men",
    "name": "Gucci Guilty Pour Homme",
    "brand": "Gucci",
    "displayName": "Gucci Guilty Pour Homme by Gucci",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Amalfi Lemon"
      ],
      "heart": [
        "African Orange Flower"
      ],
      "base": [
        "Virginia Cedar",
        "Patchouli",
        "Vanilla"
      ]
    },
    "shortDescription": "A fresh, warm, and woody fragrance that develops from Lavender, Amalfi Lemon into African Orange Flower, finishing with Virginia Cedar, Patchouli.",
    "longDescription": "Gucci Guilty Pour Homme by Gucci is a fresh, warm, woody fragrance with a confident masculine character. It opens with Lavender, Amalfi Lemon, creating the first bright and expressive impression. The heart develops through African Orange Flower, adding texture and character as the scent settles. In the dry down, Virginia Cedar, Patchouli, Vanilla provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "intense-oud-gucci-unisex",
    "name": "Intense Oud",
    "brand": "Gucci",
    "displayName": "Intense Oud by Gucci",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Frankincense",
        "Raspberry",
        "Saffron",
        "Pear"
      ],
      "heart": [
        "Damask Rose",
        "Orange Blossom",
        "Musk"
      ],
      "base": [
        "Oud (Agarwood)",
        "Leather",
        "Patchouli",
        "Ambergris"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Frankincense, Raspberry into Damask Rose, Orange Blossom, finishing with Oud (Agarwood), Leather.",
    "longDescription": "Intense Oud by Gucci is a deep, luxurious fragrance built around oud, with dark woods, incense and rich fruits giving it an opulent, mysterious character. It opens with frankincense, saffron, raspberry and pear, flows into a heart of Damask rose, orange blossom and musk, and settles into a base of agarwood (oud), leather, patchouli and ambergris.\n\nPerfect for:\n\nEvening wear or cooler weather when you want something bold and statement-making\nFormal occasions or nights out where you want to leave a strong impression\nThose who appreciate rich oud blends with leather, incense and dark fruit accents",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bloom-guci-women",
    "name": "Bloom",
    "brand": "Guci",
    "displayName": "Bloom by Guci",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Jasmine"
      ],
      "heart": [
        "Tuberose"
      ],
      "base": [
        "Rangoon Creeper"
      ]
    },
    "shortDescription": "A floral fragrance that develops from Jasmine into Tuberose, finishing with Rangoon Creeper.",
    "longDescription": "Bloom by Guci is a floral fragrance with an elegant feminine character. It opens with Jasmine, creating the first bright and expressive impression. The heart develops through Tuberose, adding texture and character as the scent settles. In the dry down, Rangoon Creeper provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "drakkar-essence-guy-larche-men",
    "name": "Drakkar Essence",
    "brand": "Guy Larche",
    "displayName": "Drakkar Essence by Guy Larche",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mint",
        "Grapefruit"
      ],
      "heart": [
        "Lavender",
        "Sage"
      ],
      "base": [
        "Musk",
        "Tonka Bean"
      ]
    },
    "shortDescription": "A fresh and warm fragrance that develops from Mint, Grapefruit into Lavender, Sage, finishing with Musk, Tonka Bean.",
    "longDescription": "Drakkar Essence by Guy Larche is a fresh, warm fragrance with a confident masculine character. It opens with Mint, Grapefruit, creating the first bright and expressive impression. The heart develops through Lavender, Sage, adding texture and character as the scent settles. In the dry down, Musk, Tonka Bean provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "drakkar-noir-guy-larche-men",
    "name": "Drakkar Noir",
    "brand": "Guy Larche",
    "displayName": "Drakkar Noir by Guy Larche",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Lemon",
        "Bergamot",
        "Rosemary",
        "Mint",
        "Lemon Verbena",
        "Basil",
        "Artemisia"
      ],
      "heart": [
        "Juniper",
        "Coriander",
        "Cinnamon",
        "Carnation",
        "Wormwood",
        "Jasmine",
        "Angelica"
      ],
      "base": [
        "Oakmoss",
        "Leather",
        "Fir",
        "Pine Needles",
        "Sandalwood",
        "Vetiver",
        "Cedar",
        "Patchouli",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Lavender, Lemon into Juniper, Coriander, finishing with Oakmoss, Leather.",
    "longDescription": "Drakkar Noir by Guy Larche is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Lavender, Lemon, Bergamot, Rosemary, creating the first bright and expressive impression. The heart develops through Juniper, Coriander, Cinnamon, Carnation, adding texture and character as the scent settles. In the dry down, Oakmoss, Leather, Fir, Pine Needles provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "h24-hermes-men",
    "name": "H24",
    "brand": "Hermes",
    "displayName": "H24 by Hermes",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Clary Sage"
      ],
      "heart": [
        "Narcissus"
      ],
      "base": [
        "Rosewood",
        "Sclarene"
      ]
    },
    "shortDescription": "A floral and woody fragrance that develops from Clary Sage into Narcissus, finishing with Rosewood, Sclarene.",
    "longDescription": "H24 by Hermes is a floral, woody fragrance with a confident masculine character. It opens with Clary Sage, creating the first bright and expressive impression. The heart develops through Narcissus, adding texture and character as the scent settles. In the dry down, Rosewood, Sclarene provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "terre-d-hermes-hermes-men",
    "name": "Terre D'Hermes",
    "brand": "Hermes",
    "displayName": "Terre D'Hermes by Hermes",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Orange",
        "Grapefruit"
      ],
      "heart": [
        "Pepper",
        "Pelargonium"
      ],
      "base": [
        "Vetiver",
        "Cedar",
        "Patchouli",
        "Benzoin"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Orange, Grapefruit into Pepper, Pelargonium, finishing with Vetiver, Cedar.",
    "longDescription": "Terre D'Hermes by Hermes is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Orange, Grapefruit, creating the first bright and expressive impression. The heart develops through Pepper, Pelargonium, adding texture and character as the scent settles. In the dry down, Vetiver, Cedar, Patchouli, Benzoin provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "boss-bottled-unlimited-hugo-boss-men",
    "name": "Boss Bottled Unlimited",
    "brand": "Hugo Boss",
    "displayName": "Boss Bottled Unlimited by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mint",
        "Grapefruit",
        "Violet Leaf"
      ],
      "heart": [
        "Pineapple",
        "Cinnamon",
        "Rose"
      ],
      "base": [
        "Labdanum",
        "Sandalwood",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Mint, Grapefruit into Pineapple, Cinnamon, finishing with Labdanum, Sandalwood.",
    "longDescription": "Boss Bottled Unlimited by Hugo Boss is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Mint, Grapefruit, Violet Leaf, creating the first bright and expressive impression. The heart develops through Pineapple, Cinnamon, Rose, adding texture and character as the scent settles. In the dry down, Labdanum, Sandalwood, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "boss-number-one-hugo-boss-men",
    "name": "Boss Number One",
    "brand": "Hugo Boss",
    "displayName": "Boss Number One by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Artemisia",
        "Juniper",
        "Bergamot",
        "Lemon",
        "Caraway",
        "Green Apple",
        "Basil",
        "Grapefruit"
      ],
      "heart": [
        "Honey",
        "Lavender",
        "Rose",
        "Jasmine",
        "Sage",
        "Orris Root",
        "Lily-of-the-Valley",
        "Geranium"
      ],
      "base": [
        "Tobacco",
        "Oakmoss",
        "Patchouli",
        "Sandalwood",
        "Musk",
        "Amber",
        "Cedar",
        "Cinnamon"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Artemisia, Juniper into Honey, Lavender, finishing with Tobacco, Oakmoss.",
    "longDescription": "Boss Number One by Hugo Boss is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Artemisia, Juniper, Bergamot, Lemon, creating the first bright and expressive impression. The heart develops through Honey, Lavender, Rose, Jasmine, adding texture and character as the scent settles. In the dry down, Tobacco, Oakmoss, Patchouli, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "boss-selection-hugo-boss-men",
    "name": "Boss Selection",
    "brand": "Hugo Boss",
    "displayName": "Boss Selection by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pink Pepper",
        "Grapefruit",
        "Mandarin Orange",
        "Bergamot"
      ],
      "heart": [
        "Star Anise",
        "Cedar Needles",
        "Geranium"
      ],
      "base": [
        "Musk",
        "Vetiver",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Pink Pepper, Grapefruit into Star Anise, Cedar Needles, finishing with Musk, Vetiver.",
    "longDescription": "Boss Selection by Hugo Boss is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Pink Pepper, Grapefruit, Mandarin Orange, Bergamot, creating the first bright and expressive impression. The heart develops through Star Anise, Cedar Needles, Geranium, adding texture and character as the scent settles. In the dry down, Musk, Vetiver, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bottled-hugo-boss-men",
    "name": "Bottled",
    "brand": "Hugo Boss",
    "displayName": "Bottled by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Apple",
        "Plum",
        "Lemon",
        "Bergamot",
        "Oakmoss",
        "Geranium"
      ],
      "heart": [
        "Cinnamon",
        "Mahogany",
        "Carnation"
      ],
      "base": [
        "Vanilla",
        "Sandalwood",
        "Cedar",
        "Vetiver",
        "Olive Tree"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Apple, Plum into Cinnamon, Mahogany, finishing with Vanilla, Sandalwood.",
    "longDescription": "Bottled by Hugo Boss is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Apple, Plum, Lemon, Bergamot, creating the first bright and expressive impression. The heart develops through Cinnamon, Mahogany, Carnation, adding texture and character as the scent settles. In the dry down, Vanilla, Sandalwood, Cedar, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bottled-intense-hugo-boss-men",
    "name": "Bottled Intense",
    "brand": "Hugo Boss",
    "displayName": "Bottled Intense by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Apple",
        "Orange Blossom"
      ],
      "heart": [
        "Cinnamon",
        "Cloves",
        "Geranium",
        "Lavender",
        "Cardamom"
      ],
      "base": [
        "Vanilla",
        "Sandalwood",
        "Cedar",
        "Vetiver",
        "Coumarin"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Apple, Orange Blossom into Cinnamon, Cloves, finishing with Vanilla, Sandalwood.",
    "longDescription": "Bottled Intense by Hugo Boss is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Apple, Orange Blossom, creating the first bright and expressive impression. The heart develops through Cinnamon, Cloves, Geranium, Lavender, adding texture and character as the scent settles. In the dry down, Vanilla, Sandalwood, Cedar, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bottled-night-hugo-boss-men",
    "name": "Bottled Night",
    "brand": "Hugo Boss",
    "displayName": "Bottled Night by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Birch"
      ],
      "heart": [
        "Violet"
      ],
      "base": [
        "Woody Notes",
        "Musk"
      ]
    },
    "shortDescription": "A floral and woody fragrance that develops from Lavender, Birch into Violet, finishing with Woody Notes, Musk.",
    "longDescription": "Bottled Night by Hugo Boss is a floral, woody fragrance with a confident masculine character. It opens with Lavender, Birch, creating the first bright and expressive impression. The heart develops through Violet, adding texture and character as the scent settles. In the dry down, Woody Notes, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "hugo-extreme-hugo-boss-men",
    "name": "Hugo Extreme",
    "brand": "Hugo Boss",
    "displayName": "Hugo Extreme by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Green Apple"
      ],
      "heart": [
        "Lavender",
        "Sage",
        "Geranium"
      ],
      "base": [
        "Balsam Fir",
        "Cedar"
      ]
    },
    "shortDescription": "A woody fragrance that develops from Green Apple into Lavender, Sage, finishing with Balsam Fir, Cedar.",
    "longDescription": "Hugo Extreme by Hugo Boss is a woody fragrance with a confident masculine character. It opens with Green Apple, creating the first bright and expressive impression. The heart develops through Lavender, Sage, Geranium, adding texture and character as the scent settles. In the dry down, Balsam Fir, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "hugo-iced-hugo-boss-men",
    "name": "Hugo Iced",
    "brand": "Hugo Boss",
    "displayName": "Hugo Iced by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mint",
        "Tea"
      ],
      "heart": [
        "Bitter Orange",
        "Juniper"
      ],
      "base": [
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Mint, Tea into Bitter Orange, Juniper, finishing with Vetiver.",
    "longDescription": "Hugo Iced by Hugo Boss is a fresh, woody fragrance with a confident masculine character. It opens with Mint, Tea, creating the first bright and expressive impression. The heart develops through Bitter Orange, Juniper, adding texture and character as the scent settles. In the dry down, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "hugo-reversed-hugo-boss-men",
    "name": "Hugo Reversed",
    "brand": "Hugo Boss",
    "displayName": "Hugo Reversed by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Calabrian Bergamot"
      ],
      "heart": [
        "Rosemary"
      ],
      "base": [
        "Haitian Vetiver"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Grapefruit, Calabrian Bergamot into Rosemary, finishing with Haitian Vetiver.",
    "longDescription": "Hugo Reversed by Hugo Boss is a fresh, floral, woody fragrance with a confident masculine character. It opens with Grapefruit, Calabrian Bergamot, creating the first bright and expressive impression. The heart develops through Rosemary, adding texture and character as the scent settles. In the dry down, Haitian Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-scent-absolute-hugo-boss-men",
    "name": "The Scent Absolute",
    "brand": "Hugo Boss",
    "displayName": "The Scent Absolute by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger"
      ],
      "heart": [
        "Maninka",
        "Mondia Root"
      ],
      "base": [
        "Vetiver"
      ]
    },
    "shortDescription": "A spicy and woody fragrance that develops from Ginger into Maninka, Mondia Root, finishing with Vetiver.",
    "longDescription": "The Scent Absolute by Hugo Boss is a spicy, woody fragrance with a confident masculine character. It opens with Ginger, creating the first bright and expressive impression. The heart develops through Maninka, Mondia Root, adding texture and character as the scent settles. In the dry down, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-scent-absolute-for-her-hugo-boss-women",
    "name": "The Scent Absolute For Her",
    "brand": "Hugo Boss",
    "displayName": "The Scent Absolute For Her by Hugo Boss",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Honeyed Peach"
      ],
      "heart": [
        "Coffee"
      ],
      "base": [
        "Vanilla",
        "Vetiver"
      ]
    },
    "shortDescription": "A warm and woody fragrance that develops from Honeyed Peach into Coffee, finishing with Vanilla, Vetiver.",
    "longDescription": "The Scent Absolute For Her by Hugo Boss is a warm, woody fragrance with an elegant feminine character. It opens with Honeyed Peach, creating the first bright and expressive impression. The heart develops through Coffee, adding texture and character as the scent settles. In the dry down, Vanilla, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-scent-private-accord-hugo-boss-men",
    "name": "The Scent Private Accord",
    "brand": "Hugo Boss",
    "displayName": "The Scent Private Accord by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger",
        "Bergamot"
      ],
      "heart": [
        "Maninka",
        "Coffee",
        "Pepper"
      ],
      "base": [
        "Cacao",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Ginger, Bergamot into Maninka, Coffee, finishing with Cacao, Woody Notes.",
    "longDescription": "The Scent Private Accord by Hugo Boss is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Ginger, Bergamot, creating the first bright and expressive impression. The heart develops through Maninka, Coffee, Pepper, adding texture and character as the scent settles. In the dry down, Cacao, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-scent-private-accord-for-her-hugo-boss-women",
    "name": "The Scent Private Accord For Her",
    "brand": "Hugo Boss",
    "displayName": "The Scent Private Accord For Her by Hugo Boss",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mandarin Orange"
      ],
      "heart": [
        "Coffee",
        "Osmanthus"
      ],
      "base": [
        "Cacao",
        "Tonka Bean"
      ]
    },
    "shortDescription": "A fresh and warm fragrance that develops from Mandarin Orange into Coffee, Osmanthus, finishing with Cacao, Tonka Bean.",
    "longDescription": "The Scent Private Accord For Her by Hugo Boss is a fresh, warm fragrance with an elegant feminine character. It opens with Mandarin Orange, creating the first bright and expressive impression. The heart develops through Coffee, Osmanthus, adding texture and character as the scent settles. In the dry down, Cacao, Tonka Bean provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-scent-pure-accord-for-her-hugo-boss-women",
    "name": "The Scent Pure Accord For Her",
    "brand": "Hugo Boss",
    "displayName": "The Scent Pure Accord For Her by Hugo Boss",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot"
      ],
      "heart": [
        "Osmanthus"
      ],
      "base": [
        "Musk"
      ]
    },
    "shortDescription": "A fresh fragrance that develops from Bergamot into Osmanthus, finishing with Musk.",
    "longDescription": "The Scent Pure Accord For Her by Hugo Boss is a fresh fragrance with an elegant feminine character. It opens with Bergamot, creating the first bright and expressive impression. The heart develops through Osmanthus, adding texture and character as the scent settles. In the dry down, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-scent-pure-accord-for-him-hugo-boss-men",
    "name": "The Scent Pure Accord For Him",
    "brand": "Hugo Boss",
    "displayName": "The Scent Pure Accord For Him by Hugo Boss",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger"
      ],
      "heart": [
        "Maninka"
      ],
      "base": [
        "White Suede"
      ]
    },
    "shortDescription": "A spicy fragrance that develops from Ginger into Maninka, finishing with White Suede.",
    "longDescription": "The Scent Pure Accord For Him by Hugo Boss is a spicy fragrance with a confident masculine character. It opens with Ginger, creating the first bright and expressive impression. The heart develops through Maninka, adding texture and character as the scent settles. In the dry down, White Suede provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "l-eau-d-issey-pour-homme-issey-miyake-men",
    "name": "L'Eau d'Issey Pour Homme",
    "brand": "Issey Miyake",
    "displayName": "L'Eau d'Issey Pour Homme by Issey Miyake",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Yuzu",
        "Lemon",
        "Bergamot",
        "Lemon Verbena",
        "Mandarin",
        "Cypress",
        "Calone",
        "Coriander",
        "Tarragon",
        "Sage"
      ],
      "heart": [
        "Blue Lotus",
        "Nutmeg",
        "Lily-of-the-Valley",
        "Bourbon Geranium",
        "Saffron",
        "Cinnamon",
        "Mignonette"
      ],
      "base": [
        "Tahitian Vetiver",
        "Musk",
        "Cedar",
        "Sandalwood",
        "Tobacco",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Yuzu, Lemon into Blue Lotus, Nutmeg, finishing with Tahitian Vetiver, Musk.",
    "longDescription": "L'Eau d'Issey Pour Homme by Issey Miyake is a fresh, aquatic, spicy fragrance with a confident masculine character. It opens with Yuzu, Lemon, Bergamot, Lemon Verbena, creating the first bright and expressive impression. The heart develops through Blue Lotus, Nutmeg, Lily-of-the-Valley, Bourbon Geranium, adding texture and character as the scent settles. In the dry down, Tahitian Vetiver, Musk, Cedar, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "l-eau-d-issey-pour-homme-intense-issey-miyake-men",
    "name": "L'Eau d'Issey Pour Homme Intense",
    "brand": "Issey Miyake",
    "displayName": "L'Eau d'Issey Pour Homme Intense by Issey Miyake",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Yuzu",
        "Bergamot",
        "Orange",
        "Mandarin Orange"
      ],
      "heart": [
        "Nutmeg",
        "Lotus",
        "Cinnamon",
        "Saffron",
        "Cardamom"
      ],
      "base": [
        "Incense",
        "Papyrus",
        "Ambergris",
        "Benzoin",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and deep fragrance that develops from Yuzu, Bergamot into Nutmeg, Lotus, finishing with Incense, Papyrus.",
    "longDescription": "L'Eau d'Issey Pour Homme Intense by Issey Miyake is a fresh, spicy, deep fragrance with a confident masculine character. It opens with Yuzu, Bergamot, Orange, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Nutmeg, Lotus, Cinnamon, Saffron, adding texture and character as the scent settles. In the dry down, Incense, Papyrus, Ambergris, Benzoin provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "l-eau-d-issey-pour-homme-sport-issey-miyake-men",
    "name": "L'Eau D'Issey Pour Homme Sport",
    "brand": "Issey Miyake",
    "displayName": "L'Eau D'Issey Pour Homme Sport by Issey Miyake",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Grapefruit",
        "Bergamot"
      ],
      "heart": [
        "Nutmeg",
        "Leather"
      ],
      "base": [
        "Vetiver",
        "Cedar",
        "Ambergris"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Grapefruit, Bergamot into Nutmeg, Leather, finishing with Vetiver, Cedar.",
    "longDescription": "L'Eau D'Issey Pour Homme Sport by Issey Miyake is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Grapefruit, Bergamot, creating the first bright and expressive impression. The heart develops through Nutmeg, Leather, adding texture and character as the scent settles. In the dry down, Vetiver, Cedar, Ambergris provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "nuit-d-issey-polaris-issey-miyake-men",
    "name": "Nuit D'Issey Polaris",
    "brand": "Issey Miyake",
    "displayName": "Nuit D'Issey Polaris by Issey Miyake",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Pepper",
        "Cypress",
        "Bergamot"
      ],
      "heart": [
        "Agarwood",
        "Patchouli",
        "Cedar"
      ],
      "base": [
        "Leather",
        "Vanilla",
        "Amber",
        "Labdanum"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Black Pepper, Cypress into Agarwood, Patchouli, finishing with Leather, Vanilla.",
    "longDescription": "Nuit D'Issey Polaris by Issey Miyake is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Black Pepper, Cypress, Bergamot, creating the first bright and expressive impression. The heart develops through Agarwood, Patchouli, Cedar, adding texture and character as the scent settles. In the dry down, Leather, Vanilla, Amber, Labdanum provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "le-men-jean-paul-gaultier-men",
    "name": "Le Men",
    "brand": "Jean Paul Gaultier",
    "displayName": "Le Men by Jean Paul Gaultier",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Mint",
        "Cardamom",
        "Bergamot",
        "Artemisia"
      ],
      "heart": [
        "Cinnamon",
        "Orange Blossom",
        "Caraway"
      ],
      "base": [
        "Vanilla",
        "Tonka Bean",
        "Amber",
        "Sandalwood",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Lavender, Mint into Cinnamon, Orange Blossom, finishing with Vanilla, Tonka Bean.",
    "longDescription": "Le Men by Jean Paul Gaultier is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Lavender, Mint, Cardamom, Bergamot, creating the first bright and expressive impression. The heart develops through Cinnamon, Orange Blossom, Caraway, adding texture and character as the scent settles. In the dry down, Vanilla, Tonka Bean, Amber, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "man-ice-jimmy-choo-men",
    "name": "Man Ice",
    "brand": "Jimmy Choo",
    "displayName": "Man Ice by Jimmy Choo",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Citron",
        "Bergamot",
        "Mandarin Orange"
      ],
      "heart": [
        "Vetiver",
        "Patchouli",
        "Cedar",
        "Apple"
      ],
      "base": [
        "Musk",
        "Moss",
        "Ambroxan"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Citron, Bergamot into Vetiver, Patchouli, finishing with Musk, Moss.",
    "longDescription": "Man Ice by Jimmy Choo is a fresh, woody fragrance with a confident masculine character. It opens with Citron, Bergamot, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Vetiver, Patchouli, Cedar, Apple, adding texture and character as the scent settles. In the dry down, Musk, Moss, Ambroxan provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "man-intense-jimmy-choo-men",
    "name": "Man Intense",
    "brand": "Jimmy Choo",
    "displayName": "Man Intense by Jimmy Choo",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Melon",
        "Mandarin Orange"
      ],
      "heart": [
        "Black Pepper",
        "Artemisia",
        "Geranium"
      ],
      "base": [
        "Tonka Bean",
        "Patchouli",
        "Labdanum"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Lavender, Melon into Black Pepper, Artemisia, finishing with Tonka Bean, Patchouli.",
    "longDescription": "Man Intense by Jimmy Choo is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Lavender, Melon, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Black Pepper, Artemisia, Geranium, adding texture and character as the scent settles. In the dry down, Tonka Bean, Patchouli, Labdanum provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "baccarat-rouge-540-maison-francis-kurkdjian-unisex",
    "name": "Baccarat Rouge 540",
    "brand": "Maison Francis Kurkdjian",
    "displayName": "Baccarat Rouge 540 by Maison Francis Kurkdjian",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Saffron",
        "Jasmine"
      ],
      "heart": [
        "Amberwood",
        "Ambergris"
      ],
      "base": [
        "Fir Resin",
        "Cedar"
      ]
    },
    "shortDescription": "A spicy, floral, and woody fragrance that develops from Saffron, Jasmine into Amberwood, Ambergris, finishing with Fir Resin, Cedar.",
    "longDescription": "Baccarat Rouge 540 by Maison Francis Kurkdjian is a spicy, floral, woody fragrance with a versatile, genderless character. It opens with Saffron, Jasmine, creating the first bright and expressive impression. The heart develops through Amberwood, Ambergris, adding texture and character as the scent settles. In the dry down, Fir Resin, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "irish-leather-memo-paris-unisex",
    "name": "Irish Leather",
    "brand": "Memo Paris",
    "displayName": "Irish Leather by Memo Paris",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Juniper Berries",
        "Pink Pepper",
        "Clary Sage"
      ],
      "heart": [
        "Mate",
        "Orris"
      ],
      "base": [
        "Leather",
        "Birch",
        "Amber"
      ]
    },
    "shortDescription": "A spicy and deep fragrance that develops from Juniper Berries, Pink Pepper into Mate, Orris, finishing with Leather, Birch.",
    "longDescription": "Irish Leather by Memo Paris is a spicy, deep fragrance with a versatile, genderless character. It opens with Juniper Berries, Pink Pepper, Clary Sage, creating the first bright and expressive impression. The heart develops through Mate, Orris, adding texture and character as the scent settles. In the dry down, Leather, Birch, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "star-walker-mont-blanc-men",
    "name": "Star Walker",
    "brand": "Mont Blanc",
    "displayName": "Star Walker by Mont Blanc",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bamboo",
        "Bergamot",
        "Mandarin Orange"
      ],
      "heart": [
        "Sandalwood",
        "White Musk",
        "Cedar"
      ],
      "base": [
        "Ginger",
        "Fir Resin",
        "Nutmeg",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Bamboo, Bergamot into Sandalwood, White Musk, finishing with Ginger, Fir Resin.",
    "longDescription": "Star Walker by Mont Blanc is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Bamboo, Bergamot, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Sandalwood, White Musk, Cedar, adding texture and character as the scent settles. In the dry down, Ginger, Fir Resin, Nutmeg, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "voyage-nautica-men",
    "name": "Voyage",
    "brand": "Nautica",
    "displayName": "Voyage by Nautica",
    "category": "Men",
    "price": 1800,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Green leaves",
        "Apple"
      ],
      "heart": [
        "Lotus",
        "Mimosa"
      ],
      "base": [
        "Cedarwood",
        "Amber",
        "Musk",
        "Oakmoss"
      ]
    },
    "shortDescription": "A woody fragrance that develops from Green leaves, Apple into Lotus, Mimosa, finishing with Cedarwood, Amber.",
    "longDescription": "Voyage by Nautica is an airy, aquatic fragrance that brings to mind a crisp ocean breeze and fresh green foliage. Its opening hits you with bright green leaves and juicy apple — light, clean, and instantly refreshing. At its heart, there’s a soft floral touch from lotus and mimosa, lending a slightly dewy, watery elegance. In the dry down, warm woods, amber, musk and oakmoss settle in, giving it depth and a gentle, masculine finish.\n\nPerfect for:\n\nDaytime wear, especially in warmer weather\nCasual settings, work, or outings when you want to smell fresh without being too loud\nAnyone who likes clean, aquatic scents with a fruit-floral twist but lasting warmth",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "1-milion-prive-paco-rabanne-men",
    "name": "1 Milion Prive",
    "brand": "Paco Rabanne",
    "displayName": "1 Milion Prive by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cinnamon",
        "Blood Mandarin"
      ],
      "heart": [
        "Tobacco",
        "Myrrh"
      ],
      "base": [
        "Tonka Bean",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Cinnamon, Blood Mandarin into Tobacco, Myrrh, finishing with Tonka Bean, Patchouli.",
    "longDescription": "1 Milion Prive by Paco Rabanne is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Cinnamon, Blood Mandarin, creating the first bright and expressive impression. The heart develops through Tobacco, Myrrh, adding texture and character as the scent settles. In the dry down, Tonka Bean, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "1-million-paco-rabanne-men",
    "name": "1 Million $",
    "brand": "Paco Rabanne",
    "displayName": "1 Million $ by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Blood Mandarin",
        "Grapefruit",
        "Mint"
      ],
      "heart": [
        "Cinnamon",
        "Rose"
      ],
      "base": [
        "Amber",
        "Leather",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Blood Mandarin, Grapefruit into Cinnamon, Rose, finishing with Amber, Leather.",
    "longDescription": "1 Million $ by Paco Rabanne is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Blood Mandarin, Grapefruit, Mint, creating the first bright and expressive impression. The heart develops through Cinnamon, Rose, adding texture and character as the scent settles. In the dry down, Amber, Leather, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "1-million-intense-paco-rabanne-men",
    "name": "1 Million Intense",
    "brand": "Paco Rabanne",
    "displayName": "1 Million Intense by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Blood Mandarin",
        "Cardamom",
        "Black Pepper",
        "Saffron"
      ],
      "heart": [
        "Rose",
        "Cinnamon",
        "Neroli"
      ],
      "base": [
        "Leather",
        "Sandalwood",
        "Patchouli",
        "Orris Root"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Blood Mandarin, Cardamom into Rose, Cinnamon, finishing with Leather, Sandalwood.",
    "longDescription": "1 Million Intense by Paco Rabanne is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Blood Mandarin, Cardamom, Black Pepper, Saffron, creating the first bright and expressive impression. The heart develops through Rose, Cinnamon, Neroli, adding texture and character as the scent settles. In the dry down, Leather, Sandalwood, Patchouli, Orris Root provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "1-million-lucky-paco-rabanne-men",
    "name": "1 Million Lucky",
    "brand": "Paco Rabanne",
    "displayName": "1 Million Lucky by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Plum",
        "Grapefruit",
        "Bergamot"
      ],
      "heart": [
        "Hazelnut",
        "Honey",
        "Cedar",
        "Cashmere Wood",
        "Orange Blossom",
        "Jasmine"
      ],
      "base": [
        "Amberwood",
        "Patchouli",
        "Vetiver",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Plum, Grapefruit into Hazelnut, Honey, finishing with Amberwood, Patchouli.",
    "longDescription": "1 Million Lucky by Paco Rabanne is a fresh, floral, warm fragrance with a confident masculine character. It opens with Plum, Grapefruit, Bergamot, creating the first bright and expressive impression. The heart develops through Hazelnut, Honey, Cedar, Cashmere Wood, adding texture and character as the scent settles. In the dry down, Amberwood, Patchouli, Vetiver, Oakmoss provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "invictus-paco-rabanne-men",
    "name": "Invictus",
    "brand": "Paco Rabanne",
    "displayName": "Invictus by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Notes",
        "Grapefruit",
        "Mandarin Orange"
      ],
      "heart": [
        "Bay Leaf",
        "Jasmine"
      ],
      "base": [
        "Ambergris",
        "Guaiac Wood",
        "Oakmoss",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Sea Notes, Grapefruit into Bay Leaf, Jasmine, finishing with Ambergris, Guaiac Wood.",
    "longDescription": "Invictus by Paco Rabanne is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Sea Notes, Grapefruit, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Bay Leaf, Jasmine, adding texture and character as the scent settles. In the dry down, Ambergris, Guaiac Wood, Oakmoss, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "invictus-legend-paco-rabanne-men",
    "name": "Invictus Legend",
    "brand": "Paco Rabanne",
    "displayName": "Invictus Legend by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Sea Salt",
        "Grapefruit",
        "Sea Notes"
      ],
      "heart": [
        "Bay Leaf",
        "Geranium",
        "Spices"
      ],
      "base": [
        "Red Amber",
        "Guaiac Wood"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Sea Salt, Grapefruit into Bay Leaf, Geranium, finishing with Red Amber, Guaiac Wood.",
    "longDescription": "Invictus Legend by Paco Rabanne is a fresh, aquatic, spicy fragrance with a confident masculine character. It opens with Sea Salt, Grapefruit, Sea Notes, creating the first bright and expressive impression. The heart develops through Bay Leaf, Geranium, Spices, adding texture and character as the scent settles. In the dry down, Red Amber, Guaiac Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "paco-rabanne-pour-homme-paco-rabanne-men",
    "name": "Paco Rabanne Pour Homme",
    "brand": "Paco Rabanne",
    "displayName": "Paco Rabanne Pour Homme by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Rosemary",
        "Clary Sage",
        "Brazilian Rosewood"
      ],
      "heart": [
        "Lavender",
        "Geranium",
        "Tonka Bean"
      ],
      "base": [
        "Oakmoss",
        "Honey",
        "Musk",
        "Amber",
        "Tobacco"
      ]
    },
    "shortDescription": "A floral, warm, and woody fragrance that develops from Rosemary, Clary Sage into Lavender, Geranium, finishing with Oakmoss, Honey.",
    "longDescription": "Paco Rabanne Pour Homme by Paco Rabanne is a floral, warm, woody fragrance with a confident masculine character. It opens with Rosemary, Clary Sage, Brazilian Rosewood, creating the first bright and expressive impression. The heart develops through Lavender, Geranium, Tonka Bean, adding texture and character as the scent settles. In the dry down, Oakmoss, Honey, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "paco-rabanne-pure-xs-paco-rabanne-men",
    "name": "Paco Rabanne Pure XS",
    "brand": "Paco Rabanne",
    "displayName": "Paco Rabanne Pure XS by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger",
        "Thyme",
        "Grapefruit",
        "Bergamot",
        "Green Accord"
      ],
      "heart": [
        "Vanilla",
        "Liquor",
        "Cinnamon",
        "Leather",
        "Apple"
      ],
      "base": [
        "Myrrh",
        "Sugar",
        "Cedar",
        "Cashmeran",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Ginger, Thyme into Vanilla, Liquor, finishing with Myrrh, Sugar.",
    "longDescription": "Paco Rabanne Pure XS by Paco Rabanne is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Ginger, Thyme, Grapefruit, Bergamot, creating the first bright and expressive impression. The heart develops through Vanilla, Liquor, Cinnamon, Leather, adding texture and character as the scent settles. In the dry down, Myrrh, Sugar, Cedar, Cashmeran provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "paco-rabanne-pure-xs-for-her-paco-rabanne-women",
    "name": "Paco Rabanne Pure XS For Her",
    "brand": "Paco Rabanne",
    "displayName": "Paco Rabanne Pure XS For Her by Paco Rabanne",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ylang-Ylang",
        "Bergamot",
        "Pink Pepper"
      ],
      "heart": [
        "Popcorn",
        "Vanilla",
        "Orange Blossom"
      ],
      "base": [
        "Coconut",
        "Sandalwood",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Ylang-Ylang, Bergamot into Popcorn, Vanilla, finishing with Coconut, Sandalwood.",
    "longDescription": "Paco Rabanne Pure XS For Her by Paco Rabanne is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Ylang-Ylang, Bergamot, Pink Pepper, creating the first bright and expressive impression. The heart develops through Popcorn, Vanilla, Orange Blossom, adding texture and character as the scent settles. In the dry down, Coconut, Sandalwood, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "paco-rabanne-pure-xs-night-paco-rabanne-men",
    "name": "Paco Rabanne Pure XS Night",
    "brand": "Paco Rabanne",
    "displayName": "Paco Rabanne Pure XS Night by Paco Rabanne",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginseng",
        "Ginger"
      ],
      "heart": [
        "Cacao",
        "Vanilla",
        "Cinnamon"
      ],
      "base": [
        "Caramel",
        "Myrrh"
      ]
    },
    "shortDescription": "A spicy, warm, and deep fragrance that develops from Ginseng, Ginger into Cacao, Vanilla, finishing with Caramel, Myrrh.",
    "longDescription": "Paco Rabanne Pure XS Night by Paco Rabanne is a spicy, warm, deep fragrance with a confident masculine character. It opens with Ginseng, Ginger, creating the first bright and expressive impression. The heart develops through Cacao, Vanilla, Cinnamon, adding texture and character as the scent settles. In the dry down, Caramel, Myrrh provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, warm, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "polo-ralph-lauren-men",
    "name": "Polo",
    "brand": "RALPH LAUREN",
    "displayName": "Polo by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Juniper Berries",
        "Basil",
        "Artemisia",
        "Caraway",
        "Coriander",
        "Bergamot"
      ],
      "heart": [
        "Pine Tree Needles",
        "Leather",
        "Chamomile",
        "Pepper",
        "Carnation",
        "Geranium",
        "Jasmine",
        "Rose"
      ],
      "base": [
        "Tobacco",
        "Oakmoss",
        "Patchouli",
        "Cedar",
        "Vetiver",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Juniper Berries, Basil into Pine Tree Needles, Leather, finishing with Tobacco, Oakmoss.",
    "longDescription": "Polo by RALPH LAUREN is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Juniper Berries, Basil, Artemisia, Caraway, creating the first bright and expressive impression. The heart develops through Pine Tree Needles, Leather, Chamomile, Pepper, adding texture and character as the scent settles. In the dry down, Tobacco, Oakmoss, Patchouli, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "polo-black-ralph-lauren-men",
    "name": "Polo Black",
    "brand": "RALPH LAUREN",
    "displayName": "Polo Black by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mango",
        "Sandalwood",
        "Tangerine"
      ],
      "heart": [
        "Patchouli",
        "Tonka Bean"
      ],
      "base": [
        "Woody Notes",
        "Sage",
        "Lemon"
      ]
    },
    "shortDescription": "A fresh, warm, and woody fragrance that develops from Mango, Sandalwood into Patchouli, Tonka Bean, finishing with Woody Notes, Sage.",
    "longDescription": "Polo Black by RALPH LAUREN is a fresh, warm, woody fragrance with a confident masculine character. It opens with Mango, Sandalwood, Tangerine, creating the first bright and expressive impression. The heart develops through Patchouli, Tonka Bean, adding texture and character as the scent settles. In the dry down, Woody Notes, Sage, Lemon provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "polo-blue-ralph-lauren-men",
    "name": "Polo Blue",
    "brand": "RALPH LAUREN",
    "displayName": "Polo Blue by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cucumber",
        "Melon",
        "Mandarin Orange"
      ],
      "heart": [
        "Basil",
        "Sage",
        "Geranium",
        "Suede"
      ],
      "base": [
        "Woodsy Notes",
        "Musk",
        "Vetiver",
        "Oakmoss",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Cucumber, Melon into Basil, Sage, finishing with Woodsy Notes, Musk.",
    "longDescription": "Polo Blue by RALPH LAUREN is a fresh, woody fragrance with a confident masculine character. It opens with Cucumber, Melon, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Basil, Sage, Geranium, Suede, adding texture and character as the scent settles. In the dry down, Woodsy Notes, Musk, Vetiver, Oakmoss provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "polo-deep-blue-ralph-lauren-men",
    "name": "Polo Deep Blue",
    "brand": "RALPH LAUREN",
    "displayName": "Polo Deep Blue by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Green Mango",
        "Grapefruit",
        "Bergamot"
      ],
      "heart": [
        "Cypress",
        "Clary Sage",
        "Geranium"
      ],
      "base": [
        "Sea Notes",
        "Ambroxan",
        "Fir Resin",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, aquatic, and woody fragrance that develops from Green Mango, Grapefruit into Cypress, Clary Sage, finishing with Sea Notes, Ambroxan.",
    "longDescription": "Polo Deep Blue by RALPH LAUREN is a fresh, aquatic, woody fragrance with a confident masculine character. It opens with Green Mango, Grapefruit, Bergamot, creating the first bright and expressive impression. The heart develops through Cypress, Clary Sage, Geranium, adding texture and character as the scent settles. In the dry down, Sea Notes, Ambroxan, Fir Resin, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "polo-double-black-ralph-lauren-men",
    "name": "Polo Double Black",
    "brand": "RALPH LAUREN",
    "displayName": "Polo Double Black by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mango",
        "Pepper"
      ],
      "heart": [
        "Roasted Coffee Beans",
        "Indonesian Nutmeg"
      ],
      "base": [
        "Woody Notes",
        "Cardamom",
        "Juniper Berries"
      ]
    },
    "shortDescription": "A spicy, warm, and woody fragrance that develops from Mango, Pepper into Roasted Coffee Beans, Indonesian Nutmeg, finishing with Woody Notes, Cardamom.",
    "longDescription": "Polo Double Black by RALPH LAUREN is a spicy, warm, woody fragrance with a confident masculine character. It opens with Mango, Pepper, creating the first bright and expressive impression. The heart develops through Roasted Coffee Beans, Indonesian Nutmeg, adding texture and character as the scent settles. In the dry down, Woody Notes, Cardamom, Juniper Berries provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "polo-supreme-oud-ralph-lauren-men",
    "name": "POLO SUPREME OUD",
    "brand": "RALPH LAUREN",
    "displayName": "POLO SUPREME OUD by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cinnamon",
        "Pink Pepper"
      ],
      "heart": [
        "Agarwood"
      ],
      "base": [
        "Guaiac Wood",
        "Vetiver"
      ]
    },
    "shortDescription": "A spicy and woody fragrance that develops from Cinnamon, Pink Pepper into Agarwood, finishing with Guaiac Wood, Vetiver.",
    "longDescription": "POLO SUPREME OUD by RALPH LAUREN is a spicy, woody fragrance with a confident masculine character. It opens with Cinnamon, Pink Pepper, creating the first bright and expressive impression. The heart develops through Agarwood, adding texture and character as the scent settles. In the dry down, Guaiac Wood, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ralph-lauren-women-ralph-lauren-women",
    "name": "Ralph Lauren Women",
    "brand": "RALPH LAUREN",
    "displayName": "Ralph Lauren Women by RALPH LAUREN",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pear",
        "Rhubarb",
        "Black Currant"
      ],
      "heart": [
        "Tuberose",
        "Orange Blossom",
        "Turkish Rose"
      ],
      "base": [
        "Hazelnut",
        "Sandalwood",
        "Woody Notes"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Pear, Rhubarb into Tuberose, Orange Blossom, finishing with Hazelnut, Sandalwood.",
    "longDescription": "Ralph Lauren Women by RALPH LAUREN is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Pear, Rhubarb, Black Currant, creating the first bright and expressive impression. The heart develops through Tuberose, Orange Blossom, Turkish Rose, adding texture and character as the scent settles. In the dry down, Hazelnut, Sandalwood, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "safari-for-men-ralph-lauren-men",
    "name": "Safari For Men",
    "brand": "RALPH LAUREN",
    "displayName": "Safari For Men by RALPH LAUREN",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender",
        "Bergamot",
        "Aldehydes",
        "Coriander",
        "Green Notes",
        "Artemisia",
        "Neroli",
        "Lemon"
      ],
      "heart": [
        "Carnation",
        "Cinnamon",
        "Tarragon",
        "Jasmine",
        "Rose"
      ],
      "base": [
        "Leather",
        "Oakmoss",
        "Sandalwood",
        "Musk",
        "Patchouli",
        "Cedar",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Lavender, Bergamot into Carnation, Cinnamon, finishing with Leather, Oakmoss.",
    "longDescription": "Safari For Men by RALPH LAUREN is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Lavender, Bergamot, Aldehydes, Coriander, creating the first bright and expressive impression. The heart develops through Carnation, Cinnamon, Tarragon, Jasmine, adding texture and character as the scent settles. In the dry down, Leather, Oakmoss, Sandalwood, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "safari-for-women-ralph-lauren-women",
    "name": "Safari For Women",
    "brand": "RALPH LAUREN",
    "displayName": "Safari For Women by RALPH LAUREN",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Galbanum",
        "Hyacinth",
        "Mandarin Orange",
        "Narcissus",
        "Aldehydes",
        "Black Currant",
        "Cassis"
      ],
      "heart": [
        "Iris",
        "Orris Root",
        "Jasmine",
        "Lily-of-the-Valley",
        "Rose"
      ],
      "base": [
        "Oakmoss",
        "Vetiver",
        "Sandalwood",
        "Amber",
        "Musk",
        "Cedar"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Galbanum, Hyacinth into Iris, Orris Root, finishing with Oakmoss, Vetiver.",
    "longDescription": "Safari For Women by RALPH LAUREN is a fresh, floral, woody fragrance with an elegant feminine character. It opens with Galbanum, Hyacinth, Mandarin Orange, Narcissus, creating the first bright and expressive impression. The heart develops through Iris, Orris Root, Jasmine, Lily-of-the-Valley, adding texture and character as the scent settles. In the dry down, Oakmoss, Vetiver, Sandalwood, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "cigar-remy-latour-men",
    "name": "Cigar",
    "brand": "Remy Latour",
    "displayName": "Cigar by Remy Latour",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Plum",
        "Pineapple",
        "Bergamot",
        "Amalfi Lemon",
        "Pear"
      ],
      "heart": [
        "Bay Leaf",
        "Marigold",
        "Geranium",
        "Jasmine"
      ],
      "base": [
        "Tobacco",
        "Patchouli",
        "Sandalwood",
        "Cedar",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Plum, Pineapple into Bay Leaf, Marigold, finishing with Tobacco, Patchouli.",
    "longDescription": "Cigar by Remy Latour is a fresh, floral, woody fragrance with a confident masculine character. It opens with Plum, Pineapple, Bergamot, Amalfi Lemon, creating the first bright and expressive impression. The heart develops through Bay Leaf, Marigold, Geranium, Jasmine, adding texture and character as the scent settles. In the dry down, Tobacco, Patchouli, Sandalwood, Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "acqua-essenziale-blu-salvatore-ferragamo-men",
    "name": "Acqua Essenziale Blu",
    "brand": "Salvatore Ferragamo",
    "displayName": "Acqua Essenziale Blu by Salvatore Ferragamo",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cardamom",
        "Calabrian Bergamot",
        "Lemon"
      ],
      "heart": [
        "Lavender",
        "Cedar",
        "Cypriol"
      ],
      "base": [
        "Tonka Bean",
        "Ambroxan",
        "Benzoin",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Cardamom, Calabrian Bergamot into Lavender, Cedar, finishing with Tonka Bean, Ambroxan.",
    "longDescription": "Acqua Essenziale Blu by Salvatore Ferragamo is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Cardamom, Calabrian Bergamot, Lemon, creating the first bright and expressive impression. The heart develops through Lavender, Cedar, Cypriol, adding texture and character as the scent settles. In the dry down, Tonka Bean, Ambroxan, Benzoin, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "uomo-urban-feel-salvatore-ferragamo-men",
    "name": "Uomo Urban Feel",
    "brand": "Salvatore Ferragamo",
    "displayName": "Uomo Urban Feel by Salvatore Ferragamo",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Clary Sage",
        "Bergamot",
        "Ozone",
        "Coffee"
      ],
      "heart": [
        "Cumin",
        "Driftwood",
        "Cedar"
      ],
      "base": [
        "Ambroxan",
        "Labdanum",
        "Patchouli",
        "Incense"
      ]
    },
    "shortDescription": "A fresh, aquatic, and warm fragrance that develops from Clary Sage, Bergamot into Cumin, Driftwood, finishing with Ambroxan, Labdanum.",
    "longDescription": "Uomo Urban Feel by Salvatore Ferragamo is a fresh, aquatic, warm fragrance with a confident masculine character. It opens with Clary Sage, Bergamot, Ozone, Coffee, creating the first bright and expressive impression. The heart develops through Cumin, Driftwood, Cedar, adding texture and character as the scent settles. In the dry down, Ambroxan, Labdanum, Patchouli, Incense provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, aquatic, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "black-orchid-tom-ford-women",
    "name": "Black Orchid",
    "brand": "Tom Ford",
    "displayName": "Black Orchid by Tom Ford",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Truffle",
        "Ylang-Ylang",
        "Bergamot",
        "Black Currant"
      ],
      "heart": [
        "Black Orchid Accord",
        "Lotus Wood",
        "Dark Florals"
      ],
      "base": [
        "Patchouli",
        "Sandalwood",
        "Vanilla",
        "Incense",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Black Truffle, Ylang-Ylang into Black Orchid Accord, Lotus Wood, finishing with Patchouli, Sandalwood.",
    "longDescription": "Black Orchid is a bold, opulent fragrance from Tom Ford that blends rich dark florals and woods with luxe accords. It opens with black truffle, ylang-ylang, bergamot and black currant, moves into a heart of black orchid, lotus wood and dark floral tones, then dries down to patchouli, sandalwood, vanilla, incense and vetiver.\n\nPerfect for:\n\nSpecial occasions, night wear, or when you want to make a memorable statement\nFormal dinners, upscale events, or elegant evenings out\nAnyone who enjoys dark florals, rich woods and a fragrance with presence and luxury",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "black-orchid-parfum-tom-ford-unisex",
    "name": "Black Orchid Parfum",
    "brand": "Tom Ford",
    "displayName": "Black Orchid Parfum by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Truffle",
        "Plum"
      ],
      "heart": [
        "Rum",
        "Ylang-Ylang",
        "Black Orchid"
      ],
      "base": [
        "Patchouli"
      ]
    },
    "shortDescription": "A floral, woody, and deep fragrance that develops from Truffle, Plum into Rum, Ylang-Ylang, finishing with Patchouli.",
    "longDescription": "Black Orchid Parfum by Tom Ford is a floral, woody, deep fragrance with a versatile, genderless character. It opens with Truffle, Plum, creating the first bright and expressive impression. The heart develops through Rum, Ylang-Ylang, Black Orchid, adding texture and character as the scent settles. In the dry down, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "metallique-tom-ford-women",
    "name": "Metallique",
    "brand": "Tom Ford",
    "displayName": "Metallique by Tom Ford",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Aldehydes",
        "Pink Pepper",
        "Bergamot"
      ],
      "heart": [
        "Heliotrope",
        "Lily-of-the-Valley",
        "Hawthorn"
      ],
      "base": [
        "Vanilla",
        "Ambrette",
        "Peru Balsam",
        "Sandalwood"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Aldehydes, Pink Pepper into Heliotrope, Lily-of-the-Valley, finishing with Vanilla, Ambrette.",
    "longDescription": "Metallique by Tom Ford is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Aldehydes, Pink Pepper, Bergamot, creating the first bright and expressive impression. The heart develops through Heliotrope, Lily-of-the-Valley, Hawthorn, adding texture and character as the scent settles. In the dry down, Vanilla, Ambrette, Peru Balsam, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "neroli-portofino-tom-ford-unisex",
    "name": "Neroli Portofino",
    "brand": "Tom Ford",
    "displayName": "Neroli Portofino by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Mandarin Orange",
        "Lemon",
        "Bitter Orange",
        "Lavender",
        "Rosemary",
        "Myrtle"
      ],
      "heart": [
        "African Orange Flower",
        "Neroli",
        "Jasmine",
        "Pitosporum"
      ],
      "base": [
        "Amber",
        "Ambrette",
        "Angelica"
      ]
    },
    "shortDescription": "A fresh, floral, and deep fragrance that develops from Bergamot, Mandarin Orange into African Orange Flower, Neroli, finishing with Amber, Ambrette.",
    "longDescription": "Neroli Portofino by Tom Ford is a fresh, floral, deep fragrance with a versatile, genderless character. It opens with Bergamot, Mandarin Orange, Lemon, Bitter Orange, creating the first bright and expressive impression. The heart develops through African Orange Flower, Neroli, Jasmine, Pitosporum, adding texture and character as the scent settles. In the dry down, Amber, Ambrette, Angelica provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "noir-tom-ford-men",
    "name": "Noir",
    "brand": "Tom Ford",
    "displayName": "Noir by Tom Ford",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Violet",
        "Pink Pepper",
        "Caraway",
        "Bergamot",
        "Verbena"
      ],
      "heart": [
        "Tuscan Iris",
        "Bulgarian Rose",
        "Black Pepper",
        "Nutmeg",
        "Geranium",
        "Clary Sage"
      ],
      "base": [
        "Indonesian Patchouli",
        "Amber",
        "Vanilla",
        "Civet",
        "Leather",
        "Opoponax",
        "Benzoin",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Violet, Pink Pepper into Tuscan Iris, Bulgarian Rose, finishing with Indonesian Patchouli, Amber.",
    "longDescription": "Noir by Tom Ford is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Violet, Pink Pepper, Caraway, Bergamot, creating the first bright and expressive impression. The heart develops through Tuscan Iris, Bulgarian Rose, Black Pepper, Nutmeg, adding texture and character as the scent settles. In the dry down, Indonesian Patchouli, Amber, Vanilla, Civet provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "noir-extreme-tom-ford-men",
    "name": "Noir Extreme",
    "brand": "Tom Ford",
    "displayName": "Noir Extreme by Tom Ford",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cardamom",
        "Nutmeg",
        "Saffron",
        "Mandarin Orange",
        "Neroli"
      ],
      "heart": [
        "Kulfi",
        "Rose",
        "Mastic",
        "Orange Blossom",
        "Jasmine"
      ],
      "base": [
        "Vanilla",
        "Amber",
        "Woody Notes",
        "Sandalwood"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Cardamom, Nutmeg into Kulfi, Rose, finishing with Vanilla, Amber.",
    "longDescription": "Noir Extreme by Tom Ford is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Cardamom, Nutmeg, Saffron, Mandarin Orange, creating the first bright and expressive impression. The heart develops through Kulfi, Rose, Mastic, Orange Blossom, adding texture and character as the scent settles. In the dry down, Vanilla, Amber, Woody Notes, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "ombre-leather-tom-ford-unisex",
    "name": "Ombre Leather",
    "brand": "Tom Ford",
    "displayName": "Ombre Leather by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cardamom"
      ],
      "heart": [
        "Leather",
        "Jasmine Sambac"
      ],
      "base": [
        "Amber",
        "Moss",
        "Patchouli"
      ]
    },
    "shortDescription": "A spicy, floral, and woody fragrance that develops from Cardamom into Leather, Jasmine Sambac, finishing with Amber, Moss.",
    "longDescription": "Ombre Leather by Tom Ford is a spicy, floral, woody fragrance with a versatile, genderless character. It opens with Cardamom, creating the first bright and expressive impression. The heart develops through Leather, Jasmine Sambac, adding texture and character as the scent settles. In the dry down, Amber, Moss, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "oud-wood-tom-ford-unisex",
    "name": "Oud Wood",
    "brand": "Tom Ford",
    "displayName": "Oud Wood by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pepper",
        "Cardamom",
        "Rosewood"
      ],
      "heart": [
        "Oud (Agarwood)",
        "Sandalwood",
        "Vetiver"
      ],
      "base": [
        "Amber",
        "Tonka Bean",
        "Vanilla"
      ]
    },
    "shortDescription": "A spicy, floral, and warm fragrance that develops from Pepper, Cardamom into Oud (Agarwood), Sandalwood, finishing with Amber, Tonka Bean.",
    "longDescription": "Oud Wood by Tom Ford is a luxurious woody-oriental scent that exudes warmth and mystery. It begins with spicy accents of cardamom and pink pepper, moves into a smoky heart dominated by rare oud, sandalwood, and vetiver, then settles into a deep base of amber, tonka bean, and vanilla.\n\nPerfect for:\n\nEvening wear or cooler weather\nFormal occasions or when you want to make a statement\nThose who appreciate rich, smoky woods and a touch of sweetness",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "oud-wood-intense-tom-ford-unisex",
    "name": "Oud Wood Intense",
    "brand": "Tom Ford",
    "displayName": "Oud Wood Intense by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Angelica",
        "Cypress"
      ],
      "heart": [
        "Ginger",
        "Castoreum"
      ],
      "base": [
        "Agarwood",
        "Juniper"
      ]
    },
    "shortDescription": "A spicy and woody fragrance that develops from Angelica, Cypress into Ginger, Castoreum, finishing with Agarwood, Juniper.",
    "longDescription": "Oud Wood Intense by Tom Ford is a spicy, woody fragrance with a versatile, genderless character. It opens with Angelica, Cypress, creating the first bright and expressive impression. The heart develops through Ginger, Castoreum, adding texture and character as the scent settles. In the dry down, Agarwood, Juniper provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "tobacco-oud-tom-ford-unisex",
    "name": "Tobacco Oud",
    "brand": "Tom Ford",
    "displayName": "Tobacco Oud by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Whiskey"
      ],
      "heart": [
        "Cinnamon",
        "Coriander",
        "Spicy Notes"
      ],
      "base": [
        "Tobacco",
        "Agarwood",
        "Incense",
        "Sandalwood",
        "Patchouli",
        "Benzoin",
        "Vanilla",
        "Cedar"
      ]
    },
    "shortDescription": "A spicy, warm, and woody fragrance that develops from Whiskey into Cinnamon, Coriander, finishing with Tobacco, Agarwood.",
    "longDescription": "Tobacco Oud by Tom Ford is a spicy, warm, woody fragrance with a versatile, genderless character. It opens with Whiskey, creating the first bright and expressive impression. The heart develops through Cinnamon, Coriander, Spicy Notes, adding texture and character as the scent settles. In the dry down, Tobacco, Agarwood, Incense, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "tobacco-vanille-tom-ford-unisex",
    "name": "Tobacco Vanille",
    "brand": "Tom Ford",
    "displayName": "Tobacco Vanille by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Tobacco Leaf",
        "Spicy Notes"
      ],
      "heart": [
        "Vanilla",
        "Cacao",
        "Tonka Bean",
        "Tobacco Blossom"
      ],
      "base": [
        "Dried Fruits",
        "Woody Notes"
      ]
    },
    "shortDescription": "A warm, woody, and deep fragrance that develops from Tobacco Leaf, Spicy Notes into Vanilla, Cacao, finishing with Dried Fruits, Woody Notes.",
    "longDescription": "Tobacco Vanille feels like stepping into a richly appointed club room: warm, spicy tobacco leaf mingles with creamy vanilla and soft accents of cocoa and tonka bean. The middle adds tobacco blossom and dried fruit undertones, then it settles into woods and deep sweet spice for a luxurious, opulent dry down.\n\nPerfect for:\n\nCool evenings or winters\nSpecial occasions or times you want to feel extra cozy and rich\nThose who love sweet-oriental gourmands with tobacco and vanilla",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "tom-ford-for-men-tom-ford-men",
    "name": "Tom Ford For Men",
    "brand": "Tom Ford",
    "displayName": "Tom Ford For Men by Tom Ford",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger",
        "Mandarin Orange",
        "Lemon Leaf",
        "Bergamot",
        "Basil",
        "Violet Leaf"
      ],
      "heart": [
        "Tobacco Leaf",
        "Tunisian Orange Blossom",
        "Pepper",
        "Grapefruit Blossom"
      ],
      "base": [
        "Amber",
        "Cedar",
        "Patchouli",
        "Vetiver",
        "Oakmoss",
        "Leather",
        "Cypriol"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Ginger, Mandarin Orange into Tobacco Leaf, Tunisian Orange Blossom, finishing with Amber, Cedar.",
    "longDescription": "Tom Ford For Men by Tom Ford is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Ginger, Mandarin Orange, Lemon Leaf, Bergamot, creating the first bright and expressive impression. The heart develops through Tobacco Leaf, Tunisian Orange Blossom, Pepper, Grapefruit Blossom, adding texture and character as the scent settles. In the dry down, Amber, Cedar, Patchouli, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "tuscan-leather-tom-ford-unisex",
    "name": "Tuscan Leather",
    "brand": "Tom Ford",
    "displayName": "Tuscan Leather by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Raspberry",
        "Saffron",
        "Thyme"
      ],
      "heart": [
        "Olibanum",
        "Jasmine"
      ],
      "base": [
        "Leather",
        "Suede",
        "Woody Notes",
        "Amber"
      ]
    },
    "shortDescription": "A spicy, floral, and woody fragrance that develops from Raspberry, Saffron into Olibanum, Jasmine, finishing with Leather, Suede.",
    "longDescription": "Tuscan Leather by Tom Ford is a spicy, floral, woody fragrance with a versatile, genderless character. It opens with Raspberry, Saffron, Thyme, creating the first bright and expressive impression. The heart develops through Olibanum, Jasmine, adding texture and character as the scent settles. In the dry down, Leather, Suede, Woody Notes, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "tuscan-leather-intense-tom-ford-unisex",
    "name": "Tuscan Leather Intense",
    "brand": "Tom Ford",
    "displayName": "Tuscan Leather Intense by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Raspberry",
        "Saffron",
        "Davana"
      ],
      "heart": [
        "Leather",
        "Jasmine"
      ],
      "base": [
        "Suede",
        "Amber",
        "Woody Notes"
      ]
    },
    "shortDescription": "A spicy, floral, and woody fragrance that develops from Raspberry, Saffron into Leather, Jasmine, finishing with Suede, Amber.",
    "longDescription": "Tuscan Leather Intense by Tom Ford is a spicy, floral, woody fragrance with a versatile, genderless character. It opens with Raspberry, Saffron, Davana, creating the first bright and expressive impression. The heart develops through Leather, Jasmine, adding texture and character as the scent settles. In the dry down, Suede, Amber, Woody Notes provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "vanille-fatale-tom-ford-unisex",
    "name": "Vanille Fatale",
    "brand": "Tom Ford",
    "displayName": "Vanille Fatale by Tom Ford",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Saffron",
        "Coriander",
        "Myrrh",
        "Olibanum",
        "Lime",
        "Orange"
      ],
      "heart": [
        "Barley",
        "Coffee",
        "Plum",
        "Frangipani",
        "Narcissus",
        "Rose"
      ],
      "base": [
        "Madagascar Vanilla",
        "Suede",
        "Tobacco",
        "Mahogany",
        "Patchouli",
        "Oakmoss",
        "Violet"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Saffron, Coriander into Barley, Coffee, finishing with Madagascar Vanilla, Suede.",
    "longDescription": "Vanille Fatale by Tom Ford is a fresh, spicy, floral fragrance with a versatile, genderless character. It opens with Saffron, Coriander, Myrrh, Olibanum, creating the first bright and expressive impression. The heart develops through Barley, Coffee, Plum, Frangipani, adding texture and character as the scent settles. In the dry down, Madagascar Vanilla, Suede, Tobacco, Mahogany provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bright-crystal-versace-women",
    "name": "Bright Crystal",
    "brand": "Versace",
    "displayName": "Bright Crystal by Versace",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Yuzu",
        "Pomegranate",
        "Ice Accord"
      ],
      "heart": [
        "Peony",
        "Lotus",
        "Magnolia"
      ],
      "base": [
        "Musk",
        "Mahogany",
        "Amber"
      ]
    },
    "shortDescription": "A fresh and floral fragrance that develops from Yuzu, Pomegranate into Peony, Lotus, finishing with Musk, Mahogany.",
    "longDescription": "Bright Crystal by Versace is a fresh, luminous floral-fruity scent that opens with icy accords, pomegranate and yuzu for a bright, juicy start. The heart softens into peony, lotus and magnolia petals, giving a watery floral feel. Finally, warm musk, mahogany, and amber round it out for a soft, elegant, feminine finish.\n\nPerfect for:\n\nDaytime wear, spring/summer\nCausal outings, brunches, daytime events\nThose who like soft florals with fruity sparkle and a clean dry down",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "crystal-noir-versace-women",
    "name": "Crystal Noir",
    "brand": "Versace",
    "displayName": "Crystal Noir by Versace",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pepper",
        "Ginger",
        "Cardamom"
      ],
      "heart": [
        "Coconut",
        "Gardenia",
        "Orange Blossom",
        "Peony"
      ],
      "base": [
        "Sandalwood",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Pepper, Ginger into Coconut, Gardenia, finishing with Sandalwood, Musk.",
    "longDescription": "Crystal Noir by Versace is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Pepper, Ginger, Cardamom, creating the first bright and expressive impression. The heart develops through Coconut, Gardenia, Orange Blossom, Peony, adding texture and character as the scent settles. In the dry down, Sandalwood, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "eros-versace-men",
    "name": "Eros",
    "brand": "Versace",
    "displayName": "Eros by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mint",
        "Green Apple",
        "Lemon"
      ],
      "heart": [
        "Tonka Bean",
        "Ambroxan",
        "Geranium"
      ],
      "base": [
        "Madagascar Vanilla",
        "Virginian Cedar",
        "Atlas Cedar",
        "Vetiver",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, warm, and woody fragrance that develops from Mint, Green Apple into Tonka Bean, Ambroxan, finishing with Madagascar Vanilla, Virginian Cedar.",
    "longDescription": "Eros by Versace is a fresh, warm, woody fragrance with a confident masculine character. It opens with Mint, Green Apple, Lemon, creating the first bright and expressive impression. The heart develops through Tonka Bean, Ambroxan, Geranium, adding texture and character as the scent settles. In the dry down, Madagascar Vanilla, Virginian Cedar, Atlas Cedar, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "eros-flame-versace-men",
    "name": "Eros Flame",
    "brand": "Versace",
    "displayName": "Eros Flame by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mandarin Orange",
        "Black Pepper",
        "Chinotto",
        "Lemon",
        "Rosemary"
      ],
      "heart": [
        "Pepper",
        "Geranium",
        "Rose"
      ],
      "base": [
        "Vanilla",
        "Tonka Bean",
        "Sandalwood",
        "Texas Cedar",
        "Patchouli",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Mandarin Orange, Black Pepper into Pepper, Geranium, finishing with Vanilla, Tonka Bean.",
    "longDescription": "Eros Flame by Versace is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Mandarin Orange, Black Pepper, Chinotto, Lemon, creating the first bright and expressive impression. The heart develops through Pepper, Geranium, Rose, adding texture and character as the scent settles. In the dry down, Vanilla, Tonka Bean, Sandalwood, Texas Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "the-dreamer-versace-men",
    "name": "The Dreamer",
    "brand": "Versace",
    "displayName": "The Dreamer by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Juniper",
        "Tarragon",
        "Artemisia"
      ],
      "heart": [
        "Iris",
        "Lily",
        "Flax"
      ],
      "base": [
        "Tobacco Blossom",
        "Amber"
      ]
    },
    "shortDescription": "A floral and deep fragrance that develops from Juniper, Tarragon into Iris, Lily, finishing with Tobacco Blossom, Amber.",
    "longDescription": "The Dreamer by Versace is a floral, deep fragrance with a confident masculine character. It opens with Juniper, Tarragon, Artemisia, creating the first bright and expressive impression. The heart develops through Iris, Lily, Flax, adding texture and character as the scent settles. In the dry down, Tobacco Blossom, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "versace-man-eau-fraiche-versace-men",
    "name": "Versace Man Eau Fraiche",
    "brand": "Versace",
    "displayName": "Versace Man Eau Fraiche by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lemon",
        "Bergamot",
        "Carambola",
        "Cardamom",
        "Brazilian Rosewood"
      ],
      "heart": [
        "Cedar",
        "Tarragon",
        "Sage",
        "Pepper"
      ],
      "base": [
        "Musk",
        "Woodsy Notes",
        "Saffron",
        "Amber",
        "Sycamore"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Lemon, Bergamot into Cedar, Tarragon, finishing with Musk, Woodsy Notes.",
    "longDescription": "Versace Man Eau Fraiche by Versace is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Lemon, Bergamot, Carambola, Cardamom, creating the first bright and expressive impression. The heart develops through Cedar, Tarragon, Sage, Pepper, adding texture and character as the scent settles. In the dry down, Musk, Woodsy Notes, Saffron, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "versace-pour-femme-dylan-blue-versace-women",
    "name": "Versace Pour Femme Dylan Blue",
    "brand": "Versace",
    "displayName": "Versace Pour Femme Dylan Blue by Versace",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Currant",
        "Granny Smith Apple",
        "Clover",
        "Forget-Me-Not",
        "Shiso"
      ],
      "heart": [
        "Peach",
        "Petalia",
        "Rose Hip",
        "Rose",
        "Jasmine"
      ],
      "base": [
        "Musk",
        "White Woods",
        "Styrax",
        "Patchouli"
      ]
    },
    "shortDescription": "A spicy, floral, and woody fragrance that develops from Black Currant, Granny Smith Apple into Peach, Petalia, finishing with Musk, White Woods.",
    "longDescription": "Versace Pour Femme Dylan Blue by Versace is a spicy, floral, woody fragrance with an elegant feminine character. It opens with Black Currant, Granny Smith Apple, Clover, Forget-Me-Not, creating the first bright and expressive impression. The heart develops through Peach, Petalia, Rose Hip, Rose, adding texture and character as the scent settles. In the dry down, Musk, White Woods, Styrax, Patchouli provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy spicy, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "versace-pour-homme-versace-men",
    "name": "Versace Pour Homme",
    "brand": "Versace",
    "displayName": "Versace Pour Homme by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lemon",
        "Bergamot",
        "Neroli",
        "Rose de Mai"
      ],
      "heart": [
        "Hyacinth",
        "Cedar",
        "Clary Sage",
        "Geranium"
      ],
      "base": [
        "Tonka Bean",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Lemon, Bergamot into Hyacinth, Cedar, finishing with Tonka Bean, Musk.",
    "longDescription": "Versace Pour Homme by Versace is a fresh, floral, warm fragrance with a confident masculine character. It opens with Lemon, Bergamot, Neroli, Rose de Mai, creating the first bright and expressive impression. The heart develops through Hyacinth, Cedar, Clary Sage, Geranium, adding texture and character as the scent settles. In the dry down, Tonka Bean, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "versace-pour-homme-dylan-blue-versace-men",
    "name": "Versace Pour Homme Dylan Blue",
    "brand": "Versace",
    "displayName": "Versace Pour Homme Dylan Blue by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Calabrian Bergamot",
        "Grapefruit",
        "Water Notes",
        "Fig Leaf"
      ],
      "heart": [
        "Ambroxan",
        "Patchouli",
        "Black Pepper",
        "Violet Leaf",
        "Papyrus"
      ],
      "base": [
        "Incense",
        "Musk",
        "Tonka Bean",
        "Saffron"
      ]
    },
    "shortDescription": "A fresh, aquatic, and spicy fragrance that develops from Calabrian Bergamot, Grapefruit into Ambroxan, Patchouli, finishing with Incense, Musk.",
    "longDescription": "Versace Pour Homme Dylan Blue by Versace is a fresh, aquatic, spicy fragrance with a confident masculine character. It opens with Calabrian Bergamot, Grapefruit, Water Notes, Fig Leaf, creating the first bright and expressive impression. The heart develops through Ambroxan, Patchouli, Black Pepper, Violet Leaf, adding texture and character as the scent settles. In the dry down, Incense, Musk, Tonka Bean, Saffron provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, spicy fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "versace-pour-homme-oud-noir-versace-men",
    "name": "Versace Pour Homme Oud Noir",
    "brand": "Versace",
    "displayName": "Versace Pour Homme Oud Noir by Versace",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Pepper",
        "Bitter Orange",
        "Neroli"
      ],
      "heart": [
        "Saffron",
        "Cardamom",
        "Olibanum"
      ],
      "base": [
        "Agarwood",
        "Patchouli",
        "Leatherwood"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Black Pepper, Bitter Orange into Saffron, Cardamom, finishing with Agarwood, Patchouli.",
    "longDescription": "Versace Pour Homme Oud Noir by Versace is a fresh, spicy, woody fragrance with a confident masculine character. It opens with Black Pepper, Bitter Orange, Neroli, creating the first bright and expressive impression. The heart develops through Saffron, Cardamom, Olibanum, adding texture and character as the scent settles. In the dry down, Agarwood, Patchouli, Leatherwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "flower-bomb-victor-rolf-women",
    "name": "Flower Bomb",
    "brand": "Victor Rolf",
    "displayName": "Flower Bomb by Victor Rolf",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Tea",
        "Bergamot",
        "Osmanthus"
      ],
      "heart": [
        "Orchid",
        "Jasmine",
        "Rose",
        "Freesia",
        "African Orange Flower"
      ],
      "base": [
        "Patchouli",
        "Musk",
        "Vanilla"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Tea, Bergamot into Orchid, Jasmine, finishing with Patchouli, Musk.",
    "longDescription": "Flower Bomb by Victor Rolf is a fresh, floral, warm fragrance with an elegant feminine character. It opens with Tea, Bergamot, Osmanthus, creating the first bright and expressive impression. The heart develops through Orchid, Jasmine, Rose, Freesia, adding texture and character as the scent settles. In the dry down, Patchouli, Musk, Vanilla provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bombshell-victoria-s-secret-women",
    "name": "Bombshell",
    "brand": "Victoria's Secret",
    "displayName": "Bombshell by Victoria's Secret",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Passionfruit",
        "Grapefruit",
        "Pineapple",
        "Tangerine",
        "Strawberry"
      ],
      "heart": [
        "Peony",
        "Red Berries",
        "Vanilla Orchid",
        "Jasmine",
        "Lily-of-the-Valley"
      ],
      "base": [
        "Musk",
        "Woody Notes",
        "Oakmoss"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Passionfruit, Grapefruit into Peony, Red Berries, finishing with Musk, Woody Notes.",
    "longDescription": "Bombshell by Victoria’s Secret is a vibrant floral-fruity fragrance that delights from the first spray. It opens with a burst of passionfruit, grapefruit, pineapple, tangerine, and strawberry. The heart softens with peony, red berries, vanilla orchid, jasmine, and lily-of-the-valley. Finally, the base anchors the scent with musk, woody elements, and oakmoss, giving it a lush, feminine finish.\n\nPerfect for:\n\nDay or night when you want a bold, confident, playful scent\nParties, dates, nights out\nThose who love fruity florals with a strong sweet & floral profile",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "tease-rebel-victoria-s-secret-women",
    "name": "Tease Rebel",
    "brand": "Victoria's Secret",
    "displayName": "Tease Rebel by Victoria's Secret",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Violet Leaf"
      ],
      "heart": [
        "Wild Rose"
      ],
      "base": [
        "White Leather"
      ]
    },
    "shortDescription": "A floral and deep fragrance that develops from Violet Leaf into Wild Rose, finishing with White Leather.",
    "longDescription": "Tease Rebel by Victoria's Secret is a floral, deep fragrance with an elegant feminine character. It opens with Violet Leaf, creating the first bright and expressive impression. The heart develops through Wild Rose, adding texture and character as the scent settles. In the dry down, White Leather provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy floral, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "spicebomb-viktor-rolf-men",
    "name": "SpiceBomb",
    "brand": "Viktor RolF",
    "displayName": "SpiceBomb by Viktor RolF",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pink Pepper",
        "Elemi",
        "Bergamot",
        "Grapefruit"
      ],
      "heart": [
        "Cinnamon",
        "Saffron",
        "Paprika"
      ],
      "base": [
        "Tobacco",
        "Leather",
        "Vetiver"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Pink Pepper, Elemi into Cinnamon, Saffron, finishing with Tobacco, Leather.",
    "longDescription": "Spice Bomb is a powerful, spicy-woody fragrance for men that opens with an explosive burst of pink pepper, elemi, bergamot and grapefruit. Its heart is rich with warming spices like cinnamon, saffron and paprika, and the base anchors the scent with tobacco, leather and vetiver — making it bold, confident and attention-grabbing.\n\nPerfect for:\n\nEvenings, cool weather, nights out or when you want to stand out\nWhen you want a strong masculine scent with spicy-woody depth\nThose who enjoy bold fragrances with tobacco, leather and warm spice profiles",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "spicebomb-extreme-viktor-rolf-men",
    "name": "SpiceBomb Extreme",
    "brand": "Viktor RolF",
    "displayName": "SpiceBomb Extreme by Viktor RolF",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Lavender"
      ],
      "heart": [
        "Cinnamon",
        "Saffron"
      ],
      "base": [
        "Tobacco",
        "Vanilla"
      ]
    },
    "shortDescription": "A spicy, warm, and deep fragrance that develops from Lavender into Cinnamon, Saffron, finishing with Tobacco, Vanilla.",
    "longDescription": "SpiceBomb Extreme by Viktor RolF is a spicy, warm, deep fragrance with a confident masculine character. It opens with Lavender, creating the first bright and expressive impression. The heart develops through Cinnamon, Saffron, adding texture and character as the scent settles. In the dry down, Tobacco, Vanilla provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, warm, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "black-opium-yves-saint-laurent-women",
    "name": "Black Opium",
    "brand": "Yves Saint Laurent",
    "displayName": "Black Opium by Yves Saint Laurent",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Pear",
        "Pink Pepper",
        "Orange Blossom"
      ],
      "heart": [
        "Coffee",
        "Jasmine",
        "Bitter Almond",
        "Licorice"
      ],
      "base": [
        "Vanilla",
        "Patchouli",
        "Cedar",
        "Cashmere Wood"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Pear, Pink Pepper into Coffee, Jasmine, finishing with Vanilla, Patchouli.",
    "longDescription": "Black Opium by Yves Saint Laurent is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Pear, Pink Pepper, Orange Blossom, creating the first bright and expressive impression. The heart develops through Coffee, Jasmine, Bitter Almond, Licorice, adding texture and character as the scent settles. In the dry down, Vanilla, Patchouli, Cedar, Cashmere Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "kouros-yves-saint-laurent-men",
    "name": "Kouros",
    "brand": "Yves Saint Laurent",
    "displayName": "Kouros by Yves Saint Laurent",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Aldehydes",
        "Coriander",
        "Clary Sage",
        "Artemisia",
        "Bergamot"
      ],
      "heart": [
        "Patchouli",
        "Carnation",
        "Vetiver",
        "Cinnamon",
        "Geranium",
        "Jasmine",
        "Orris Root"
      ],
      "base": [
        "Civet",
        "Honey",
        "Leather",
        "Musk",
        "Oakmoss",
        "Amber",
        "Tonka Bean",
        "Vanilla"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Aldehydes, Coriander into Patchouli, Carnation, finishing with Civet, Honey.",
    "longDescription": "Kouros by Yves Saint Laurent is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Aldehydes, Coriander, Clary Sage, Artemisia, creating the first bright and expressive impression. The heart develops through Patchouli, Carnation, Vetiver, Cinnamon, adding texture and character as the scent settles. In the dry down, Civet, Honey, Leather, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "l-homme-ultime-yves-saint-laurent-men",
    "name": "L'Homme Ultime",
    "brand": "Yves Saint Laurent",
    "displayName": "L'Homme Ultime by Yves Saint Laurent",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ginger",
        "Grapefruit",
        "Cardamom",
        "Bergamot"
      ],
      "heart": [
        "Rose",
        "Sage",
        "Geranium",
        "Apple"
      ],
      "base": [
        "Cedar",
        "Vetiver",
        "Cashmere Wood"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Ginger, Grapefruit into Rose, Sage, finishing with Cedar, Vetiver.",
    "longDescription": "L'Homme Ultime by Yves Saint Laurent is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Ginger, Grapefruit, Cardamom, Bergamot, creating the first bright and expressive impression. The heart develops through Rose, Sage, Geranium, Apple, adding texture and character as the scent settles. In the dry down, Cedar, Vetiver, Cashmere Wood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "opium-yves-saint-laurent-women",
    "name": "Opium",
    "brand": "Yves Saint Laurent",
    "displayName": "Opium by Yves Saint Laurent",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Cloves",
        "Pepper",
        "Coriander",
        "West Indian Bay",
        "Plum",
        "Mandarin Orange",
        "Bergamot",
        "Citruses"
      ],
      "heart": [
        "Carnation",
        "Cinnamon",
        "Jasmine",
        "Rose",
        "Lily-of-the-Valley",
        "Orris Root",
        "Peach"
      ],
      "base": [
        "Myrrh",
        "Incense",
        "Sandalwood",
        "Tolu Balsam",
        "Opoponax",
        "Amber",
        "Benzoin",
        "Labdanum",
        "Vanilla",
        "Musk",
        "Patchouli",
        "Vetiver",
        "Coconut"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Cloves, Pepper into Carnation, Cinnamon, finishing with Myrrh, Incense.",
    "longDescription": "Opium by Yves Saint Laurent is a fresh, spicy, floral fragrance with an elegant feminine character. It opens with Cloves, Pepper, Coriander, West Indian Bay, creating the first bright and expressive impression. The heart develops through Carnation, Cinnamon, Jasmine, Rose, adding texture and character as the scent settles. In the dry down, Myrrh, Incense, Sandalwood, Tolu Balsam provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "opium-pour-homme-yves-saint-laurent-men",
    "name": "Opium Pour Homme",
    "brand": "Yves Saint Laurent",
    "displayName": "Opium Pour Homme by Yves Saint Laurent",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Black Currant",
        "Star Anise"
      ],
      "heart": [
        "Pepper",
        "Galanga"
      ],
      "base": [
        "Bourbon Vanilla",
        "Tolu Balsam",
        "Atlas Cedar"
      ]
    },
    "shortDescription": "A spicy, warm, and woody fragrance that develops from Black Currant, Star Anise into Pepper, Galanga, finishing with Bourbon Vanilla, Tolu Balsam.",
    "longDescription": "Opium Pour Homme by Yves Saint Laurent is a spicy, warm, woody fragrance with a confident masculine character. It opens with Black Currant, Star Anise, creating the first bright and expressive impression. The heart develops through Pepper, Galanga, adding texture and character as the scent settles. In the dry down, Bourbon Vanilla, Tolu Balsam, Atlas Cedar provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, warm, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "y-yves-saint-laurent-men",
    "name": "Y",
    "brand": "Yves Saint Laurent",
    "displayName": "Y by Yves Saint Laurent",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Apple",
        "Ginger",
        "Bergamot"
      ],
      "heart": [
        "Sage",
        "Juniper Berries",
        "Geranium"
      ],
      "base": [
        "Amberwood",
        "Tonka Bean",
        "Cedar",
        "Vetiver",
        "Olibanum"
      ]
    },
    "shortDescription": "A fresh, spicy, and warm fragrance that develops from Apple, Ginger into Sage, Juniper Berries, finishing with Amberwood, Tonka Bean.",
    "longDescription": "Y by Yves Saint Laurent is a fresh, spicy, warm fragrance with a confident masculine character. It opens with Apple, Ginger, Bergamot, creating the first bright and expressive impression. The heart develops through Sage, Juniper Berries, Geranium, adding texture and character as the scent settles. In the dry down, Amberwood, Tonka Bean, Cedar, Vetiver provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, spicy, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "apple-juice-zara-women",
    "name": "Apple Juice",
    "brand": "Zara",
    "displayName": "Apple Juice by Zara",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Apple",
        "Citrus",
        "Berries"
      ],
      "heart": [
        "Rose",
        "Jasmine",
        "Violet",
        "Peony"
      ],
      "base": [
        "Musk",
        "Soft Florals"
      ]
    },
    "shortDescription": "A fresh and floral fragrance that develops from Apple, Citrus into Rose, Jasmine, finishing with Musk, Soft Florals.",
    "longDescription": "Apple Juice by Zara is a fresh floral-fruity fragrance that opens with juicy apple, citrus, and soft berries. The heart blooms with rose, jasmine, violet and peony for a light, feminine touch. It dries down into subtle musky and sweet floral tones, keeping it playful and youthful.\n\nPerfect for:\n\nCasual daytime wear, especially in spring/summer\nActivities like brunch, shopping, or daily errands\nAnyone who enjoys light fruity florals with a sweet finish",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "dunhill-desire-red-alfred-dunhill-men",
    "name": "Dunhill Desire Red",
    "brand": "Alfred Dunhill",
    "displayName": "Dunhill Desire Red by Alfred Dunhill",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Apple",
        "Lemon",
        "Bergamot",
        "Neroli"
      ],
      "heart": [
        "Rose",
        "Teak Wood",
        "Patchouli"
      ],
      "base": [
        "Vanilla",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, floral, and warm fragrance that develops from Apple, Lemon into Rose, Teak Wood, finishing with Vanilla, Musk.",
    "longDescription": "Dunhill Desire Red by Alfred Dunhill is a fresh, floral, warm fragrance with a confident masculine character. It opens with Apple, Lemon, Bergamot, Neroli, creating the first bright and expressive impression. The heart develops through Rose, Teak Wood, Patchouli, adding texture and character as the scent settles. In the dry down, Vanilla, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy fresh, floral, warm fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "dunhill-desire-blue-alfred-dunhill-men",
    "name": "Dunhill Desire Blue",
    "brand": "Alfred Dunhill",
    "displayName": "Dunhill Desire Blue by Alfred Dunhill",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Litchi",
        "Mandarin Orange",
        "Lotus",
        "Bergamot"
      ],
      "heart": [
        "Sea Notes",
        "Orange",
        "Brazilian Rosewood"
      ],
      "base": [
        "Tonka Bean",
        "Musk",
        "Benzoin",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, aquatic, and floral fragrance that develops from Litchi, Mandarin Orange into Sea Notes, Orange, finishing with Tonka Bean, Musk.",
    "longDescription": "Dunhill Desire Blue by Alfred Dunhill is a fresh, aquatic, floral fragrance with a confident masculine character. It opens with Litchi, Mandarin Orange, Lotus, Bergamot, creating the first bright and expressive impression. The heart develops through Sea Notes, Orange, Brazilian Rosewood, adding texture and character as the scent settles. In the dry down, Tonka Bean, Musk, Benzoin, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, aquatic, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "office-for-men-fragrance-one-men",
    "name": "Office For Men",
    "brand": "Fragrance One",
    "displayName": "Office For Men by Fragrance One",
    "category": "Men",
    "price": 2200,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Ambroxan",
        "Bergamot",
        "Orris Root"
      ],
      "heart": [
        "Woody Notes",
        "Floral Notes",
        "Ambergris",
        "Jasmine"
      ],
      "base": [
        "Patchouli",
        "Musk",
        "Cashalox"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Ambroxan, Bergamot into Woody Notes, Floral Notes, finishing with Patchouli, Musk.",
    "longDescription": "Office for Men by Fragrance One is a modern woody-spicy fragrance perfect for the professional you. It opens with fresh citrus and bergamot with a touch of orris root and ambroxan, which then flows into a heart of woody and floral notes alongside ambergris, amber, and jasmine. The base is warm and rich: patchouli, musk, and Cashalox round it out for longevity and a confident dry down.\n\nPerfect for:\n\nOffice/business settings, formal or semi-formal wear\nAll-day wear when you need to feel sharp and composed\nThose who like crisp citruses blended with woods and amber",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "aramis-aramis-men",
    "name": "Aramis",
    "brand": "Aramis",
    "displayName": "Aramis by Aramis",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Aldehydes",
        "Myrrh",
        "Artemisia",
        "Clover",
        "Thyme",
        "Bergamot",
        "Gardenia"
      ],
      "heart": [
        "Patchouli",
        "Sage",
        "Jasmine",
        "Cardamom",
        "Orris Root"
      ],
      "base": [
        "Leather",
        "Oakmoss",
        "Musk",
        "Sandalwood",
        "Vetiver",
        "Amber",
        "Cinnamon",
        "Coconut"
      ]
    },
    "shortDescription": "A fresh, spicy, and floral fragrance that develops from Aldehydes, Myrrh into Patchouli, Sage, finishing with Leather, Oakmoss.",
    "longDescription": "Aramis by Aramis is a fresh, spicy, floral fragrance with a confident masculine character. It opens with Aldehydes, Myrrh, Artemisia, Clover, creating the first bright and expressive impression. The heart develops through Patchouli, Sage, Jasmine, Cardamom, adding texture and character as the scent settles. In the dry down, Leather, Oakmoss, Musk, Sandalwood provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, spicy, floral fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "falcon-leather-matiere-premiere-unisex",
    "name": "Falcon Leather",
    "brand": "Matiere Premiere",
    "displayName": "Falcon Leather by Matiere Premiere",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Saffron",
        "Labdanum"
      ],
      "heart": [
        "Birch Tar"
      ],
      "base": [
        "Agarwood",
        "Benzoin"
      ]
    },
    "shortDescription": "A spicy, woody, and deep fragrance that develops from Saffron, Labdanum into Birch Tar, finishing with Agarwood, Benzoin.",
    "longDescription": "Falcon Leather by Matiere Premiere is a spicy, woody, deep fragrance with a versatile, genderless character. It opens with Saffron, Labdanum, creating the first bright and expressive impression. The heart develops through Birch Tar, adding texture and character as the scent settles. In the dry down, Agarwood, Benzoin provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nEvening wear, cooler weather, or special occasions\nDates, dinners, and occasions where you want a richer presence\nThose who enjoy spicy, woody, deep fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "oud-and-roses-ahmed-al-maghribi-perfumes-unisex",
    "name": "Oud & Roses",
    "brand": "Ahmed Al Maghribi Perfumes",
    "displayName": "Oud & Roses by Ahmed Al Maghribi Perfumes",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Turkish Rose",
        "Bergamot"
      ],
      "heart": [
        "Agarwood",
        "Floral Notes"
      ],
      "base": [
        "Amber",
        "Patchouli",
        "Musk"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Turkish Rose, Bergamot into Agarwood, Floral Notes, finishing with Amber, Patchouli.",
    "longDescription": "Oud & Roses by Ahmed Al Maghribi Perfumes is a fresh, floral, woody fragrance with a versatile, genderless character. It opens with Turkish Rose, Bergamot, creating the first bright and expressive impression. The heart develops through Agarwood, Floral Notes, adding texture and character as the scent settles. In the dry down, Amber, Patchouli, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "bergamote-22-le-labo-unisex",
    "name": "Bergamote 22",
    "brand": "Le Labo",
    "displayName": "Bergamote 22 by Le Labo",
    "category": "Unisex",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Grapefruit",
        "Petitgrain"
      ],
      "heart": [
        "Orange Blossom",
        "Cedar"
      ],
      "base": [
        "Vetiver",
        "Musk",
        "Amber"
      ]
    },
    "shortDescription": "A fresh, floral, and woody fragrance that develops from Bergamot, Grapefruit into Orange Blossom, Cedar, finishing with Vetiver, Musk.",
    "longDescription": "Bergamote 22 by Le Labo is a fresh, floral, woody fragrance with a versatile, genderless character. It opens with Bergamot, Grapefruit, Petitgrain, creating the first bright and expressive impression. The heart develops through Orange Blossom, Cedar, adding texture and character as the scent settles. In the dry down, Vetiver, Musk, Amber provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, floral, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "daisy-daze-marc-jacobs-women",
    "name": "Daisy Daze",
    "brand": "Marc Jacobs",
    "displayName": "Daisy Daze by Marc Jacobs",
    "category": "Women",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Mandarin Orange"
      ],
      "heart": [
        "Mirabelle Plum"
      ],
      "base": [
        "Musk",
        "Creamy Woods"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Mandarin Orange into Mirabelle Plum, finishing with Musk, Creamy Woods.",
    "longDescription": "Daisy Daze by Marc Jacobs is a fresh, woody fragrance with an elegant feminine character. It opens with Mandarin Orange, creating the first bright and expressive impression. The heart develops through Mirabelle Plum, adding texture and character as the scent settles. In the dry down, Musk, Creamy Woods provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "london-saville-row-mayfair-zara-men",
    "name": "London Saville Row Mayfair",
    "brand": "Zara",
    "displayName": "London Saville Row Mayfair by Zara",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Green Apple"
      ],
      "heart": [
        "Lavender",
        "Geranium"
      ],
      "base": [
        "Amber",
        "Cedar",
        "Musk"
      ]
    },
    "shortDescription": "A fresh and woody fragrance that develops from Bergamot, Green Apple into Lavender, Geranium, finishing with Amber, Cedar.",
    "longDescription": "London Saville Row Mayfair by Zara is a fresh, woody fragrance with a confident masculine character. It opens with Bergamot, Green Apple, creating the first bright and expressive impression. The heart develops through Lavender, Geranium, adding texture and character as the scent settles. In the dry down, Amber, Cedar, Musk provide lasting depth, warmth, and balance.\n\nPerfect for:\n\nDaytime wear, warm weather, or casual outings\nWork, travel, and everyday wear when you want a polished scent\nThose who enjoy fresh, woody fragrances",
    "image": "/product-placeholder.svg"
  },
  {
    "id": "sauvage-dior-men",
    "name": "Sauvage",
    "brand": "Dior",
    "displayName": "Sauvage by Dior",
    "category": "Men",
    "price": 2000,
    "sizeMl": 50,
    "notes": {
      "top": [
        "Bergamot",
        "Sichuan Pepper"
      ],
      "heart": [
        "Lavender",
        "Star Anise",
        "Nutmeg"
      ],
      "base": [
        "Ambroxan",
        "Vetiver",
        "Patchouli"
      ]
    },
    "shortDescription": "A fresh, spicy, and woody fragrance that develops from Bergamot, Sichuan Pepper into Lavender, Star Anise, finishing with Ambroxan, Vetiver.",
    "longDescription": "Sauvage by Dior is a bold, fresh-spicy fragrance that opens with zesty bergamot and sharp pepper, flows into aromatic lavender and warm nutmeg, then trails off into rugged woods and ambroxan, creating a long-lasting signature that combines outdoorsy freshness with modern edge.\n\nPerfect for:\n\nDay or night wear when you want something clean but confident\nCasual settings, date nights, or nights out\nThose who enjoy fresh citrus balances with spicy and woody depth",
    "image": "/product-placeholder.svg"
  }
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function formatProductPrice(price: number) {
  return `Rs. ${price.toLocaleString("en-PK")}`;
}
