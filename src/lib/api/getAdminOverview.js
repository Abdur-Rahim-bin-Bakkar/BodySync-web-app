const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

// Admin dashboard stats fetch function
export const getAdminOverviewStats = async () => {
    try {
        const res = await fetch(`${BASE_URL}/admin/overview-stats`, {
            method: "GET",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch admin stats");
        }

        const data = await res.json();

        return data.data; // 👈 only stats object return
    } catch (error) {
        console.error("Admin stats fetch error:", error);
        return null;
    }
};