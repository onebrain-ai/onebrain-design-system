// MessageBubble.jsx — the message/entry role. For OneBrain this is a single
// entry in the session/activity stream. Role-based variants:
//   command — the user invoked a /skill
//   agent   — a sub-agent responded (tinted with the agent's real source color)
//   memory  — a write to memory/ or the vault
//   system  — a status line
// Aesthetic: mono HUD log lines with an accent left-rail, matching the
// operator-console voice.
// Exposes window.MessageBubble.

const AGENT_COLORS = {
  'Inbox Classifier': '#ff8c00',
  'Knowledge Linker': '#3b82f6',
  'Link Suggester':  '#22c55e',
  'Tag Suggester':   '#eab308',
  'Task Extractor':  '#ef4444',
};

function MessageBubble({ entry }) {
  const { role, time, actor, text, skill, tags } = entry;
  const accent =
    role === 'command' ? 'var(--color-accent-2)'
    : role === 'memory' ? 'var(--color-accent)'
    : role === 'agent' ? (AGENT_COLORS[actor] || 'var(--color-loop)')
    : 'var(--color-muted)';

  return (
    <article className={'ob-log ob-log-' + role} style={{ '--log-accent': accent }}>
      <div className="ob-log-gutter">
        <span className="ob-log-dot"></span>
        <time className="ob-log-time">{time}</time>
      </div>
      <div className="ob-log-body">
        <div className="ob-log-head">
          <span className="ob-log-actor">
            {role === 'command' && <span className="ob-log-cmd">/{skill}</span>}
            {role !== 'command' && actor}
          </span>
          <span className="ob-log-role">{role}</span>
        </div>
        <p className="ob-log-text">{text}</p>
        {tags && (
          <div className="ob-log-tags">
            {tags.map((t) => <span key={t} className="ob-log-tag">{t}</span>)}
          </div>
        )}
      </div>
    </article>
  );
}

window.MessageBubble = MessageBubble;
