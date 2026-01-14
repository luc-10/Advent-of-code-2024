import {
    day1,
    day1Part1,
    day1Part2,
    day2,
    day2Part1,
    day2Part2,
    day3,
    day3Part1,
    day3Part2,
} from "./days";

if (process.argv.length < 3) {
    console.log("Usage: npx ts-node main.ts <day>");
    process.exit(1);
}

const day = process.argv[2];

const stringToFuncMap: Record<string, () => void> = {
    day1,
    day1Part1,
    day1Part2,
    day2,
    day2Part1,
    day2Part2,
    day3,
    day3Part1,
    day3Part2,
};

const f = stringToFuncMap[day];

if (!f) {
    console.log("Day not valid:", day);
    process.exit(1);
}

const start = performance.now();
f();
const elapsed = performance.now() - start;

console.log("Time:", `${elapsed.toFixed(2)} ms`);