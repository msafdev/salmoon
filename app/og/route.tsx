import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Salmoon";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-white relative">
        <div
          tw="absolute inset-0 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_20%,transparent_40%,#63e_100%)]"
          style={{
            background:
              "radial-gradient(125% 125% at 50% 20%, #fff 40%, #63e 100%)",
          }}
        />
        <div tw="flex flex-col w-full py-12 px-4 items-center justify-between">
          <h2 tw="text-4xl font-bold text-center">{title}</h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
