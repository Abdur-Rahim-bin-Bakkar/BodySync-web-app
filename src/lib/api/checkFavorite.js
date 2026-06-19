const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

export const checkFavorite = async (userId, classId) => {
    if (!userId || !classId) return false;

    try {
        const res = await fetch(
            `${BASE_URL}/favorites/check?userId=${userId}&classId=${classId}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.log("Favorite check failed:", data.message);
            return false;
        }

        return !!data.isFavorite; // ⭐ FORCE BOOLEAN
    } catch (error) {
        console.log("Favorite API error:", error.message);
        return false;
    }
};