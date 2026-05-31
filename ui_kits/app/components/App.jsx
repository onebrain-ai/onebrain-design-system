// App.jsx — the operator-console shell. Composes the role components into one
// product-like surface: Sidebar (nav) · AssistantsList (skill rail) · ChatArea
// (session console with MessageBubble stream) · InputBar (command composer).
// Holds the shared state and wires the interactive command flow (select skill →
// pre-fill composer → run → append a log entry + a synthesized agent response).
// Reads the role components off window. Exposes window.App.
const { useState, useCallback } = React;

const FOLDER_NAMES = {
  '00': 'Inbox', '01': 'Projects', '02': 'Areas', '03': 'Knowledge',
  '04': 'Resources', '05': 'Agent', '06': 'Archive', '07': 'Logs',
};

// Canned, source-true responses so a "run" feels real without a backend.
const RESPONSES = {
  capture:     { actor: 'Link Suggester', text: 'Note saved to 03-knowledge/. Linked [[Co-Evolution Loop]] and [[Harness OS Stack]] under ## Related.', tags: ['[[Co-Evolution Loop]]', '#capture'] },
  consolidate: { actor: 'Inbox Classifier', text: 'Routed 4 inbox notes → 2 knowledge, 1 project, 1 resource. Suggested filenames in Title Case.', tags: ['00-inbox', '→ 03-knowledge'] },
  connect:     { actor: 'Knowledge Linker', text: 'Found 3 meaningful connections. Added 2 wikilinks; 1 skipped (already linked).', tags: ['[[Vault Hub]]'] },
  distill:     { actor: 'OneBrain', text: 'Synthesized 11 notes on "persistent memory" into a single distilled entry with citations.', tags: ['04-resources'] },
  daily:       { actor: 'OneBrain', text: '3 tasks due today · 2 open items from last session. Top: ship release notes 📅 today.', tags: ['07-logs'] },
  doctor:      { actor: 'OneBrain', text: 'Vault healthy. 0 broken links · 1 orphan note · memory/ fresh · onebrain.yml valid.', tags: ['SYSTEM OK'] },
  learn:       { actor: 'OneBrain', text: 'Saved to memory/. I will apply this preference automatically from now on.', tags: ['memory/'] },
  wrapup:      { actor: 'OneBrain', text: 'Session summary written to 07-logs/. Picked up next time automatically.', tags: ['07-logs'] },
};

function makeResponder(skill) {
  return RESPONSES[skill] || { actor: 'OneBrain', text: `Ran /${skill}. Result written to the vault.`, tags: ['done'] };
}

function clock() {
  const d = new Date();
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
}

const SEED = [
  { id: 1, role: 'system',  time: '09:02', actor: 'SessionStart', text: 'Loaded MEMORY.md · 29 skills · qmd index ready. Resuming from yesterday.' },
  { id: 2, role: 'command', time: '09:24', skill: 'capture', text: '/capture vault routing should prefer existing subfolders' },
  { id: 3, role: 'agent',   time: '09:24', actor: 'Link Suggester', text: 'Note saved to 03-knowledge/. Linked [[Inbox Routing]] under ## Related.', tags: ['[[Inbox Routing]]', '#capture'] },
  { id: 4, role: 'memory',  time: '09:31', actor: 'memory/', text: 'Wrote preference: prefer kebab-case subfolders, max 2 levels deep.' },
  { id: 5, role: 'command', time: '09:40', skill: 'connect', text: '/connect strengthen the knowledge graph' },
  { id: 6, role: 'agent',   time: '09:40', actor: 'Knowledge Linker', text: 'Added 2 wikilinks across 03-knowledge/. Graph density +4%.', tags: ['[[Vault Hub]]'] },
];

function App() {
  const { Sidebar, AssistantsList, ChatArea, InputBar } = window;
  const [activeFolder, setActiveFolder] = useState('03');
  const [activeSkill, setActiveSkill] = useState('capture');
  const [entries, setEntries] = useState(SEED);

  const run = useCallback((cmd) => {
    const skill = (cmd.replace(/^\//, '').split(/\s+/)[0] || '').toLowerCase();
    const base = Date.now();
    const resp = makeResponder(skill);
    setEntries((prev) => [
      ...prev,
      { id: base, role: 'command', time: clock(), skill, text: cmd },
      { id: base + 1, role: resp.actor === 'OneBrain' || resp.actor === 'memory/' ? 'agent' : 'agent', time: clock(), actor: resp.actor, text: resp.text, tags: resp.tags },
    ]);
  }, []);

  return (
    <div className="ob-shell">
      <div className="ob-grid-bg" aria-hidden="true"></div>
      <Sidebar activeFolder={activeFolder} onSelectFolder={setActiveFolder} />
      <AssistantsList activeSkill={activeSkill} onSelectSkill={setActiveSkill} />
      <div className="ob-main">
        <ChatArea folderName={FOLDER_NAMES[activeFolder]} entries={entries} />
        <InputBar activeSkill={activeSkill} onRun={run} />
      </div>
    </div>
  );
}

window.App = App;
