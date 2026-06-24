"use client";

import Image from "next/image";
import { Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
// import { deleteForumPost } from "@/lib/delets/deleteForumPost";
import { toast } from "sonner";
import { useState } from "react";
import { deleteForumPost } from "@/lib/deletes/deleteForumPost";

const MyForumCard = ({ post }) => {
    console.log(post?.image)
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this forum post?"
        );

        if (!confirmDelete) return;

        try {
            setLoading(true);

            await deleteForumPost(post?._id);

            toast.success(
                "Forum post deleted successfully"
            );

            router.refresh();
        } catch (error) {
            toast.error(
                error?.message ||
                "Failed to delete forum post"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full border border-default-200 rounded-2xl overflow-hidden bg-white dark:bg-[#0B0F14]">
            <div className="flex flex-col md:flex-row gap-6 p-5">

                {/* IMAGE */}
                <div className="w-full md:w-64 h-52 overflow-hidden rounded-xl">
                    <Image
                        width={400}
                        height={300}
                        unoptimized
                        src={post?.image}
                        alt={post?.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* CONTENT */}
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-3">
                            {post.title}
                        </h2>

                        <p className="text-default-600 line-clamp-4">
                            {post.description}
                        </p>
                    </div>

                    <div className="flex justify-end mt-6">
                        <Button
                            color="danger"
                            startContent={<Trash2 size={18} />}
                            onPress={handleDelete}
                            isLoading={loading}
                        >
                            Delete
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MyForumCard;