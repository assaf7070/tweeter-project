
export default function Tweet({ content, userName, date }) {
  return (
    <article className="card tweet">
      <div className="tweet_header">
        <div className="tweet_user">{userName}</div>
        <time className="tweet_date" dateTime={date}>
          {new Date(date).toLocaleString()}
        </time>
      </div>
      <div className="tweet_content">{content}</div>
    </article>
  );
}