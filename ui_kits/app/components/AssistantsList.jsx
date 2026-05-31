// AssistantsList.jsx — the list/rail role. For OneBrain this is the SKILL RAIL:
// a selectable, filterable list of the 29+ pre-built skills (the product has
// no "assistants" — the rail lists skills, which is the same list-rail role).
// Selecting a skill lifts state to the App so the InputBar pre-fills the slash
// command. Skill names are the real ones from onebrain-ai/onebrain skills/*/SKILL.md.
// Exposes window.AssistantsList.
const { useState } = React;

const SKILLS = [
  { name: 'capture',       cat: 'Capture',   desc: 'Quick titled note + auto wikilinks' },
  { name: 'braindump',     cat: 'Capture',   desc: 'Stream of thoughts → inbox + tasks' },
  { name: 'bookmark',      cat: 'Capture',   desc: 'Save a URL, AI names & files it' },
  { name: 'summarize',     cat: 'Capture',   desc: 'Fetch a URL → structured summary' },
  { name: 'research',      cat: 'Capture',   desc: 'Web research → resources note' },
  { name: 'reading-notes', cat: 'Capture',   desc: 'Process a book into the vault' },
  { name: 'import',        cat: 'Capture',   desc: 'PDF / DOCX / image → markdown note' },
  { name: 'consolidate',   cat: 'Synthesize',desc: 'Process & merge the inbox' },
  { name: 'connect',       cat: 'Synthesize',desc: 'Find links to strengthen the graph' },
  { name: 'distill',       cat: 'Synthesize',desc: 'Synthesize a topic across notes' },
  { name: 'moc',           cat: 'Synthesize',desc: 'Build a map-of-content portal' },
  { name: 'daily',         cat: 'Review',    desc: "Today's tasks + open items" },
  { name: 'weekly',        cat: 'Review',    desc: 'Weekly reflection + plan ahead' },
  { name: 'recap',         cat: 'Review',    desc: 'Promote insights from sessions' },
  { name: 'tasks',         cat: 'Review',    desc: 'Regenerate the task dashboard' },
  { name: 'learn',         cat: 'Memory',    desc: 'Teach a fact / preference' },
  { name: 'memory-review', cat: 'Memory',    desc: 'Audit & prune memory/ files' },
  { name: 'doctor',        cat: 'System',    desc: 'Diagnose & fix vault health' },
  { name: 'qmd',           cat: 'System',    desc: 'Manage the search index' },
  { name: 'pause',         cat: 'System',    desc: 'Snapshot an active thread' },
  { name: 'resume',        cat: 'System',    desc: 'Reload the latest pause thread' },
  { name: 'schedule',      cat: 'System',    desc: 'Schedule recurring skills' },
  { name: 'onboarding',    cat: 'System',    desc: 'First-run vault setup' },
  { name: 'update',        cat: 'System',    desc: 'Pull latest OneBrain version' },
];

const CATS = ['All', 'Capture', 'Synthesize', 'Review', 'Memory', 'System'];

function AssistantsList({ activeSkill, onSelectSkill }) {
  const [cat, setCat] = useState('All');
  const [q, setQ] = useState('');
  const list = SKILLS.filter(
    (s) => (cat === 'All' || s.cat === cat) && s.name.includes(q.toLowerCase())
  );

  return (
    <section className="ob-rail">
      <header className="ob-rail-head">
        <span className="ob-rail-title">Skills</span>
        <span className="ob-rail-count">{SKILLS.length}+ loaded</span>
      </header>

      <div className="ob-rail-search">
        <span className="ob-rail-slash">/</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="filter skills…"
          aria-label="Filter skills"
        />
      </div>

      <div className="ob-rail-cats">
        {CATS.map((c) => (
          <button
            key={c}
            className={'ob-cat' + (cat === c ? ' is-active' : '')}
            onClick={() => setCat(c)}
          >{c}</button>
        ))}
      </div>

      <div className="ob-rail-list">
        {list.map((s) => (
          <button
            key={s.name}
            className={'ob-skill' + (activeSkill === s.name ? ' is-active' : '')}
            onClick={() => onSelectSkill(s.name)}
          >
            <span className="ob-skill-cmd">/{s.name}</span>
            <span className="ob-skill-desc">{s.desc}</span>
            <span className="ob-skill-cat">{s.cat}</span>
          </button>
        ))}
        {list.length === 0 && <div className="ob-rail-empty">no skills match “{q}”</div>}
      </div>
    </section>
  );
}

window.AssistantsList = AssistantsList;
