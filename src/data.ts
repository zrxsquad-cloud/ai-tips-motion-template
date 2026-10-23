// ── EDIT YOUR VIDEO HERE ────────────────────────────────────────────────────
// Every word on screen lives in this file. Change the text, re-render, done.
// Durations are in FRAMES at 30fps (30 frames = 1 second).

export const HAS_VOICEOVER = false; // set true after adding public/audio/voiceover.mp3

export const video = {
  hook: {
    // Scene 1 — the orb + kinetic words
    words: ["Let", "AI", "think", "for", "you."],
    durationInFrames: 95,
  },
  demo: {
    // Scene 2 — ChatGPT window, the prompt types itself
    heading: "Open ChatGPT and type",
    promptText: "Act as an expert. Help me complete this task step by step.",
    durationInFrames: 250,
  },
  result: {
    // Scene 3 — what the prompt gives back: an animated plan
    heading: "You get a full plan",
    items: [
      "Breaks the task into clear steps",
      "Asks questions before starting",
      "Works like a real expert",
    ],
    durationInFrames: 190,
  },
  rule: {
    // Scene 4 — the rule: feed the AI the right inputs
    headingWords: ["Tell", "AI"],
    nodes: [
      { icon: "◎", label: "Your goal" },
      { icon: "♟", label: "Your audience" },
    ],
    durationInFrames: 215,
  },
  cta: {
    // Scene 5 — outro
    line1: "Better prompts.",
    line2: "Better answers.",
    follow: "Follow for daily AI tips",
    durationInFrames: 120,
  },
};

// Transition length between scenes (frames). Total runtime ≈
// sum(durations) − 4 × TRANSITION = 870 − 48 ≈ 822 frames ≈ 27.4s
export const TRANSITION_FRAMES = 12;

export const TOTAL_FRAMES =
  video.hook.durationInFrames +
  video.demo.durationInFrames +
  video.result.durationInFrames +
  video.rule.durationInFrames +
  video.cta.durationInFrames -
  4 * TRANSITION_FRAMES;
