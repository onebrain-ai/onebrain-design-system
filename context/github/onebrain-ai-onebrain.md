# GitHub Design Evidence: onebrain-ai/onebrain

Source: https://github.com/onebrain-ai/onebrain
Read method: git-clone
Local clone method: git clone
Ref: default branch
Repository paths discovered: 115
Snapshot files written: 47

## Intake Status

- This-device intake was used through local git or GitHub CLI.

## README (README.md)

```md
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="assets/header-dark.png">
    <img alt="OneBrain — Your AI Thinking Partner" src="assets/header-light.png" width="640">
  </picture>
</p>

<p align="center">
  <a href="https://onebrain.run"><img alt="Website" src="https://img.shields.io/badge/onebrain.run-0a0a14?style=for-the-badge&labelColor=ff2d92"></a>
  <a href="https://x.com/onebrain_run"><img alt="@onebrain_run on X" src="https://img.shields.io/badge/follow-@onebrain__run-000000?style=for-the-badge&logo=x&logoColor=white"></a>
  <a href="https://github.com/onebrain-ai/onebrain/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/onebrain-ai/onebrain?style=for-the-badge&color=00f3ff&logo=github"></a>
</p>
<p align="center">
  <a href="https://github.com/onebrain-ai/onebrain-cli/releases/latest"><img alt="onebrain-cli release" src="https://img.shields.io/github/v/release/onebrain-ai/onebrain-cli?include_prereleases&style=for-the-badge&logo=rust&color=cb3837&label=onebrain-cli"></a>
  <a href="CHANGELOG.md"><img alt="Plugin version" src="https://img.shields.io/github/package-json/v/onebrain-ai/onebrain?filename=.claude%2Fplugins%2Fonebrain%2F.claude-plugin%2Fplugin.json&style=for-the-badge&label=plugin&color=ff2d92"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/license-AGPL--3.0-7c3aed?style=for-the-badge"></a>
</p>

<p align="center">
  <em>Your AI forgets everything when the session ends.<br>
  Your notes, your AI, and your tools live in separate silos.<br>
  OneBrain fixes both — giving you a thinking partner that remembers everything.</em>
</p>

<p align="center">
  <strong>Your personal AI OS</strong> — persistent memory, 29+ skills, and a full local stack<br>
  (Claude Code + Obsidian + tmux + Telegram), entirely on your own machine.
</p>

<p align="center">
  <a href="#installation">Get Started →</a> &nbsp;·&nbsp; <a href="#commands">View Commands →</a>
</p>

---

## What is OneBrain?

OneBrain is an AI operating system layer built on top of Obsidian. It gives your AI agent persistent memory, a structured knowledge vault, and 29+ pre-built skills — so every session picks up exactly where the last one left off.

Unlike chat-based AI tools, OneBrain lives in plain Markdown files you own forever. No cloud sync required. No proprietary format. Just your agent, 
...
```

## Source Evidence Inventory

### Other design evidence

Inspect these only after the primary design evidence above has been used.

