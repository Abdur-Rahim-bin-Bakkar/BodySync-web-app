// import Sidebar from '@/components/dashboard/Sidebar';
import Sidebar from '@/components/dashboard/Sidebar';
import { checkAuth } from '@/lib/redirect/checkAuth';
import { getServerSession } from '@/lib/session/server';
import React from 'react';

const DashboardLayout = async ({ children }) => {
    const userSession = await getServerSession()
    await checkAuth(userSession)


    return (
        <div className='flex gap-2'>
            <Sidebar/>
            <div className='flex-1'>
                {children}
            </div>
        </div>
    );
};

export default DashboardLayout;