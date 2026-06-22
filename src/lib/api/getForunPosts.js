'use server'
import { authHeader } from "../header/header";

export const getForumPosts = async (search = "") => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URI}/forum-posts?search=${search}`,
            {
                cache: "no-store",
            }
        );

        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message);
        }

        return data.data;
    } catch (error) {
        console.error("Error fetching forum posts:", error.message);
        return [];
    }
};



const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URI;

// Get single forum post by ID
export const getForumPostById = async (id) => {
    try {
        const res = await fetch(`${BASE_URL}/forum-posts/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                 ...(await authHeader()),
            },
            cache: "no-store", // Next.js server component এর জন্য useful
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data?.message || "Failed to fetch forum post");
        }

        return data?.data; // শুধু পোস্ট data return করতেছি
    } catch (error) {
        console.error("getForumPostById error:", error.message);
        throw error;
    }
};