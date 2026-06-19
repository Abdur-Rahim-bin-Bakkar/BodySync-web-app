export const removeFavorite = async (id) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/favorites/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to delete");
    }

    return data;
};