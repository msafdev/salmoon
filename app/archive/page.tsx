import Paragraph from "@/components/shared/paragraph";

export default function Page() {
  return (
    <section
      id="archive"
      className="flex h-auto grow flex-col items-center gap-y-16 px-4 md:gap-y-20 lg:gap-y-24"
    >
      <Paragraph title="My grand archive.">
        <p>
          I am a sentimental person. I keep a record of my projects, blogs, and
          other things that I have done.
        </p>
        <p>
          Everything is here, it helps me understand how much I have grown and
          how much I have yet to learn.
        </p>
      </Paragraph>
      <div className="flex w-full flex-col items-center gap-y-5">
        <Paragraph title="What i wrote." />
      </div>
      <div className="flex w-full flex-col items-center gap-y-5">
        <Paragraph title="Little projects." />
      </div>
      <div className="flex w-full flex-col items-center gap-y-5">
        <Paragraph title="Free templates." />
      </div>
    </section>
  );
}
