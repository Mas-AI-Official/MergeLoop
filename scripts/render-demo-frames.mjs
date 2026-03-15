#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(path.join(__dirname, ".."));
const outDir = path.join(root, "docs", "demo", "storyboard");

function frameTemplate(title, body, step, workerLine, modeLine) {
  return `<svg width="1280" height="720" viewBox="0 0 1280 720" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1280" height="720" fill="#0B1020"/>
  <rect x="48" y="48" width="1184" height="624" rx="22" fill="#111A33"/>
  <text x="86" y="118" fill="#E2E8F0" font-family="Segoe UI, Arial, sans-serif" font-size="44" font-weight="700">${title}</text>
  <text x="86" y="176" fill="#93C5FD" font-family="Segoe UI, Arial, sans-serif" font-size="26">Step ${step} of 3</text>
  <text x="86" y="250" fill="#D1D5DB" font-family="Segoe UI, Arial, sans-serif" font-size="30">${body}</text>
  <rect x="86" y="300" width="1110" height="280" rx="16" fill="#0F172A" stroke="#334155"/>
  <text x="120" y="360" fill="#34D399" font-family="Consolas, Menlo, monospace" font-size="24">/councilkit:run Task prompt</text>
  <text x="120" y="408" fill="#E5E7EB" font-family="Consolas, Menlo, monospace" font-size="21">${workerLine}</text>
  <text x="120" y="454" fill="#E5E7EB" font-family="Consolas, Menlo, monospace" font-size="21">${modeLine}</text>
  <text x="120" y="500" fill="#E5E7EB" font-family="Consolas, Menlo, monospace" font-size="21">output: agreements, disagreements, next checks</text>
</svg>
`;
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  const frames = [
    frameTemplate(
      "Codex host + Gemini worker",
      "Codex host path invokes CouncilKit with Gemini as selected worker.",
      1,
      "workers: gemini",
      "mode: single"
    ),
    frameTemplate(
      "Claude host + Codex/Gemini workers",
      "Claude-hosted flow dispatches two workers in council mode.",
      2,
      "workers: codex, gemini",
      "mode: council"
    ),
    frameTemplate(
      "Local-only fallback",
      "No vendor worker required: local worker returns a unified answer.",
      3,
      "workers: local",
      "mode: single"
    )
  ];

  for (let index = 0; index < frames.length; index += 1) {
    const fileName = `frame-0${index + 1}.svg`;
    await fs.writeFile(path.join(outDir, fileName), frames[index], "utf8");
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>CouncilKit Demo Storyboard</title>
    <style>
      body { margin: 0; background: #020617; color: #e2e8f0; font-family: Segoe UI, Arial, sans-serif; }
      main { max-width: 1280px; margin: 24px auto; padding: 0 16px; }
      h1 { font-size: 30px; margin-bottom: 14px; }
      p { color: #93c5fd; margin-bottom: 20px; }
      img { width: 100%; border-radius: 14px; border: 1px solid #334155; margin-bottom: 18px; }
    </style>
  </head>
  <body>
    <main>
      <h1>CouncilKit Demo Storyboard</h1>
      <p>Regenerate these frames with <code>npm run demo:render</code>. Scenarios: Codex host + Gemini worker, Claude host + Codex/Gemini workers, local-only.</p>
      <img src="./frame-01.svg" alt="Frame 1" />
      <img src="./frame-02.svg" alt="Frame 2" />
      <img src="./frame-03.svg" alt="Frame 3" />
    </main>
  </body>
</html>
`;

  await fs.writeFile(path.join(outDir, "index.html"), html, "utf8");
  process.stdout.write("Demo storyboard frames generated.\n");
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
