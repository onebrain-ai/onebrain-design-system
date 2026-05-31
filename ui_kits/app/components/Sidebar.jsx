// Sidebar.jsx — OneBrain operator-console left rail.
// Role: app navigation. Brand wordmark (assets/brain.svg) + the PARA vault
// folders (00-inbox … 07-logs, the real OneBrain vault structure from
// INSTRUCTIONS.md) + a live status footer. Source aesthetic: .nav-glass +
// page-spine HUD from onebrain-ai/website global.css.
// Exposes window.Sidebar for the App shell to compose.
const { useState } = React;

const VAULT_FOLDERS = [
  { key: '00', name: 'Inbox',     path: '00-inbox',    count: 3, accent: 'var(--color-accent-3)' },
  { key: '01', name: 'Projects',  path: '01-projects', count: 7, accent: 'var(--color-accent-2)' },
  { key: '02', name: 'Areas',     path: '02-areas',    count: 5, accent: 'var(--color-accent-2)' },
  { key: '03', name: 'Knowledge', path: '03-knowledge',count: 142, accent: 'var(--color-accent)' },
  { key: '04', name: 'Resources', path: '04-resources',count: 38, accent: 'var(--color-accent)' },
  { key: '05', name: 'Agent',     path: '05-agent',    count: 1, accent: 'var(--color-loop)' },
  { key: '06', name: 'Archive',   path: '06-archive',  count: 64, accent: 'var(--color-muted)' },
  { key: '07', name: 'Logs',      path: '07-logs',     count: 29, accent: 'var(--color-accent-4)' },
];

function Sidebar({ activeFolder, onSelectFolder }) {
  const [online] = useState(true);
  return (
    <aside className="ob-sidebar">
      <div className="ob-brand">
        <img className="ob-brand-mark" src="../../assets/brain.svg" alt="OneBrain" />
        <div className="ob-brand-text">
          <span className="ob-brand-name">One<span className="ob-brand-b">Brain</span></span>
          <span className="ob-brand-sub">OPERATOR CONSOLE</span>
        </div>
      </div>

      <div className="ob-nav-label">// VAULT · PARA</div>
      <nav className="ob-folders">
        {VAULT_FOLDERS.map((f) => (
          <button
            key={f.key}
            className={'ob-folder' + (activeFolder === f.key ? ' is-active' : '')}
            style={{ '--row-accent': f.accent }}
            onClick={() => onSelectFolder(f.key)}
          >
            <span className="ob-folder-ix">{f.key}</span>
            <span className="ob-folder-name">{f.name}</span>
            <span className="ob-folder-count">{f.count}</span>
          </button>
        ))}
      </nav>

      <div className="ob-sidebar-foot">
        <span className={'ob-status-dot' + (online ? ' on' : '')}></span>
        <div className="ob-status-lines">
          <span className="ob-status-main">{online ? 'SYSTEM ONLINE' : 'OFFLINE'}</span>
          <span className="ob-status-sub">plugin v3.1.6 · cli ≥3.1.0</span>
        </div>
      </div>
    </aside>
  );
}

window.Sidebar = Sidebar;
