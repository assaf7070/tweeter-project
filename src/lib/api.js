import axios from "axios";

const SUPABASE_URL = "https://uckmgdznnsnusvmyfvsb.supabase.co/rest/v1";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVja21nZHpubnNudXN2bXlmdnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0ODU5NjAsImV4cCI6MjA3MDA2MTk2MH0.D82S0DBivlsXCCAdpTRB3YqLqTOIP7MUj-p1R8Lj9Jo";

const TABLE = "Tweets";

const api = axios.create({
  baseURL: SUPABASE_URL,
  headers: {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  },
});

export async function fetchTweets() {
  // GET /Tweets?select=*&order=date.desc
  const { data } = await api.get(`/${TABLE}`, {
    params: { select: "*", order: "date.desc" },
  });
  return data || [];
}

export async function createTweet({ content, userName, date }) {
  // POST /Tweets
  const { data } = await api.post(
    `/${TABLE}`,
    { content, userName, date },
    {
      headers: { Prefer: "return=representation" },
    }
  );
  // Supabase often returns an array with the created row
  return Array.isArray(data) ? data[0] : data;
}
