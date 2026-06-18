import { redirect } from 'next/navigation';
import React from 'react';

const DashboardHomePage = () => {
    redirect('/dashboard/trainer')
};

export default DashboardHomePage;