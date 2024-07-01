export type PostType = {
  title: string;
  date: string;
  slug: string;
  categories: categoryType[];
};

export type categoryType =
  | "frontend"
  | "ui/ux"
  | "animation"
  | "backend"
  | "personal";

export const blogItems: PostType[] = [
  {
    title: "Exploring the Beauty of Nature",
    date: "07/01/24",
    slug: "exploring-the-beauty-of-nature",
    categories: ["personal"],
  },
  {
    title: "The Future of Technology",
    date: "14/02/24",
    slug: "the-future-of-technology",
    categories: ["frontend"],
  },
  {
    title: "Animated Web Design",
    date: "15/04/24",
    slug: "animated-web-design",
    categories: ["animation"],
  },
  {
    title: "Understanding the Stock Market",
    date: "09/05/24",
    slug: "understanding-the-stock-market",
    categories: ["backend"],
  },
  {
    title: "Culinary Delights: Recipes from Around the World",
    date: "18/06/24",
    slug: "culinary-delights-recipes-from-around-the-world",
    categories: ["personal"],
  },
  {
    title: "The Art of Mindfulness",
    date: "01/07/24",
    slug: "the-art-of-mindfulness",
    categories: ["ui/ux"],
  },
  {
    title: "Home Gardening for Beginners",
    date: "12/08/24",
    slug: "home-gardening-for-beginners",
    categories: ["animation"],
  },
  {
    title: "Fitness Routines That Work",
    date: "23/09/24",
    slug: "fitness-routines-that-work",
    categories: ["frontend"],
  },
  {
    title: "Sustainable Living: Tips and Tricks",
    date: "04/10/24",
    slug: "sustainable-living-tips-and-tricks",
    categories: ["personal"],
  },
  {
    title: "The Best Books of 2024",
    date: "15/11/24",
    slug: "the-best-books-of-2024",
    categories: ["backend"],
  },
  {
    title: "Learning a New Language: A Complete Guide",
    date: "26/12/24",
    slug: "learning-a-new-language-a-complete-guide",
    categories: ["frontend"],
  },
  {
    title: "Budget Travel: See the World on a Dime",
    date: "07/01/25",
    slug: "budget-travel-see-the-world-on-a-dime",
    categories: ["ui/ux"],
  },
  {
    title: "Cooking on a Budget",
    date: "18/02/25",
    slug: "cooking-on-a-budget",
    categories: ["animation"],
  },
  {
    title: "Mastering the Art of Public Speaking",
    date: "23/05/25",
    slug: "mastering-the-art-of-public-speaking",
    categories: ["personal"],
  },
  {
    title: "How to Start a Small Business",
    date: "15/07/25",
    slug: "how-to-start-a-small-business",
    categories: ["backend"],
  },
  {
    title: "Understanding Cryptocurrency",
    date: "26/08/25",
    slug: "understanding-cryptocurrency",
    categories: ["backend"],
  },
  {
    title: "Interior Design Tips for Small Spaces",
    date: "06/09/25",
    slug: "interior-design-tips-for-small-spaces",
    categories: ["ui/ux"],
  },
];

export const recentBlogs = blogItems.slice(0, 4);
