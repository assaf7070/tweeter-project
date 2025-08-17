import { useEffect, useState } from "react";
import "./index.css";
import "./components/tweet.css";

import TweetForm from "./components/TweetForm";
import TweetList from "./components/TweetList";
import { loadUsername } from "./lib/storage";
import { fetchTweets, createTweet } from "./lib/api";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const [username] = useState(() => loadUsername());

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setLoadError("");
        const data = await fetchTweets();
        if (!cancelled) setTweets(data);
      } catch (err) {
        if (!cancelled) {
          setLoadError(err?.message || "Failed to load tweets");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const addTweet = async (content) => {
    try {
      setIsAdding(true);
      setAddError("");
      const created = await createTweet({
        content,
        userName: username,
        date: new Date().toISOString(),
      });
      setTweets((prev) => [created, ...prev]);
    } catch (err) {
      setAddError(err?.message || "Failed to add tweet");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="container">
      <TweetForm onAdd={addTweet} isAdding={isAdding} addError={addError} />
      {loading ? (
        <div className="status">Loading tweets…</div>
      ) : loadError ? (
        <div className="error-text">{loadError}</div>
      ) : (
        <TweetList tweets={tweets} />
      )}
    </div>
  );
}
