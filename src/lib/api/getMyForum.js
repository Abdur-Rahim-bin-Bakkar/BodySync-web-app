'use server'

import { authHeader } from "../header/header";

export const getForumPostsByuserId = async (userId) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/forum/userId/${userId}`, {
        headers: {
            ...(await authHeader()),
        }
    },
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch forum posts");
    }

    return response.json();
};