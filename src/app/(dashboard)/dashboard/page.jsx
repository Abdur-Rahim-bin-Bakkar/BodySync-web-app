import { getServerSession } from '@/lib/session/server';
import { redirect } from 'next/navigation';
import React from 'react';

const DashboardHomePage = async () => {
    const userData = await getServerSession()
    
    redirect(`/dashboard/${userData?.user?.role}`)
};

export default DashboardHomePage;