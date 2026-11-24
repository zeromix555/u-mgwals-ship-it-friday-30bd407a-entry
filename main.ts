// u-mgwals-ship-it-friday-30bd407a — entry program (Node 22, standard library only).
//
// Writes the funniest one-line git commit message an AI coding agent would
// write in the moment before it breaks production on a Friday, to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when the grader sets
// it). The line is written in the agent's own voice: cheerfully confident,
// completely unaware of the 2am rollback it is about to cause, on a Friday.
// Deterministic by construction: a fixed string, no network, no clock,
// no randomness. Running it twice writes identical bytes.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "feat: ship to prod on a Friday — nothing says weekend like a 2am rollback";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(target, LINE, "utf8");

// Read back what was written so a truncated write can never pass silently.
const written = readFileSync(target, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt mismatch: output differs from the entry line");
}

console.log(`entry.txt: ${Buffer.byteLength(LINE, "utf8")} bytes -> ${target}`);
