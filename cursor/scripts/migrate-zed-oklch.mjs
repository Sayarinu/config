/**
 * Converts #hex color strings in ../../zed/Sayarin.json to oklch(...) using culori.
 * Run from repo: node cursor/scripts/migrate-zed-oklch.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { converter, parse } from "culori";

const __dirname = dirname(fileURLToPath(import.meta.url));
const zedPath = join(__dirname, "..", "..", "zed", "Sayarin.json");

const toOklch = converter("oklch");

const HEX = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function round(n, d) {
  const p = 10 ** d;
  return Math.round(n * p) / p;
}

function hexToOklch(str) {
  if (typeof str !== "string" || !HEX.test(str)) return str;
  const c = parse(str);
  if (!c) return str;
  const o = toOklch(c);
  if (!o) return str;
  const h = o.h == null ? 0 : o.h;
  const a = c.alpha;
  if (a !== undefined && a < 1) {
    return `oklch(${round(o.l, 4)} ${round(o.c, 4)} ${round(h, 2)} / ${round(a, 4)})`;
  }
  return `oklch(${round(o.l, 4)} ${round(o.c, 4)} ${round(h, 2)})`;
}

function walk(node) {
  if (Array.isArray(node)) {
    return node.map(walk);
  }
  if (node && typeof node === "object") {
    const out = {};
    for (const [k, v] of Object.entries(node)) {
      out[k] = walk(v);
    }
    return out;
  }
  return hexToOklch(node);
}

const raw = JSON.parse(readFileSync(zedPath, "utf8"));
const migrated = walk(raw);
writeFileSync(zedPath, JSON.stringify(migrated, null, 2) + "\n");
console.log("Migrated", zedPath, "to oklch()");
