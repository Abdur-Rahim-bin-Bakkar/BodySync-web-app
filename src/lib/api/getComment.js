export const getCommentsByPostId = async (postId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/forum/${postId}/comments`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch comments");
    }

    return data.data;
};