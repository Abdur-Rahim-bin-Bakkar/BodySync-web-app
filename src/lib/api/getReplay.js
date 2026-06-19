export const getReplies = async (commentId) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/comment/${commentId}/replies`);

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to get replies");
    }

    return data.data;
};