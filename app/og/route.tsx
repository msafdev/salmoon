import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let blogTitle = url.searchParams.get("blogTitle") || "Portfolio Website";

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
          fontWeight: 600,
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
            left: 42,
            bottom: 42,
            position: "absolute",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            🚀 salmoon
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            padding: "20px 50px",
            margin: "0 42px",
            fontSize: 40,
            width: "auto",
            maxWidth: 550,
            textAlign: "center",
            color: "black",
            lineHeight: 1.4,
          }}
        >
          {blogTitle}
        </div>
      </div>
    ),
    {
      width: 900,
      height: 400,
    },
  );
}
