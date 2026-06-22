'use server'
import { authHeader } from "../header/header";

export const removeTrainerRole = async (id) => {
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/users/${id}/remove-trainer`,
        {
            method: "PATCH",
            headers: {
                ...(await authHeader()),
            }
        }
    );

    return response.json();
};