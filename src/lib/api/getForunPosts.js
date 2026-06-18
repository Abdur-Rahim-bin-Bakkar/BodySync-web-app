export const getForumPosts = async (search = "") => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/forum-posts?search=${search}`,
            {
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        console.error("Error fetching forum posts:", error.message);
        return [];
    }
};