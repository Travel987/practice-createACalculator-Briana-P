// calculator.js  (Node.js)

// ----- functions (using Math) -----
const calc = {
  absolute: (n) => Math.abs(n),
  power: (base, exp) => Math.pow(base, exp),
  sqrt: (n) => Math.sqrt(n),
  maxMin: (arr) => ({ max: Math.max(...arr), min: Math.min(...arr) }),
  randInt: (start, end) => Math.floor(Math.random() * (end - start + 1)) + start,
  roundTo: (n, places) => Number(n.toFixed(places)),
};

// ----- quick interactive menu -----
const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (a) => res(a)));

async function main() {
  console.log("\nSimple Calculator");
  console.log("1) Absolute  2) Power  3) Square Root");
  console.log("4) Max/Min   5) Random Int  6) Round  7) Quit\n");

  const choice = (await ask("Choose 1-7: ")).trim();

  if (choice === "1") {
    const n = parseFloat(await ask("Number: "));
    console.log("Absolute:", calc.absolute(n));
  } else if (choice === "2") {
    const b = parseFloat(await ask("Base: "));
    const e = parseFloat(await ask("Exponent: "));
    console.log("Power:", calc.power(b, e));
  } else if (choice === "3") {
    const n = parseFloat(await ask("Number: "));
    console.log("Square root:", calc.sqrt(n));
  } else if (choice === "4") {
    const raw = await ask("Numbers (comma-separated): ");
    const arr = raw.split(",").map((x) => parseFloat(x.trim())).filter((x) => !Number.isNaN(x));
    const { max, min } = calc.maxMin(arr);
    console.log("Max:", max, "Min:", min);
  } else if (choice === "5") {
    const s = parseInt(await ask("Start: "));
    const e = parseInt(await ask("End: "));
    console.log("Random number:", calc.randInt(s, e));
  } else if (choice === "6") {
    const n = parseFloat(await ask("Number: "));
    const d = parseInt(await ask("Decimal places: "));
    console.log("Rounded:", calc.roundTo(n, d));
  } else {
    console.log("Goodbye!");
    rl.close();
    return;
  }

  // restart menu
  main();
}

main();