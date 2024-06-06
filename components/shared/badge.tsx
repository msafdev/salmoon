import dynamic from "next/dynamic";

const ShinyText = dynamic(() => import("@/components/shared/shiny-text"));

const Badge = () => {
  return (
    <div className="group mx-auto w-fit rounded-full border bg-muted text-sm font-mono text-muted-foreground transition-all ease-in hover:bg-accent">
      <ShinyText className="inline-flex items-center justify-center px-3 py-1 transition ease-out hover:text-accent-foreground hover:duration-300">
        <span>✨ Open for collabs</span>
      </ShinyText>
    </div>
  );
};

export default Badge;
