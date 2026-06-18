export const getFeaturedClasses = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/classes/featured`
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data; // featured classes array
    } catch (error) {
        console.error("Error fetching featured classes:", error.message);
        return [];
    }
};