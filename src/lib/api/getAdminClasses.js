'use server'

import { authHeader } from "../header/header";

export const getAdminClasses = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/admin/classes`, {
        cache: "no-store",
        headers: {
            ...(await authHeader()),
        }
    });

    return res.json();
};