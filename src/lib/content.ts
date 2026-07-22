export const site = {
  name: "UNITED SPORTS",
  tagline: "YOUR STORE FOR THE GAME.",
  description: "Premium sports equipment, apparel, and footwear in Wadakkancherry, Thrissur.",
};

export const nav = {
  links: [
    { label: "Products", href: "#products" },
    { label: "About", href: "#about" },
    { label: "Location", href: "#location" },
  ],
};

export const hero = {
  headline: "GEAR UP FOR GLORY",
  subtitle: "Wadakkancherry's destination for premium sports gear.",
  ctaPrimary: { label: "Explore Products", href: "#products" },
  ctaSecondary: { label: "Find Us", href: "#location" },
};

export const categories = [
  {
    title: "Jerseys & Apparel",
    subtitle: "Performance wear for every sport",
    href: "/products?category=Apparel",
  },
  {
    title: "Footwear",
    subtitle: "Train. Run. Compete.",
    href: "/products?category=Footwear",
  },
  {
    title: "Training Equipment",
    subtitle: "Build your strength",
    href: "/products?category=Training",
  },
  {
    title: "Accessories",
    subtitle: "The finishing touch",
    href: "/products?category=Accessories",
  },
];

export const about = {
  headline: "BUILT FOR ATHLETES. ROOTED IN WADAKKANCHERRY.",
  body: "United Sports brings premium athletic gear to the heart of Thrissur. We don't just sell equipment — we outfit ambition. Every product in our store is chosen for quality, durability, and performance. Because when you show up to play, you deserve the best.",
  stats: [
    { value: "500+", label: "Products" },
    { value: "1,000+", label: "Happy Athletes" },
    { value: "5+", label: "Years Serving" },
  ],
};

export const location = {
  headline: "FIND US",
  address: "Opposite Boys School, Wadakkancherry, Thrissur, Kerala 680623",
  googleMapsUrl: "https://maps.google.com/maps?q=Opposite+Boys+School+Wadakkancherry+Thrissur+Kerala&output=embed",
  googleMapsDirectionsUrl: "https://maps.google.com/maps?daddr=Opposite+Boys+School+Wadakkancherry+Thrissur+Kerala",
  hours: [
    { day: "Monday – Saturday", time: "9:30 AM – 8:30 PM" },
    { day: "Sunday", time: "10:30 AM – 6:30 PM" },
  ],
  phone: "ADD_PHONE_NUMBER",
};

export const footer = {
  copyright: `\u00a9 ${new Date().getFullYear()} United Sports. All rights reserved.`,
};
