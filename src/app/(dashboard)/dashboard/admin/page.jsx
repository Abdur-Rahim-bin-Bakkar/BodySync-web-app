export const dynamic = "force-dynamic";
import { getAdminOverviewStats } from "@/lib/api/getAdminOverview";
import AdminProfileCard from "./AdminProfileCard";
import StatsGrid from "./StatsGrid";
import { getServerSession } from "@/lib/session/server";
import AdminStatsChart from "./AdminStatsChart";

const AdminHomePage = async () => {
    const adminOverviewData = await getAdminOverviewStats();

    const adminUser = await getServerSession();
    console.log(adminOverviewData, 'dfd')

    return (
        <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <h1 className="text-2xl font-bold mb-5 text-gray-900 dark:text-white">
                Admin Dashboard
            </h1>

            {/* Profile */}
            <AdminProfileCard user={adminUser?.user} />

            {/* Stats */}
            <StatsGrid stats={adminOverviewData} />
            <div className="mt-6">
                <AdminStatsChart stats={adminOverviewData} />
            </div>
        </div>
    );
};

export default AdminHomePage;