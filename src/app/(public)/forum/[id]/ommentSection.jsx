"use client";

import { useState } from "react";
import CommentItem from "./CommentItem";
import { addComment } from "@/lib/post/addComment";
import { useUserSessionClient } from "@/lib/session/client";
import { toast } from "react-toastify";

const CommentSection = ({ postId, commentsData }) => {
    const [comment, setComment] = useState("");
    const comments = commentsData
    const sesssion = useUserSessionClient()
    console.log(sesssion?.user?.status, 'd')


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sesssion?.user?.status === 'blocked') {
            toast.warning('Your account is blocked by admin')
            return
        }

        if (!comment.trim()) return;

        const newComment = {
            text: comment,
            user: sesssion?.user
            // createdAt: new Date().toISOString(),
        };

        // UI update (optimistic)
        // setComments((prev) => [newComment, ...prev]);
        setComment("");
        const postResult = await addComment(postId, newComment)
        console.log(postResult, 'comment result')


    };

    return (
        <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {/* Comment form */}
            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 border p-2 rounded"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer">
                    Post
                </button>
            </form>

            {/* Comment list */}
            <div className="space-y-3">
                {comments.length === 0 ? (
                    <p className="text-gray-400">No comments yet</p>
                ) : (
                    comments.map((c, i) => (
                        <CommentItem key={i} comment={c} />
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;