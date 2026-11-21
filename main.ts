// GTA 6 meme entry — entrypoint.
// Copies POST.json (the address of the X post carrying the meme)
// into the output directory. Node 22 standard library only:
// no network, no clock, fully deterministic.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const source = join(here, "POST.json");

// Fail loudly (non-zero exit) if the post address is missing, instead of
// silently producing an empty output directory.
if (!existsSync(source)) {
  console.error(`POST.json not found at ${source}`);
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
copyFileSync(source, join(outDir, "POST.json"));
console.log(`POST.json -> ${join(outDir, "POST.json")}`);
