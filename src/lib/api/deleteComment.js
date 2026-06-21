'use server'
import { revalidatePath } from "next/cache";

export const deleteComment = async (id, userId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/comments/${id}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    }
  );
  revalidatePath(`forum/${id}`)
  return res.json();
};