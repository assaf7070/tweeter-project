import Tweet from "./Tweet";

export default function TweetList({ tweets }) {
  if (!tweets.length) return <div className="empty">No tweets yet</div>;

  return (
    <div className="tweets">
      {tweets.map((t) => (
        <Tweet
          key={t.id}
          content={t.content}
          userName={t.userName}
          date={t.date}
        />
      ))}
    </div>
  );
}
