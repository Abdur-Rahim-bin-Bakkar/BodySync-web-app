import React from 'react';
import UserOverview from './UserOverview';
import { getServerSession } from '@/lib/session/server';
import { getUserStats } from '@/lib/api/counts';

const UserOverviewPage = async () => {
    const session = await getServerSession()
    const stats = await getUserStats(session?.user?.id)
    console.log(stats,'this is count')
    return (
        <div>
            <UserOverview stats ={stats} />
        </div>
    );
};

export default UserOverviewPage;