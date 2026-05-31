// InputBar.jsx — the input/composer role. For OneBrain this is the COMMAND
// COMPOSER: a slash-prefixed mono field + a corner-cut .btn-tech submit. When
// a skill is selected in AssistantsList, the field pre-fills with that command.
// Submitting lifts the command to the App, which appends entries to the console.
// Exposes window.InputBar.
const { useState, useEffect } = React;

function InputBar({ activeSkill, onRun }) {
  const [value, setValue] = useState('');

  // Pre-fill when a skill is chosen in the rail.
  useEffect(() => {
    if (activeSkill) setValue('/' + activeSkill + ' ');
  }, [activeSkill]);

  function submit(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onRun(v);
    setValue('');
  }

  return (
    <form className="ob-composer" onSubmit={submit}>
      <span className="ob-composer-slash">/</span>
      <input
        className="ob-composer-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="capture an idea, route the inbox, connect notes…"
        aria-label="Command composer"
      />
      <span className="ob-composer-hint">⏎ run</span>
      <button className="ob-composer-send" type="submit">
        <span className="ob-composer-send-in">Run →</span>
      </button>
    </form>
  );
}

window.InputBar = InputBar;
