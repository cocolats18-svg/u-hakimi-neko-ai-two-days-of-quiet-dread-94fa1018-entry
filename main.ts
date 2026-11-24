// Two Days of Quiet Dread — one-line code review comment.
//
// Writes a single line to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output):
// a tired engineer's approval carrying quiet existential dread.
// The text is a fixed constant, so every run produces byte-identical output:
// no randomness, no clock, no environment input beyond the output directory.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "LGTM. Clean diff, green tests, and the quiet knowledge that this code will outlive the team that wrote it.";

function main(): void {
  // The gate requires a single line of 1-140 characters.
  if (LINE.length < 1 || LINE.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
  }
  if (LINE.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry must be a single line");
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), LINE + "\n", "utf8");
}

main();
