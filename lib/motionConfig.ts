/**
 * Centralized Motion & Scroll Configuration
 * 
 * Defines standard retro stepped easings, transitions, and scene scroll offsets
 * for clean, consistent motion across all scenes.
 */

export const motionConfig = {
  // Retro Stepped Easing Curves
  steppedEase: 'steps(4, jump-end)',
  quickSnapEase: [0.16, 1, 0.3, 1] as const,

  // Standard Scene Durations
  durations: {
    quick: 0.25,
    normal: 0.45,
    slow: 0.8,
  },

  // Scroll Viewport Triggers
  viewport: {
    once: true,
    amount: 0.2,
    margin: '-60px',
  },

  // Scene Heights for Scroll Story (Desktop viewport height multipliers)
  scenes: {
    hero: { id: 'home', title: 'Workstation', minHeightVh: 100 },
    about: { id: 'about', title: 'About', minHeightVh: 100 },
    projects: { id: 'projects', title: 'Projects', minHeightVh: 160 },
    skills: { id: 'skills', title: 'Capabilities', minHeightVh: 100 },
    contact: { id: 'contact', title: 'Terminal & Radar', minHeightVh: 100 },
  },
} as const;

