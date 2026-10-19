// Phase gate audit: run against a production build.
//   npm run build && npm start        (serves on :3000)
//   npm run audit                     (or: node scripts/audit.mjs http://localhost:3100)
//
// Checks, for every URL in the production baseline (docs/baseline/pages.json):
//   1. status, <title>, meta description and canonical match production
//   2. axe-core WCAG 2.2 A/AA scan, console errors, href="#" links
//   3. every internal link found on those pages resolves
//   4. production's 308 redirects still redirect to the same place
// Exits 1 if anything fails. Needs Chrome; set CHROME_PATH if it isn't in the default place.
import fs from "node:fs/promises";
import { createRequire } from "node:module";
import puppeteer from "puppeteer-core";

const ORIGIN = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const PROD = "https://piermontstudios.com";
const CHROME =
  process.env.CHROME_PATH ??
  {
    win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  }[process.platform] ??
  "/usr/bin/google-chrome";

const REDIRECTS = [
  ["/services", "/solutions"],
  ["/projects", "/case-studies"],
  ["/work", "/case-studies"],
  ["/work/augen-pro", "/case-studies/website-design/augen-pro"],
  ["/work/times-square-switch", "/case-studies/video-editing/times-square-switch"],
];

const baseline = JSON.parse(await fs.readFile("docs/baseline/pages.json", "utf8"));
const axeSource = await fs.readFile(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').trim();
const pick = (html, re) => decode(html.match(re)?.[1] ?? "");

const failures = [];
const fail = (where, what) => failures.push(`${where}: ${what}`);

// 1 + 4: plain HTTP checks.
for (const page of baseline) {
  const path = new URL(page.url).pathname;
  const res = await fetch(ORIGIN + path, { redirect: "manual" });
  const html = await res.text();
  if (res.status !== page.status) fail(path, `status ${res.status}, production ${page.status}`);
  const local = {
    title: pick(html, /<title[^>]*>([^<]*)<\/title>/i),
    description: pick(html, /<meta name="description" content="([^"]*)"/i),
    canonical: pick(html, /<link rel="canonical" href="([^"]*)"/i),
  };
  for (const key of ["title", "description", "canonical"]) {
    if (local[key] !== decode(page[key] ?? "")) fail(path, `${key} "${local[key]}" vs production "${page[key]}"`);
  }
}
for (const [from, to] of REDIRECTS) {
  const res = await fetch(ORIGIN + from, { redirect: "manual" });
  const location = (res.headers.get("location") ?? "").replace(ORIGIN, "");
  if (res.status !== 308 || location !== to) fail(from, `redirect ${res.status} to "${location}", expected 308 to ${to}`);
}

// 2: browser checks.
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
const links = new Set();
let violations = 0;
for (const page of baseline) {
  const path = new URL(page.url).pathname;
  const tab = await browser.newPage();
  const errors = [];
  tab.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  tab.on("pageerror", (e) => errors.push(e.message));
  await tab.setViewport({ width: 1440, height: 900 });
  // "load", not "networkidle0": looping background video keeps the network busy forever.
  try {
    await tab.goto(ORIGIN + path, { waitUntil: "load", timeout: 120000 });
  } catch (e) {
    fail(path, `navigation: ${e.message}`);
    await tab.close();
    continue;
  }
  // Let entrance animations (title blur-ins, reveals) finish; axe checks the settled page.
  await new Promise((r) => setTimeout(r, 1500));
  await tab.addScriptTag({ content: axeSource });
  const result = await tab.evaluate(async () => {
    const r = await window.axe.run(document, {
      runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"],
    });
    return {
      violations: r.violations.map((v) => `${v.impact} ${v.id} (${v.nodes.length}): ${v.nodes[0]?.target.join(" ")}`),
      hashLinks: document.querySelectorAll('a[href="#"]').length,
      hrefs: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
    };
  });
  for (const v of result.violations) fail(path, `axe ${v}`);
  violations += result.violations.length;
  if (result.hashLinks) fail(path, `${result.hashLinks} href="#" link(s)`);
  // 404 pages log the failed document request; that one is expected.
  for (const e of errors.filter((e) => !(page.status === 404 && /404/.test(e)))) fail(path, `console: ${e}`);
  for (const href of result.hrefs) {
    if (href.startsWith("/") && !href.startsWith("//")) links.add(href.split("#")[0]);
    else if (href.startsWith(PROD)) links.add(href.slice(PROD.length) || "/");
  }
  await tab.close();
}
await browser.close();

// 3: internal links.
for (const href of links) {
  const res = await fetch(ORIGIN + href);
  if (res.status >= 400) fail(href, `internal link returns ${res.status}`);
}

console.log(`${baseline.length} pages, ${REDIRECTS.length} redirects, ${links.size} internal links, ${violations} axe violation groups`);
if (failures.length) {
  console.log(`\n${failures.length} failure(s):\n${failures.map((f) => `  - ${f}`).join("\n")}`);
  process.exit(1);
}
console.log("All checks passed.");
