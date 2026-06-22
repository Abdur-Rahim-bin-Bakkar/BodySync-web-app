'use server'
import { authHeader } from "../header/header";
import { getServerSession } from "../session/server";

export const createForumPost = async (forumData) => {
    const session = await getServerSession()
    const newForumData ={
        ...forumData,
        authorRole:session?.user?.role,
        authorName:session?.user?.name,
        authorEmail:session?.user?.email,
        userId:session?.user?.id,
        userImage:session?.user?.image

    }
    const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/forum`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 ...(await authHeader()),
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