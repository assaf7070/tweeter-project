import { useState } from "react";

const MAX_TWEET_LEN = 140;

export default function TweetForm({ onAdd }) {
  const [text, setText] = useState("");

  const remaining = MAX_TWEET_LEN - text.length;
  const tooLong = remaining < 0;
  const disabled = !text.trim() || tooLong;

  const submit = (e) => {
    e.preventDefault();
    if (disabled) return;
    onAdd(text.trim());
    setText("");
  };

  return (
    <form onSubmit={submit} className="card compose">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What you have in mind..."
        rows={4}
      />
      <div className="compose_footer">
        <span className={`counter ${tooLong ? "error" : ""}`}>Remaining characters: {remaining}</span>
        <button type="submit" disabled={disabled}>Tweet</button>
      </div>
      {tooLong && (
        <div className="error-text">
          The tweet can't contain more than 140 chars.
        </div>
      )}
    </form>
  );
}
