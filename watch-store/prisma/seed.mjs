import { PrismaClient, Gender, ProductStatus } from "@prisma/client";
import bcrypt from "bcryptjs";
import { mkdir, writeFile } from "fs/promises";
import { join } from "path";

const prisma = new PrismaClient();

const watchImagesDir = join(process.cwd(), "public", "images", "watches");

const brandColors = {
  "Aurent": { dial: "#1a1a1e", strap: "#2b2b2b" },
  "Velmara": { dial: "#0f2c3e", strap: "#1c1c1c" },
  "Ostron": { dial: "#3d2b1f", strap: "#4a3b32" },
  "Caldris": { dial: "#1e2a1e", strap: "#1a1a1a" },
  "Norvane": { dial: "#242038", strap: "#2d2a32" },
  "Zephyr & Cie": { dial: "#142429", strap: "#202020" },
};

function watchSvg(brand, index, hue) {
  const { dial, strap } = brandColors[brand] ?? { dial: "#1a1a1e", strap: "#2b2b2b" };
  const caseColor = "#d4af37";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 1000" width="800" height="1000">
  <rect width="800" height="1000" fill="#faf8f5"/>
  <rect x="300" y="100" width="200" height="260" rx="20" fill="${strap}"/>
  <circle cx="400" cy="510" r="170" fill="${caseColor}" opacity="0.95"/>
  <circle cx="400" cy="510" r="150" fill="${dial}"/>
  <rect x="395" y="520" width="6" height="70" fill="#e8dcc5"/>
  <rect x="360" y="500" width="80" height="6" fill="#e8dcc5" transform="rotate(35 400 510)"/>
  <circle cx="400" cy="510" r="6" fill="#b08d57"/>
  <text x="400" y="445" text-anchor="middle" fill="#e8dcc5" font-family="serif" font-size="18">${brand.toUpperCase()}</text>
  <text x="400" y="585" text-anchor="middle" fill="#b08d57" font-family="serif" font-size="14">AUTOMATIC</text>
  ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    .map((h) => {
      const angle = (h * 30 - 90) * (Math.PI / 180);
      const x1 = 400 + 120 * Math.cos(angle);
      const y1 = 510 + 120 * Math.sin(angle);
      return `<circle cx="${x1}" cy="${y1}" r="3" fill="#e8dcc5"/>`;
    })
    .join("")}
  <rect x="300" y="700" width="200" height="260" rx="20" fill="${strap}"/>
