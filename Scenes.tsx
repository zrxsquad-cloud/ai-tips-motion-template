import React from "react";
import { AbsoluteFill } from "remotion";
import { video } from "../data";
import { theme } from "../theme";
import { Orb } from "../components/Orb";
import { KineticWords } from "../components/KineticWords";
import { PushIn } from "../components/PushIn";
import { ChatWindow } from "../components/ChatWindow";
import { Checklist } from "../components/Checklist";
import { NodeDiagram } from "../components/NodeDiagram";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 15 } });
  return (
    <div
      style={{
        fontSize: 54,
        fontWeight: 800,
        color: theme.text,
        letterSpacing: -0.5,
        opacity: s,
        transform: `translateY(${(1 - s) * 22}px)`,
        textAlign: "center",
      }}
    >
      {children}
    </div>
  );
};

export const HookScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 54 }}>
      <Orb size={210} />
      <KineticWords words={video.hook.words} highlightLast />
    </div>
  </PushIn>
);

export const DemoScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
      <Heading>{video.demo.heading}</Heading>
      <ChatWindow promptText={video.demo.promptText} />
    </div>
  </PushIn>
);

export const ResultScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 44 }}>
      <Heading>{video.result.heading}</Heading>
      <Checklist items={video.result.items} />
    </div>
  </PushIn>
);

export const RuleScene: React.FC = () => (
  <PushIn>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 30 }}>
      <KineticWords words={video.rule.headingWords} fontSize={84} stagger={10} highlightLast />
      <NodeDiagram nodes={video.rule.nodes} />
    </div>
  </PushIn>
);

export const CtaScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame: Math.max(0, frame - 34), fps, config: { damping: 14 } });
  return (
    <PushIn>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40 }}>
        <Orb size={150} />
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 66, fontWeight: 800, color: theme.text }}>{video.cta.line1}</div>
          <div style={{ fontSize: 66, fontWeight: 800, color: theme.cyan }}>{video.cta.line2}</div>
        </div>
        <div
          style={{
            padding: "16px 34px",
            borderRadius: 999,
            border: `1.5px solid ${theme.glassBorder}`,
            background: theme.glass,
            color: theme.text,
            fontSize: 30,
            fontWeight: 650,
            opacity: s,
            transform: `scale(${0.85 + s * 0.15})`,
          }}
        >
          {video.cta.follow} 👆
        </div>
      </div>
    </PushIn>
  );
};

export const SceneFill: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>{children}</AbsoluteFill>
);
