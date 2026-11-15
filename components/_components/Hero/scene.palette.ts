import type { Theme } from "@/components/utils/theme";

/**
 * The WebGL scene is the one part of the app that cannot read the CSS custom
 * properties in app/globals.css, so the palette is mirrored here as literal
 * values. Keep the two in step: these are the same hues as `--surface`,
 * `--surface-raised` and `--accent`, pitched for a lit 3D surface rather than
 * for flat type.
 */
export type ScenePalette = {
  /** Top-to-bottom tones for the four slabs of the stack. */
  layers: readonly [string, string, string, string];
  accent: string;
  /** Main light — direction, colour and strength of the key. */
  keyLight: { color: string; intensity: number };
  fillLight: { color: string; intensity: number };
  /** Warm rim that separates the slabs from the page behind them. */
  rimLight: { color: string; intensity: number };
  ambient: { color: string; intensity: number };
  material: { roughness: number; metalness: number };
  /** Brightness of the procedural studio reflections. */
  lightformer: { color: string; intensity: number };
  shadowOpacity: number;
};

const DARK: ScenePalette = {
  // Deliberately well above `--surface` (#1d1d1d). Slabs tinted to match the
  // page read as black silhouettes once lit; the object has to sit clearly in
  // front of the background for the depth to register at all.
  layers: ["#5e5e5e", "#515151", "#454545", "#3a3a3a"],
  accent: "#d8a373",
  keyLight: { color: "#fff6ec", intensity: 2.6 },
  fillLight: { color: "#9fb4c8", intensity: 0.6 },
  rimLight: { color: "#d8a373", intensity: 16 },
  ambient: { color: "#3a3a42", intensity: 1.1 },
  material: { roughness: 0.34, metalness: 0.24 },
  lightformer: { color: "#ffffff", intensity: 1.05 },
  shadowOpacity: 0.55,
};

const LIGHT: ScenePalette = {
  // The same problem as DARK, mirrored. Slabs tinted at page tone (#f7f5f2)
  // clip to flat white under the key and the object dissolves into the paper,
  // so the ramp is pitched well *below* the background instead: mid warm greys
  // that the key still lifts to near-white across the top faces while the
  // sides and undercuts stay dark enough to model the form.
  // Near-neutral on purpose: the key and the accent lightformer already pour
  // warmth over every lit face, so a ramp with much yellow left in it renders
  // as brown clay rather than as pale stone.
  layers: ["#d2cdc5", "#c7c1b8", "#bab3a9", "#aca498"],
  accent: "#b06c2c",
  keyLight: { color: "#fffaf2", intensity: 2.6 },
  fillLight: { color: "#cfd8e4", intensity: 0.5 },
  rimLight: { color: "#c67f32", intensity: 10 },
  // Kept low. A flood anywhere near the old 1.35 cancels the key, erases the
  // slab-on-slab shadows and flattens every bevel; cool-tinted so the shadow
  // side reads as skylight rather than as dirt on a warm surface. Not *too*
  // low either — the lower slabs sit under three others and crush to mud
  // without a little ambient to open them back up.
  ambient: { color: "#dfe4ec", intensity: 0.7 },
  material: { roughness: 0.38, metalness: 0.1 },
  lightformer: { color: "#ffffff", intensity: 0.9 },
  shadowOpacity: 0.3,
};

export const getScenePalette = (theme: Theme): ScenePalette =>
  theme === "light" ? LIGHT : DARK;

/**
 * The stack read bottom-up, mirroring how the skills data is actually grouped.
 * The 3D object is a diagram of the page's subject, not an ornament — these
 * labels are rendered as HTML beside the canvas so they stay selectable,
 * translatable and readable by assistive tech.
 */
export const STACK_LAYERS = [
  { id: "interface", label: "Interface", note: "React · Next.js" },
  { id: "logic", label: "Logic", note: "TypeScript · Server Actions" },
  { id: "data", label: "Data", note: "APIs · Caching" },
  { id: "platform", label: "Platform", note: "Security · Performance" },
] as const;
