import { MoveRight } from "lucide-react";

const Paragraph = ({
  className,
  title,
  from,
  to,
  children,
}: {
  className?: string;
  title: string;
  from?: string;
  to?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="max-w-xl w-full flex flex-col gap-y-5">
      <div className="flex flex-col w-full gap-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {from && to && (
          <code className="text-sm flex items-center text-muted-foreground">
            {from}
            <MoveRight
              size={12}
              className="inline-block mx-2 text-foreground"
            />
            {to}
          </code>
        )}
      </div>
      <div className="text-muted-foreground flex flex-col gap-y-5 text-sm md:text-base">{children}</div>
    </div>
  );
};

export default Paragraph;
