export const createForumPost = async (forumData) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/forum`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(forumData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create forum post"
        );
    }

    return data;
};