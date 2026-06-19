export const getForumPostsByTrainerId = async (trainerId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/forum/trainer/${trainerId}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch forum posts");
    }

    return response.json();
};