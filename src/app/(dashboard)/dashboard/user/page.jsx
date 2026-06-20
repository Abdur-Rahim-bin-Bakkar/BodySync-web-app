import React from 'react';
import UserOverview from './UserOverview';
import { getServerSession } from '@/lib/session/server';
import { getUserStats } from '@/lib/api/counts';
import { getTrainerApplication } from '@/lib/api/getTrainerApplication';

const UserOverviewPage = async () => {
    const session = await getServerSession()
    const stats = await getUserStats(session?.user?.id)
    const trainerApplicationData = await getTrainerApplication(session?.user?.id)
    console.log(trainerApplicationData?.data,'this is count')
    return (
        <div>
            <UserOverview trainerApplication ={trainerApplicationData?.data} stats ={stats} />
        </div>
    );
};

export default UserOverviewPage;