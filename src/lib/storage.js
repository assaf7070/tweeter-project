
const LS_TWEETS_KEY = 'tw.tweets';
const LS_USERNAME_KEY = 'tw.username';
const DEFAULT_USERNAME = 'Dobby';

export function loadTweets() {
  try { return JSON.parse(localStorage.getItem(LS_TWEETS_KEY)) || []; }
  catch { return []; }
}

export function saveTweets(tweets) {
  localStorage.setItem(LS_TWEETS_KEY, JSON.stringify(tweets));
}

export function loadUsername() {
  return localStorage.getItem(LS_USERNAME_KEY) || DEFAULT_USERNAME;
}

export function saveUsername(name) {
  localStorage.setItem(LS_USERNAME_KEY, name);
}
