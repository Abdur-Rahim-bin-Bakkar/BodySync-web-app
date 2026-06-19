'use server'
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const addReply = async (commentId, payload) => {
    const res = await fetch(`${BASE_URL}/comment/${commentId}/reply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to add reply");
    }
    if(res.ok){
        revalidatePath(`/forum/${commentId}`)
    }

    return data;
};