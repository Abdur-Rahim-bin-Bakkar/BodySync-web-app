'use server'
import { authHeader } from "../header/header";

const base = process.env.NEXT_PUBLIC_SERVER_URI;

export const approveClass = async (id) => {
    const res = await fetch(`${base}/classes/${id}/approve`, {
        method: "PATCH",
    });
    return res.json();
};

export const rejectClass = async (id) => {
    const res = await fetch(`${base}/classes/${id}/reject`, {
        method: "PATCH",
    });
    return res.json();
};

export const deleteClass = async (id) => {
    const res = await fetch(`${base}/classes/${id}`, {
        method: "DELETE",
        headers: {
            ...(await authHeader()),
        }
    });
    return res.json();
};