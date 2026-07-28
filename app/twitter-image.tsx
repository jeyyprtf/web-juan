import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Juan — AI Specialist & Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          color: "#fafafa",
          padding: "64px 72px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 28,
            color: "#a3a3a3",
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#0066FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            J
          </div>
          juan.web.id
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            AI Specialist
            <br />& Engineer
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a3a3a3",
              maxWidth: 820,
              lineHeight: 1.35,
            }}
          >
            Building intelligent systems, automation & AIoT that work in the
            real world.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            fontSize: 22,
            color: "#737373",
          }}
        >
          <span>AI Systems</span>
          <span>·</span>
          <span>AIoT</span>
          <span>·</span>
          <span>Full Stack</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
