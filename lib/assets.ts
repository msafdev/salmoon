// Places
import Place1 from "@/public/images/places/place-1.avif";
import Place2 from "@/public/images/places/place-2.avif";
import Place3 from "@/public/images/places/place-3.avif";
import Place4 from "@/public/images/places/place-4.avif";
import Elite from "@/public/images/projects/elite.webp";
import Kodeify from "@/public/images/projects/kodeify.webp";
// Projects
import Linked from "@/public/images/projects/linked.webp";
import Pagespeed from "@/public/images/projects/pagespeed.webp";
import Pleno from "@/public/images/projects/pleno.webp";

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
  {
    id: 4,
    src: Place4,
    rotation: 10,
    title: "gang",
  },
];

export const projectItems = [
  {
    slug: "pleno",
    title: "Pleno",
    image: Pleno,
    published: true,
    detail: true,
    demo: "https://pleno-green.vercel.app",
    github: "https://github.com/msafdev/pleno",
  },
  {
    slug: "linked",
    title: "Linked",
    image: Linked,
    published: true,
    demo: "https://linked-seven.vercel.app",
    github: "https://github.com/msafdev/linked",
  },
  {
    slug: "pagespeed",
    title: "Pagespeed",
    image: Pagespeed,
    published: true,
    detail: true,
    demo: "https://npmjs.com/package/@msafdev/pagespeed",
    github: "https://github.com/msafdev/pagespeed",
  },
  {
    slug: "kodeify",
    title: "Kodeify",
    image: Kodeify,
    published: true,
    detail: true,
    demo: "https://kodeify.vercel.app",
    github: "https://github.com/msafdev/kodeify",
  },
  {
    slug: "elite",
    title: "Elite",
    image: Elite,
    published: true,
    demo: "https://mdx-starter-theta.vercel.app",
    github: "https://github.Plenom/msafdev/elite",
  },
];
