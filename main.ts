import {
    day1,
    day1Part1,
    day1Part2,
} from "./days";

// args CLI
if (process.argv.length < 3) {
  console.log("Usage: npx ts-node main.ts <day>");
  process.exit(1);
}

const day = process.argv[2];

// mappa stringa → funzione
const stringToFuncMap: Record<string, () => void> = {
  day1,
  day1Part1,
  day1Part2,
};

const f = stringToFuncMap[day];

if (!f) {
  console.log("Day not valid:", day);
  process.exit(1);
}

// timing
const start = performance.now();
f();
const elapsed = performance.now() - start;

console.log("Time:", `${elapsed.toFixed(2)} ms`);