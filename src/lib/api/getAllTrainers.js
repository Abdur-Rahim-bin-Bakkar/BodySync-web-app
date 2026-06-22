'use server'
import { authHeader } from "../header/header";

export const getAllTrainers = async () => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/trainers`,
        {
            cache: "no-store",
            headers: {
                ...(await authHeader()),
            }
        }
    );

    return response.json();
};