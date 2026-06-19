const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const getClassById = async (id) => {
    const res = await fetch(`${BASE_URL}/classes/${id}/details`, {
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Failed to fetch class");
    }

    return data.data;
};