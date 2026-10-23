import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { theme } from "../theme";
import { glassCard } from "./PushIn";
import { Orb } from "./Orb";

// Input cards (goal / audience) feeding the AI orb. Connector lines draw in,
// then light pulses travel along them into the orb — sells the idea that
// "what you feed the AI" flows into the answer.
export const NodeDiagram: React.FC<{
  nodes: { icon: string; label: string }[];
}> = ({ nodes }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const W = 860;
  const H = 460;
  const orbX = 660;
  const orbY = H / 2;
  const cardX = 30;
  const cardW = 330;
  const cardH = 92;
  const cardYs = nodes.map((_, i) => (i + 0.5) * (H / nodes.length) - cardH / 2);

  return (
    <div style={{ position: "relative", width: W, height: H }}>
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        {cardYs.map((cy, i) => {
          const y = cy + cardH / 2;
          const draw = interpolate(frame, [26 + i * 10, 52 + i * 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          // pulse dot travelling card → orb
          const t = ((frame - 60 - i * 16) % 52) / 52;
          const px = cardX + cardW + (orbX - cardX - cardW) * Math.max(0, t);
          const py = y + (orbY - y) * Math.max(0, t);
          return (
            <g key={i}>
              <path
                d={`M ${cardX + cardW} ${y} C ${cardX + cardW + 130} ${y}, ${orbX - 130} ${orbY}, ${orbX} ${orbY}`}
                fill="none"
                stroke="rgba(46,230,168,0.4)"
                strokeWidth="2.5"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - draw}
              />
              {frame > 60 && (
                <circle cx={px} cy={py} r="6" fill={theme.cyanBright}>
                </circle>
              )}
            </g>
          );
        })}
      </svg>

      {nodes.map((n, i) => {
        const s = spring({
          frame: Math.max(0, frame - 8 - i * 12),
          fps,
          config: { damping: 14 },
        });
        return (
          <div
            key={i}
            style={{
              ...glassCard,
              position: "absolute",
              left: cardX,
              top: cardYs[i],
              width: cardW,
              height: cardH,
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "0 26px",
              opacity: s,
              transform: `translateX(${(1 - s) * -44}px)`,
            }}
          >
            <span style={{ fontSize: 36, color: theme.cyan }}>{n.icon}</span>
            <span style={{ fontSize: 30, fontWeight: 650, color: theme.text, whiteSpace: "nowrap" }}>{n.label}</span>
          </div>
        );
      })}

      <div style={{ position: "absolute", left: orbX - 85, top: orbY - 85 }}>
        <Orb size={170} delay={20} />
      </div>
    </div>
  );
};
