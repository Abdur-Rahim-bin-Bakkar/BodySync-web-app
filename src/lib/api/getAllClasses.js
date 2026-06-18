export const getClasses = async (search = "", category = "") => {
    try {
        const url = new URL(`${process.env.NEXT_PUBLIC_SERVER_URI}/classes`);

        if (search) url.searchParams.append("search", search);
        if (category) url.searchParams.append("category", category);

        const res = await fetch(url.toString(), {
            cache: "no-store",
        });

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        console.error("Error fetching classes:", error.message);
        return [];
    }
};