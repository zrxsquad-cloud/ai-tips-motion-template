import React from "react";
import { Composition } from "remotion";
import { FPS } from "./theme";
import { TOTAL_FRAMES } from "./data";
import { PromptTip } from "./PromptTip";

export const Root: React.FC = () => {
  return (
    <>
      {/* Square 1:1 — same format as the reference video (FB/IG feed) */}
      <Composition
        id="PromptTip"
        component={PromptTip}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1080}
      />
      {/* Vertical 9:16 — same template for Reels/Shorts */}
      <Composition
        id="PromptTipVertical"
        component={PromptTip}
        durationInFrames={TOTAL_FRAMES}
        fps={FPS}
        width={1080}
        height={1920}
      />
    </>
  );
};
