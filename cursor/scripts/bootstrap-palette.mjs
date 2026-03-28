/**
 * One-off helper: prints oklch() strings from hex for palette authoring.
 * Usage: node scripts/bootstrap-palette.mjs
 */
import { parse, converter } from "culori";

const toOklch = converter("oklch");

function toOklchStr(hex) {
  const c = toOklch(parse(hex));
  if (!c) return hex;
  const h = c.h == null ? 0 : c.h;
  return `oklch(${c.l.toFixed(4)} ${c.c.toFixed(4)} ${h.toFixed(2)})`;
}

const darkHex = {
  surfaceEditor: "#050505",
  surfacePanel: "#0c0c0c",
  surfaceStatus: "#080808",
  surfaceInput: "#121212",
  surfaceHover: "#1a1a1a",
  surfaceHover2: "#181818",
  surfaceWidgetSelected: "#2a2a2a",
  surfaceButton: "#2a2a2a",
  surfaceButtonHover: "#3a3a3a",
  borderSubtle: "#222222",
  borderDefault: "#2a2a2a",
  textPrimary: "#ffffff",
  textEditor: "#f0f0f0",
  textMuted: "#c8c8c8",
  textInactive: "#a8a8a8",
  textDim: "#a0a0a0",
  lineNumber: "#6b6b6b",
  accentGold: "#ffcc33",
  accentGoldBright: "#ffdd55",
  accentGoldHot: "#ffe566",
  onAccent: "#050505",
  error: "#ff6b9d",
  warning: "#ffd000",
  info: "#00d4ff",
  mergeCurrent: "#00bfff",
  mergeIncoming: "#00ff88",
  transparent: "#00000000",
  shadow: "#00000080",
  scrollbar: "#6060604c",
  scrollbarHover: "#ffffff33",
  scrollbarActive: "#ffcc33ac",
  diffAdd: "#00ff8833",
  diffRemove: "#ff336633",
  selection: "#ffcc3340",
  selection2: "#00ffc620",
  selectionInactive: "#ffcc3328",
  lineHighlight: "#121212bf",
  whitespace: "#70707044",
  indentGuide: "#ffffff0d",
  indentGuideActive: "#ffffff1a",
  debugBg: "#3a1520",
  debugBorder: "#ff4488",
  welcomeTileHover: "#161616",
  welcomeProgressBg: "#1a1a1a",
};

console.log("=== dark.ui (paste into palette.oklch.json) ===");
for (const [k, v] of Object.entries(darkHex)) {
  console.log(`    "${k}": "${toOklchStr(v)}",`);
}
