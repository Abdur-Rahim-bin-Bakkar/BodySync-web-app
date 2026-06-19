// import { checkAuth } from '@/lib/redirect/checkAuth';
import { checkRole } from '@/lib/redirect/checkRole';
import React from 'react';

const TrainerLayout = async ({ children }) => {
    await checkRole('user')
    return children
};

export default TrainerLayout;