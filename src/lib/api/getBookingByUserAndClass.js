const BASE_URL =
    process.env.NEXT_PUBLIC_SERVER_URI || "http://localhost:5000";

export const getBookingByUserAndClass = async (userId, classId) => {
    if (!userId || !classId) return null;

    try {
        const res = await fetch(
            `${BASE_URL}/bookings/user/${userId}/class/${classId}`,
            {
                method: "GET",
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!res.ok) {
            console.log("Booking fetch failed:", data.message);
            return null;
        }

        return data.data;
    } catch (error) {
        console.log("Booking API error:", error.message);
        return null;
    }
};