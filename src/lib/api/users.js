'use server'

import { authHeader } from "../header/header";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

// get users
export const getUsers = async (search = "") => {
    const res = await fetch(
        `${BASE_URL}/users?search=${search}`,
        {
            cache: "no-store",
            headers: {
                ...(await authHeader()),
            }

        }
    );

    return res.json();
};

// block / unblock
export const updateUserStatus = async (id, status) => {
    const res = await fetch(`${BASE_URL}/users/${id}/status`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(await authHeader())
        },
        body: JSON.stringify({ status }),
    });

    return res.json();
};

// make admin
export const makeAdmin = async (id) => {
    const res = await fetch(`${BASE_URL}/users/${id}/make-admin`, {
        method: "PATCH",
        ...(await authHeader())
    });

    return res.json();
};