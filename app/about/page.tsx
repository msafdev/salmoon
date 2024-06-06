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
      <HistorySection />
    </section>
  );
}