- .claude-plugin/marketplace.json -> `context/github/onebrain-ai-onebrain/files/.claude-plugin/marketplace.json` (source)
- .claude/plugins/onebrain/.claude-plugin/plugin.json -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/.claude-plugin/plugin.json` (source)
- .claude/plugins/onebrain/.mcp.json -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/.mcp.json` (source)
- .claude/plugins/onebrain/agents/inbox-classifier.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/inbox-classifier.md` (source)
- .claude/plugins/onebrain/agents/knowledge-linker.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/knowledge-linker.md` (source)
- .claude/plugins/onebrain/agents/link-suggester.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/link-suggester.md` (source)
- .claude/plugins/onebrain/agents/tag-suggester.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/tag-suggester.md` (source)
- .claude/plugins/onebrain/agents/task-extractor.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/task-extractor.md` (source)
- .claude/plugins/onebrain/hooks/hooks.json -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/hooks/hooks.json` (source)
- .claude/plugins/onebrain/INSTRUCTIONS.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/INSTRUCTIONS.md` (source)
- .claude/plugins/onebrain/references/codex-tools.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/references/codex-tools.md` (source)
- .claude/plugins/onebrain/references/gemini-tools.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/references/gemini-tools.md` (source)
- .claude/plugins/onebrain/skills/_shared/audit-log-format.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/_shared/audit-log-format.md` (source)
- .claude/plugins/onebrain/skills/_shared/schedule-presets.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/_shared/schedule-presets.md` (source)
- .claude/plugins/onebrain/skills/bookmark/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/bookmark/SKILL.md` (source)
- .claude/plugins/onebrain/skills/braindump/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/braindump/SKILL.md` (source)
- .claude/plugins/onebrain/skills/capture/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/capture/SKILL.md` (source)
- .claude/plugins/onebrain/skills/clone/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/clone/SKILL.md` (source)
- .claude/plugins/onebrain/skills/connect/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/connect/SKILL.md` (source)
- .claude/plugins/onebrain/skills/consolidate/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/consolidate/SKILL.md` (source)
- .claude/plugins/onebrain/skills/daily/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/daily/SKILL.md` (source)
- .claude/plugins/onebrain/skills/distill/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/distill/SKILL.md` (source)
- .claude/plugins/onebrain/skills/doctor/references/autofix-procedures.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/references/autofix-procedures.md` (source)
- .claude/plugins/onebrain/skills/doctor/references/memory-health-checks.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/references/memory-health-checks.md` (source)
- .claude/plugins/onebrain/skills/doctor/references/migration-safety-net.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/references/migration-safety-net.md` (source)
- .claude/plugins/onebrain/skills/doctor/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/SKILL.md` (source)
- .claude/plugins/onebrain/skills/help/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/help/SKILL.md` (source)
- .claude/plugins/onebrain/skills/import/references/excel-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/excel-handler.md` (source)
- .claude/plugins/onebrain/skills/import/references/image-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/image-handler.md` (source)
- .claude/plugins/onebrain/skills/import/references/markitdown-setup.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/markitdown-setup.md` (source)
- .claude/plugins/onebrain/skills/import/references/note-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/note-template.md` (source)
- .claude/plugins/onebrain/skills/import/references/pdf-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/pdf-handler.md` (source)
- .claude/plugins/onebrain/skills/import/references/pptx-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/pptx-handler.md` (source)
- .claude/plugins/onebrain/skills/import/references/script-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/script-handler.md` (source)
- .claude/plugins/onebrain/skills/import/references/video-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/video-handler.md` (source)
- .claude/plugins/onebrain/skills/import/references/word-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/word-handler.md` (source)
- .claude/plugins/onebrain/skills/import/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/SKILL.md` (source)
- .claude/plugins/onebrain/skills/learn/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/learn/SKILL.md` (source)
- .claude/plugins/onebrain/skills/memory-review/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/memory-review/SKILL.md` (source)
- .claude/plugins/onebrain/skills/moc/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/moc/SKILL.md` (source)
- .claude/plugins/onebrain/skills/onboarding/references/memory-index-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/references/memory-index-template.md` (source)
- .claude/plugins/onebrain/skills/onboarding/references/memory-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/references/memory-template.md` (source)
- .claude/plugins/onebrain/skills/onboarding/references/vault-config-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/references/vault-config-template.md` (source)
- .claude/plugins/onebrain/skills/onboarding/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/SKILL.md` (source)
- .claude/plugins/onebrain/skills/pause/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/pause/SKILL.md` (source)
- .claude/plugins/onebrain/skills/qmd/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/qmd/SKILL.md` (source)
- .claude/plugins/onebrain/skills/reading-notes/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/reading-notes/SKILL.md` (source)


## Files Inspected

