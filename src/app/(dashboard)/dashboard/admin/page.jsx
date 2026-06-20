import { getAdminOverviewStats } from "@/lib/api/getAdminOverview";
import AdminProfileCard from "./AdminProfileCard";
import StatsGrid from "./StatsGrid";
import { getServerSession } from "@/lib/session/server";

const AdminHomePage = async () => {
    const adminOverviewData = await getAdminOverviewStats();

    // (optional) later from session
    const adminUser = await getServerSession()

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-5">Admin Dashboard</h1>

            {/* Profile */}
            <AdminProfileCard user={adminUser?.user} />

            {/* Stats */}
            <StatsGrid stats={adminOverviewData} />
        </div>
    );
};

export default AdminHomePage;