import {
  Building,
  CircleFadingPlus,
  Frame,
  Globe,
  HeartHandshake,
  PanelsTopLeft,
  Rss,
  Shuffle,
  Sparkle,
  User,
} from "lucide-react";
import validator from "validator";
import { z } from "zod";

export const userType = [
  {
    label: "Business",
    value: "business",
    icon: Building,
    description: "You're representing a company, organization, or startup.",
  },
  {
    label: "Individual",
    value: "individual",
    icon: User,
    description: "You're a freelancer, hobbyist, or solo creator.",
  },
  {
    label: "Non-profit",
    value: "non-profit",
    icon: HeartHandshake,
    description:
      "You're part of a charitable, educational, or community-driven organization.",
  },
  {
    label: "Other",
    value: "other",
    icon: Globe,
    description: "None of the above? Let's find the right fit together.",
  },
];

export const serviceType = [
  {
    label: "UI/UX Design",
    value: "design",
    icon: Frame,
  },
  {
    label: "Web Development",
    value: "webdev",
    icon: PanelsTopLeft,
  },
  {
    label: "Technical SEO",
    value: "seo",
    icon: Rss,
  },
  {
    label: "Brand Strategy",
    value: "branding",
    icon: Shuffle,
  },
  {
    label: "Content Writing",
    value: "content",
    icon: CircleFadingPlus,
  },
  {
    label: "Others",
    value: "other",
    icon: Sparkle,
  },
];

export const typeSchema = z.object({
  user_type: z.enum(["business", "individual", "non-profit", "other"]),
  budget: z.array(z.string().refine(validator.isCurrency)),
});

export const serviceSchema = z.object({
  service_type: z.array(z.string()).min(1, "Select at least one service"),
});

export const basicSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z
    .string()
    .refine(validator.isMobilePhone, { message: "Invalid phone number" }),
  message: z.string().min(10),
});

export const detailSchema = z.object({
  meeting_date: z.string(),
});

export const contactSchema = typeSchema
  .merge(serviceSchema)
  .merge(basicSchema)
  .merge(detailSchema);
