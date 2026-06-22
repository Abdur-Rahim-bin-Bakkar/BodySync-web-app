'use server'
import { authHeader } from "../header/header";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

// get applications
export const getApplications = async () => {
    const res = await fetch(`${BASE_URL}/apply-trainer`, {
        headers: {
            ...(await authHeader()),
        }
    });
    return res.json();
};

// approve
export const approveTrainer = async (id, feedback) => {
    const res = await fetch(
        `${BASE_URL}/apply-trainer/${id}/approve`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(await authHeader()),
            },
            body: JSON.stringify({ feedback }),
        }
    );

    return res.json();
};

// reject
export const rejectTrainer = async (id, feedback) => {
    const res = await fetch(
        `${BASE_URL}/apply-trainer/${id}/reject`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                ...(await authHeader()),
            },
            body: JSON.stringify({ feedback }),
        }
    );

    return res.json();
};