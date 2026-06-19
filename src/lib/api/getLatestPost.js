const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const getLatestForumPosts = async (limit = 4) => {
  const res = await fetch(
    `${BASE_URL}/forum/latest?limit=${limit}`,
    {
      method: "GET",
      cache: "no-store", // always fresh data
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch latest posts");
  }

  return data.data;
};