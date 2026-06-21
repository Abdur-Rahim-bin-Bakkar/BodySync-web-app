export const getClasses = async (search = "", category = "", page = 1) => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URI}/classes`);

        if (search) url.searchParams.append("search", search);
        if (category) url.searchParams.append("category", category);

        url.searchParams.append("page", page);
        url.searchParams.append("limit", 6); // 🔥 max 6 per page

        const res = await fetch(url.toString(), {
            cache: "no-store",
        });

        const data = await res.json();

        if (!data.success) throw new Error(data.message);

        return data;
    } catch (error) {
        console.error("Error fetching classes:", error.message);
        return {
            data: [],
            pagination: null,
        };
    }
};