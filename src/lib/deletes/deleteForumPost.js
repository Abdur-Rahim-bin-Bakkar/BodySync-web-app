'use server'
import { authHeader } from "../header/header";

export const deleteForumPost = async (id) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/forum/${id}`,
    {
      method: "DELETE",
      headers: {
        ...(await authHeader()),
      }
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete post"
    );
  }

  return data;
};