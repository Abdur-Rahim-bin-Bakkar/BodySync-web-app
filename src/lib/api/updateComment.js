'use server'
import { revalidatePath } from "next/cache";

export const updateComment = async (id, text, userId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/comments/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, userId }),
    }
  );
  revalidatePath(`forum/${id}`)

  return res.json();
};