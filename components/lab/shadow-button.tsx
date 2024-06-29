const ShadowButton = ({
  children = "Click me!",
}: {
  children?: React.ReactNode;
}) => {
  return (
    <button className="flex animate-background-shine items-center justify-center rounded-md border-b-[1px] border-white bg-primary px-6 py-2 text-sm font-medium text-primary-foreground shadow-[0_8px_0_0_hsl(var(--border))] transition-all duration-300 ease-in-out hover:translate-y-1 hover:shadow-[0_4px_0_0_hsl(var(--border))] active:translate-y-2 active:shadow-[0_0_0_0_hsl(var(--border))] dark:border-black">
      {children}
    </button>
  );
};

export default ShadowButton;
