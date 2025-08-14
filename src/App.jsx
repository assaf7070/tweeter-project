import { useEffect, useState } from "react";
import TweetForm from "./components/TweetForm";
import TweetList from "./components/TweetList";
import { loadTweets, saveTweets, loadUsername } from "./lib/storage";
import "./index.css";
import "./components/tweet.css";

export default function App() {
  const [tweets, setTweets] = useState(() => {
    const loaded = loadTweets();
    return loaded.sort((a, b) => new Date(b.date) - new Date(a.date));
  });

  const [username] = useState(() => loadUsername());

  useEffect(() => {
    saveTweets(tweets);
  }, [tweets]);

  const addTweet = (content) => {
    const id = crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    const newTweet = {
      id,
      content,
      userName: username,
      date: new Date().toISOString(),
    };
    setTweets((prev) => [newTweet, ...prev]);
  };

  return (
    <div className="container">
      <TweetForm onAdd={addTweet} />
      <TweetList tweets={tweets} />
    </div>
  );
}
