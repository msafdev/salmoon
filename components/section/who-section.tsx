import Paragraph from "@/components/shared/paragraph";

const WhoSection = () => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-4">
      <Paragraph title="About me">
        <p>
          A fullstack developer with React since 2020. Building products that
          are just as beautiful as they are functional.
        </p>
      </Paragraph>
    </div>
  );
};

export default WhoSection;
