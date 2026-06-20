export const getAllForumPosts = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/forum-posts`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch forum posts");
  }

  return res.json();
};