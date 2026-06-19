const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const addComment = async (postId, payload) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/forum/${postId}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to add comment");
    }

    return data;
};