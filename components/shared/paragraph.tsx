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
  children?: React.ReactNode;
}) => {
  return (
    <div className="flex w-full max-w-xl flex-col gap-y-5">
      <div className="flex w-full flex-col gap-y-2">
        <h2 className="text-xl font-semibold">{title}</h2>
        {from && to && (
          <code className="flex items-center text-sm text-muted-foreground">
            {from}
            <MoveRight
              size={12}
              className="mx-2 inline-block text-foreground"
            />
            {to}
          </code>
        )}
      </div>
      {children && (
        <div className="flex flex-col gap-y-5 text-sm text-muted-foreground md:text-base">
          {children}
        </div>
      )}
    </div>
  );
};

export default Paragraph;
