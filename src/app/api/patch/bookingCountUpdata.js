const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const incrementBookingCount = async (classId) => {
    const res = await fetch(
        `${BASE_URL}/classes/${classId}/increment-booking`,
        {
            method: "PATCH",
        }
    );

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to update booking count");
    }

    return data;
};