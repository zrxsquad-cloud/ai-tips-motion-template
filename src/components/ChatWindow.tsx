import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { glassCard } from "./PushIn";

// A ChatGPT-style window. The prompt types itself character by character,
// the caret blinks, then the send button pulses. IMPROVEMENT over the
// reference: text is large (36px) so it stays legible in a phone feed.
export const ChatWindow: React.FC<{
  promptText: string;
  width?: number;
  typeStartFrame?: number;
  charsPerFrame?: number;
}> = ({ promptText, width = 780, typeStartFrame = 26, charsPerFrame = 0.9 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, mass: 0.9 } });
  const typed = Math.max(
    0,
    Math.min(promptText.length, Math.floor((frame - typeStartFrame) * charsPerFrame)),
  );
  const done = typed >= promptText.length;
  const caretOn = Math.floor(frame / 14) % 2 === 0;
  const sendPulse = done ? 1 + Math.sin((frame - typeStartFrame) / 5) * 0.06 : 1;
  const sendGlow = interpolate(typed, [promptText.length - 1, promptText.length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        ...glassCard,
        width,
        padding: "26px 30px 24px",
        transform: `scale(${0.92 + enter * 0.08}) translateY(${(1 - enter) * 34}px)`,
        opacity: enter,
      }}
    >
      {/* window chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <div key={c} style={{ width: 13, height: 13, borderRadius: "50%", background: c, opacity: 0.85 }} />
        ))}
        <div style={{ flex: 1, textAlign: "center", color: theme.textDim, fontSize: 19, fontWeight: 600 }}>
          ChatGPT
        </div>
        <div style={{ width: 55 }} />
      </div>

      {/* prompt bubble */}
      <div
        style={{
          marginLeft: "auto",
          maxWidth: "88%",
          background: "rgba(46,230,168,0.13)",
          border: "1px solid rgba(46,230,168,0.22)",
          borderRadius: "20px 20px 6px 20px",
          padding: "20px 24px",
          color: theme.text,
          fontSize: 36,
          lineHeight: 1.35,
          fontWeight: 550,
          minHeight: 118,
        }}
      >
        {promptText.slice(0, typed)}
        <span style={{ opacity: caretOn && !done ? 1 : 0, color: theme.cyan }}>|</span>
      </div>

      {/* input row */}
      <div
        style={{
          marginTop: 22,
          display: "flex",
          alignItems: "center",
          gap: 14,
          background: "rgba(0,0,0,0.28)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 999,
          padding: "12px 14px 12px 26px",
        }}
      >
        <div style={{ flex: 1, color: theme.textDim, fontSize: 24 }}>
          {done ? "Message sent ✓" : "Ask anything"}
        </div>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: theme.cyan,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            color: "#06231a",
            fontWeight: 900,
            transform: `scale(${sendPulse})`,
            boxShadow: `0 0 ${26 * sendGlow}px rgba(46,230,168,0.65)`,
          }}
        >
          ↑
        </div>
      </div>
    </div>
  );
};
