'use server'
import { getServerSession } from "../session/server";

export const createForumPost = async (forumData) => {
    const session = await getServerSession()
    const newForumData ={
        ...forumData,
        authorRole:session?.user?.role,
        authorName:session?.user?.name,
        authorEmail:session?.user?.email

    }
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/forum`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newForumData),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to create forum post"
        );
    }

    return data;
};