</svg>`;
}

const brands = [
  { name: "Aurent", slug: "aurent", description: "The in-house expression of refined timekeeping, born in Geneva." },
  { name: "Velmara", slug: "velmara", description: "Maritime precision instruments built for the modern explorer." },
  { name: "Ostron", slug: "ostron", description: "Bold, architectural forms with Swiss chronograph heritage." },
  { name: "Caldris", slug: "caldris", description: "Quiet luxury for collectors who prefer understatement." },
  { name: "Norvane", slug: "norvane", description: "Aviation-inspired classics with 24-hour GMT know-how." },
  { name: "Zephyr & Cie", slug: "zephyr-cie", description: "Avant-garde complications from independent Parisian watchmakers." },
];

const categories = [
  { name: "Dress", slug: "dress", description: "Elegant timepieces for formal occasions." },
  { name: "Diver", slug: "diver", description: "Water-resistant tools engineered for the depths." },
  { name: "Chronograph", slug: "chronograph", description: "Precision stopwatch complications." },
  { name: "Pilot", slug: "pilot", description: "Aviation and GMT watches built for navigation." },
  { name: "Sport", slug: "sport", description: "Rugged daily companions that refuse to compromise." },
  { name: "Complication", slug: "complication", description: "Watches with advanced mechanical functions." },
];

const products = [
  { name: "Aurent C1", brand: "Aurent", category: "Dress", sku: "AUR-C1-001", price: 4250, gender: Gender.MEN, movement: "Automatic Cal. 900", caseMaterial: "316L stainless steel", caseDiameter: "39mm", dial: "Charcoal sunray", crystal: "Sapphire", waterResistance: "50m", strap: "Black alligator leather", warranty: "5 years", featured: true, newArrival: true },
  { name: "Aurent D8", brand: "Aurent", category: "Diver", sku: "AUR-D8-002", price: 5100, gender: Gender.MEN, movement: "Automatic Cal. 900D", caseMaterial: "Titanium grade 5", caseDiameter: "42mm", dial: "Matte black", crystal: "Sapphire", waterResistance: "300m", strap: "Titanium bracelet", warranty: "5 years", bestSeller: true },
  { name: "Velmara Atlantik", brand: "Velmara", category: "Diver", sku: "VEL-ATL-003", price: 7800, gender: Gender.MEN, movement: "Automatic Sellita SW330", caseMaterial: "904L steel", caseDiameter: "40mm", dial: "Navy blue", crystal: "Sapphire", waterResistance: "200m", strap: "Rubber", warranty: "4 years", bestSeller: true },
  { name: "Velmara Meridian", brand: "Velmara", category: "Dress", sku: "VEL-MER-004", price: 6200, gender: Gender.WOMEN, movement: "Quartz", caseMaterial: "18K rose gold plated", caseDiameter: "34mm", dial: "Mother of pearl", crystal: "Sapphire", waterResistance: "30m", strap: "Satin", warranty: "3 years", featured: true },
  { name: "Ostron Apex", brand: "Ostron", category: "Chronograph", sku: "OST-APX-005", price: 8900, gender: Gender.MEN, movement: "Automatic chronograph", caseMaterial: "Stainless steel", caseDiameter: "41mm", dial: "Panda white", crystal: "Sapphire", waterResistance: "100m", strap: "Stainless steel bracelet", warranty: "6 years", newArrival: true },
  { name: "Ostron Strato", brand: "Ostron", category: "Pilot", sku: "OST-STR-006", price: 7200, gender: Gender.UNISEX, movement: "Automatic GMT", caseMaterial: "Titanium", caseDiameter: "40mm", dial: "Black", crystal: "Sapphire", waterResistance: "100m", strap: "Leather", warranty: "6 years", featured: true },
  { name: "Caldris Minimalis", brand: "Caldris", category: "Dress", sku: "CAL-MIN-007", price: 3600, gender: Gender.UNISEX, movement: "Hand-wound", caseMaterial: "316L steel", caseDiameter: "38mm", dial: "Eggshell white", crystal: "Sapphire", waterResistance: "30m", strap: "Shell cordovan", warranty: "4 years", newArrival: true },
  { name: "Caldris Deepwell", brand: "Caldris", category: "Diver", sku: "CAL-DPW-008", price: 5900, gender: Gender.MEN, movement: "Automatic", caseMaterial: "Bronze", caseDiameter: "40mm", dial: "Teal", crystal: "Sapphire", waterResistance: "200m", strap: "Bronze bracelet", warranty: "4 years", bestSeller: true },
  { name: "Norvane Horizon", brand: "Norvane", category: "Pilot", sku: "NOR-HZN-009", price: 8300, gender: Gender.MEN, movement: "Automatic GMT", caseMaterial: "Stainless steel", caseDiameter: "42mm", dial: "Black", crystal: "Sapphire", waterResistance: "100m", strap: "Leather", warranty: "5 years", featured: true },
  { name: "Zephyr Etoile", brand: "Zephyr & Cie", category: "Complication", sku: "ZEP-ETO-010", price: 15400, gender: Gender.UNISEX, movement: "Hand-wound tourbillon prep", caseMaterial: "Platinum", caseDiameter: "40mm", dial: "Silver open-heart", crystal: "Sapphire", waterResistance: "30m", strap: "Crocodile", warranty: "8 years", featured: true },
  { name: "Zephyr Nuit", brand: "Zephyr & Cie", category: "Dress", sku: "ZEP-NUI-011", price: 9800, gender: Gender.WOMEN, movement: "Automatic", caseMaterial: "White gold", caseDiameter: "33mm", dial: "Midnight blue", crystal: "Sapphire", waterResistance: "30m", strap: "Satin", warranty: "8 years", newArrival: true },
  { name: "Aurent Vantage", brand: "Aurent", category: "Sport", sku: "AUR-VAN-012", price: 4650, gender: Gender.MEN, movement: "Automatic", caseMaterial: "Stainless steel", caseDiameter: "40mm", dial: "Slate grey", crystal: "Sapphire", waterResistance: "100m", strap: "Rubber", warranty: "5 years" },
  { name: "Velmara Pearl", brand: "Velmara", category: "Dress", sku: "VEL-PEA-013", price: 6100, gender: Gender.WOMEN, movement: "Automatic", caseMaterial: "18K yellow gold", caseDiameter: "36mm", dial: "Champagne", crystal: "Sapphire", waterResistance: "50m", strap: "Pearl bracelet", warranty: "4 years" },
  { name: "Ostron Velocity", brand: "Ostron", category: "Sport", sku: "OST-VEL-014", price: 7900, gender: Gender.MEN, movement: "Automatic chronograph", caseMaterial: "Ceramic", caseDiameter: "43mm", dial: "Black", crystal: "Sapphire", waterResistance: "200m", strap: "Rubber", warranty: "6 years" },
  { name: "Norvane Aviator", brand: "Norvane", category: "Pilot", sku: "NOR-AVI-015", price: 7600, gender: Gender.UNISEX, movement: "Automatic", caseMaterial: "Stainless steel", caseDiameter: "41mm", dial: "Black", crystal: "Sapphire", waterResistance: "100m", strap: "Canvas", warranty: "5 years" },
  { name: "Caldris Reserve", brand: "Caldris", category: "Complication", sku: "CAL-RSV-016", price: 9400, gender: Gender.MEN, movement: "Hand-wound power reserve", caseMaterial: "Stainless steel", caseDiameter: "39mm", dial: "Sand", crystal: "Sapphire", waterResistance: "50m", strap: "Leather", warranty: "4 years" },
  { name: "Aurent Elegance", brand: "Aurent", category: "Dress", sku: "AUR-ELG-017", price: 3800, gender: Gender.WOMEN, movement: "Quartz", caseMaterial: "316L steel", caseDiameter: "31mm", dial: "White mother of pearl", crystal: "Sapphire", waterResistance: "30m", strap: "Stainless steel bracelet", warranty: "5 years" },
  { name: "Velmara Deepblue", brand: "Velmara", category: "Diver", sku: "VEL-DPB-018", price: 8200, gender: Gender.MEN, movement: "Automatic", caseMaterial: "Titanium", caseDiameter: "44mm", dial: "Black", crystal: "Sapphire", waterResistance: "500m", strap: "Titanium bracelet", warranty: "4 years", bestSeller: true },
  { name: "Ostron Retrospect", brand: "Ostron", category: "Chronograph", sku: "OST-RET-019", price: 6900, gender: Gender.UNISEX, movement: "Automatic chronograph", caseMaterial: "Stainless steel", caseDiameter: "40mm", dial: "Blue panda", crystal: "Sapphire", waterResistance: "100m", strap: "Leather", warranty: "6 years" },
  { name: "Zephyr Sonnerie", brand: "Zephyr & Cie", category: "Complication", sku: "ZEP-SON-020", price: 18500, gender: Gender.MEN, movement: "Hand-wound", caseMaterial: "Titanium", caseDiameter: "42mm", dial: "Black skeleton", crystal: "Sapphire", waterResistance: "30m", strap: "Rubber", warranty: "8 years" },
];

const blogPosts = [
  {
    title: "The Quiet Revolution of Modern Watchmaking",
    slug: "quiet-revolution-modern-watchmaking",
    excerpt: "How a new generation of independent makers is redefining what it means to own a luxury timepiece.",
    content: "<p>Luxury watchmaking has long been defined by heritage. Today, a quiet revolution is underway: independent makers are embracing transparency, sustainability, and design restraint. Collectors now seek pieces that tell a personal story as much as a horological one. At Aurent, we celebrate this shift by curating watches that honor tradition while embracing the future.</p>",
    featuredImage: "/images/blog/watchmaking.jpg",
    status: "PUBLISHED",
  },
  {
    title: "Understanding Sapphire Crystal Dials",
    slug: "understanding-sapphire-crystal-dials",
    excerpt: "Why sapphire crystal remains the gold standard for scratch resistance in fine watchmaking.",
    content: "<p>Sapphire crystal is second only to diamond in hardness, making it the preferred choice for luxury timepieces. In this article we explore the manufacturing process, AR coatings, and why it matters for your daily watch.</p>",
    featuredImage: "/images/blog/sapphire.jpg",
    status: "PUBLISHED",
  },
  {
    title: "How We Authenticate Every Watch",
    slug: "how-we-authenticate-every-watch",
    excerpt: "A behind-the-scenes look at our multi-point inspection and provenance verification process.",
    content: "<p>Every watch that passes through Aurent is inspected for authenticity, condition, and provenance. Our team uses reference materials, movement photography, and serial number verification to ensure you receive a genuine timepiece.</p>",
    featuredImage: "/images/blog/authentication.jpg",
    status: "PUBLISHED",
  },
];

async function generateImages() {
  await mkdir(watchImagesDir, { recursive: true });
  const urls = [];
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const svg = watchSvg(p.brand, i, i % 6);
    const filename = `${p.sku.toLowerCase()}.svg`;
    const file = join(watchImagesDir, filename);
    await writeFile(file, svg);
    urls.push(`/images/watches/${filename}`);
  }
  return urls;
}

async function main() {
  const imageUrls = await generateImages();

  await prisma.$transaction([
    prisma.coupon.deleteMany(),
    prisma.newsletterSubscriber.deleteMany(),
    prisma.blogPost.deleteMany(),
    prisma.review.deleteMany(),
    prisma.wishlistItem.deleteMany(),
    prisma.wishlist.deleteMany(),
    prisma.cartItem.deleteMany(),
    prisma.cart.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.brand.deleteMany(),
    prisma.category.deleteMany(),
    prisma.address.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const adminPassword = await bcrypt.hash(process.env.ADMIN_SEED_PASSWORD ?? "AurentAdmin2026!", 10);
  const customerPassword = await bcrypt.hash(process.env.CUSTOMER_SEED_PASSWORD ?? "Customer2026!", 10);

  const admin = await prisma.user.create({
    data: { name: "Aurent Admin", email: "admin@aurent.com", password: adminPassword, role: "ADMIN" },
  });

  const customer = await prisma.user.create({
    data: { name: "Demo Customer", email: "customer@aurent.com", password: customerPassword, role: "CUSTOMER" },
  });

  const brandMap = {};
  for (const b of brands) {
    const created = await prisma.brand.create({ data: { ...b, logo: `/images/brands/${b.slug}.svg` } });
    brandMap[b.name] = created.id;
  }

  const categoryMap = {};
  for (const c of categories) {
    const created = await prisma.category.create({ data: c });
    categoryMap[c.name] = created.id;
  }

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const product = await prisma.product.create({
      data: {
        ...p,
        brandId: brandMap[p.brand],
        categoryId: categoryMap[p.category],
        slug: slugify(p.name),
        description: `The ${p.name} is a ${p.gender.toLowerCase()}'s ${p.category.toLowerCase()} watch powered by a ${p.movement} movement. It features a ${p.caseMaterial} ${p.caseDiameter} case, ${p.dial} dial, ${p.crystal} crystal, and ${p.waterResistance} water resistance. Finished on a ${p.strap}, it is backed by a ${p.warranty} guarantee.`,
        salePrice: null,
        stock: 5 + (i % 10),
        status: ProductStatus.ACTIVE,
      },
    });
    await prisma.productImage.create({
      data: { productId: product.id, imageUrl: imageUrls[i], isPrimary: true, sortOrder: 0 },
    });
  }

  const allProducts = await prisma.product.findMany();
  for (const product of allProducts.slice(0, 8)) {
    await prisma.review.create({
      data: {
        productId: product.id,
        userId: customer.id,
        rating: 4 + Math.floor(Math.random() * 2),
        title: "Excellent timepiece",
        comment: "Beautifully finished and keeps excellent time. A worthy addition to any collection.",
        status: "APPROVED",
      },
    });
  }

  for (const post of blogPosts) {
    await prisma.blogPost.create({
      data: { ...post, publishedAt: new Date(), status: "PUBLISHED" },
    });
  }

  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", type: "PERCENTAGE", value: 10, minimumAmount: 500, maximumUses: 100, status: "ACTIVE" },
      { code: "LUXURY200", type: "FIXED", value: 200, minimumAmount: 3000, maximumUses: 50, status: "ACTIVE" },
      { code: "EXPIRED50", type: "PERCENTAGE", value: 50, minimumAmount: 100, maximumUses: 1, expiresAt: new Date(Date.now() - 100000000), status: "INACTIVE" },
    ],
  });

  console.log(`Seeded admin: admin@aurent.com`);
  console.log(`Seeded customer: customer@aurent.com`);
  console.log(`Seeded ${allProducts.length} products, ${blogPosts.length} posts, reviews, and coupons.`);
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
