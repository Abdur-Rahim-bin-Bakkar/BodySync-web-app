const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const getUserBookings = async (userId) => {
    const res = await fetch(
        `${BASE_URL}/bookings/user/${userId}`,
        {
            cache: "no-store",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
    }

    return data;
};