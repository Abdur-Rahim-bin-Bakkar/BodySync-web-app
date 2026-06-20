const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const getUserStats = async (userId) => {
    const res = await fetch(`${BASE_URL}/users/${userId}/stats`, {
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch user stats");
    }

    return data.data;
};