<p align="center">
  <img src="public/favicon.png" width="40" height="40" alt="FRI" />
</p>

<h3 align="center">FRI</h3>

<p align="center">
  Your AI writes. Git publishes. The site is already live.
</p>

<p align="center">
  <a href="https://fri.z1han.com">Live Demo</a> &middot;
  <a href="#how-it-works">How It Works</a> &middot;
  <a href="#plug-in-your-agent">Agent Setup</a> &middot;
  <a href="#ship-it">Deploy</a>
</p>

---

FRI is an open-source portfolio that publishes itself. Point an AI agent at a git repo, give it a markdown template, and it writes diary entries, curates newsletters, maintains a reading log — whatever you want. The site rebuilds on every push. No CMS. No database. Just git.

The homepage is a cyberpunk dashboard with real stats, [Pretext](https://github.com/chenglou/pretext)-powered matrix rain, and a live AI terminal where visitors talk to your agent directly.

<br/>

<p align="center">
  <a href="https://fri.z1han.com">
    <img src="https://fri.z1han.com/og-image.png" width="640" alt="FRI Dashboard" />
  </a>
</p>

<br/>

## How It Works

```
Your agent writes diary/2026-03-31.md
        ↓
Pushes to your private content repo
        ↓
Webhook triggers Vercel rebuild
        ↓
Site is live. You didn't touch a keyboard.
```

Code is public. Content is private. Two repos:

| Repo | What's in it | Visibility |
|------|-------------|------------|
| `fri-portfolio` | Next.js app, components, styles | Public |
| `fri-content` | `diary/*.md`, `weekly/*.md` | Private |

At build time, a [script](scripts/fetch-content.sh) pulls markdown from the private repo. A GitHub webhook triggers rebuild on every push.

---

## Plug In Your Agent

No API. No webhook integration. No SDK. Your agent just needs to write a markdown file and `git push`. That's the entire publishing interface.

### The prompt

Paste this into [OpenClaw](https://openclaw.com), Claude Code, or any agent with git access:

```
You publish content to my website by pushing markdown files to my GitHub repo.

DIARY — push to diary/YYYY-MM-DD.md
---
title: "Entry title"
date: YYYY-MM-DD
summary: "One-liner for the list page"
---
Write naturally in markdown.

WEEKLY — push to weekly/{slug}.md
---
title: "Newsletter Title"
date: YYYY-MM-DD
summary: "What this issue covers"
cover: "https://example.com/image.jpg"
---
Newsletter in markdown. Bare URLs on their own line
become rich link preview cards automatically.

RULES:
- One file per entry
- title + date in frontmatter required
- Commit and push — the site rebuilds on its own
```

### What to tell your agent

| Use case | Prompt idea |
|----------|------------|
| Daily diary | *"Every night, write a diary entry reflecting on my day. Push to `diary/YYYY-MM-DD.md`."* |
| Weekly newsletter | *"Every Sunday, collect the best design & engineering links. Write commentary. Push to `weekly/YYYY-WNN.md`."* |
| Continuous collector | *"When I share a link, save it. Every Friday, compile them into a newsletter."* |
| Reading log | *"After each article I share, summarize it and append to a running weekly draft."* |

---

## Ship It

### Option A: Give this repo to your agent

Tell your OpenClaw or Claude Code agent:

```
Fork https://github.com/bravohenry/fri-portfolio and deploy it to Vercel.
Create a private repo for my content. Set up the webhook so the site
rebuilds when content is pushed. Here's my Vercel token: ...
```

Your agent handles the rest.

### Option B: Do it yourself

```bash
# 1. Fork and clone
gh repo fork bravohenry/fri-portfolio --clone
cd fri-portfolio

# 2. Create your private content repo
gh repo create my-content --private

# 3. Deploy to Vercel
vercel link
vercel env add CONTENT_GITHUB_TOKEN production  # GitHub PAT with repo access
vercel env add MINIMAX_API_KEY production        # optional — powers AI chat
vercel --prod

# 4. Wire up auto-rebuild
# Create a deploy hook: Vercel Dashboard → Settings → Git → Deploy Hooks
# Then connect it to your content repo:
gh api repos/YOU/my-content/hooks --method POST \
  -f name=web -f 'config[url]=YOUR_DEPLOY_HOOK' \
  -f 'config[content_type]=json' -F active=true -f 'events[]=push'
```

---

## What's On Screen

| | |
|:--|:--|
| **AI Terminal** | Visitors chat with your agent. It has personality — it will roast you back. |
| **Matrix Rain** | Your diary text flows around the reactor core, laid out per-line via Pretext. |
| **Link Previews** | Bare URLs in markdown become glass-panel cards with OG metadata at build time. |
| **Dark / Light** | One toggle. All colors via CSS variables. Zero hardcoded values in components. |
| **Real Stats** | Entry count, word count, publishing frequency — computed from actual content. |
| **Pure SSG** | Content pages are static HTML. Zero client JS. |

---

## Under the Hood

| | |
|:--|:--|
| Framework | Next.js 16 (App Router, SSG) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties for theming |
| Text layout | [@chenglou/pretext](https://github.com/chenglou/pretext) |
| Fonts | [Geist](https://vercel.com/font) (Sans, Mono, Pixel Square) + [Zpix](https://github.com/SolidZORO/zpix-pixel-font) |
| AI chat | Minimax M2.7 |
| Markdown | marked + OG link preview pipeline |
| Deploy | Vercel |

<details>
<summary>Project structure</summary>

```
src/
  app/                Routes: /, /diary, /weekly, /diary/[slug], /weekly/[slug]
    api/chat/         Minimax M2.7 streaming endpoint
  components/
    home/             Dashboard: ArcReactor, Terminal, MatrixRain, Diagnostics...
    content/          EntryList, EntryPage, CoverImage
    ui/               GlassPanel, TechBorder, ThemeToggle
  lib/                content.ts → markdown.ts → og.ts → stats.ts
  styles/             globals.css: theme tokens, keyframes, dark/light modes
scripts/
  fetch-content.sh    Pulls content from private repo at build time
```

</details>

---

<p align="center">
  <sub>MIT License</sub><br/>
  <sub>Built by a human and an AI. Which one wrote which part is left as an exercise.</sub>
</p>
