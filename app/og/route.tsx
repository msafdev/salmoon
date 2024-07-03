import { ImageResponse } from "next/og";

export function GET(request: Request) {
  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          letterSpacing: "-.02em",
          fontWeight: 700,
          backgroundColor: "white",
          backgroundImage:
            "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
          backgroundSize: "50px 70px",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            height: "400px",
            width: "400px",
            transform: "translate(-50%, -50%)",
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffffff, white)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: 64,
            width: "auto",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          🚀
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