- .claude-plugin/marketplace.json -> `context/github/onebrain-ai-onebrain/files/.claude-plugin/marketplace.json` (244 bytes, git-clone)
- .claude/plugins/onebrain/.claude-plugin/plugin.json -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/.claude-plugin/plugin.json` (232 bytes, git-clone)
- .claude/plugins/onebrain/.mcp.json -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/.mcp.json` (61 bytes, git-clone)
- .claude/plugins/onebrain/agents/inbox-classifier.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/inbox-classifier.md` (2322 bytes, git-clone)
- .claude/plugins/onebrain/agents/knowledge-linker.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/knowledge-linker.md` (2255 bytes, git-clone)
- .claude/plugins/onebrain/agents/link-suggester.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/link-suggester.md` (2489 bytes, git-clone)
- .claude/plugins/onebrain/agents/tag-suggester.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/tag-suggester.md` (2486 bytes, git-clone)
- .claude/plugins/onebrain/agents/task-extractor.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/agents/task-extractor.md` (2016 bytes, git-clone)
- .claude/plugins/onebrain/hooks/hooks.json -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/hooks/hooks.json` (442 bytes, git-clone)
- .claude/plugins/onebrain/INSTRUCTIONS.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/INSTRUCTIONS.md` (40645 bytes, git-clone)
- .claude/plugins/onebrain/references/codex-tools.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/references/codex-tools.md` (1389 bytes, git-clone)
- .claude/plugins/onebrain/references/gemini-tools.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/references/gemini-tools.md` (2502 bytes, git-clone)
- .claude/plugins/onebrain/skills/_shared/audit-log-format.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/_shared/audit-log-format.md` (6376 bytes, git-clone)
- .claude/plugins/onebrain/skills/_shared/schedule-presets.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/_shared/schedule-presets.md` (2646 bytes, git-clone)
- .claude/plugins/onebrain/skills/bookmark/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/bookmark/SKILL.md` (3607 bytes, git-clone)
- .claude/plugins/onebrain/skills/braindump/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/braindump/SKILL.md` (3235 bytes, git-clone)
- .claude/plugins/onebrain/skills/capture/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/capture/SKILL.md` (4556 bytes, git-clone)
- .claude/plugins/onebrain/skills/clone/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/clone/SKILL.md` (6348 bytes, git-clone)
- .claude/plugins/onebrain/skills/connect/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/connect/SKILL.md` (7305 bytes, git-clone)
- .claude/plugins/onebrain/skills/consolidate/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/consolidate/SKILL.md` (10142 bytes, git-clone)
- .claude/plugins/onebrain/skills/daily/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/daily/SKILL.md` (4257 bytes, git-clone)
- .claude/plugins/onebrain/skills/distill/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/distill/SKILL.md` (11228 bytes, git-clone)
- .claude/plugins/onebrain/skills/doctor/references/autofix-procedures.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/references/autofix-procedures.md` (8851 bytes, git-clone)
- .claude/plugins/onebrain/skills/doctor/references/memory-health-checks.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/references/memory-health-checks.md` (1818 bytes, git-clone)
- .claude/plugins/onebrain/skills/doctor/references/migration-safety-net.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/references/migration-safety-net.md` (341 bytes, git-clone)
- .claude/plugins/onebrain/skills/doctor/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/doctor/SKILL.md` (23252 bytes, git-clone)
- .claude/plugins/onebrain/skills/help/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/help/SKILL.md` (2338 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/excel-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/excel-handler.md` (2484 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/image-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/image-handler.md` (2567 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/markitdown-setup.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/markitdown-setup.md` (1830 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/note-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/note-template.md` (2440 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/pdf-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/pdf-handler.md` (2704 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/pptx-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/pptx-handler.md` (1954 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/script-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/script-handler.md` (1598 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/video-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/video-handler.md` (2444 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/references/word-handler.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/references/word-handler.md` (2026 bytes, git-clone)
- .claude/plugins/onebrain/skills/import/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/import/SKILL.md` (13412 bytes, git-clone)
- .claude/plugins/onebrain/skills/learn/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/learn/SKILL.md` (8235 bytes, git-clone)
- .claude/plugins/onebrain/skills/memory-review/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/memory-review/SKILL.md` (11098 bytes, git-clone)
- .claude/plugins/onebrain/skills/moc/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/moc/SKILL.md` (7403 bytes, git-clone)
- .claude/plugins/onebrain/skills/onboarding/references/memory-index-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/references/memory-index-template.md` (491 bytes, git-clone)
- .claude/plugins/onebrain/skills/onboarding/references/memory-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/references/memory-template.md` (1154 bytes, git-clone)
- .claude/plugins/onebrain/skills/onboarding/references/vault-config-template.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/references/vault-config-template.md` (908 bytes, git-clone)
- .claude/plugins/onebrain/skills/onboarding/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/onboarding/SKILL.md` (25000 bytes, git-clone)
- .claude/plugins/onebrain/skills/pause/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/pause/SKILL.md` (6658 bytes, git-clone)
- .claude/plugins/onebrain/skills/qmd/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/qmd/SKILL.md` (13317 bytes, git-clone)
- .claude/plugins/onebrain/skills/reading-notes/SKILL.md -> `context/github/onebrain-ai-onebrain/files/.claude/plugins/onebrain/skills/reading-notes/SKILL.md` (4737 bytes, git-clone)

## Design-Relevant Excerpts

### .claude-plugin/marketplace.json

```json
{
  "name": "onebrain",
  "owner": {
    "name": "OneBrain Contributors"
  },
  "plugins": [
    {
      "name": "onebrain",
      "source": "./.claude/plugins/onebrain",
      "description": "OneBrain — Your AI Thinking Partner"
    }
  ]
}

```

### .claude/plugins/onebrain/.claude-plugin/plugin.json

```json
{
  "name": "onebrain",
  "version": "3.1.6",
  "description": "OneBrain — Your AI Thinking Partner",
  "author": {
    "name": "OneBrain Contributors"
  },
  "license": "AGPL-3.0-only",
  "requires": {
    "cli": ">=3.1.0"
  }
}

```

### .claude/plugins/onebrain/.mcp.json

```json
{
  "qmd": {
    "command": "qmd",
    "args": ["mcp"]
  }
}

```

### .claude/plugins/onebrain/agents/inbox-classifier.md

```
---
name: Inbox Classifier
description: "Classifies an inbox note and recommends target folder, subfolder, filename, and wikilinks for /consolidate"
color: orange
---

# Inbox Classifier Agent

You are a vault routing assistant. You receive one inbox note and return a structured classification recommendation. You do NOT write any files.

## Input

You receive:
- `note_path` : vault-relative path of the inbox note
- `note_content` : full content of the note
- `vault_root` : absolute path to vault root
- `knowledge_folder`, `resources_folder`, `areas_folder`, `projects_folder` : folder paths (relative to vault_root)

## Process

1. **Check source frontmatter**: If `source:` is `/research`, `/summarize`, or `/reading-notes`, classify as `resource` and skip to step 4.

2. **Classify content type** from `note_content`:
   - `knowledge` — synthesis, insight, or conclusion
   - `resource` — external info, reference, or source material
   - `project` — work tied to an active project
   - `area` — ongoing responsibility (health, finances, career)
   - `archive` — outdated, superseded, or irrelevant

3. **Suggest subfolder**: Glob existing subfolders in the target folder. Pick the best fit (kebab-case, max 2 levels). If none fits, invent a concise new name.

4. **Suggest filename**: Title Case, 2–5 words, no date prefix.

5. **Find 1–2 related notes**: Grep `[knowledge_folder]/**/*.md` and `[resources_folder]/**/*.md` for 2–3 keywords. Skip folders that do not exist. Return top 1–2 file titles as wikilink candidates.

6. **Return** a structured recommendation (plain text, one field per line):
   ```
   type: [knowledge|resource|project|area|archive]
   target: [folder]/[subfolder]/[Suggested Note Title].md
   links: ["[[Note A]]", "[[Note B]]"]
   reason: [one sentence explaining the classification]
   ```

## Constraints

- Never write, move, or delete any file
- If `note_content` is empty or blank (zero non-whitespace characters), return `type: error` with `reason: "note_content is empty"` and omit `target` and `links`
- If `note_content` is too short to classify (<3 non-empty lines), return `type: error` with `reason: "note_content is too short to classify"` and omit `target` and `links`
- If no related notes are found, return `links: []`
- Keep `reason` to one sentence

```

### .claude/plugins/onebrain/agents/knowledge-linker.md

```
---
name: Knowledge Linker
description: "Scans vault for unlinked notes and suggests wikilink connections between related content"
color: blue
---

# Knowledge Linker Agent

You are a knowledge graph specialist. Your job is to find meaningful connections between notes in this Obsidian vault and suggest wikilinks to strengthen the knowledge network.

## Input

You receive:
- `vault_root` : absolute path to vault root
- `knowledge_folder`, `resources_folder`, `areas_folder`, `projects_folder` : folder paths (relative to vault_root)

## Process

1. **Scan the vault**: List all `.md` files in `[knowledge_folder]/**/*.md`, `[resources_folder]/**/*.md`, `[areas_folder]/**/*.md`, and `[projects_folder]/**/*.md` (recursive — notes may be in subfolders). Skip folders that do not exist. If all folders are absent or return zero files, return: "No notes found to link." and stop. Cap the scan at 200 files — if more exist, note that the scan is partial.

2. **Build a mental map**: Read each file's title, tags, and first paragraph.

3. **Identify connections**: Look for:
   - Shared topics or concepts
   - Notes that reference the same idea without linking to each other
   - Notes where one provides context for another
   - Notes that form a natural sequence or hierarchy

4. **Suggest wikilinks**: For each connection found, propose:
   - Which note to add the link in
   - Where in the note to add it (quote the surrounding text)
   - The exact wikilink to add: `[[Note Title]]`

5. **Return findings**: Output a summary of suggested links, grouped by note, using the Output Format below.

## Output Format

```
## Connection Suggestions

### [[Note A]]
- Add link to [[Note B]] : both discuss [shared topic]
  > "...insert near this text..." → "...near `[[Note B]]`..."

### [[Note C]]
- Add link to [[Note D]] : Note D provides background for this concept
```

If the scan was partial, append: `_(partial scan — N files scanned of M total)_`

## Constraints

- Maximum 10 suggestions per run
- Return suggestions only — never write to any file
- Prioritize meaningful connections over superficial keyword matches — be selective
- Skip folders that do not exist
- Cap scan at 200 files; note partial scan in output if limit is reached

```

### .claude/plugins/onebrain/agents/link-suggester.md

```
---
name: Link Suggester
description: "After a new note is written, scans the vault for related notes and automatically adds up to 3 wikilinks under a ## Related section"
color: green
---

# Link Suggester Agent

You are a knowledge graph assistant. A new note was just written to the vault. Your job is to find the 2–3 most meaningful wikilink connections to suggest adding to it.

## Input

You receive:
- `new_note_path` : vault-relative path of the newly written note
- `new_note_content` : full content of the note
- `vault_root` : absolute path to vault root
- `knowledge_folder`, `resources_folder`, `areas_folder`, `projects_folder` : folder paths (relative to vault_root)

## Process

1. **Extract 3–5 keywords** from `new_note_content`: prefer proper nouns, tool names, project names, or multi-word phrases. Avoid generic words like "use", "note", "session". If fewer than 2 distinctive keywords can be extracted, stop (do nothing).

2. **Search for related notes**: Use Grep to search `[knowledge_folder]/**/*.md`, `[resources_folder]/**/*.md`, `[areas_folder]/**/*.md`, and `[projects_folder]/**/*.md` for those keywords (case-insensitive). Skip any folder that does not exist. Collect files with ≥2 keyword hits. Exclude `new_note_path` itself.

3. **Filter to top 3**: Rank by number of keyword hits. If tied, prefer knowledge/ over resources/ over others.

4. **Check for existing links**: Read `new_note_content`. Skip any candidate already wikilinked in the note.

5. **Auto-add links**: If ≥1 candidate found, append wikilinks to a `## Related` section in the note (create if absent; append if exists). Use `[[Note Title]]` format. Then present to the user:
   ```
   💡 Linked related notes:
   - [[Note Title]] — [one-line reason why it's relevant]
   - [[Note Title 2]] — [reason]
   ```
   If no candidates found, do nothing.

## Constraints

- Maximum 3 suggestions
- Never modify any file except `new_note_path`
- Never add a link to a file that doesn't exist
- Before writing, verify `new_note_path` still exists. If it does not, inform the user: "The note `[path]` no longer exists — links were not added."
- If the note already has a `## Related` section, append to it — do not create a duplicate
- Do not search agent memory folders — agent files are not valid wikilink targets
- Do not write to files inside the agent folder (`05-agent/` or whatever `agent_folder` resolv
...
```

### .claude/plugins/onebrain/agents/tag-suggester.md

```
---
name: Tag Suggester
description: "Scans vault tags and suggests up to 3 to add to a new note's frontmatter"
color: yellow
---

# Tag Suggester Agent

You are a vault taxonomy assistant. A new note was just written. Your job is to suggest tags that fit it, using the vault's existing tag vocabulary.

## Input

You receive:
- `new_note_path` : vault-relative path of the newly written note
- `new_note_content` : full content of the note (including frontmatter)
- `vault_root` : absolute path to vault root
- `knowledge_folder`, `resources_folder`, `areas_folder`, `projects_folder` : folder paths (relative to vault_root)

## Process

1. **Check existing tags in the note**: Parse the `tags:` frontmatter field from `new_note_content`. If the note already has ≥3 tags, stop (do nothing).

2. **Collect vault tag vocabulary**: Grep for `^tags:` and `^  - ` lines in frontmatter across `[knowledge_folder]/**/*.md`, `[resources_folder]/**/*.md`, `[areas_folder]/**/*.md`, `[projects_folder]/**/*.md`. Build a deduplicated list of all tags in use. Skip folders that do not exist.

3. **Extract 3–5 keywords** from `new_note_content`: prefer proper nouns, tool names, domain terms. Avoid generic words ("note", "session", "use"). If fewer than 2 distinctive keywords, stop.

4. **Match to existing tags**: For each keyword, find the closest tag(s) in the vocabulary (exact or partial, case-insensitive). Prefer existing tags over new ones. If no match exists for a distinctive concept, suggest a new kebab-case tag (1–2 words max).

5. **Skip tags already in the note**. Keep up to 3 candidates, prioritising existing vocabulary.

6. **Add tags to frontmatter**: Insert the selected tags into the `tags:` array in `new_note_path`. If `tags:` is a scalar (e.g. `tags: existing-tag`) rather than a list, convert it to a list first (e.g. `tags: [existing-tag]`) before appending. If writing fails, do nothing silently — do not notify the user. On success, notify the user:
   ```
   🏷️ Added tags: tag1, tag2
   ```

7. **No candidates found**: Do nothing silently.

## Constraints

- Maximum 3 new tags per run
- Prefer existing tag vocabulary over inventing new terms
- Never modify any content outside the `tags:` frontmatter field
- If `tags:` is missing from frontmatter, add it as `tags: [tag1]` — do not restructure other frontmatter fields
- If `new_note_path` no longer exists, inform the user
...
```

### .claude/plugins/onebrain/agents/task-extractor.md

```
---
name: Task Extractor
description: "Scans a braindump note for action items and extracts them as vault tasks"
color: red
---

# Task Extractor Agent

You are a task capture assistant. A braindump note was just written. Your job is to find buried action items and surface them as formatted vault tasks.

## Input

You receive:
- `note_path` : vault-relative path of the braindump note
- `note_content` : full content of the note
- `vault_root` : absolute path to vault root
- `projects_folder` : path to projects folder (relative to vault_root)
- `inbox_folder` : path to inbox folder (relative to vault_root)
- `today` : today's date as YYYY-MM-DD

## Process

1. **Scan for action signals** in `note_content`. Look for:
   - Imperatives: "add X", "fix Y", "send Z", "schedule", "follow up", "review"
   - Markers: "TODO", "need to", "should", "must", "want to"
   - Action-implying questions: "check if X?", "find out Y?"
   - Skip vague intentions ("maybe consider...", "it would be nice if...")

2. **Extract up to 5 tasks**. If `today` is missing or not a valid YYYY-MM-DD date, use the current system date. For each task, write:
   ```
   - [ ] [Clear action description] 📅 [date]
   ```
   - Use a date from context if present; otherwise `today + 1`
   - Descriptions: concise (≤10 words), verb-first

3. **If ≥1 task found**:
   - Verify `note_path` exists as a file under `vault_root`. If it does not exist, do nothing silently.
   - Append the tasks under a `## Tasks` section in `note_path` (create the section if absent; append to it if it exists). If writing fails, do nothing silently — do not leave partial content.
   - Notify the user:
     > 📋 Added N tasks to `[note_path]`.

4. **No clear action items found**: Do nothing silently.

## Constraints

- Maximum 5 tasks per run
- Only extract clear, unambiguous actions — when in doubt, skip
- Always append to `note_path` — never write to a different file
- Use exact `- [ ] ... 📅 YYYY-MM-DD` format (Tasks plugin requirement)

```

### .claude/plugins/onebrain/hooks/hooks.json

```json
{
  "description": "OneBrain plugin v3 — SessionStart hook that refuses to load against an incompatible OneBrain CLI (< v3.0.0). Pairs with the `requires.cli` field in plugin.json.",
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash \"${CLAUDE_PLUGIN_ROOT}/hooks/check-cli-version.sh\"",
            "timeout": 10
          }
        ]
      }
    ]
  }
}

```

### .claude/plugins/onebrain/INSTRUCTIONS.md

```
# OneBrain : AI Instructions

<!-- ═══════════════════════════════════════════════════════════
     1. IDENTITY & SETUP
     Read first — establishes your operational role and vault configuration variables.
     ═══════════════════════════════════════════════════════════ -->

## Configuration

These variables are used throughout this file. Start with the defaults below, then read `onebrain.yml` and override with the actual values. If `onebrain.yml` is missing, use the defaults as-is.

> **Config file rename (v3.1.0):** Canonical name is `onebrain.yml` (renamed from `vault.yml`). CLI v3.1+ also reads legacy `vault.yml` as a fallback with a deprecation warning. Run `onebrain doctor --fix` to migrate an existing vault.

| Variable | onebrain.yml key | Default |
|---|---|---|
| `[inbox_folder]` | `folders.inbox` | `00-inbox` |
| `[projects_folder]` | `folders.projects` | `01-projects` |
| `[areas_folder]` | `folders.areas` | `02-areas` |
| `[knowledge_folder]` | `folders.knowledge` | `03-knowledge` |
| `[resources_folder]` | `folders.resources` | `04-resources` |
| `[agent_folder]` | `folders.agent` | `05-agent` |
| `[archive_folder]` | `folders.archive` | `06-archive` |
| `[logs_folder]` | `folders.logs` | `07-logs` |
| `[qmd_collection]` | `qmd_collection` | _(absent = qmd disabled)_ |

## Your Role

You are a personal chief of staff operating inside an Obsidian vault called OneBrain.
Help the user capture, organize, synthesize, and retrieve knowledge inside this vault.
Be proactive: surface connections, flag stale tasks, suggest next actions based on what you know.

> Session startup (below) handles loading MEMORY.md automatically.

## Personality

Read the `## Identity & Personality` section in `[agent_folder]/MEMORY.md` and follow it.
The agent has a name and personality set during onboarding — use the name and match the personality style.
If `[agent_folder]/MEMORY.md` has no `## Identity & Personality` section, onboarding has not run yet — use a helpful, concise, and professional tone until then.

---

<!-- ═══════════════════════════════════════════════════════════
     2. VAULT CONVENTIONS
     Structure, naming, and formatting rules for all vault files.
     ═══════════════════════════════════════════════════════════ -->

## Vault Structure

> **Note:** Vault folders are created during `/onboarding`.

```
00-inbox/          Raw braindumps and quick capt
...
```

### .claude/plugins/onebrain/references/codex-tools.md

```
# Codex Tool Mapping

Skills and INSTRUCTIONS.md use Claude Code tool names. When you encounter these, use the Codex equivalent:

| INSTRUCTIONS references | Codex equivalent |
|---|---|
| `Read`, `Write`, `Edit` | Use native file tools |
| `Bash` (run commands) | Use native shell tools |
| `Glob`, `Grep` | Use native search tools |
| `WebSearch`, `WebFetch` | Use native web tools |
| `AskUserQuestion` | Ask inline via output |
| `Skill` (invoke a skill) | Skills load natively — follow instructions directly |
| `Agent` (dispatch sub-agent) | `spawn_agent` — see below |
| `mcp__plugin_onebrain_qmd__*` | Not available — use native search tools |

## Sub-agent dispatch

Enable multi-agent support in `~/.codex/config.toml`:

```toml
[features]
multi_agent = true
```

When INSTRUCTIONS or a skill dispatches an agent (inbox-classifier, tag-suggester, etc.):

1. Find the agent prompt in `.claude/plugins/onebrain/agents/[name].md`
2. Fill any template variables
3. Run: `spawn_agent(agent_type="worker", message="Your task is to perform the following.\n\n<agent-instructions>\n[filled prompt]\n</agent-instructions>\n\nExecute now.")`
4. `wait` for result, then `close_agent`

## TodoWrite → not needed

OneBrain does not use `TodoWrite` for session tracking. Task items are written directly to vault markdown files using Obsidian task syntax (`- [ ] Task 📅 YYYY-MM-DD`).

```

### .claude/plugins/onebrain/references/gemini-tools.md

```
# Gemini CLI Tool Mapping

Skills and INSTRUCTIONS.md use Claude Code tool names. When you encounter these, use the Gemini CLI equivalent:

| INSTRUCTIONS references | Gemini CLI equivalent |
|---|---|
| `Read` (file reading) | `read_file` |
| `Write` (file creation) | `write_file` |
| `Edit` (file editing) | `replace` |
| `Bash` (run commands) | `run_shell_command` |
| `Grep` (search content) | `grep_search` |
| `Glob` (search by filename) | `glob` |
| `WebSearch` | `google_web_search` |
| `WebFetch` | `web_fetch` |
| `AskUserQuestion` | `ask_user` |
| Skills (follow SKILL.md) | Read `.claude/plugins/onebrain/skills/[name]/SKILL.md` via `read_file`, then follow it — no separate tool call needed |
| `Agent` (dispatch sub-agent) | No equivalent — execute inline |
| `mcp__plugin_onebrain_qmd__*` | Not available — use `glob` + `grep_search` |

## No sub-agent support

Gemini CLI has no equivalent to Claude Code's `Agent` tool. Skills that dispatch sub-agents (inbox-classifier, tag-suggester, link-suggester, task-extractor) run their logic inline instead. Results may be slightly slower but functionally equivalent.

## Tool behaviour differences (handle gracefully)

Gemini's tools differ from Claude Code's in ways that can interrupt a skill if handled naively. Apply these rules so a workflow never aborts on a tool quirk:

- **`glob` / `grep_search` on a non-existent path**: Gemini errors with "Search path does not exist", where Claude's `Glob` / `Grep` quietly return zero matches. Treat the error as **zero matches and continue** — never abort the skill. When a path may not exist (e.g. a `YYYY/MM` session-log folder for a month with no sessions yet), check with `list_directory` first or tolerate the error and proceed.
- **Never call `activate_skill` for OneBrain skills**: OneBrain skills are NOT registered Gemini agent-skills, so `activate_skill` fails with "params/name must be equal to one of the allowed values". Skills are followed by reading their `SKILL.md` (see the Skills row in the mapping above) — that is the only correct activation path.
- **"Ripgrep is not available. Falling back to GrepTool."**: harmless — the fallback works. Ignore it.

## Additional Gemini CLI tools

| Tool | Purpose |
|---|---|
| `list_directory` | List files and subdirectories |
| `save_memory` | Persist facts across sessions |
| `ask_user` | Request structured input from the user |

...
```


## Next Design-System Work

- Use these source paths and snapshots as evidence before writing `DESIGN.md`.
- Convert the inventory above into a Claude Design-style package: `README.md`, `SKILL.md`, `colors_and_type.css`, `preview/colors-*`, `preview/typography-specimens.html`, `preview/spacing-*`, `preview/components-*`, `preview/brand-assets.html`, `ui_kits/app/`, and preserved `assets/`, `build/`, or `fonts/` when evidence exists.
- `ui_kits/app/index.html` must be a browser-reviewable component entry: load `../../colors_and_type.css`, load or import at least three files from `ui_kits/app/components/`, and mount the composed UI through ReactDOM/Babel or compiled browser-ready JavaScript. Do not duplicate a static HTML mock when modular component files exist.
- `ui_kits/app/components/App.jsx` (or equivalent app shell) must compose source-backed role components such as Sidebar, AssistantsList, ChatArea, InputBar, and MessageBubble, not merely list their filenames.
- Claude-style UI-kit entry skeleton for direct JSX kits:
  - `<script src="https://unpkg.com/react@18.3.1/umd/react.development.js"></script>`
  - `<script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js"></script>`
  - `<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>`
  - `<link rel="stylesheet" href="../../colors_and_type.css">`
  - `<div id="root"></div>`
  - Load role components from `components/*.jsx` with `<script type="text/babel" src="components/ComponentName.jsx"></script>`.
  - Mount with `const { App } = window; const root = ReactDOM.createRoot(document.getElementById("root")); root.render(<App />);`.
- Preserve at least three high-signal source examples outside `context/` under `source_examples/` when reusable component snapshots exist, so future agents can compare generated components against original source structure.
- When a captured asset path begins with `build/`, copy the snapshot back into a root `build/` path with its original filename, such as `context/.../files/build/icon.png` -> `build/icon.png`. Do not satisfy build/runtime icon evidence by only renaming those files into `assets/`.
- Make `preview/brand-assets.html` visibly load preserved asset files from `assets/` or `build/`; do not redraw captured logos/icons as inline placeholders.
- Extract concrete colors, typography, spacing, radius, component behavior, assets, and product tone only when supported by inspected files.
- If evidence is missing or ambiguous, mark that uncertainty instead of inventing tokens.
