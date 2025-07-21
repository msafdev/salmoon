import Place1 from "@/public/images/places/place-1.avif";
import Place2 from "@/public/images/places/place-2.avif";
import Place3 from "@/public/images/places/place-3.avif";
import Place4 from "@/public/images/places/place-4.avif";
import Template2 from "@/public/images/templates/elite.webp";
import Template1 from "@/public/images/templates/pleno.webp";

export const placeItems = [
  {
    id: 1,
    src: Place1,
    rotation: -5,
  },
  {
    id: 2,
    src: Place2,
    rotation: 8,
  },
  {
    id: 3,
    src: Place3,
    rotation: -3,
  },
  {
    id: 4,
    src: Place4,
    rotation: 10,
  },
];

export const templateItems = [
  {
    slug: "pleno",
    title: "Pleno",
    image: Template1,
    description:
      "A minimalist blog starter using Next.js, Velite, and Tailwind.",
    published: true,
    demo: "https://mdx-starter-theta.vercel.app",
    github: "https://github.com/msafdev/pleno",
  },
  {
    slug: "elite",
    title: "Elite",
    image: Template2,
    description:
      "A minimalist blog starter using Astro, React.js, and Tailwind.",
    published: true,
    demo: "https://mdx-starter-theta.vercel.app",
    github: "https://github.com/msafdev/elite",
  },
];
