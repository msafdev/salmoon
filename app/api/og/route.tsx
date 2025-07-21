import { ImageResponse } from "next/og";

export const runtime = "edge";

const getInstrumentSerif = async () => {
  const response = await fetch(
    new URL("@/public/fonts/InstrumentSerif.ttf", import.meta.url),
  );
  const instrumentSerif = await response.arrayBuffer();

  return instrumentSerif;
};

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          width: "100%",
          alignItems: "flex-end",
          justifyContent: "flex-end",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            fontSize: 42,
            fontWeight: 500,
            width: "100%",
            paddingLeft: 96,
            paddingBottom: 8,
            fontFamily: '"InstrumentSerif"',
          }}
        >
          Portfolio
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            fontSize: 42,
            fontWeight: 500,
            width: "100%",
            paddingLeft: 96,
            paddingBottom: 96,
            fontFamily: '"InstrumentSerif"',
          }}
        >
          Salmoon, Product Engineer
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "InstrumentSerif",
          data: await getInstrumentSerif(),
          style: "normal",
        },
      ],
    },
  );
}
