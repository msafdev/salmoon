// Places
import Place1 from "@/public/images/places/place-1.avif";
import Place2 from "@/public/images/places/place-2.avif";
import Place3 from "@/public/images/places/place-3.avif";
// Projects
import Template2 from "@/public/images/templates/elite.webp";
import Template4 from "@/public/images/templates/kodeify.webp";
import Template3 from "@/public/images/templates/pagespeed.webp";
import Template1 from "@/public/images/templates/pleno.webp";

export const placeItems = [
  {
    id: 1,
    src: Place1,
    rotation: -5,
    title: "bali!!",
  },
  {
    id: 2,
    src: Place2,
    rotation: 8,
    title: "bookies",
  },
  {
    id: 3,
    src: Place3,
    rotation: -3,
    title: "beach :3",
  },
];

export const templateItems = [
  {
    slug: "pleno",
    title: "Pleno",
    image: Template1,
    published: true,
    demo: "https://pleno-green.vercel.app",
    github: "https://github.com/msafdev/pleno",
  },
  {
    slug: "elite",
    title: "Elite",
    image: Template2,
    published: true,
    demo: "https://mdx-starter-theta.vercel.app",
    github: "https://github.com/msafdev/elite",
  },
  {
    slug: "pagespeed",
    title: "Pagespeed",
    image: Template3,
    published: true,
    github: "https://github.com/msafdev/pagespeed",
  },
  {
    slug: "kodeify",
    title: "Kodeify",
    image: Template4,
    published: true,
    demo: "https://kodeify.vercel.app",
    github: "https://github.com/msafdev/kodeify",
  },
];
