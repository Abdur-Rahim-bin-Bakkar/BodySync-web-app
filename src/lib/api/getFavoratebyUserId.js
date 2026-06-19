export const getUserFavorites = async (userId) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/favorites/${userId}`
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch favorites");
    }

    return data.data;
};