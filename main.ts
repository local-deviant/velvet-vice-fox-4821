// main.ts — entrypoint for gta6-meme-x-01 ("Post a GTA 6 meme on X").
//
// The entry is the X post itself, and this repository hands the house its
// address through POST.json at the repo root. All this program does is copy
// that file, byte for byte, into the output directory the grader reads.
// It uses only the Node standard library, touches no network and no clock,
// so two runs over the same repository produce identical output.

import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The repository root is the directory this file lives in; the harness may
// override it through MAKEFUN_BOT_DIR, and the output directory through
// MAKEFUN_OUTPUT_DIR. Defaults keep a plain `node main.ts` working too.
const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = process.env.MAKEFUN_BOT_DIR ?? here;
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");

const source = join(repoRoot, "POST.json");
if (!existsSync(source)) {
  throw new Error(`POST.json not found at ${source}`);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "POST.json"));
