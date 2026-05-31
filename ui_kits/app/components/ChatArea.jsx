// ChatArea.jsx — the main workspace role. For OneBrain this is the SESSION
// CONSOLE: a section header (.cyber-pill eyebrow + italic display headline)
// plus the live session/activity stream built from MessageBubble children.
// Reads window.MessageBubble. Exposes window.ChatArea.
const { useEffect, useRef } = React;

function ChatArea({ folderName, entries }) {
  const { MessageBubble } = window;
  const streamRef = useRef(null);

  // Keep the newest entry in view without scrollIntoView (breaks embeds).
  useEffect(() => {
    const el = streamRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries.length]);

  return (
    <main className="ob-console">
      <header className="ob-console-head">
        <span className="ob-pill">
          <span className="ob-pill-dot"></span> SESSION · {folderName.toUpperCase()}
        </span>
        <h1 className="ob-console-h1">
          Unified <span className="ob-h1-stroke">Intelligence</span>
        </h1>
        <p className="ob-console-sub">
          Persistent memory + 29 skills over your Obsidian vault. The agent dispatches from
          here to wherever the work actually lives — and remembers it next session.
        </p>
      </header>

      <div className="ob-stream" ref={streamRef}>
        {entries.map((e) => <MessageBubble key={e.id} entry={e} />)}
      </div>
    </main>
  );
}

window.ChatArea = ChatArea;
