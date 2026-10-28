// Builds the "offline" placeholder that Vercel serves instead of the real site
// (see vercel.json). The full site keeps working locally with `npm run dev`.
//
// To put the site back online: remove installCommand/buildCommand from vercel.json.

import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const out = process.argv[2] ?? 'dist'

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex, nofollow" />
    <meta name="theme-color" content="#0b0b0b" />
    <title>EasyFix — offline</title>
    <style>
      :root { color-scheme: dark; }
      * { box-sizing: border-box; }
      body {
        margin: 0; min-height: 100svh; display: grid; place-items: center; padding: 24px;
        background: radial-gradient(circle at 50% 30%, rgb(246 128 0 / 0.18), transparent 60%), #0b0b0b;
        color: #fcfcfc; font: 17px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
        text-align: center;
      }
      .logo { font-size: 28px; font-weight: 700; letter-spacing: -0.03em; }
      .logo span { color: #f68000; }
      h1 { margin: 28px 0 8px; font-size: clamp(30px, 6vw, 48px); line-height: 1.08; letter-spacing: -0.035em; }
      p { margin: 4px 0; color: rgb(252 252 252 / 0.6); }
    </style>
  </head>
  <body>
    <main>
      <div class="logo">Easy<span>Fix</span></div>
      <h1>This page is offline.</h1>
      <p>Η σελίδα είναι εκτός σύνδεσης.</p>
      <p>Страница недоступна.</p>
    </main>
  </body>
</html>
`

rmSync(out, { recursive: true, force: true })
mkdirSync(out, { recursive: true })
writeFileSync(join(out, 'index.html'), html)
writeFileSync(join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n')
console.log(`offline placeholder written to ${out}/`)
