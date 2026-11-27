// Runs visual-qa.mjs for every page and summarises the results.
//   VISUAL_QA_URL=http://localhost:3000/ node scripts/visual-qa-all.mjs [widths...]
import { execFile } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const widths = process.argv.slice(2).length ? process.argv.slice(2) : ["1440", "390"];
const only = process.env.VISUAL_QA_ONLY?.split(",");
const pages = only ?? ["", ...readdirSync("src/content/reference").map((file) => file.replace(/\.json$/, "").replaceAll("__", "/"))];
const results = [];

function run(page) {
  return new Promise((resolve) => {
    execFile(process.execPath, ["scripts/visual-qa.mjs", ...widths], { env: { ...process.env, VISUAL_QA_PAGE: page }, timeout: 240000, maxBuffer: 1e7 }, (error) => {
      const file = `.visual-qa/reports/compare${page ? "-" + page.replaceAll("/", "__") : ""}-${widths.join("-")}.json`;
      try {
        if (error) throw error;
        const report = JSON.parse(readFileSync(file, "utf8"));
        for (const [width, v] of Object.entries(report.viewports)) {
          const row = { page: "/" + page, width: Number(width), match: v.match, still: v.matchWithoutCanvas, height: [v.height.reference, v.height.local], text: [v.textElements.within1px, v.textElements.total] };
          results.push(row);
          console.log(`${row.page} ${width}  ${row.match}% / ${row.still}%  h ${row.height.join("/")}  text ${row.text.join("/")}`);
        }
      } catch (failure) {
        results.push({ page: "/" + page, error: failure.message.split("\n")[0] });
        console.log(`/${page} ERROR ${failure.message.split("\n")[0].slice(0, 200)}`);
      }
      resolve();
    });
  });
}

const queue = [...pages];
await Promise.all([0, 1, 2].map(async () => { while (queue.length) await run(queue.shift()); }));
results.sort((a, b) => a.page.localeCompare(b.page) || a.width - b.width);
writeFileSync(`.visual-qa/reports/summary${only ? "-partial" : ""}.json`, JSON.stringify(results, null, 1));
console.log("done", results.length);
