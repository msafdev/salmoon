import Paragraph from "@/components/shared/paragraph";

export default function Page() {
  return (
    <section
      id="lab"
      className="flex flex-col h-auto grow items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4"
    >
      <Paragraph title="My humble abode.`">
        <p>
          This is my lab, where I explore and experiment with component design
          and interaction.
        </p>
      </Paragraph>
      
      <div className="max-w-xl w-full grid sm:grid-cols-2 gap-4">
        <div className="h-auto w-full aspect-square xs:aspect-video sm:aspect-square border rounded-xl"/>
      </div>
    </section>
  );
}
