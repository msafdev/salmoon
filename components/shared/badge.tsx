import dynamic from "next/dynamic";

const ShinyText = dynamic(() => import("@/components/shared/shiny-text"));

const Badge = () => {
  return (
    <div className="group mx-auto w-fit rounded-full border border-slate-200 bg-slate-100 text-sm font-mono text-white transition-all ease-in hover:bg-slate-200">
      <ShinyText className="inline-flex items-center justify-center px-3 py-1 transition ease-out hover:text-slate-600 hover:duration-300">
        <span>✨ Open for projects</span>
      </ShinyText>
    </div>
  );
};

export default Badge;
