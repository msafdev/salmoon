import dynamic from "next/dynamic";

const ProfileSection = dynamic(
  () => import("@/app/about/_section/profile-section")
);
const HistorySection = dynamic(
  () => import("@/app/about/_section/history-section")
);

export default function Page() {
  return (
    <section
      id="about"
      className="flex flex-col items-center gap-y-16 md:gap-y-20 lg:gap-y-24 px-4"
    >
      <ProfileSection />
      <HistorySection title="A brief history." from="2002" to="2020">
        I started my journey designing avatars and signatures for forums. As I
        had a natural talent for drawing since childhood, I swiftly discovered
        my purpose, which was to unleash my creativity.
        <span />
        From 2010 to 2014 I worked as print & advertise agent at a local shop
        where I ventured into photo editing, print design, logos and other
        related graphic work.
        <span />
        In 2014, I joined a small design agency as a Senior Designer for a fixed
        term of 6 months, where I focused on creating logos and webpages.
      </HistorySection>
      <HistorySection title="Where it all started." from="2020" to="2023">
        I started my journey designing avatars and signatures for forums. As I
        had a natural talent for drawing since childhood, I swiftly discovered
        my purpose, which was to unleash my creativity.
        <span />
        From 2010 to 2014 I worked as print & advertise agent at a local shop
        where I ventured into photo editing, print design, logos and other
        related graphic work.
        <span />
        In 2014, I joined a small design agency as a Senior Designer for a fixed
        term of 6 months, where I focused on creating logos and webpages.
      </HistorySection>
      <HistorySection title="Present time." from="2024" to="present">
        I started my journey designing avatars and signatures for forums. As I
        had a natural talent for drawing since childhood, I swiftly discovered
        my purpose, which was to unleash my creativity.
        <span />
        From 2010 to 2014 I worked as print & advertise agent at a local shop
        where I ventured into photo editing, print design, logos and other
        related graphic work.
        <span />
        In 2014, I joined a small design agency as a Senior Designer for a fixed
        term of 6 months, where I focused on creating logos and webpages.
      </HistorySection>
    </section>
  );
}
