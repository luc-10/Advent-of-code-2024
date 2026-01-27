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
    day4,
    day4Part1,
    day4Part2,
    day5,
    day5Part1,
    day5Part2,
    day6,
    day6Part1,
    day6Part2,
    day7,
    day7Part1,
    day7Part2,
    day8,
    day8Part1,
    day8Part2,
    day9,
    day9Part1,
    day9Part2,
    day10,
    day10Part1,
    day10Part2,
    day11,
    day11Part1,
    day11Part2,
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
    day4,
    day4Part1,
    day4Part2,
    day5,
    day5Part1,
    day5Part2,
    day6,
    day6Part1,
    day6Part2,
    day7,
    day7Part1,
    day7Part2,
    day8,
    day8Part1,
    day8Part2,
    day9,
    day9Part1,
    day9Part2,
    day10,
    day10Part1,
    day10Part2,
    day11,
    day11Part1,
    day11Part2,
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