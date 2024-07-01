import Paragraph from "@/components/shared/paragraph";

import BlogSection from "@/components/section/blog-section";

export default function Page() {
  return (
    <section
      id="blog"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <div className="flex w-full max-w-xl flex-col items-center gap-y-4">
        <BlogSection />
      </div>
    </section>
  );
}
